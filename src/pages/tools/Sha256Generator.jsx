import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Binary, Copy, Check, ShieldCheck, Activity } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function Sha256Generator() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const generateHash = async () => {
      if (!text) {
        setHash('')
        return
      }
      try {
        const msgUint8 = new TextEncoder().encode(text)
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        setHash(hashHex)
      } catch (err) {
        console.error('Hashing error:', err)
      }
    }
    generateHash()
  }, [text])

  const handleCopy = () => {
    if (!hash) return
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('SHA256 Generator', 'sha256-generator')
  }

  return (
    <>
      <Helmet>
        <title>SHA-256 Hash Generator — High Security Hashing | VidToolbox</title>
        <meta name="description" content="Securely generate SHA-256 hashes using built-in browser cryptography. Industry-standard hashing for data security and verification." />
      </Helmet>

      <ToolPage
        title="SHA-256 Generator"
        icon={ShieldCheck}
        description="Leverage the industry-standard Secure Hash Algorithm 256. This tool generates a cryptographically strong 256-bit hash, perfect for sensitive identification and high-security file verification."
        howToUse={[
          "Input your source text or data into the textarea",
          "The tool uses the browser's native Web Crypto API for secure, local processing",
          "Click the generated hash box to copy the fingerprint for your records"
        ]}
        faq={[
          { question: "Is SHA-256 secure?", answer: "Yes, SHA-256 is part of the SHA-2 family and is a robust hashing algorithm used globally in SSL, SSH, and Bitcoin." },
          { question: "Can I reverse an SHA-256 hash?", answer: "No. Hashing is a one-way function. It is impossible to reverse the hash to find the original text without brute-forcing." },
          { question: "Is this processed on your servers?", answer: "No. We use the Web Crypto API, meaning your data is hashed directly on your machine and never sent over the network." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3 text-cyan-500" /> Source Data for Hashing
                    </label>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Web Crypto API Enabled</span>
                </div>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text string here..."
                    className="w-full h-48 p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg font-medium resize-none"
                />
            </div>

            <div className="relative group cursor-pointer" onClick={handleCopy}>
                <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all hover:translate-y-[-4px]">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full"></div>
                    <div className="mb-6 w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-500">
                        <Binary className="w-8 h-8 text-emerald-400 group-hover:text-white" />
                    </div>
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">SHA-256 Hex Digest</span>
                    <div className="text-xl md:text-3xl font-mono font-black text-white break-all leading-tight max-w-2xl group-hover:text-emerald-400 transition-colors">
                        {hash || 'Waiting for input...'}
                    </div>
                    <div className="mt-12 flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                        {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-slate-400 group-hover:text-white" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest ${copied ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                            {copied ? 'Hash Copied' : 'Copy fingerprint'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                 <div className="flex items-center gap-8 py-4 px-10 bg-slate-50 border border-slate-100 rounded-3xl">
                      <div className="text-center">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Hash Length</p>
                          <p className="text-lg font-black text-slate-900">256 <span className="text-[10px] text-slate-300">bits</span></p>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="text-center">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Characters</p>
                          <p className="text-lg font-black text-slate-900">64 <span className="text-[10px] text-slate-300">hex</span></p>
                      </div>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
