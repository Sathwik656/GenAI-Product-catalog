import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import type { ProductResponse } from '../services/api';
import { Layout } from '../components/Layout';
import { ArrowLeft, Clock, Search, MessageSquare, Hash, Tag, Fingerprint, Layers, Box } from 'lucide-react';

// Custom LinkedIn Icon (Lucide removed brand icons in v1.0+)
const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 relative z-10"></div>
          </div>
          <p className="text-indigo-900 font-medium">Loading generation details...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50/50 backdrop-blur-md rounded-3xl border border-red-200/60 p-12 text-center max-w-2xl mx-auto shadow-sm mt-10">
          <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      ) : product ? (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Hero Section */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-pink-100/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3 group-hover:translate-x-1/4 transition-transform duration-1000"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <span className="inline-flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4 border border-indigo-100/50 uppercase tracking-widest shadow-sm">
                  <Fingerprint className="w-3.5 h-3.5 mr-1.5" />
                  Generated Asset
                </span>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center text-sm font-medium text-gray-500 mb-8">
                  <Clock className="w-4 h-4 mr-2" />
                  Generated on {new Date(product.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(product.createdAt).toLocaleTimeString('en-US', { timeStyle: 'short' })}
                </div>

                {/* Initial Input Specs (if available) */}
                <div className="flex flex-wrap gap-3">
                  {product.material && (
                    <div className="inline-flex items-center bg-gray-50/80 border border-gray-200/50 rounded-xl px-4 py-2.5">
                      <Layers className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Material</div>
                        <div className="text-sm font-medium text-gray-700">{product.material}</div>
                      </div>
                    </div>
                  )}
                  {product.color && (
                    <div className="inline-flex items-center bg-gray-50/80 border border-gray-200/50 rounded-xl px-4 py-2.5">
                      <div className="w-4 h-4 rounded-full mr-2 shadow-inner border border-gray-200/80" style={{ backgroundColor: product.color.toLowerCase().replace(' ', '') }}></div>
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Color</div>
                        <div className="text-sm font-medium text-gray-700">{product.color}</div>
                      </div>
                    </div>
                  )}
                  {product.weight && (
                    <div className="inline-flex items-center bg-gray-50/80 border border-gray-200/50 rounded-xl px-4 py-2.5">
                      <Box className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Weight</div>
                        <div className="text-sm font-medium text-gray-700">{product.weight}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {(product.description || (product.features && product.features.length > 0)) && (
              <div className="mt-8 pt-8 border-t border-gray-100/80">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Original Product Input</h3>
                {product.description && <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 max-w-3xl">{product.description}</p>}
                {product.features && product.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, i) => (
                      <span key={i} className="inline-flex items-center text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                        <Tag className="w-3 h-3 text-gray-400 mr-1.5" />
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SEO Section */}
            <div className="bg-gradient-to-b from-white to-indigo-50/30 rounded-3xl border border-indigo-100/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                   <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">SEO Description</h3>
                  <p className="text-xs text-gray-500 font-medium hertiage">Optimized for search engines</p>
                </div>
              </div>
              <div className="prose prose-sm prose-indigo max-w-none text-gray-700 leading-relaxed bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm flex-1 whitespace-pre-wrap">
                {product.seo_description}
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-8 h-full flex flex-col">
              
              {/* Instagram Block */}
              <div className="bg-gradient-to-b from-white to-pink-50/30 rounded-3xl border border-pink-100/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 text-white rounded-xl shadow-sm">
                     <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-gray-900">Instagram Caption</h3>
                     <p className="text-xs text-gray-500 font-medium">Ready to post</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm whitespace-pre-wrap">
                  {product.instagram_caption}
                </div>
              </div>

              {/* LinkedIn Block */}
              <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-3xl border border-blue-100/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex-1">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-[#0077b5]/10 text-[#0077b5] rounded-xl">
                     <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-gray-900">LinkedIn Update</h3>
                     <p className="text-xs text-gray-500 font-medium">Professional announcement</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm whitespace-pre-wrap">
                  {product.linkedin_post}
                </div>
              </div>

            </div>
          </div>

          {/* Tags Footer Area */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-sm">
             <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                <Hash className="w-4 h-4 text-indigo-500 mr-2" />
                Generated Tags & Hashtags
             </h3>
             <div className="flex flex-wrap gap-2.5">
               {product.tags.map((tag, idx) => (
                 <span key={idx} className="inline-flex items-center bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 text-gray-600 hover:text-indigo-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition-colors cursor-default">
                    <Hash className="w-3.5 h-3.5 text-indigo-400 mr-1" />
                    {tag}
                 </span>
               ))}
             </div>
          </div>
          
        </div>
      ) : null}
    </Layout>
  );
};
