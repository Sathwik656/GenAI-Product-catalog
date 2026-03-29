import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ProductResponse {
  _id: string;
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
  createdAt: string;
}

export const generateContent = async (formData: FormData): Promise<ProductResponse> => {
  const response = await axios.post(`${API_URL}/api/generate-content`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getProducts = async (): Promise<ProductResponse[]> => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const getProductById = async (id: string): Promise<ProductResponse> => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  console.log("API CALL: Deleting product at", `${API_URL}/api/products/${id}`);
  await axios.delete(`${API_URL}/api/products/${id}`);
};
