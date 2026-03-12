import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Copy, Check, Info, Trash2, Smartphone, Monitor, LayoutGrid, Twitter, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', limit: 280, icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50', bar: 'bg-sky-500' },
  { id: 'instagram', name: 'Instagram', limit: 2200, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', bar: 'bg-pink-500' },
  { id: 'linkedin', name: 'LinkedIn', limit: 3000, icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50', bar: 'bg-blue-700' },
  { id: 'tiktok', name: 'TikTok', limit: 2200, icon: Smartphone, color: 'text-slate-900', bg: 'bg-slate-100', bar: 'bg-slate-900' },
  { id: 'youtube', name: 'YouTube', limit: 5000, icon: Youtube, color: 'text-red-500', bg: 'bg-red-50', bar: 'bg-red-500' },
  { id: 'facebook', name: 'Facebook', limit: 63206, icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-600' }
]

export function CharacterCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const charCount = text.length

  const handleCopy = () => {
    if (!text.trim()) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Social Media Character Counter', 'character-counter')
  }

  return (
    <>
      <Helmet>
        <title>Social Media Character Counter — Post Limit Accuracy | VidToolbox</title>
        <meta name="description" content="Check character counts for all social media platforms simultaneously. Stay under limits for Twitter, Instagram, LinkedIn, TikTok, and YouTube with a real-time progress bar. Free SEO content tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/character-counter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Social Media Character Counter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/character-counter",
          "description": "Simultaneous character count analysis for all major social media platforms with limit-aware progress indicators."
        })}</script>
      </Helmet>

      <ToolPage
        title="Social Media Character Counter"
        icon={Hash}
        description="Write once, optimize for everywhere. Track your character counts across all major social media platforms in real-time to avoid cut-off headlines and posts."
        howToUse={[
          "Paste or type your post content into the central editor",
          "Monitor the platform-specific progress bars at the top for each limit",
          "The bars will turn red if you exceed a platform's maximum allowed characters"
        ]}
        faq={[
            { question: "Why should I track characters?", answer: "Every platform has hard limits. Over-limit content is either cut off (Instagram/TikTok bios) or blocked entirely (Twitter/Facebook posts), which can ruin your call-to-action." },
            { question: "Are emojis counted differently?", answer: "Technically, emojis occupy more 'bytes', but most modern platforms (and our tool) count them as single characters, matching the user experience." },
            { question: "Is this tool mobile-friendly?", answer: "Yes! Use it on any device to prepare your social posts before you hit publish in the native apps." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-500" /> Content Editor
            </h3>
            <div className="relative group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start writing your social post content here..."
                    className="w-full h-80 p-8 border border-slate-200 rounded-[40px] focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-xl font-medium tracking-tight shadow-2xl transition-all leading-relaxed resize-none scrollbar-hide text-slate-700"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none opacity-5 group-focus-within:opacity-0 transition-opacity">
                    <Monitor className="w-32 h-32" />
                </div>
                <div className="absolute top-8 right-8 flex items-center gap-3">
                    <button onClick={() => setText('')} className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 transition-colors rounded-xl border border-slate-100 shadow-sm" title="Clear all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleCopy} 
                        disabled={!text}
                        className={`p-2.5 rounded-xl transition-all shadow-xl border ${
                            copied ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-900 text-white hover:bg-cyan-600 disabled:opacity-20'
                        }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
            {PLATFORMS.map((platform) => {
                const overLimit = charCount > platform.limit
                const progressRatio = Math.min(100, (charCount / platform.limit) * 100)
                
                return (
                    <div key={platform.id} className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-cyan-400 transition-all duration-300 group shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl transition-colors ${platform.bg}`}>
                                    <platform.icon className={`w-4 h-4 ${platform.color}`} />
                                </div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 font-heading">{platform.name}</h4>
                            </div>
                            <div className={`text-xs font-black font-mono transition-colors ${overLimit ? 'text-red-500' : 'text-slate-400'}`}>
                                {charCount.toLocaleString()} / {platform.limit.toLocaleString()}
                            </div>
                        </div>
                        
                        <div className="h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden shadow-inner mb-2">
                             <div 
                                className={`h-full transition-all duration-500 ease-out ${overLimit ? 'bg-red-500' : platform.bar}`} 
                                style={{ width: `${progressRatio}%` }}
                             ></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase tracking-tighter ${overLimit ? 'text-red-600' : 'text-slate-400'}`}>
                                {overLimit ? 'Limit Exceeded' : 'Under Limit'}
                            </span>
                            {overLimit && (
                                <div className="text-[10px] font-black text-red-500 animate-pulse">-{charCount - platform.limit} OVER</div>
                            )}
                        </div>
                    </div>
                )
            })}
          </div>
        </div>
      </ToolPage>
    </>
  )
}
