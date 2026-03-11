import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Download, Trash2, List } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function DuplicateLineRemover() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [stats, setStats] = useState(null)

  const removeDuplicates = () => {
    if (!input.trim()) return

    const lines = input.split(/\r?\n/)
    const originalCount = lines.length
    
    const seen = new Set()
    const result = []

    lines.forEach(line => {
      const compareValue = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(compareValue)) {
        seen.add(compareValue)
        result.push(line)
      }
    })

    const newOutput = result.join('\n')
    setOutput(newOutput)
    setStats({
      original: originalCount,
      new: result.length,
      removed: originalCount - result.length
    })
    
    trackToolUse('Duplicate Line Remover', 'duplicate-line-remover')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cleaned_text.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        <title>Duplicate Line Remover — Clean Up Lists and Text | VidToolbox</title>
        <meta name="description" content="Remove duplicate lines from your text or lists instantly. Keep original order, choose case sensitivity, and download the results. Free online cleanup tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/duplicate-line-remover" />
      </Helmet>

      <ToolPage
        title="Duplicate Line Remover"
        icon={List}
        description="Clean up messy lists or text data by stripping out duplicate lines while preserving the original order of your content."
        howToUse={[
          "Paste your list or text containing duplicates above",
          "Select whether the check should be case-sensitive",
          "Click 'Remove Duplicates' and copy or download your clean text"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Original Text</label>
                <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your lines here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none font-mono text-sm"
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Cleaned Output</label>
                    <div className="flex gap-2">
                        {output && (
                            <>
                                <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-cyan-600 border border-slate-200 rounded shadow-sm">
                                    <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={handleDownload} className="p-1.5 text-slate-400 hover:text-cyan-600 border border-slate-200 rounded shadow-sm">
                                    <Download className="w-3.5 h-3.5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <textarea
                value={output}
                readOnly
                placeholder="Unique lines will appear here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 outline-none resize-none font-mono text-sm"
                />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settings</span>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            checked={caseSensitive} 
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                        />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 font-medium">Case Sensitive</span>
                    </label>
                </div>
                {stats && (
                    <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Removed</span>
                            <span className="text-xl font-bold text-cyan-600">{stats.removed}</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Original</span>
                            <span className="text-xl font-bold text-slate-400">{stats.original}</span>
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={removeDuplicates}
                className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-12 py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
            >
                <Trash2 className="w-5 h-5" /> Remove Duplicates
            </button>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
