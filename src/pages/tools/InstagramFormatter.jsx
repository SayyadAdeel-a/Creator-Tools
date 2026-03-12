import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Instagram, Type, Check, Eye, Smartphone, AlertCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function InstagramFormatter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  // Instagram strips whitespace on empty lines. 
  // Standard trick: Add an invisible separator (U+2063) or a special space.
  const formatted = text.split('\n').map(line => line.trim() === '' ? '⠀' : line).join('\n')

  const handleCopy = () => {
    if (!text.trim()) return
    navigator.clipboard.writeText(formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Instagram Caption Formatter', 'instagram-formatter')
  }

  return (
    <>
      <Helmet>
        <title>Instagram Caption Formatter — Add Real Line Breaks | VidToolbox</title>
        <meta name="description" content="Maintain clean line breaks and spacing in your Instagram captions. Our tool adds invisible characters to prevent Instagram from collapsing your paragraphs. Free online formatter." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/instagram-formatter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Instagram Caption Formatter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/instagram-formatter",
          "description": "Ensure your Instagram captions keep their spacing and line breaks with invisible character injection."
        })}</script>
      </Helmet>

      <ToolPage
        title="Instagram Caption Formatter"
        icon={Instagram}
        description="Stop fighting with Instagram's automatic spacing. We inject invisible characters into your empty lines so your formatting stays exactly how you intended."
        howToUse={[
          "Write your caption with all the empty lines and paragraphs you want",
          "Review the live preview box below to see how it looks on mobile",
          "Click 'Copy Formatted' and paste directly into your Instagram app"
        ]}
        faq={[
            { question: "Why does Instagram remove my line breaks?", answer: "Instagram's default behavior is to collapse consecutive line breaks. This tool adds an invisible 'braille space' character to empty lines, tricking the algorithm into preserving them." },
            { question: "Does this work for Facebook too?", answer: "Yes! While Facebook is more lenient with spacing, this invisible char trick works across most Meta platforms to ensure consistent paragraph breaks." },
            { question: "Will my caption look different to followers?", answer: "Not at all. The character used is completely invisible to the human eye; your followers will simply see clean, organized paragraphs." }
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Type className="w-4 h-4 text-cyan-500" /> Editor
                    </label>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{text.length} chars</div>
                </div>
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your caption with empty lines here..."
                className="w-full h-96 p-6 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none resize-none text-slate-700 font-medium leading-relaxed shadow-inner shadow-slate-100"
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-cyan-500" /> Mobile Preview
                    </label>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">Formatting Applied</span>
                </div>
                <div className="w-full h-96 border border-slate-200 rounded-3xl bg-slate-50 relative p-8 overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Smartphone className="w-24 h-24 text-slate-900" /></div>
                    <div className="relative h-full overflow-y-auto scrollbar-hide">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl max-w-[280px] mx-auto min-h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"></div>
                                <div className="w-20 h-2.5 bg-slate-100 rounded-full"></div>
                                <div className="w-8 h-2.5 bg-slate-50 rounded-full ml-auto"></div>
                            </div>
                            <p className="text-sm text-slate-800 leading-[1.6] whitespace-pre-wrap break-words">{formatted || 'Your caption preview will appear here...'}</p>
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <div className="flex gap-3">
                                    <div className="w-4 h-4 rounded-full bg-slate-100"></div>
                                    <div className="w-4 h-4 rounded-full bg-slate-100"></div>
                                    <div className="w-4 h-4 rounded-full bg-slate-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h4 className="font-bold text-sm">Ready for Instagram</h4>
                    <p className="text-xs text-slate-400 italic">Invisible spacing characters have been injected.</p>
                </div>
            </div>
            <button
                onClick={handleCopy}
                disabled={!text.trim()}
                className={`w-full md:w-auto px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl relative z-10 ${
                    copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white text-slate-900 hover:bg-cyan-50 disabled:opacity-50 disabled:bg-slate-700 disabled:text-slate-400'
                }`}
            >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied to Clipboard' : 'Copy Formatted Caption'}
            </button>
            <div className="absolute -right-10 -bottom-10 opacity-10 blur-xl w-48 h-48 bg-gradient-to-br from-yellow-400 via-pink-600 to-purple-800 rounded-full"></div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
