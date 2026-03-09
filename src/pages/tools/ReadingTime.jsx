import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, Clock, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'

export function ReadingTime() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const words = input.trim().split(/\s+/).filter(w => w.length > 0)
    const wordCount = words.length
    const readTime = wordCount / 200
    const mins = Math.floor(readTime)
    const readTimeString = mins === 1 ? '1 minute read' : `≈ ${mins} minute read`
    setResult({ words: wordCount, readTime: readTimeString })
  }

  return (
    <>
      <Helmet>
        <title>Reading Time Calculator — Free Online Tool for Creators | VidToolbox</title>
        <meta name="description" content="Calculate estimated reading time for any text." />
      </Helmet>
      
      <ToolPage
        title="Reading Time Calculator"
        icon={Clock}
        description="Calculate the estimated time it takes to read any text."
        howToUse={[
          "Paste or type your text into the textarea",
          "Click 'Calculate' to get the reading time",
          "Use it to optimize your content length"
        ]}
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Text</label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); if (!e.target.value.trim()) setResult(null); }}
              placeholder="Paste or type your text here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{input.split(/\s+/).filter(w => w).length.toLocaleString()} words</span>
            <button
              onClick={calculate}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border-t border-slate-200">
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <Type className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{result.words.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Word Count</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{result.readTime}</div>
              <div className="text-sm text-slate-600 mt-1">Reading Time</div>
            </div>
          </div>
        )}
      </ToolPage>
    </>
  )
}
