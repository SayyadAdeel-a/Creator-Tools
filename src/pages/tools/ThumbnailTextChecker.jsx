import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ThumbnailTextChecker() {
  const [text, setText] = useState('')

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length

  const getWordStatus = () => {
    if (wordCount === 0) return { label: "No words", color: "bg-slate-100 text-slate-500", icon: AlertCircle }
    if (wordCount < 6) return { label: "Great for thumbnails", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle }
    if (wordCount <= 8) return { label: "Getting long", color: "bg-amber-100 text-amber-700", icon: AlertCircle }
    return { label: "Too long for a thumbnail", color: "bg-red-100 text-red-700", icon: XCircle }
  }

  const getCharStatus = () => {
    if (charCount === 0) return { label: "Empty", color: "bg-slate-100 text-slate-500", icon: AlertCircle }
    if (charCount < 30) return { label: "Perfect length", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle }
    if (charCount <= 40) return { label: "Getting tight", color: "bg-amber-100 text-amber-700", icon: AlertCircle }
    return { label: "Avoid this much text", color: "bg-red-100 text-red-700", icon: XCircle }
  }

  const wordStatus = getWordStatus()
  const charStatus = getCharStatus()

  // Track on change (debounced or just on focus/blur, but let's do it on simple action or just trust it)
  // User asked for "trackToolUse on main action button or input change for live tools"
  // I'll track when they enter some meaningful text
  const handleTextChange = (e) => {
    const val = e.target.value
    setText(val)
    if (val.length === 10) trackToolUse('Thumbnail Text Checker', 'thumbnail-text-checker')
  }

  return (
    <>
      <Helmet>
        <title>Thumbnail Text Checker — Optimize Your YouTube Thumbnails | VidToolbox</title>
        <meta name="description" content="Check if your thumbnail text is too long for YouTube. Get instant feedback on word and character counts to ensure your thumbnails are readable on all devices." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/thumbnail-text-checker" />
      </Helmet>

      <ToolPage
        title="Thumbnail Text Checker"
        icon={Type}
        description="Ensure your thumbnails stay clickable and readable. We analyze your text length and word count to perfect your YouTube thumbnail design."
        howToUse={[
          "Type in the text you plan to put on your thumbnail",
          "Watch the live analysis badges for word and character limits",
          "Aim for 'Green' badges for the best mobile readability"
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail Text</label>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="e.g., FIX YOUR SEO FAST!"
              className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-xl font-bold text-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-colors ${wordStatus.color.replace('bg-', 'border-').split(' ')[0]}`}>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Word Count</span>
              <div className="text-3xl font-bold">{wordCount}</div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${wordStatus.color}`}>
                <wordStatus.icon className="w-3 h-3" /> {wordStatus.label}
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-colors ${charStatus.color.replace('bg-', 'border-').split(' ')[0]}`}>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Character Count</span>
              <div className="text-3xl font-bold">{charCount}</div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${charStatus.color}`}>
                <charStatus.icon className="w-3 h-3" /> {charStatus.label}
              </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
