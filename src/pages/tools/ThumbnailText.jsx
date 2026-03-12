import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, Info, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ThumbnailText() {
  const [text, setText] = useState('')

  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  
  const charLimit = 30
  const wordLimitLow = 3
  const wordLimitHigh = 5

  const getStatus = () => {
    if (!text.trim()) return { label: 'Empty', color: 'text-slate-400', bg: 'bg-slate-100', icon: Info }
    if (charCount > charLimit || wordCount > wordLimitHigh) return { label: 'Too Long', color: 'text-red-500', bg: 'bg-red-50 border-red-200', icon: AlertCircle }
    if (wordCount < wordLimitLow) return { label: 'Too Short', color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200', icon: Info }
    return { label: 'Good', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 }
  }

  const status = getStatus()

  return (
    <>
      <Helmet>
        <title>Thumbnail Text Checker — High CTR Video Creator Tool | Tenreq</title>
        <meta name="description" content="Validate your thumbnail headline for readability and Click-Through Rate. Check word count and character length limits to ensure your message is clear and never crowded. Free online YouTube tool." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/thumbnail-text" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Thumbnail Text Checker",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/thumbnail-text",
          "description": "Ensure your video thumbnail text is optimized for high CTR with word and character count analysis."
        })}</script>
      </Helmet>

      <ToolPage
        title="Thumbnail Text Checker"
        icon={Type}
        description="Optimize your thumbnail text for mobile and desktop readability. Ensure your message is punchy enough to win the click."
        howToUse={[
          "Type in your proposed thumbnail headline above",
          "Monitor the character and word counts in real-time",
          "Follow the visual feedback and tips below to maximize CTR"
        ]}
        faq={[
            { question: "Why is word count limited to 5?", answer: "Thumbnails are often viewed on small phone screens where anything more than 5 words becomes difficult to read at a glance." },
            { question: "What are 'power words'?", answer: "Power words like 'SECRET', 'WARNING', or 'MASTERED' trigger emotion and curiosity, leading to higher click-through rates." },
            { question: "Should I use numbers in thumbnails?", answer: "Yes! Specific numbers like '2025', '100%', or '$10,000' add credibility and appeal more than vague text." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10">
            <label className="block text-sm font-bold text-slate-700 mb-2">Proposed Thumbnail Heading</label>
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); if (e.target.value.length === 5) trackToolUse('Thumbnail Text Checker', 'thumbnail-text'); }}
              placeholder="e.g., HOW TO BAKE CAKE, THE SECRET REVEALED"
              className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-2xl font-bold uppercase tracking-wide shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center group hover:border-cyan-200 transition-all">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-100 transition-colors">
                    <Type className="w-5 h-5 text-cyan-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{charCount}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Char Count</p>
                <div className="mt-2 text-[10px] font-bold text-slate-300">Target: Under 30</div>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center group hover:border-cyan-200 transition-all">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-100 transition-colors">
                    <Sparkles className="w-5 h-5 text-cyan-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{wordCount}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Word Count</p>
                <div className="mt-2 text-[10px] font-bold text-slate-300">Target: 3–5 Words</div>
            </div>
            <div className={`p-6 border rounded-2xl shadow-sm text-center flex flex-col items-center justify-center transition-all ${status.bg}`}>
                <status.icon className={`w-10 h-10 mb-2 ${status.color}`} />
                <p className={`text-2xl font-bold ${status.color}`}>{status.label}</p>
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Current Status</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-16 h-16" />
              </div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-400" /> Pro Thumbnail Tips
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {[
                  { tip: "Short thumbnails get more clicks", sub: "Viewers scroll fast. Keep it punchy." },
                  { tip: "Use high-contrast power words", sub: "SECRET, DANGER, MASTER, FREE." },
                  { tip: "Leverage numbers & dates", sub: "2025, 100%, 0 to 10k." },
                  { tip: "Ensure mobile readability", sub: "Test your colors on small screens." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                            <span className="text-cyan-400 text-xs font-bold">{i+1}</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm mb-1">{item.tip}</p>
                            <p className="text-xs text-slate-400">{item.sub}</p>
                        </div>
                    </div>
                ))}
              </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
