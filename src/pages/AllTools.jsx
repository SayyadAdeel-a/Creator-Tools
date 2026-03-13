import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, 
  Captions, AlignLeft, Undo2, UserCheck, LayoutGrid, FileCode, Braces, 
  Video, Share2, Instagram, Twitter, Zap, BookOpen, TrendingUp, Smartphone, User, 
  Palette, Calculator, ShieldCheck, Layers, Tag, Sun, Percent, Maximize, HardDrive, Ruler, Baby, CalendarRange, Wand2, Timer
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { FavoriteButton } from '../components/FavoriteButton'

const youtubeTools = [
  { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', icon: Wand2, description: 'Viral title formulas' },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', icon: FileText, description: 'Professional video descriptions' },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', icon: Clock, description: 'Create YouTube chapters' },
  { name: 'YouTube Tags', path: '/tools/youtube-tags', icon: Search, description: 'Extract and optimize tags' },
]

const seoTools = [
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash, description: 'Analyze keyword frequency' },
  { name: 'Sentence Counter', path: '/tools/sentence-counter', icon: AlignLeft, description: 'Writing structure stats' },
  { name: 'Readability Score', path: '/tools/readability', icon: BookOpen, description: 'Check content difficulty' },
  { name: 'Title Checker', path: '/tools/title-checker', icon: TrendingUp, description: 'Headline SEO analysis' },
  { name: 'Meta Title', path: '/tools/meta-title', icon: Search, description: 'Google search preview' },
]

const designTools = [
  { name: 'HEX to RGB', path: '/tools/hex-to-rgb', icon: Palette, description: 'HEX to RGB/HSL converter' },
  { name: 'RGB to HEX', path: '/tools/rgb-to-hex', icon: Layers, description: 'RGB values to HEX code' },
  { name: 'Color Palette', path: '/tools/color-palette', icon: Wand2, description: 'Generate brand harmonies' },
  { name: 'Contrast Checker', path: '/tools/contrast-checker', icon: ShieldCheck, description: 'WCAG accessibility test' },
  { name: 'Gradient Gen', path: '/tools/gradient-generator', icon: Layers, description: 'CSS background generator' },
  { name: 'Color Name', path: '/tools/color-name', icon: Tag, description: 'Identify CSS color names' },
  { name: 'Tint & Shade', path: '/tools/tint-shade', icon: Sun, description: 'Lighter/darker color variants' },
]

const calculatorTools = [
  { name: 'Pct Calculator', path: '/tools/percentage-calculator', icon: Percent, description: 'Fast business percentage math' },
  { name: 'Aspect Ratio', path: '/tools/aspect-ratio', icon: Maximize, description: 'Resolution & ratio calculator' },
  { name: 'File Size Conv', path: '/tools/file-size', icon: HardDrive, description: 'Digital storage unit converter' },
  { name: 'Unit Converter', path: '/tools/unit-converter', icon: Ruler, description: 'Length, weight, & temperature' },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: Baby, description: 'Exact age assessment' },
  { name: 'Date Difference', path: '/tools/date-difference', icon: CalendarRange, description: 'Days between two dates' },
  { name: 'Num to Words', path: '/tools/number-to-words', icon: Type, description: 'Formal written digits' },
]

const socialTools = [
  { name: 'Instagram Format', path: '/tools/instagram-formatter', icon: Instagram, description: 'Keep caption line breaks' },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter, description: 'Auto-split long threads' },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser, description: 'Strip icons from text' },
  { name: 'Hashtag Gen', path: '/tools/hashtag-generator', icon: Hash, description: 'Viral grouped hashtags' },
  { name: 'Char Counter', path: '/tools/character-counter', icon: Smartphone, description: 'All-platform post limits' },
  { name: 'Bio Check', path: '/tools/bio-checker', icon: User, description: 'Fix profile bio cut-offs' },
]

const utilityTools = [
  { name: 'JSON Formatter', path: '/tools/json-formatter', icon: Braces, description: 'Beautify and validate JSON' },
  { name: 'Base64 Tool', path: '/tools/base64', icon: FileCode, description: 'Encode or decode string' },
  { name: 'URL Encoder', path: '/tools/url-encoder', icon: Link2, description: 'Encode/decode special characters' },
  { name: 'Random Picker', path: '/tools/random-name-picker', icon: UserCheck, description: 'Select winners from a list' },
]

const categories = [
  { id: 'design', name: 'Design Tools', icon: Palette, tools: designTools },
  { id: 'calculators', name: 'Calculator Tools', icon: Calculator, tools: calculatorTools },
  { id: 'youtube', name: 'YouTube Tools', icon: Video, tools: youtubeTools },
  { id: 'seo', name: 'SEO Tools', icon: TrendingUp, tools: seoTools },
  { id: 'social', name: 'Social Media Tools', icon: Share2, tools: socialTools },
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
            Browse our complete collection of specialized utilities for designers, developers, and creators.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search all 60+ tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-3xl shadow-xl focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-lg"
            />
          </div>
        </div>

        <div className="space-y-24">
          {filteredCategories.map((category) => (
            <div key={category.id} id={category.id} className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                    <category.icon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 font-heading uppercase tracking-tighter">{category.name}</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{category.tools.length} Professional Utilities</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <div key={tool.path} className="group transition-all hover:-translate-y-1 duration-300">
                    <Link
                      to={tool.path}
                      className="block bg-white p-6 rounded-[32px] border border-slate-200 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                          <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                        </div>
                        <FavoriteButton toolName={tool.name} toolSlug={tool.path.split('/').pop()} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
                      <p className="text-[10px] text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">{tool.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
        </div>

        {/* SEO Information Section */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-50 rounded-[40px] p-10 md:p-16">
            <div>
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">Why Use VidToolbox for Your Creative Workflow?</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                As a modern content creator, your time is your most valuable asset. VidToolbox was built to eliminate the friction of jumping between multiple browser tabs to perform simple tasks like <strong>HEX to RGB color conversion</strong>, <strong>YouTube title optimization</strong>, or <strong>Instagram caption formatting</strong>.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our suite of 60+ free online tools is specifically designed for <strong>YouTube SEO</strong> and viral growth. Whether you're generating listicle-style titles using our <strong>YouTube Title Generator</strong>, extracting tags from competitors, or calculating the perfect aspect ratio for your next TikTok, VidToolbox provides the accuracy you need with zero cost.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">A Professional Utility Set for Every Project</h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-2">
                  <Zap className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span><strong>YouTube Growth:</strong> Maximize CTR with our metadata tools and description generators.</span>
                </li>
                <li className="flex gap-2">
                  <Palette className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span><strong>Design Precision:</strong> Ensure accessibility with WCAG contrast checkers and brand-safe color palettes.</span>
                </li>
                <li className="flex gap-2">
                  <Share2 className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span><strong>Social Formats:</strong> Keep your captions clean on Instagram and Twitter with specialized formatters.</span>
                </li>
                <li className="flex gap-2">
                  <Calculator className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span><strong>Business Math:</strong> Calculate profit margins, age differences, and data conversions instantly.</span>
                </li>
              </ul>
              <p className="mt-8 text-xs text-slate-400">
                Privacy is our priority: All processing happens locally in your browser. We never store or upload your sensitive data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
