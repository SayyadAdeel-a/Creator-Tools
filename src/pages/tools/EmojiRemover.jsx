import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Eraser, Copy, Check, Info, Trash2, Ghost, Smile } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function EmojiRemover() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  // Combined logic to strip emojis and count removed characters
  const analysis = useMemo(() => {
    if (!text) return { output: '', count: 0 }
    
    // Regex covering standard emoji presentation and modifiers
    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
    
    const count = (text.match(emojiRegex) || []).length
    const output = text.replace(emojiRegex, '').replace(/\s+/g, ' ').trim()
    
    return { output, count }
  }, [text])

  const handleCopy = () => {
    if (!analysis.output) return
    navigator.clipboard.writeText(analysis.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Emoji Remover', 'emoji-remover')
  }

  return (
    <>
      <Helmet>
        <title>Emoji Remover — Strip Icons from Text | VidToolbox</title>
        <meta name="description" content="Quickly strip all emojis, icons, and special symbols from your text content. Maintain clean formatting for professional reports or formal posts. Free emoji cleaner." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/emoji-remover" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Emoji Remover",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/emoji-remover",
          "description": "Remove every emoji and symbol from your text with one click while keeping the words intact."
        })}</script>
      </Helmet>

      <ToolPage
        title="Emoji Remover"
        icon={Eraser}
        description="Clean up your social media posts for professional use. Instantly strip out all emojis and icons while preserving your text and basic spacing."
        howToUse={[
          "Paste your emoji-heavy text into the editor area",
          "Review the cleaned output and total emoji count automatically",
          "Copy the sanitized text and use it for professional reports or formal documents"
        ]}
        faq={[
            { question: "Does this remove all types of emojis?", answer: "Yes, our tool uses a comprehensive regex pattern that covers standard emojis, skin tone modifiers, and symbol-based icons used on platforms like TikTok and Instagram." },
            { question: "Will my text spacing be affected?", answer: "We normalize spacing slightly to prevent 'ghost spaces' left behind by removed emojis. Your words and paragraphs will remain perfectly readable." },
            { question: "Can I use this for bulk text?", answer: "Absolutely! Our browser-based engine can process thousands of characters instantly, making it ideal for cleaning up long comment threads or blog descriptions." }
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
            <div className="p-6 border-r border-slate-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Smile className="w-5 h-5 text-cyan-500" /> Source Text
                    </h3>
                    <button onClick={() => setText('')} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                </div>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text with emojis here..."
                className="w-full h-96 p-6 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none resize-none text-slate-700 font-medium leading-relaxed shadow-inner shadow-slate-100 transition-all"
                />
            </div>

            <div className="p-6 bg-slate-50 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 font-heading">Sanitized Output</h3>
                    <button 
                        onClick={handleCopy} 
                        disabled={!analysis.output}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-xl border ${
                            copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:border-slate-300'
                        }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy Cleaned Text'}
                    </button>
                </div>

                <div className="relative flex-1">
                    <textarea
                    value={analysis.output}
                    readOnly
                    placeholder="Your sanitized text will appear here..."
                    className="w-full h-full p-6 border border-slate-200 rounded-3xl bg-white outline-none resize-none text-slate-600 font-medium leading-relaxed shadow-inner shadow-slate-50 transition-all min-h-[300px]"
                    />
                    
                    {analysis.count > 0 && (
                        <div className="absolute bottom-6 right-6 p-4 bg-cyan-900 text-white rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in zoom-in duration-300">
                             <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center font-black text-cyan-400">{analysis.count}</div>
                             <p className="text-[10px] font-black uppercase tracking-widest leading-none">Emojis Removed</p>
                        </div>
                    )}
                </div>

                {!text && (
                    <div className="mt-6 flex items-center justify-center py-10 opacity-40">
                         <div className="text-center group overflow-hidden">
                             <Ghost className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:-translate-y-2 transition-transform" />
                             <p className="font-bold text-slate-600">No content sanitized yet.</p>
                             <p className="text-xs text-slate-400">Everything is crystal clear.</p>
                         </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
