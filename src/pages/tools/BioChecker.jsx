import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { User, Copy, Check, Info, Trash2, Smartphone, Monitor, LayoutGrid, Twitter, Instagram, Linkedin, Youtube, CheckCircle2, AlertCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X Bio', limit: 160, icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50', bar: 'bg-sky-500' },
  { id: 'instagram', name: 'Instagram Bio', limit: 150, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50', bar: 'bg-pink-500' },
  { id: 'tiktok', name: 'TikTok Bio', limit: 80, icon: Smartphone, color: 'text-slate-900', bg: 'bg-slate-100', bar: 'bg-slate-900' },
  { id: 'youtube', name: 'YouTube Channel', limit: 1000, icon: Youtube, color: 'text-red-500', bg: 'bg-red-50', bar: 'bg-red-500' },
  { id: 'linkedin', name: 'LinkedIn Summary', limit: 2600, icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-50', bar: 'bg-blue-700' }
]

export function BioChecker() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const charCount = text.length

  const handleCopy = () => {
    if (!text.trim()) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Social Bio Length Checker', 'bio-checker')
  }

  return (
    <>
      <Helmet>
        <title>Social Bio Length Checker — Optimize Your Profile | VidToolbox</title>
        <meta name="description" content="Check bio character limits for Instagram, TikTok, Twitter, and YouTube simultaneously. Ensure your profile description is perfectly optimized and never cut off. Free social profile tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/bio-checker" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Social Bio Length Checker",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/bio-checker",
          "description": "Simultaneous bio limit analysis for professional profiles across Instagram, Twitter, and TikTok."
        })}</script>
      </Helmet>

      <ToolPage
        title="Social Bio Length Checker"
        icon={User}
        description="Craft the perfect first impression. Track your character limits for profile bios and summaries across all major social media platforms at once."
        howToUse={[
          "Paste or type your bio/profile description into the editor",
          "Check the Good/Over Limit status for each platform at the top",
          "Tweak your text to ensure it's compatible with your most important channels"
        ]}
        faq={[
            { question: "Why do bio limits matter?", answer: "A profile bio is the first thing a potential follower sees. If it's over the limit, it's either cut off or cannot be saved; maximizing every character is essential for branding." },
            { question: "Is the YouTube limit for channel names or descriptions?", answer: "This tool specifically tracks the **YouTube Channel Description** (1,000 characters). For channel names, most platforms use a very strict 15-50 character limit." },
            { question: "What is the 'Good' status threshold?", answer: "Our tool shows 'Good' if you are at or under the platform's character limit. If you go even one character over, the status will flip to 'Over Limit' with a warning." }
        ]}
      >
        <div className="p-6">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-cyan-500" /> Bio Editor
            </h3>
            <div className="relative group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your bio or profile summary here..."
                    className="w-full h-80 p-10 border border-slate-200 rounded-[60px] focus:ring-8 focus:ring-cyan-500/5 focus:border-cyan-500 outline-none text-xl font-medium tracking-tight shadow-2xl transition-all leading-relaxed resize-none scrollbar-hide text-slate-700"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none opacity-5 group-focus-within:opacity-0 transition-opacity">
                    <LayoutGrid className="w-48 h-48" />
                </div>
                <div className="absolute top-12 right-12 flex items-center gap-3">
                    <button onClick={() => setText('')} className="p-3.5 bg-slate-50 text-slate-400 hover:text-red-500 transition-colors rounded-2xl border border-slate-100 shadow-sm" title="Clear all">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleCopy} 
                        disabled={!text}
                        className={`p-3.5 rounded-2xl transition-all shadow-xl border ${
                            copied ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-900 text-white hover:bg-cyan-600 disabled:opacity-20'
                        }`}
                    >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-12 duration-1000">
            {PLATFORMS.map((platform) => {
                const overLimit = charCount > platform.limit
                
                return (
                    <div key={platform.id} className="bg-white border border-slate-200 rounded-[32px] p-8 hover:border-cyan-400 transition-all duration-300 group shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-2xl transition-colors ${platform.bg}`}>
                                    <platform.icon className={`w-5 h-5 ${platform.color}`} />
                                </div>
                                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 font-heading">{platform.name}</h4>
                            </div>
                            <div className={`text-xs font-black font-mono transition-colors ${overLimit ? 'text-red-500' : 'text-slate-400'}`}>
                                {charCount.toLocaleString()} / {platform.limit.toLocaleString()}
                            </div>
                        </div>

                        <div className={`flex flex-col items-center justify-center py-6 rounded-3xl border transition-all ${overLimit ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100 group-hover:bg-cyan-50 group-hover:border-cyan-100'}`}>
                             {overLimit ? <AlertCircle className="w-8 h-8 text-red-500 mb-2" /> : <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />}
                             <p className={`font-black uppercase tracking-widest text-xs ${overLimit ? 'text-red-600' : 'text-emerald-700'}`}>
                                {overLimit ? 'Over Limit' : 'Good to Go'}
                             </p>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status Analysis</span>
                             {overLimit && (
                                <div className="text-[10px] font-black text-red-500 animate-bounce">Cut-off -{charCount - platform.limit}</div>
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
