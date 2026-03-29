import { GoogleGenerativeAI } from '@google/generative-ai';

interface ProductInput {
  title: string;
  description?: string;
  material?: string;
  color?: string;
  weight?: string;
  features?: string[];
  imageBuffer?: Buffer;
  imageMimeType?: string;
}

export const generateMarketingContent = async (input: ProductInput) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  // Use gemini-1.5-flash for speed and multimodal capabilities
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

  const prompt = `
    You are an expert e-commerce marketing AI. I will provide product specifications and optionally an image of a product. 
    Your task is to generate 4 distinct pieces of marketing content based on this information.

    Product Name: ${input.title}
    Description: ${input.description || 'N/A'}
    Material: ${input.material || 'N/A'}
    Color: ${input.color || 'N/A'}
    Weight: ${input.weight || 'N/A'}
    Features: ${input.features && input.features.length > 0 ? input.features.join(', ') : 'N/A'}

    Please generate and return ONLY a valid JSON object with the following keys and instructions:

    1. "seo_description": A detailed, SEO-optimized product description suitable for an e-commerce website. Naturally include keywords based on the attributes provided.
    2. "instagram_caption": A short, engaging Instagram caption that includes emojis and 8-10 relevant hashtags.
    3. "linkedin_post": A professional LinkedIn product announcement highlighting benefits, features, and use cases.
    4. "tags": An array of 10 relevant SEO keywords and category tags for this product.

    Always return valid JSON. Do not include Markdown blocks like \`\`\`json.
  `;

  let result;

  try {
    if (input.imageBuffer && input.imageMimeType) {
      // Create inline data part for multimodal request
      const imagePart = {
        inlineData: {
          data: input.imageBuffer.toString('base64'),
          mimeType: input.imageMimeType
        }
      };
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }

    const responseText = result.response.text();
    // Sometimes the model might wrap in ```json ... ``` despite instructions. Clean it up.
    const cleanJsonText = responseText.replace(/```json\n|```\n|```/g, '').trim();

    return JSON.parse(cleanJsonText);
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw new Error('Failed to generate marketing content.');
  }
};
