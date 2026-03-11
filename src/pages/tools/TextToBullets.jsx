import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, List, ListOrdered, Minus } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TextToBullets() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [format, setFormat] = useState('bullet') // bullet, dash, number

  const convertToBullets = () => {
    if (!input.trim()) return

    const sentences = input.split(/[.!?]+(?:\s|$)/).filter(s => s.trim().length > 0)
    
    let result = ''
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim()
      if (format === 'bullet') result += `• ${trimmed}\n`
      else if (format === 'dash') result += `- ${trimmed}\n`
      else if (format === 'number') result += `${index + 1}. ${trimmed}\n`
    })

    setOutput(result.trim())
    trackToolUse('Text to Bullet Points Converter', 'text-to-bullets')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Text to Bullet Points Converter — Turn Paragraphs into Lists | VidToolbox</title>
        <meta name="description" content="Convert your paragraphs and long text into clean bullet points, dashed lists, or numbered lists instantly. Free online markdown and text formatting tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/text-to-bullets" />
      </Helmet>

      <ToolPage
        title="Text to Bullet Points Converter"
        icon={List}
        description="Transform heavy paragraphs into readable lists. Perfect for social media posts, blog outlines, or presentation slides."
        howToUse={[
          "Paste your paragraph text into the input field",
          "Select your preferred list style (Bullets, Dashes, or Numbers)",
          "Click 'Convert' and copy your new list"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph Text</label>
                <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your sentences here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-slate-600 leading-relaxed"
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">List Output</label>
                    <div className="flex gap-2">
                        {output && (
                            <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-cyan-600 border border-slate-200 rounded shadow-sm">
                                <Copy className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>
                <textarea
                value={output}
                readOnly
                placeholder="Your list will appear here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 outline-none resize-none text-slate-600 leading-relaxed font-mono text-sm"
                />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">List Style</span>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200 gap-1">
                    <button 
                        onClick={() => setFormat('bullet')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${format === 'bullet' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <List className="w-4 h-4" /> Bullets
                    </button>
                    <button 
                        onClick={() => setFormat('dash')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${format === 'dash' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <Minus className="w-4 h-4" /> Dashes
                    </button>
                    <button 
                        onClick={() => setFormat('number')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${format === 'number' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}
                    >
                        <ListOrdered className="w-4 h-4" /> Numbers
                    </button>
                </div>
            </div>
            <button
                onClick={convertToBullets}
                className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-12 py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg shadow-cyan-500/10"
            >
                Convert to List
            </button>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
