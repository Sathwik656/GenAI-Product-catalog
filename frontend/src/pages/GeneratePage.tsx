import { useState } from 'react';
import { Layout } from '../components/Layout';
import { OutputCards } from '../components/OutputCards';
import { generateContent } from '../services/api';
import type { ProductResponse } from '../services/api';
import { Loader2, UploadCloud, Sparkles, ArrowLeft } from 'lucide-react';

export const GeneratePage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductResponse | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    material: '',
    color: '',
    weight: '',
    features: '' // comma separated
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      const data = await generateContent(submitData);
      setResult(data);
    } catch (error) {
      console.error('Error generating content', error);
      alert('Failed to generate content. Please check the backend connection and Gemini API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-6rem)] flex flex-col relative py-4">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto w-full animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Loader2 className="animate-spin text-indigo-600 w-16 h-16 relative z-10" />
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-extrabold text-indigo-950">Crafting perfect copy...</h2>
              <p className="text-base text-gray-500 leading-relaxed">
                Our AI is analyzing your product and writing SEO descriptions, Instagram captions, and more!
              </p>
            </div>
          </div>
        ) : result ? (
          <div className="max-w-5xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Nav Area */}
            <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-gray-200/50 p-4 rounded-2xl shadow-sm">
              <button
                onClick={() => setResult(null)}
                className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors group px-4 py-2 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1 text-gray-400 group-hover:text-indigo-500" />
                Edit Inputs
              </button>
              <div className="flex items-center text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 uppercase tracking-widest shadow-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generation Complete
              </div>
            </div>

            {/* Render Output Cards taking full width */}
            <div className="w-full">
              <OutputCards product={result} />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto w-full bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Top gradient accent */}
            <div className="w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="p-8 sm:p-10 border-b border-gray-100 bg-white">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
                Generate Copy
              </h2>
              <p className="mt-3 text-base text-gray-500 leading-relaxed">
                Fill in product details below to automatically generate SEO descriptions, hashtags, and social media posts.
              </p>
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              <form id="generate-form" onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Product Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
                    placeholder="e.g. Ergonomic Office Chair"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Description (Optional)</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none shadow-inner"
                    placeholder="Brief overview of the product..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Material</label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
                      placeholder="e.g. Genuine Leather"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
                      placeholder="e.g. Midnight Black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
                      placeholder="e.g. 1.2 kg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Features (Comma separated)</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
                      placeholder="e.g. Waterproof, Eco-friendly"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-bold text-gray-800 mb-3">Product Image (Optional)</label>
                  <div className="flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-2xl bg-white hover:bg-indigo-50/50 hover:border-indigo-300 transition-colors group">
                    <div className="space-y-2 text-center">
                      <div className="mx-auto w-12 h-12 bg-gray-100 group-hover:bg-indigo-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                        <UploadCloud className="h-6 w-6 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer rounded-md font-bold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span>Upload a file</span>
                          <input type="file" name="image" className="sr-only" onChange={handleImageChange} accept="image/*" />
                        </label>
                      </div>
                      {imageFile ? (
                        <p className="text-sm text-green-600 font-semibold truncate max-w-[250px] mx-auto">{imageFile.name}</p>
                      ) : (
                        <p className="text-xs text-gray-500 font-medium">PNG, JPG up to 5MB</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-8 sm:p-10 border-t border-gray-100 bg-gray-50/80">
              <button
                type="submit"
                form="generate-form"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-200 text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Generating AI Magic...
                  </>
                ) : (
                  'Generate Output'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};