import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BookOpen, CheckCircle, Info } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ReadabilityScore() {
  const [text, setText] = useState('')
  const [score, setScore] = useState(null)

  const countSyllables = (word) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '')
    if (word.length <= 3) return 1
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    const vowels = word.match(/[aeiouy]{1,2}/g)
    return vowels ? vowels.length : 1
  }

  const calculateReadability = () => {
    if (!text.trim()) return

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length || 1
    const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0)

    // Flesch Reading Ease Formula
    const fse = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount)
    const finalScore = Math.max(0, Math.min(100, Math.round(fse)))
    
    setScore(finalScore)
    trackToolUse('Readability Score Checker', 'readability-score')
  }

  const getLabel = (s) => {
    if (s >= 90) return { label: 'Very Easy', color: 'bg-emerald-500', text: 'emerald' }
    if (s >= 70) return { label: 'Easy', color: 'bg-teal-500', text: 'teal' }
    if (s >= 60) return { label: 'Standard', color: 'bg-cyan-500', text: 'cyan' }
    if (s >= 50) return { label: 'Fairly Difficult', color: 'bg-amber-500', text: 'amber' }
    if (s >= 30) return { label: 'Difficult', color: 'bg-orange-500', text: 'orange' }
    return { label: 'Very Difficult', color: 'bg-red-500', text: 'red' }
  }

  const label = score !== null ? getLabel(score) : null

  return (
    <>
      <Helmet>
        <title>Readability Score Checker — Flesch Reading Ease | VidToolbox</title>
        <meta name="description" content="Check the readability of your content using the Flesch Reading Ease score. Get instant feedback on how easy or difficult your text is to read. Free online SEO tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/readability-score" />
      </Helmet>

      <ToolPage
        title="Readability Score Checker"
        icon={BookOpen}
        description="Analyze your text to see how accessible it is to your audience. We use the Flesch Reading Ease formula to score your content from 0 to 100."
        howToUse={[
          "Paste your article, script, or blog post above",
          "Click 'Check Readability' to calculate your score",
          "Modify your text to reach the desired readability level for your audience"
        ]}
      >
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here to check readability..."
            className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-6 text-sm"
          />

          <button
            onClick={calculateReadability}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 mb-8"
          >
            <CheckCircle className="w-5 h-5" /> Calculate Readability
          </button>

          {score !== null && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
              <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Readability Score</div>
              <div className={`text-6xl font-black mb-4 text-${label.text}-600`}>{score}</div>
              
              <div className="max-w-xs mx-auto mb-6">
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex">
                    <div className={`${label.color} h-full transition-all duration-500`} style={{ width: `${score}%` }}></div>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-${label.text}-50 text-${label.text}-700 border border-${label.text}-100`}>
                {label.label}
              </div>

              <div className="mt-8 flex items-start gap-3 text-left bg-white p-4 rounded-xl border border-slate-100 max-w-lg mx-auto">
                <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  The **Flesch Reading Ease** score indicates how easy a text is to read. Higher numbers mean the text is easier to read, while lower numbers mean the text is more complex. Most professional content targets a score of 60–70.
                </p>
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
