import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, AlignLeft, Hash, Quote } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SentenceCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    if (!text.trim()) return { sentences: 0, words: 0, chars: 0, avg: 0, longest: '' }

    // Split by sentence terminators (., !, ?) follow by space or end of line
    const sentenceList = text.trim().split(/[.!?]+(?:\s|$)/).filter(s => s.trim().length > 0)
    const wordList = text.trim().split(/\s+/).filter(w => w.trim().length > 0)
    
    let longest = ''
    sentenceList.forEach(s => {
      if (s.length > longest.length) longest = s
    })

    const counts = {
      sentences: sentenceList.length,
      words: wordList.length,
      chars: text.length,
      avg: (wordList.length / (sentenceList.length || 1)).toFixed(1),
      longest: longest.trim()
    }

    if (text.length === 50) trackToolUse('Sentence Counter', 'sentence-counter')
    
    return counts
  }, [text])

  return (
    <>
      <Helmet>
        <title>Sentence Counter — Free Online Writing Tool | VidToolbox</title>
        <meta name="description" content="Count sentences, words, and characters in your text instantly. Get statistics on average sentence length and find your longest sentence automatically." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/sentence-counter" />
      </Helmet>

      <ToolPage
        title="Sentence Counter"
        icon={AlignLeft}
        description="Write or paste your text for instant analysis. We track sentences, average word count, and character length in real-time."
        howToUse={[
          "Type or paste your content into the text area",
          "Review the live stats at the top of the interface",
          "Identify and shorten long sentences using the 'Longest Sentence' highlight"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sentences</span>
              <span className="text-2xl font-bold text-slate-900">{stats.sentences}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Words</span>
              <span className="text-2xl font-bold text-slate-900">{stats.words}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Characters</span>
              <span className="text-2xl font-bold text-slate-900">{stats.chars}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Words/Sentence</span>
              <span className="text-2xl font-bold text-cyan-600">{stats.avg}</span>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your content here..."
            className="w-full h-80 p-6 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-slate-700 leading-relaxed mb-6"
          />

          {stats.longest && (
            <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-5 h-5 text-cyan-500" />
                <h4 className="font-bold text-slate-900">Longest Sentence</h4>
              </div>
              <p className="text-slate-600 italic leading-relaxed">"{stats.longest}."</p>
              <div className="mt-3 text-[10px] font-bold text-cyan-700 uppercase tracking-wider">{stats.longest.split(/\s+/).length} words</div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
