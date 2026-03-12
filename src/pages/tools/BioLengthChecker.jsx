import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { User, Twitter, Instagram, Youtube, Music2, Linkedin, CheckCircle2, XCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function BioLengthChecker() {
  const [bio, setBio] = useState('')

  const charCount = bio.length

  const platforms = [
    { name: 'Twitter/X Bio', limit: 160, icon: Twitter, color: 'text-slate-900', bg: 'bg-slate-900' },
    { name: 'Instagram Bio', limit: 150, icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-600' },
    { name: 'YouTube Channel Description', limit: 1000, icon: Youtube, color: 'text-red-600', bg: 'bg-red-600' },
    { name: 'TikTok Bio', limit: 80, icon: Music2, color: 'text-slate-900', bg: 'bg-slate-900' },
    { name: 'LinkedIn Summary', limit: 2600, icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700' },
  ]

  const handleBioChange = (e) => {
    setBio(e.target.value)
    if (e.target.value.length === 20) trackToolUse('Bio Length Checker', 'bio-length-checker')
  }

  return (
    <>
      <Helmet>
        <title>Bio Length Checker — Professional Social Media Bios | VidToolbox</title>
        <meta name="description" content="Validate your social media bio against Twitter, Instagram, TikTok, and YouTube limits. Ensure your message is clear and never cut off. Free online bio tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/bio-length-checker" />
      </Helmet>

      <ToolPage
        title="Bio Length Checker"
        icon={User}
        description="Craft the perfect social media bio. We'll check your character count against all major platform limits to ensure your first impression is never cut short."
        howToUse={[
          "Draft your professional bio in the input area above",
          "Review platform-specific badges to see where your bio fits",
          "Shorten or expand your content to maximize each platform's limit"
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Bio / Summary</label>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="e.g., Content Creator | Tech Enthusiast | Helping you master YouTube through free tools and tutorials..."
              className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-lg leading-relaxed"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                Platform Complicance <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{charCount} total chars</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
                {platforms.map((p, i) => {
                    const over = charCount > p.limit
                    return (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100`}>
                                    <p.icon className={`w-4 h-4 ${p.color}`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800">{p.name}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Limit: {p.limit.toLocaleString()} chars</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="hidden md:block w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${over ? 'bg-red-500' : p.bg}`}
                                        style={{ width: `${Math.min(100, (charCount/p.limit)*100)}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                                    {over ? (
                                        <>
                                            <span className="text-[10px] font-bold text-red-500 uppercase">Too Long</span>
                                            <XCircle className="w-4 h-4 text-red-500" />
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase">Fits</span>
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </>
                                    )}
                                </div>
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
