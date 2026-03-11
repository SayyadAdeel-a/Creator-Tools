import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Search, Zap, Star, FileText, Type, Hash, Clock, Split, Merge, Eraser, 
  List, Link2, AlignLeft, Undo2, UserCheck, LayoutGrid, FileCode, Braces,
  BookOpen, ArrowRight
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { FavoriteButton } from '../components/FavoriteButton'
import { supabase } from '../lib/supabase'

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
  { name: 'Meta Description', path: '/tools/meta-description-checker', description: 'Check meta description length', icon: Type, tags: ['seo', 'meta', 'google'] },
  { name: 'Keyword Density', path: '/tools/keyword-density', description: 'Analyze keyword frequency', icon: Hash, tags: ['seo', 'keyword', 'density'] },
  { name: 'Text Compare', path: '/tools/text-compare', description: 'Compare text and find diffs', icon: Split, tags: ['text', 'diff', 'compare'] },
  { name: 'Remove Extra Spaces', path: '/tools/remove-extra-spaces', description: 'Clean up text spacing', icon: AlignLeft, tags: ['text', 'clean', 'format'] },
  { name: 'Text Reverser', path: '/tools/text-reverser', description: 'Reverse letters or words', icon: Undo2, tags: ['text', 'fun', 'reverse'] },
  { name: 'Random Name Picker', path: '/tools/random-name-picker', description: 'Pick a winner from a list', icon: UserCheck, tags: ['random', 'picker', 'winner'] },
  { name: 'Team Generator', path: '/tools/random-team-generator', description: 'Split names into random teams', icon: LayoutGrid, tags: ['random', 'teams', 'groups'] },
  { name: 'URL Encoder', path: '/tools/url-encoder', description: 'Encode or decode URLs', icon: Link2, tags: ['url', 'developer', 'encode'] },
  { name: 'Base64', path: '/tools/base64', description: 'Encode or decode Base64', icon: FileCode, tags: ['base64', 'developer', 'decode'] },
  { name: 'JSON Formatter', path: '/tools/json-formatter', description: 'Format or minify JSON', icon: Braces, tags: ['json', 'developer', 'format'] },
  
  // YouTube Tools
  { name: 'YouTube Title Generator', path: '/tools/youtube-title-generator', description: 'Generate viral title ideas', icon: Zap, tags: ['youtube', 'video', 'ideas'] },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', description: 'Pro video description formatting', icon: FileText, tags: ['youtube', 'seo', 'format'] },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', description: 'Create YouTube chapters quickly', icon: Clock, tags: ['youtube', 'timestamps', 'chapters'] },
  { name: 'YouTube Tags Extractor', path: '/tools/youtube-tags-extractor', description: 'Extract keywords from text', icon: Hash, tags: ['youtube', 'seo', 'tags'] },
  { name: 'Script Outline', path: '/tools/script-outline-generator', icon: List, description: 'Structure your next video', tags: ['video', 'planning', 'script'] },
  { name: 'Thumbnail Checker', path: '/tools/thumbnail-text-checker', icon: Type, description: 'Optimize thumbnail text', tags: ['youtube', 'design', 'thumbnail'] },
  { name: 'Video Duration', path: '/tools/video-duration-calculator', icon: Clock, description: 'Sum up your video clips', tags: ['video', 'calculator', 'timer'] },
  
  // Text & SEO Tools
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash, description: 'Find overused words', tags: ['seo', 'text', 'analysis'] },
  { name: 'Sentence Counter', path: '/tools/sentence-counter', icon: AlignLeft, description: 'Analyze sentence structure', tags: ['writing', 'stats', 'text'] },
  { name: 'Readability Score', path: '/tools/readability-score', icon: BookOpen, description: 'Check content difficulty', tags: ['seo', 'writing', 'readability'] },
  { name: 'Article Title Checker', path: '/tools/title-checker', icon: Type, description: 'Headline SEO analysis', tags: ['seo', 'copywriting', 'title'] },
  { name: 'Meta Title Checker', path: '/tools/meta-title-checker', icon: Search, description: 'Google search preview', tags: ['seo', 'meta', 'google'] },
  { name: 'Duplicate Remover', path: '/tools/duplicate-line-remover', icon: Eraser, description: 'Strip duplicate lines', tags: ['text', 'cleanup', 'list'] },
  { name: 'Text to Bullets', path: '/tools/text-to-bullets', icon: List, description: 'Convert text to lists', tags: ['format', 'writing', 'list'] },
  
  // Social Tools
  { name: 'Instagram Formatter', path: '/tools/instagram-formatter', icon: Instagram, description: 'Preserve caption spacing', tags: ['instagram', 'social', 'format'] },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Split, description: 'Split text into tweets', tags: ['twitter', 'x', 'social'] },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser, description: 'Strip emojis from text', tags: ['text', 'clean', 'format'] },
  { name: 'Hashtag Generator', path: '/tools/hashtag-generator', icon: Hash, description: 'Find viral hashtags', tags: ['social', 'seo', 'tags'] },
  { name: 'Social Character Count', path: '/tools/social-character-counter', icon: Type, description: 'Check limits for all social media', tags: ['social', 'stats', 'limits'] },
  { name: 'Bio Length Checker', path: '/tools/bio-length-checker', icon: UserCheck, description: 'Optimize your social bios', tags: ['social', 'bio', 'profile'] },
]

