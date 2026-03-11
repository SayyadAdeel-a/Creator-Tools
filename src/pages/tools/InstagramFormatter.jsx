import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Instagram, Type, AlertTriangle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function InstagramFormatter() {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')

  const charCount = text.length
  const limit = 2200

  const formatCaption = () => {
    if (!text.trim()) return

    // Instagram collapses multiple line breaks, adding a special invisible character can help
    // A common trick is using a whitespace character that Instagram doesn't collapse or dots
    // Here we'll use a specific whitespace character or just ensure clean breaks
    const formatted = text.split(/\r?\n/).map(line => line.trim() === '' ? '⠀' : line).join('\n')
    
    setOutput(formatted)
    trackToolUse('Instagram Caption Formatter', 'instagram-formatter')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Instagram Caption Formatter — Add Line Breaks to Captions | VidToolbox</title>
        <meta name="description" content="Keep your Instagram captions clean with proper line breaks. Our tool inserts invisible characters to prevent Instagram from collapsing your spaces. Free online formatter." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/instagram-formatter" />
      </Helmet>

      <ToolPage
        title="Instagram Caption Formatter"
        icon={Instagram}
        description="Write beautiful Instagram captions with clean line breaks. We use invisible characters to ensure your spacing stays exactly as you designed it."
        howToUse={[
          "Type your caption with all the spaces and line breaks you want",
          "Click 'Format' to prepare the text for Instagram's formatting engine",
          "Copy and paste directly into the Instagram app"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Raw Caption</label>
                    <div className={`text-xs font-bold ${charCount > limit ? 'text-red-500' : 'text-slate-400'}`}>
                        {charCount.toLocaleString()} / {limit.toLocaleString()}
                    </div>
                </div>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your Instagram caption here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-slate-700"
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Instagram-Ready Output</label>
                    {output && (
                        <button onClick={handleCopy} className="text-xs text-cyan-600 font-bold hover:underline">Copy Formatted</button>
                    )}
                </div>
                <textarea
                value={output}
                readOnly
                placeholder="Formatted caption will appear here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 outline-none resize-none text-slate-700"
                />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3 max-w-md">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                    Instagram often removes empty lines. Our tool inserts a special **invisible character (⠀)** on blank lines to preserve your formatting perfectly.
                </p>
            </div>
            <button
                onClick={formatCaption}
                className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-12 py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
            >
                <Type className="w-5 h-5" /> Format Caption
            </button>
          </div>
          
          {charCount > limit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium text-center">
                Warning: Your caption exceeds Instagram's {limit} character limit.
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
