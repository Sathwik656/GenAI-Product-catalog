import express, { Request, Response } from 'express';
import multer from 'multer';
import type { IProduct } from '../models/Product';
import Product from '../models/Product';
import { generateMarketingContent } from '../services/aiService';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Retrieve generated products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Retrieve single product
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Generate content and save product
router.post('/generate-content', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, material, color, weight, features } = req.body;
    
    // Parse features if passed as a string/JSON
    let parsedFeatures: string[] = [];
    if (features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        if (typeof features === 'string') {
          parsedFeatures = features.split(',').map(f => f.trim());
        }
      }
    }

    if (!title) {
      return res.status(400).json({ error: 'Product title is required' });
    }

    const imageBuffer = req.file?.buffer;
    const imageMimeType = req.file?.mimetype;

    const generatedContent = await generateMarketingContent({
      title,
      description,
      material,
      color,
      weight,
      features: parsedFeatures,
      imageBuffer,
      imageMimeType
    });

    const newProduct = new Product({
      title,
      description,
      material,
      color,
      weight,
      features: parsedFeatures,
      // For a real app, you would upload the image to S3/Cloudinary and store the URL here.
      // This implementation will omit image_url unless configured.
      seo_description: generatedContent.seo_description,
      instagram_caption: generatedContent.instagram_caption,
      linkedin_post: generatedContent.linkedin_post,
      tags: generatedContent.tags || []
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error('Create product error:', error);
    res.status(500).json({ error: error.message || 'Error processing request' });
  }
});

// Delete a product
router.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(`[BACKEND] DELETE request for Product ID: ${id}`);
  
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      console.warn(`[BACKEND] Delete failed: Product ${id} not found in database.`);
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(`[BACKEND] Successfully deleted Product: ${id}`);
    res.status(204).send(); // Success, no content
  } catch (error: any) {
    console.error(`[BACKEND] Error deleting product ${id}:`, error);
    res.status(500).json({ error: error.message || 'Failed to delete product' });
  }
});

export default router;
