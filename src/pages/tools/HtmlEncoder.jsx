import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Braces, Copy, Check, Lock, Unlock, RefreshCcw, FileCode, SearchCode } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function HtmlEncoder() {
  const [input, setInput] = useState('<div>Hello "World" & Friends</div>')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    const el = document.createElement('div')
    el.innerText = input
    setOutput(el.innerHTML)
    trackToolUse('HTML Encoder', 'html-encoder')
  }

  const decode = () => {
    const el = document.createElement('div')
    el.innerHTML = input
    setOutput(el.innerText)
    trackToolUse('HTML Decoder', 'html-encoder')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>HTML Encoder & Decoder — Web Security Tool | Tenreq</title>
        <meta name="description" content="Convert special characters into HTML entities for secure web rendering. Prevent XSS and code injection with our professional encoder/decoder tool." />
      </Helmet>

      <ToolPage
        title="HTML Encoder / Decoder"
        icon={Braces}
        description="Secure your strings. Encode special characters like <, >, and & into their HTML entity equivalents to prevent execution in browsers, or decode existing entities back to readable text."
        howToUse={[
          "Paste the text or code snippet you want to modify",
          "Click 'Encode' to prepare text for safe web display",
          "Click 'Decode' to convert entities like '&amp;lt;' back into '<'",
          "Copy the processed result to your clipboard instantly"
        ]}
        faq={[
          { question: "Why should I encode HTML?", answer: "Encoding is critical for preventing Cross-Site Scripting (XSS) attacks. It ensures that user-provided text is rendered as literal characters rather than being executed as code by the browser." },
          { question: "What characters are encoded?", answer: "The tool primarily targets the 'special five': < (less than), > (greater than), & (ampersand), \" (double quote), and ' (single quote)." },
          { question: "Can this be used for URLs?", answer: "While similar, this is specifically for HTML content. For URLs, use our 'URL Encoder' tool which uses percentage-based encoding (e.g., %20 for spaces)." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <SearchCode className="w-3 h-3 text-cyan-500" /> RAW INPUT
                        </label>
                    </div>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to encode/decode..."
                        className="w-full h-[400px] p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-sm resize-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={encode}
                            className="bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                        >
                            <Lock className="w-4 h-4" /> Encode
                        </button>
                        <button 
                            onClick={decode}
                            className="bg-white text-slate-900 border-2 border-slate-900 py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Unlock className="w-4 h-4" /> Decode
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2 h-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileCode className="w-3 h-3 text-emerald-500" /> PROCESSED RESULT
                        </label>
                        {output && (
                             <button onClick={handleCopy} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}>
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy'}
                             </button>
                        )}
                    </div>
                    <div className="relative group">
                        <textarea 
                            value={output}
                            readOnly
                            placeholder="Result will appear here..."
                            className="w-full h-[400px] p-8 bg-slate-900 text-cyan-400 rounded-[40px] shadow-2xl font-mono text-xs resize-none outline-none border-b-8 border-slate-800"
                        />
                        <div className="absolute top-8 right-8 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 opacity-50">
                            <RefreshCcw className="w-5 h-5 text-white/20" />
                        </div>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-start gap-4 shadow-sm">
                         <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                            <Lock className="w-5 h-5 text-emerald-500" />
                         </div>
                         <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                            <strong>Security Protocol:</strong> Proper encoding ensures your server doesn't interpret input as HTML tags, effectively neutralizing the most common vector for malicious script injection.
                         </p>
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
