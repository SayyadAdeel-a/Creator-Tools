import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, Zap, Star, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2 } from 'lucide-react'
import { Layout } from '../components/Layout'

const tools = [
  { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert subtitle files to plain text', icon: FileText, tags: ['subtitle', 'srt', 'convert'] },
  { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', description: 'Remove timestamps from subtitles', icon: Eraser, tags: ['subtitle', 'timestamp', 'clean'] },
  { name: 'Subtitle Counter', path: '/tools/subtitle-counter', description: 'Count lines and characters in subtitles', icon: List, tags: ['subtitle', 'count', 'characters'] },
  { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Combine multiple SRT files into one', icon: Merge, tags: ['subtitle', 'merge', 'combine'] },
  { name: 'Subtitle Split', path: '/tools/subtitle-split', description: 'Split SRT files by line or timestamp', icon: Split, tags: ['subtitle', 'split', 'divide'] },
  { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count words for your video scripts', icon: Type, tags: ['youtube', 'script', 'words'] },
  { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate estimated reading time', icon: Clock, tags: ['reading', 'time', 'words'] },
  { name: 'Title Case', path: '/tools/title-case', description: 'Convert text to title case', icon: Type, tags: ['title', 'case', 'capitalize'] },
  { name: 'Slug Generator', path: '/tools/slug-generator', description: 'Create URL-friendly slugs', icon: Link2, tags: ['slug', 'url', 'seo'] },
  { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count and extract hashtags', icon: Hash, tags: ['hashtag', 'social', 'instagram'] },
]

export function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Layout>
      <Helmet>
        <title>VidToolbox — Free Online Tools for Creators</title>
        <meta name="description" content="A comprehensive collection of free online tools for video creators. Convert subtitles, count words, generate slugs, and more." />
      </Helmet>
      
      <section className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <Zap className="w-4 h-4" />
            <span>Free Creator Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 mb-6 animate-fade-in-up delay-100">
            Vid<span className="text-cyan-500">Toolbox</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">
            A comprehensive collection of free online tools for video creators. 
            Convert, encode, decode, and transform — all in your browser.
          </p>
          
          <div className="relative max-w-xl mx-auto animate-fade-in-up delay-300">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-12 pr-24 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 text-sm">
              <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">⌘</kbd>
              <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">K</kbd>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Zap className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xl font-heading font-semibold text-slate-900">Popular Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool, index) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 group opacity-0 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <button 
                    className="text-slate-300 hover:text-amber-400 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{tool.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 border border-slate-200 rounded-full text-xs text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No tools found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
