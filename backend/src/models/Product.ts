import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description?: string;
  material?: string;
  color?: string;
  weight?: string;
  features: string[];
  image_url?: string;
  seo_description: string;
  instagram_caption: string;
  linkedin_post: string;
  tags: string[];
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  material: { type: String, default: '' },
  color: { type: String, default: '' },
  weight: { type: String, default: '' },
  features: { type: [String], default: [] },
  image_url: { type: String, default: '' },
  seo_description: { type: String, required: true },
  instagram_caption: { type: String, required: true },
  linkedin_post: { type: String, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
