import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, Twitter, Instagram, Linkedin, Youtube, Music2, CheckCircle2, AlertCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SocialCharacterCounter() {
  const [text, setText] = useState('')

  const charCount = text.length

  const platforms = [
    { name: 'Twitter/X', limit: 280, icon: Twitter, color: 'text-slate-900', bg: 'bg-slate-900' },
    { name: 'Instagram Caption', limit: 2200, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-600' },
    { name: 'Instagram Bio', limit: 150, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-600' },
    { name: 'TikTok Caption', limit: 2200, icon: Music2, color: 'text-slate-900', bg: 'bg-slate-900' },
    { name: 'LinkedIn Post', limit: 3000, icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700' },
    { name: 'YouTube Description', limit: 5000, icon: Youtube, color: 'text-red-600', bg: 'bg-red-600' },
  ]

  const handleTextChange = (e) => {
    setText(e.target.value)
    if (e.target.value.length === 50) trackToolUse('Social Media Character Counter', 'social-character-counter')
  }

  return (
    <>
      <Helmet>
        <title>Social Media Character Counter — Check Limits for All Platforms | VidToolbox</title>
        <meta name="description" content="Check your character count for Twitter, Instagram, TikTok, LinkedIn, and YouTube simultaneously. Instant feedback on platform-specific limits. Free online character counter." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/social-character-counter" />
      </Helmet>

      <ToolPage
        title="Social Media Character Counter"
        icon={Type}
        description="Write once, check everywhere. See how your post fits into all major social media platform limits as you type."
        howToUse={[
          "Type or paste your social media post above",
          "Monitor the progress bars for each platform in real-time",
          "Ensure your content stays green to avoid being cut off or rejected"
        ]}
      >
        <div className="p-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Start writing your post here..."
            className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-8 text-lg"
          />

          <div className="space-y-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                Live Platform Analysis <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Total: {charCount.toLocaleString()} chars</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((p, i) => {
                    const percentage = Math.min(100, (charCount / p.limit) * 100)
                    const over = charCount > p.limit
                    const near = charCount > p.limit * 0.9

                    return (
                        <div key={i} className={`p-4 rounded-xl border ${over ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'} transition-colors`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <p.icon className={`w-4 h-4 ${p.color}`} />
                                    <span className="text-sm font-bold text-slate-700">{p.name}</span>
                                </div>
                                <div className={`text-xs font-bold ${over ? 'text-red-500' : near ? 'text-amber-500' : 'text-slate-400'}`}>
                                    {charCount.toLocaleString()} / {p.limit.toLocaleString()}
                                </div>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div 
                                    className={`h-full transition-all duration-300 ${over ? 'bg-red-500' : near ? 'bg-amber-500' : p.bg}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {over ? (
                                    <>
                                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Too Long by {charCount - p.limit} chars</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Fits Perfectly ({p.limit - charCount} left)</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
