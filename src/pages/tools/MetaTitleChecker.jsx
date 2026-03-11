import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, CheckCircle, AlertCircle, XCircle, Search } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function MetaTitleChecker() {
  const [title, setTitle] = useState('')

  const charCount = title.length

  const getStatus = () => {
    if (charCount === 0) return { label: "Empty", color: "text-slate-400", bg: "bg-slate-200", icon: AlertCircle }
    if (charCount <= 60) return { label: "Perfect Length", color: "text-emerald-600", bg: "bg-emerald-500", icon: CheckCircle }
    if (charCount <= 65) return { label: "Slightly Long", color: "text-amber-600", bg: "bg-amber-500", icon: AlertCircle }
    return { label: "Too Long", color: "text-red-600", bg: "bg-red-500", icon: XCircle }
  }

  const status = getStatus()

  if (charCount === 20) trackToolUse('Meta Title Length Checker', 'meta-title-checker')

  return (
    <>
      <Helmet>
        <title>Meta Title Length Checker — SEO Google Preview | VidToolbox</title>
        <meta name="description" content="Check your SEO meta title length and see a preview of how it will look in Google search results. Ensure your titles don't get cut off. Free online SEO tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/meta-title-checker" />
      </Helmet>

      <ToolPage
        title="Meta Title Length Checker"
        icon={Type}
        description="Optimize your SEO titles for Google. We help you stay within the 60-character limit and provide a live preview of your search result appearace."
        howToUse={[
          "Enter your SEO meta title above",
          "Ensure the progress bar stays green (under 60 characters)",
          "Check the Google Preview below to see if the title fits"
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Meta Title</label>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${status.color}`}>
                <status.icon className="w-3.5 h-3.5" /> {status.label} ({charCount}/60)
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Best Free Online Video Tools for YouTubers | VidToolbox"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-12">
            <div 
              className={`h-full transition-all duration-300 ${status.bg}`}
              style={{ width: `${Math.min(100, (charCount / 60) * 100)}%` }}
            ></div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Search className="w-3 h-3" /> Google Search Preview
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col gap-1 max-w-xl">
                    <div className="text-[12px] text-[#202124] leading-5 truncate">https://vidtoolbox.qzz.io › tools › ...</div>
                    <h3 className="text-[20px] text-[#1a0dab] leading-6 font-medium hover:underline cursor-pointer truncate">
                        {title || "Page Title Will Appear Here"}
                    </h3>
                    <div className="text-[14px] text-[#4d5156] leading-5 line-clamp-2">
                        Enter a meta title to see how it might look on a Google search results page. A good title is descriptive, includes keywords, and stays under 60 characters...
                    </div>
                </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