export function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [favoriteSlugs, setFavoriteSlugs] = useState([])

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      if (data.session?.user) fetchFavorites(data.session.user.id)
    }
    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchFavorites(session.user.id)
      else setFavoriteSlugs([])
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleUpdate = () => {
      if (user) fetchFavorites(user.id)
    }
    window.addEventListener('favoritesUpdated', handleUpdate)
    return () => window.removeEventListener('favoritesUpdated', handleUpdate)
  }, [user])

  const fetchFavorites = async (userId) => {
    const { data } = await supabase
      .from('user_favorites')
      .select('tool_slug')
      .eq('user_id', userId)
    
    if (data) setFavoriteSlugs(data.map(f => f.tool_slug))
  }
  
  const favoriteTools = tools.filter(tool => 
    favoriteSlugs.includes(tool.path.split('/').pop())
  )

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Layout>
      <Helmet>
        <title>Free Online Tools for Content Creators | VidToolbox</title>
        <meta name="description" content="Free online tools for content creators. 40+ browser-based tools for subtitle editing, SEO, social media, and more. No sign-up required." />
      </Helmet>
      
      <section className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Over 40 Free Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 mb-6">
            Vid<span className="text-cyan-500">Toolbox</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto">
            Professional browser-based tools to boost your content creation. No downloads, no accounts, just pure productivity.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or browser categories below..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base"
            />
          </div>
        </div>
      </section>

      {user && favoriteTools.length > 0 && !searchQuery && (
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-xl font-heading font-semibold text-slate-900">Your Favorites</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favoriteTools.map((tool) => (
                <div key={`fav-${tool.path}`} className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative">
                    <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <tool.icon className="w-5 h-5 text-amber-500" />
                        </div>
                        <FavoriteButton toolSlug={tool.path.split('/').pop()} className="w-9 h-9" />
                    </div>
                    <Link to={tool.path} className="block">
                        <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1">{tool.name}</h3>
                        <p className="text-slate-500 text-sm">{tool.description}</p>
                    </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Zap className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xl font-heading font-semibold text-slate-900">Featured Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <div key={tool.path} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 group relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <FavoriteButton toolSlug={tool.path.split('/').pop()} className="w-9 h-9" />
                </div>
                
                <Link to={tool.path} className="block">
                    <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                    {tool.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">{tool.description}</p>
                </Link>
                
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 border border-slate-200 rounded-full text-xs text-slate-500">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>No tools found matching your search.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to="/tools" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl">
                View All 40+ Tools <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
