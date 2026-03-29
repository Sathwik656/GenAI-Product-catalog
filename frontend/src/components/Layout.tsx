import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PenTool, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    // Modern Slate-based background with dynamic gradients and subtle texture
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-200 via-indigo-500/20 to-slate-100/20 relative font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Premium Ambient Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        
        {/* Main Mesh Blobs */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-400/15 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[15%] -right-[15%] w-[50%] h-[50%] rounded-full bg-purple-400/12 blur-[140px] animate-pulse-slower"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full bg-cyan-400/10 blur-[130px] opacity-70"></div>
        
        {/* Subtle SVG Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      {/* Slimmer, Glassmorphic Sidebar */}
      <aside className="relative z-10 w-full md:w-56 bg-gradient-to-br from-slate-200 via-indigo-500/20 to-slate-100/20 backdrop-blur-xl border-r border-indigo-100/60 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
        
        {/* Logo Area */}
        <div className="p-5 border-b border-indigo-50 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all">
              
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">

            Catalog Generator

          </h1>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-none">
          <nav className="space-y-1.5">
            {/* Standard Link Style */}
            <Link 
              to="/" 
              className="flex items-center px-3 py-2.5 text-sm text-black font-medium rounded-xl hover:bg-white hover:text-indigo-600 hover:shadow-sm hover:ring-1 hover:ring-indigo-100 transition-all group"
            >
              <LayoutDashboard className="w-4 h-4 mr-3 text-black group-hover:text-indigo-500 transition-colors" />
              Dashboard
            </Link>
            
            {/* Standard Link Style (Unified) */}
            <Link 
              to="/generate" 
              className="flex items-center px-3 py-2.5 text-sm text-black font-medium rounded-xl hover:bg-white hover:text-indigo-600 hover:shadow-sm hover:ring-1 hover:ring-indigo-100 transition-all group"
            >
              <PenTool className="w-4 h-4 mr-3 text-black group-hover:text-indigo-500 transition-colors" />
              Generate Copy
            </Link>
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-indigo-50 flex-shrink-0 bg-white/30">
          <div className="text-[11px] text-center text-black font-medium tracking-wide uppercase">
            Powered by AI
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-full">
          {children}
        </div>
      </main>
      
    </div>
  );
};