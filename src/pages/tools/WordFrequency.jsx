import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BarChart3, Hash, Search } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function WordFrequency() {
  const [text, setText] = useState('')
  const [filterStopwords, setFilterStopwords] = useState(true)
  const [results, setResults] = useState([])

  const stopWords = new Set(['the', 'a', 'an', 'is', 'in', 'on', 'at', 'to', 'of', 'and', 'or', 'but', 'for', 'with', 'that', 'this', 'it', 'as', 'my', 'you', 'your', 'i', 'was', 'were', 'be', 'been'])

  const analyzeFrequency = () => {
    if (!text.trim()) return

    const rawWords = text.toLowerCase()
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")

    const freq = {}
    let total = 0

    rawWords.forEach(word => {
      if (word.length < 2) return
      if (filterStopwords && stopWords.has(word)) return
      
      freq[word] = (freq[word] || 0) + 1
      total++
    })

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / total) * 100).toFixed(1)
      }))

    setResults(sorted)
    trackToolUse('Word Frequency Counter', 'word-frequency')
  }

  return (
    <>
      <Helmet>
        <title>Word Frequency Counter — Analyze Keyword Density Free | VidToolbox</title>
        <meta name="description" content="Find the most used words in your text instantly. Perfect for SEO keyword analysis and content optimization. Free online word frequency tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/word-frequency" />
      </Helmet>

      <ToolPage
        title="Word Frequency Counter"
        icon={BarChart3}
        description="Paste your content to see which words appear most frequently. Great for identifying overused words or checking keyword density."
        howToUse={[
          "Paste your article or script into the text area",
          "Toggle 'Filter Stopwords' to hide common words like 'the' or 'and'",
          "Click 'Analyze' to see your top 20 most frequent words"
        ]}
      >
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to analyze word frequency..."
            className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-6 text-sm font-mono"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={filterStopwords} 
                onChange={(e) => setFilterStopwords(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Ignore common stop words</span>
            </label>
            <button
              onClick={analyzeFrequency}
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-10 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Analyze Text
            </button>
          </div>

          {results.length > 0 ? (
            <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 font-bold text-slate-900 text-sm">Word</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-sm text-center">Count</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-sm text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((res, i) => (
                    <tr key={res.word} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-700 font-medium">{res.word}</td>
                      <td className="px-6 py-4 text-slate-600 text-center font-mono">{res.count}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-cyan-600 font-bold font-mono">
                          {res.percentage}%
                          <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 h-full" style={{ width: `${res.percentage}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : text.length > 0 && (
            <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
              Click Analyze to see results
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
