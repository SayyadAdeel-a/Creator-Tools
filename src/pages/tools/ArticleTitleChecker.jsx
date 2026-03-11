import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, AlertCircle, TrendingUp, Smile, Meh, Frown } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ArticleTitleChecker() {
  const [title, setTitle] = useState('')

  const charCount = title.length
  const wordCount = title.trim() ? title.trim().split(/\s+/).length : 0
  const hasNumber = /\d/.test(title)
  
  const powerWords = ['ultimate', 'best', 'proven', 'secret', 'powerful', 'essential', 'amazing', 'free', 'easy', 'fast', 'complete', 'perfect', 'top']
  const foundPowerWords = powerWords.filter(word => title.toLowerCase().includes(word))
  const hasPowerWord = foundPowerWords.length > 0

  const getSentiment = () => {
    if (foundPowerWords.length > 1) return { label: 'Positive', icon: Smile, color: 'text-emerald-500' }
    if (foundPowerWords.length === 1) return { label: 'Neutral', icon: Meh, color: 'text-amber-500' }
    return { label: 'Negative', icon: Frown, color: 'text-slate-400' }
  }

  const sentiment = getSentiment()

  // Track on reach 20 chars
  if (charCount === 20) trackToolUse('Article Title Checker', 'title-checker')

  return (
    <>
      <Helmet>
        <title>Article Title Checker — Analyze Your Headlines | VidToolbox</title>
        <meta name="description" content="Check if your article title is optimized for SEO and clicks. Get live feedback on length, power words, and sentiment. Free headline analysis tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/title-checker" />
      </Helmet>

      <ToolPage
        title="Article Title Checker"
        icon={TrendingUp}
        description="Analyze your headlines in real-time. We check for optimal character length, word count, and the presence of high-converting 'power words'."
        howToUse={[
          "Type your proposed title into the input field",
          "Check the live markers for length and word count",
          "Include at least one power word to boost your click-through rate"
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Article / Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 10 Proven Secrets to Growth"
              className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`flex items-center justify-between p-4 rounded-xl border ${charCount >= 50 && charCount <= 60 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Characters</span>
                <span className="text-xl font-bold text-slate-900">{charCount}</span>
              </div>
              {charCount >= 50 && charCount <= 60 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-300" />}
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl border ${wordCount >= 6 && wordCount <= 10 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Words</span>
                <span className="text-xl font-bold text-slate-900">{wordCount}</span>
              </div>
              {wordCount >= 6 && wordCount <= 10 ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-300" />}
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl border ${hasNumber ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Has Number</span>
                <span className="text-xl font-bold text-slate-900">{hasNumber ? 'Yes' : 'No'}</span>
              </div>
              {hasNumber ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-300" />}
            </div>

            <div className={`flex items-center justify-between p-4 rounded-xl border ${hasPowerWord ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Power Word</span>
                <span className="text-xl font-bold text-slate-900">{hasPowerWord ? 'Found' : 'Missing'}</span>
              </div>
              {hasPowerWord ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-300" />}
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50 border-slate-200">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment</span>
                <span className={`text-xl font-bold ${sentiment.color}`}>{sentiment.label}</span>
              </div>
              <sentiment.icon className={`w-5 h-5 ${sentiment.color}`} />
            </div>
          </div>

          {hasPowerWord && (
            <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full">Detected Power Words:</span>
                {foundPowerWords.map(word => (
                    <span key={word} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg shadow-sm border border-emerald-200">
                        {word.toUpperCase()}
                    </span>
                ))}
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
