import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Smile, Trash2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function EmojiRemover() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [removedCount, setRemovedCount] = useState(0)

  const removeEmojis = () => {
    if (!input) return

    // Regex for emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
    
    // Count matches before removing
    const matches = input.match(emojiRegex) || []
    const cleaned = input.replace(emojiRegex, '')

    setOutput(cleaned)
    setRemovedCount(matches.length)
    trackToolUse('Emoji Remover', 'emoji-remover')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Emoji Remover — Strip Emojis from Text Online | VidToolbox</title>
        <meta name="description" content="Quickly remove all emojis from your text. Perfect for professional documents, clean scripts, or data processing. Free online emoji stripper tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/emoji-remover" />
      </Helmet>

      <ToolPage
        title="Emoji Remover"
        icon={Smile}
        description="Clean your text by removing all emojis instantly. Whether you're processing data or cleaning up social media captions, we'll strip them all in one click."
        howToUse={[
          "Paste your text containing emojis into the box",
          "Click the 'Remove Emojis' button",
          "Copy your clean, professional text from the output"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Original Text</label>
                <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste text with emojis here... 😀🚀📈"
                className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Cleaned Text</label>
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
                placeholder="Emoji-free text will appear here..."
                className="w-full h-64 p-4 border border-slate-200 rounded-xl bg-slate-50 outline-none resize-none"
                />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-6">
                <div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                   {removedCount > 0 ? (
                        <span className="text-sm font-bold text-emerald-600">Successfully removed {removedCount} emojis</span>
                   ) : (
                        <span className="text-sm font-medium text-slate-400">Waiting for input...</span>
                   )}
                </div>
            </div>
            <button
                onClick={removeEmojis}
                className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-12 py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
            >
                <Trash2 className="w-5 h-5" /> Remove Emojis
            </button>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
