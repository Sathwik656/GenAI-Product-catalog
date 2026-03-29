import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import type { ProductResponse } from '../services/api';
import { Layout } from '../components/Layout';
import { Package, Clock, Hash, ArrowRight, Trash2 } from 'lucide-react';

export const DashboardPage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Attempting to delete product with ID:", id);

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        console.log("Delete successful for ID:", id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('Error deleting product. Check browser console.');
      }
    }
  };

  return (
    <Layout>
      {/* Enhanced Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Dashboard
        </h2>
        <p className="mt-2 text-gray-500 text-lg max-w-2xl">
          Review and manage all your AI-generated marketing assets in one place.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 relative z-10"></div>
          </div>
          <p className="text-indigo-900 font-medium">Loading your catalog...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/60 p-16 text-center shadow-sm max-w-3xl mx-auto mt-10">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
            <Package className="h-10 w-10 text-indigo-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No products generated yet</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto text-lg">
            Head over to the generate tab to create your first AI-powered marketing copy.
          </p>
          <a href="/generate" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            Start Generating
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 hover:border-indigo-200 hover:bg-white/80 hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              {/* Content Layer (z-0) - The visual stuff */}
              <div className="p-5 flex flex-col h-full relative z-0">
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate flex-1 pr-8">
                    {product.title}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <span className="inline-flex items-center flex-shrink-0 text-[10px] font-medium text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-100 px-2.5 py-1 rounded-full shadow-sm">
                    <Clock className="w-3 h-3 mr-1.5 text-gray-400" />
                    {new Date(product.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {product.seo_description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200/40 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1.5 overflow-hidden h-6 flex-1">
                    {product.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center bg-white/70 backdrop-blur-sm border border-gray-200/60 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-lg shadow-sm whitespace-nowrap"
                      >
                        <Hash className="w-2.5 h-2.5 text-indigo-400 mr-0.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 bg-indigo-50 text-indigo-600 p-1.5 rounded-full ml-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Navigation Layer (z-10) - Full card is a link, but sits behind the button */}
              <Link
                to={`/product/${product._id}`}
                className="absolute inset-0 z-10"
                aria-label={`View details for ${product.title}`}
              />

              {/* Action Layer (z-20) - Delete button sits on very top */}
              <button
                onClick={(e) => handleDelete(e, product._id)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                title="Delete product"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Top Gradient Accent Line (z-20) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};