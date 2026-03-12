import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, List, Filter, ArrowUpDown } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'
])

export function WordFrequency() {
  const [text, setText] = useState('')
  const [ignoreStopWords, setIgnoreStopWords] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const processText = () => {
    if (!text.trim()) return []
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0)
      
    const totalCount = words.length
    const freq = {}
    
    words.forEach(word => {
      if (ignoreStopWords && STOP_WORDS.has(word)) return
      freq[word] = (freq[word] || 0) + 1
    })

    const sorted = Object.entries(freq)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / totalCount) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)

    return sorted
  }

  const results = processText()
  const displayResults = showAll ? results : results.slice(0, 20)

  return (
    <>
      <Helmet>
        <title>Word Frequency Counter — Content SEO Tool | Tenreq</title>
        <meta name="description" content="Analyze keyword density and word frequency in your content. Identify overused words and optimize your writing for better SEO and readability." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/word-frequency" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Word Frequency Counter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/word-frequency",
          "description": "Analyze word frequency and patterns in your text for SEO and writing improvement."
        })}</script>
      </Helmet>

      <ToolPage
        title="Word Frequency Counter"
        icon={Hash}
        description="Identify overused words and find keyword patterns in your writing. Perfect for SEO optimization and improving content flow."
        howToUse={[
          "Paste your text or article content into the editor",
          "Toggle 'Ignore Common Words' to filter out fillers like 'the', 'a', 'is'",
          "Review the table to see which keywords dominate your content"
        ]}
        faq={[
            { question: "What is the benefit of word frequency analysis?", answer: "It helps you avoid repetitive language and ensures your main keywords aren't appearing too many (or too few) times." },
            { question: "What are stop words?", answer: "Common words like 'the', 'and', 'at' that don't carry much semantic meaning. Filtering them helps you focus on substance words." },
            { question: "How many words should I analyze?", answer: "This tool can handle thousands of words instantly, making it great for everything from social posts to full blog articles." }
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Input Content</label>
            <textarea
              value={text}
              onChange={(e) => {
                  setText(e.target.value);
                  if (e.target.value.length === 1) trackToolUse('Word Frequency Counter', 'word-frequency');
              }}
              placeholder="Paste your text here..."
              className="w-full h-64 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-4"
            />
            
            <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" 
                        checked={ignoreStopWords} 
                        onChange={(e) => setIgnoreStopWords(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Ignore Common Stop Words</span>
                </label>
            </div>
          </div>

          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <List className="w-5 h-5 text-cyan-500" /> Analysis Results
                </h3>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Showing {displayResults.length} of {results.length} words
                </div>
              </div>

              <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Word</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Count</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayResults.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 text-slate-900 font-medium">{row.word}</td>
                        <td className="px-6 py-3 text-slate-600 font-mono text-center">{row.count}</td>
                        <td className="px-6 py-3 text-slate-400 text-right font-mono">
                            <span className="text-cyan-600 font-bold">{row.percentage}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {results.length > 20 && !showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl font-bold text-slate-500 hover:border-cyan-300 hover:text-cyan-600 transition-all flex items-center justify-center gap-2"
                >
                    <ArrowUpDown className="w-4 h-4" /> Show All {results.length} Words
                </button>
              )}
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
