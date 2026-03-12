import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, Info, CheckCircle2, AlertCircle, Globe, MoreHorizontal } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function MetaTitleChecker() {
  const [title, setTitle] = useState('')

  const charCount = title.length
  
  const getStatus = () => {
    if (charCount >= 50 && charCount <= 60) return { label: 'Ideal', color: 'text-emerald-500', bar: 'bg-emerald-500', icon: CheckCircle2 }
    if ((charCount >= 40 && charCount < 50) || (charCount > 60 && charCount <= 65)) return { label: 'Acceptable', color: 'text-amber-500', bar: 'bg-amber-500', icon: Info }
    return { label: 'Poor', color: 'text-red-500', bar: 'bg-red-500', icon: AlertCircle }
  }

  const status = getStatus()
  const progressRatio = Math.min(100, (charCount / 65) * 100)

  return (
    <>
      <Helmet>
        <title>Google Meta Title Length Checker — SEO Preview Tool | VidToolbox</title>
        <meta name="description" content="Validate your meta titles for Google Search. Track character counts with a real-time progress bar and preview how your headline looks in the SERPs before publishing." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/meta-title" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Meta Title Length Checker",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/meta-title",
          "description": "Ensure your meta titles are optimized for Google search results with character count thresholds and a live SERP preview."
        })}</script>
      </Helmet>

      <ToolPage
        title="Meta Title Length Checker"
        icon={Search}
        description="Verify your SEO title's character count to prevent truncation in Google search results. Live preview of your search snippet included."
        howToUse={[
          "Type or paste your SEO meta title into the input field",
          "Monitor the real-time character count and colored progress bar",
          "Follow the 'Ideal' range (50-60 chars) for maximum Google visibility"
        ]}
        faq={[
            { question: "Why is 60 characters the limit?", answer: "Google typically truncates titles that exceed 600 pixels in width, which roughly translates to 60-65 characters depending on the letters used." },
            { question: "What is a 'truncation'?", answer: "It's when Google cuts off the end of your title and replaces it with three dots (...). This can lower your click-through rate if the message is incomplete." },
            { question: "Should I include my brand name?", answer: "Yes! A common best practice is 'Page Title | Brand Name'. Just ensure the entire string stays within the recommended character limits." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10">
            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">Meta Title Input</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.length === 20) trackToolUse('Meta Title Checker', 'meta-title');
              }}
              placeholder="e.g., Best SEO Tools for 2025 | VidToolbox"
              className="w-full px-6 py-4 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-xl font-bold text-slate-800 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                             <status.icon className={`w-5 h-5 ${status.color}`} />
                             <span className={`text-sm font-bold uppercase tracking-widest ${status.color}`}>{status.label}</span>
                        </div>
                        <div className="text-xl font-mono font-bold text-slate-900">{charCount} / 65</div>
                    </div>
                    <div className="h-4 bg-white border border-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div 
                            className={`h-full transition-all duration-500 ${status.bar}`} 
                            style={{ width: `${progressRatio}%` }}
                        ></div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <div>Under 40</div>
                        <div className="text-center font-bold text-emerald-500">50-60 Ideal</div>
                        <div className="text-right">Over 65</div>
                    </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><AlertCircle className="w-24 h-24" /></div>
                    <h3 className="font-bold text-slate-900 bg-white inline-block px-3 py-1 rounded-lg text-xs mb-6 relative z-10">SEO Guidelines</h3>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                            <p className="text-sm font-medium text-slate-100 italic">"Ensure your primary keyword is at the very beginning of the meta title for better search ranking."</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                            <p className="text-sm font-medium text-slate-100 italic">"Avoid all caps unless it's a brand acronym. It can look spammy to searchers."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 font-heading">
                    <Globe className="w-5 h-5 text-cyan-500" /> Google Search Preview
                </h3>
                <div className="bg-white p-8 border border-slate-200 rounded-3xl shadow-xl space-y-4 hover:border-cyan-100 transition-all cursor-default">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                             <Globe className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <div className="text-xs">
                            <p className="text-slate-900 font-medium">VidToolbox</p>
                            <p className="text-slate-500 truncate max-w-[200px]">https://vidtoolbox.qzz.io › tools › meta-title</p>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-slate-400 ml-auto" />
                    </div>
                    <div>
                        <h4 className="text-[20px] text-[#1a0dab] font-medium leading-tight mb-2 hover:underline cursor-pointer break-words">
                            {title || 'Your SEO Title Preview Will Appear Here...'}
                            {charCount > 65 && '...'}
                        </h4>
                        <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                             Calculate your content's meta title length and see its performance in real-time. This is how your page title looks in Google search results. Stay within 50-60 characters for best results.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
