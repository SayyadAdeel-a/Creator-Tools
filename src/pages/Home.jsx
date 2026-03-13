import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Search, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, 
  Captions, AlignLeft, Undo2, UserCheck, LayoutGrid, FileCode, Braces, 
  Video, Share2, Instagram, Twitter, Zap, BookOpen, Wand2, TrendingUp, Smartphone, User,
  Palette, Layers, ShieldCheck, Tag, Sun, Percent, Maximize, HardDrive, Ruler, Baby, CalendarRange
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { trackToolUse } from '../lib/track'

const tools = [
  // YouTube & Video Tools
  { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', icon: Wand2, description: 'Viral title formulas', tags: ['youtube', 'ctr', 'titles'] },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', icon: FileText, description: 'Professional video descriptions', tags: ['youtube', 'format', 'seo'] },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', icon: Clock, description: 'Create YouTube chapters', tags: ['youtube', 'timestamps', 'video'] },
  { name: 'YouTube Tags', path: '/tools/youtube-tags', icon: Search, description: 'Extract and optimize tags', tags: ['youtube', 'seo', 'tags'] },
  
  // Design & Color Tools
  { name: 'HEX to RGB', path: '/tools/hex-to-rgb', icon: Palette, description: 'HEX to RGB/HSL converter', tags: ['design', 'color', 'hex'] },
  { name: 'RGB to HEX', path: '/tools/rgb-to-hex', icon: Layers, description: 'RGB values to HEX code', tags: ['color', 'design', 'rgb'] },
  { name: 'Color Palette', path: '/tools/color-palette', icon: Wand2, description: 'Generate brand harmonies', tags: ['design', 'branding', 'palette'] },
  { name: 'Contrast Checker', path: '/tools/contrast-checker', icon: ShieldCheck, description: 'WCAG accessibility test', tags: ['design', 'ux', 'accessible'] },
  { name: 'Gradient Gen', path: '/tools/gradient-generator', icon: Layers, description: 'CSS background generator', tags: ['design', 'css', 'gradient'] },
  { name: 'Color Name Finder', path: '/tools/color-name', icon: Tag, description: 'Identify CSS color names', tags: ['design', 'color', 'name'] },
  { name: 'Tint & Shade', path: '/tools/tint-shade', icon: Sun, description: 'Generate lighter/darker variants', tags: ['design', 'ui', 'states'] },

  // Calculators & Math
  { name: 'Pct Calculator', path: '/tools/percentage-calculator', icon: Percent, description: 'Fast business math', tags: ['math', 'finance', 'percent'] },
  { name: 'Aspect Ratio', path: '/tools/aspect-ratio', icon: Maximize, description: 'Resolution & ratio tool', tags: ['video', 'photo', 'design'] },
  { name: 'File Size Conv', path: '/tools/file-size', icon: HardDrive, description: 'Digital storage calculator', tags: ['tech', 'file', 'storage'] },
  { name: 'Unit Converter', path: '/tools/unit-converter', icon: Ruler, description: 'Length, weight, & temp', tags: ['math', 'utility', 'units'] },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: Baby, description: 'Exact age assessment', tags: ['math', 'personal', 'age'] },
  { name: 'Date Difference', path: '/tools/date-difference', icon: CalendarRange, description: 'Days between two dates', tags: ['time', 'project', 'stats'] },
  { name: 'Number to Words', path: '/tools/number-to-words', icon: Type, description: 'Formal written digits', tags: ['finance', 'legal', 'writing'] },

  // SEO & Writing Tools
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash, description: 'Analyze keyword frequency', tags: ['seo', 'text', 'analysis'] },
  { name: 'Title Checker', path: '/tools/title-checker', icon: TrendingUp, description: 'Headline SEO analysis', tags: ['seo', 'ctr', 'title'] },
  
  // Social Media Tools
  { name: 'Instagram Format', path: '/tools/instagram-formatter', icon: Instagram, description: 'Keep caption line breaks', tags: ['social', 'instagram', 'bio'] },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter, description: 'Auto-split long threads', tags: ['twitter', 'thread', 'social'] },
  { name: 'Hashtag Generator', path: '/tools/hashtag-generator', icon: Hash, description: 'Viral grouped hashtags', tags: ['social', 'growth', 'tags'] },
  { name: 'Character Counter', path: '/tools/character-counter', icon: Smartphone, description: 'All-platform post limits', tags: ['social', 'stats', 'limit'] },

  // Generic Utilities
  { name: 'JSON Formatter', path: '/tools/json-formatter', icon: Braces, description: 'Beautify and validate JSON', tags: ['developer', 'json', 'format'] },
  { name: 'Base64 Tool', path: '/tools/base64', icon: FileCode, description: 'Encode or decode string', tags: ['developer', 'base64', 'security'] },
  { name: 'URL Encoder', path: '/tools/url-encoder', icon: Link2, description: 'Encode/decode special characters', tags: ['developer', 'url', 'seo'] },
]

export function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  return (
    <>
      <Helmet>
        <title>Free Online Tools for Content Creators - VidToolbox (60+ Free Tools)</title>
        <meta name="description" content="60+ free tools for YouTube SEO, content creation, and design. Generate viral titles, tags, color palettes, and more. No sign-up required." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/" />
      </Helmet>
      <Layout>
        <main>
        {/* Hero Section */}
        <div className="bg-white border-b border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-400 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-400 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <Zap className="w-3 h-3 fill-cyan-600" /> 70+ Professional Tools Added
                </div>
              <h1 className="text-5xl md:text-6xl font-bold font-heading text-slate-900 mb-6 leading-tight">
                Professional Tools for <span className="text-cyan-600">Viral Creators</span> & Designers
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
                The ultimate toolbox to polish your content, optimize your design systems, and streamline your mathematical workflows. Free, fast, and secure.
              </p>
              
              <div className="relative group max-w-xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Seach for 'Color', 'CSS', 'Social'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-lg transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black text-slate-900 font-heading uppercase tracking-tighter">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Flagship Utility Suite'}
            </h2>
            <Link to="/tools" className="text-cyan-700 font-bold hover:underline flex items-center gap-1 group text-sm">
              View all tools <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => trackToolUse(tool.name, tool.path.split('/').pop())}
                  className="group bg-white p-6 rounded-[32px] border border-slate-200 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-cyan-50 group-hover:scale-110 transition-all duration-300">
                    <tool.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed flex-1">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-cyan-100 group-hover:text-cyan-700 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-lg mb-4">No tools found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-cyan-600 font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Features/Trust Section */}
        <div className="bg-slate-900 py-20 rounded-[40px] mx-4 mb-20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div>
              <Zap className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                All tools are optimized for performance, providing results instantly without long loading times or server delays.
              </p>
            </div>
            <div>
              <LayoutGrid className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Privacy Focused</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Your data stays in your browser. We don't store your sensitive text, files, or design data on our servers.
              </p>
            </div>
            <div>
              <Share2 className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Always Free</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                VidToolbox is built for creators, by creators. Our goal is to provide high-quality utilities at no cost, forever.
              </p>
            </div>
          </div>
          {/* Abstract backgrounds */}
          <div className="absolute top-0 right-0 w-[500px] h-full bg-cyan-500/10 skew-x-12 translate-x-32 pointer-events-none"></div>
        </div>
      </main>
    </Layout>
    </>
  )
}
