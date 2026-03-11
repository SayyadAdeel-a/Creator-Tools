import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, 
  Captions, AlignLeft, Undo2, UserCheck, LayoutGrid, FileCode, Braces, 
  Video, Share2, Instagram, Twitter, Zap, BookOpen, TrendingUp, Smartphone, User, Wand2, Timer
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { FavoriteButton } from '../components/FavoriteButton'

const youtubeTools = [
  { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', icon: Wand2, description: 'Viral title formulas' },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', icon: FileText, description: 'Professional video descriptions' },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', icon: Clock, description: 'Create YouTube chapters' },
  { name: 'YouTube Tags', path: '/tools/youtube-tags', icon: Search, description: 'Extract and optimize tags' },
  { name: 'Script Outline', path: '/tools/script-outline', icon: List, description: 'Structure your video content' },
  { name: 'Thumbnail Text', path: '/tools/thumbnail-text', icon: Type, description: 'Optimize thumbnail readability' },
  { name: 'Duration Calculator', path: '/tools/duration-calculator', icon: Timer, description: 'Sum up your video clips' },
]

const seoTools = [
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash, description: 'Analyze keyword frequency' },
  { name: 'Sentence Counter', path: '/tools/sentence-counter', icon: AlignLeft, description: 'Writing structure stats' },
  { name: 'Readability Score', path: '/tools/readability', icon: BookOpen, description: 'Check content difficulty' },
  { name: 'Title Checker', path: '/tools/title-checker', icon: TrendingUp, description: 'Headline SEO analysis' },
  { name: 'Meta Title', path: '/tools/meta-title', icon: Search, description: 'Google search preview' },
  { name: 'Duplicate Lines', path: '/tools/duplicate-lines', icon: Eraser, description: 'Clean up repeated lines' },
  { name: 'Text to Bullets', path: '/tools/text-to-bullets', icon: List, description: 'Convert text to list formats' },
]

const socialTools = [
  { name: 'Instagram Formatter', path: '/tools/instagram-formatter', icon: Instagram, description: 'Keep caption line breaks' },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter, description: 'Auto-split long threads' },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser, description: 'Strip icons from text' },
  { name: 'Hashtag Generator', path: '/tools/hashtag-generator', icon: Hash, description: 'Viral grouped hashtags' },
  { name: 'Character Counter', path: '/tools/character-counter', icon: Smartphone, description: 'All-platform post limits' },
  { name: 'Bio Length Check', path: '/tools/bio-checker', icon: User, description: 'Fix profile bio cut-offs' },
]

const subtitleTools = [
  { name: 'SRT to Text', path: '/tools/srt-to-text', icon: Captions, description: 'Extract text from subtitles' },
  { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', icon: Eraser, description: 'Fix timing and formatting' },
  { name: 'Subtitle Counter', path: '/tools/subtitle-counter', icon: List, description: 'Count lines and timing' },
  { name: 'Subtitle Merge', path: '/tools/subtitle-merge', icon: Merge, description: 'Combine multiple SRT files' },
  { name: 'Subtitle Split', path: '/tools/subtitle-split', icon: Split, description: 'Split large subtitle files' },
]

const utilityTools = [
  { name: 'JSON Formatter', path: '/tools/json-formatter', icon: Braces, description: 'Beautify and validate JSON' },
  { name: 'Base64 Tool', path: '/tools/base64', icon: FileCode, description: 'Encode or decode string' },
  { name: 'URL Encoder', path: '/tools/url-encoder', icon: Link2, description: 'Encode/decode special characters' },
  { name: 'Random Picker', path: '/tools/random-name-picker', icon: UserCheck, description: 'Select winners from a list' },
  { name: 'Team Generator', path: '/tools/random-team-generator', icon: LayoutGrid, description: 'Split group into teams' },
]

const categories = [
  { id: 'youtube', name: 'YouTube Tools', icon: Video, tools: youtubeTools },
  { id: 'seo', name: 'SEO Tools', icon: TrendingUp, tools: seoTools },
  { id: 'social', name: 'Social Media Tools', icon: Share2, tools: socialTools },
  { id: 'subtitles', name: 'Subtitle Tools', icon: Captions, tools: subtitleTools },
  { id: 'utilities', name: 'Utility Tools', icon: LayoutGrid, tools: utilityTools },
]

export function AllTools() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => {
    return categories.map(category => ({
      ...category,
      tools: category.tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.tools.length > 0)
  }, [searchQuery])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6">Directory of All Tools</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Browse our complete collection of specialized utilities for video creators, SEOs, and social media managers.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search all tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-20">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id}>
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <category.icon className="w-6 h-6 text-cyan-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-heading">{category.name}</h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg ml-2">{category.tools.length}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => (
                  <div key={tool.path} className="group transition-all hover:-translate-y-1 duration-300">
                    <Link
                      to={tool.path}
                      className="block bg-white p-6 rounded-2xl border border-slate-200 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/5 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                          <tool.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                        </div>
                        <FavoriteButton toolName={tool.name} toolSlug={tool.path.split('/').pop()} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 text-lg">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
