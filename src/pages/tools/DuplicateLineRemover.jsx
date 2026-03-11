import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Split, Copy, Download, Trash2, Check, CheckCircle2, Info, Eraser, Filter } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function DuplicateLineRemover() {
  const [input, setInput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [copied, setCopied] = useState(false)

  const processLines = () => {
    if (!input.trim()) return { output: '', original: 0, distinct: 0, removed: 0 }
    
    let lines = input.split(/\n/)
    const originalCount = lines.length
    
    if (trimWhitespace) {
      lines = lines.map(line => line.trim())
    }

    const seen = new Set()
    const outputLines = []

    lines.forEach(line => {
      const compareLine = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(compareLine)) {
        seen.add(compareLine)
        outputLines.push(line)
      }
    })

    const distinctCount = outputLines.length
    return {
      output: outputLines.join('\n'),
      original: originalCount,
      distinct: distinctCount,
      removed: originalCount - distinctCount
    }
  }

  const { output, original, distinct, removed } = processLines()

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Duplicate Line Remover', 'duplicate-lines')
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([output], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "cleaned_lines.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>Duplicate Line Remover — List Cleaning SEO Tool | VidToolbox</title>
        <meta name="description" content="Quickly remove duplicate lines from your text, lists, or datasets. Support for case-sensitivity and whitespace trimming. Professional cleaning tool for creators and developers." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/duplicate-lines" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Duplicate Line Remover",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/duplicate-lines",
          "description": "Efficiently clean lists by removing identical lines with optional case and whitespace settings."
        })}</script>
      </Helmet>

      <ToolPage
        title="Duplicate Line Remover"
        icon={Split}
        description="Clean your lists, datasets, or keyword files instantly. Automatically strip out repeated lines with professional cleaning options."
        howToUse={[
          "Paste your list or raw text into the input field",
          "Toggle case-sensitivity or whitespace trimming if needed",
          "Review the summary of removed lines and copy the result"
        ]}
        faq={[
            { question: "Why is whitespace trimming important?", answer: "Many lists contain unseen spaces at the end of lines. Trimming ensures that 'Word' and 'Word ' are correctly identified as duplicates." },
            { question: "How many lines can this tool handle?", answer: "Our browser-based cleaner is optimized to handle thousands of lines instantly without any data leaving your device." },
            { question: "Can I use this for email lists?", answer: "Absolutely! It's one of the most popular ways to deduplicate email lists or comma-separated values (one per line)." }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Eraser className="w-5 h-5 text-cyan-500" /> Source List
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your lines here (one per line)..."
              className="w-full h-[32rem] p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-6 text-slate-700 font-mono text-sm leading-relaxed"
            />
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-widest mb-2 flex items-center gap-2"><Filter className="w-4 h-4 text-cyan-500" /> Cleaning Options</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={caseSensitive} 
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Case Sensitive</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={trimWhitespace} 
                    onChange={(e) => setTrimWhitespace(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Trim Whitespace</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Cleaned Result</h3>
              <div className="flex gap-2">
                <button 
                    onClick={handleDownload} 
                    disabled={!output}
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download cleaned file"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                    onClick={handleCopy} 
                    disabled={!output}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                        copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:text-cyan-600 hover:border-cyan-200 disabled:opacity-50'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-slate-900 font-mono mb-0.5">{original}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Original</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-emerald-600 font-mono mb-0.5">{distinct}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Cleaned</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                    <p className="text-xl font-bold text-red-500 font-mono mb-0.5">{removed}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Removed</p>
                </div>
            </div>

            <textarea
              value={output}
              readOnly
              placeholder="Your deduplicated list will appear here..."
              className="w-full flex-1 p-4 border border-slate-200 rounded-2xl bg-white outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 shadow-inner"
            />

            {removed > 0 && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Perfect! We cleaned {removed} duplicates for you.</p>
                </div>
            )}
          </div>
        </div>
      </ToolPage>
    </>
  )
}
