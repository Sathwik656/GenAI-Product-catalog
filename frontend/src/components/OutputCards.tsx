import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { ProductResponse } from '../services/api';

interface OutputCardsProps {
  product: ProductResponse;
}

export const OutputCards = ({ product }: OutputCardsProps) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sections = [
    {
      id: 'seo',
      title: 'SEO Product Description',
      content: product.seo_description,
      color: 'blue'
    },
    {
      id: 'instagram',
      title: 'Instagram Caption',
      content: product.instagram_caption,
      color: 'pink'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Post',
      content: product.linkedin_post,
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Generated Content</h2>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
          <div className={`h-1 w-full bg-gradient-to-r ${section.color === 'pink' ? 'from-pink-500 to-rose-500' : section.color === 'indigo' ? 'from-indigo-500 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
              <button
                onClick={() => handleCopy(section.content, section.id)}
                className="flex items-center px-3 py-1.5 text-sm rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
              >
                {copiedSection === section.id ? (
                  <><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Copied</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copy</>
                )}
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              {section.content}
            </p>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tags & Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="bg-teal-50 text-teal-700 font-medium px-3 py-1.5 rounded-lg border border-teal-100">
                #{tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
          <button
            onClick={() => handleCopy(product.tags.join(', '), 'tags')}
            className="mt-4 flex items-center px-3 py-1.5 text-sm rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {copiedSection === 'tags' ? (
              <><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Copied</>
            ) : (
              <><Copy className="w-4 h-4 mr-2" /> Copy All Tags</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
