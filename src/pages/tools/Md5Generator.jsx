import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Copy, Check, ShieldAlert, Binary } from 'lucide-react'
import md5 from 'blueimp-md5'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function Md5Generator() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const hash = text ? md5(text) : ''

  const handleCopy = () => {
    if (!hash) return
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('MD5 Generator', 'md5-generator')
  }

  return (
    <>
      <Helmet>
        <title>MD5 Hash Generator — Checksum & Data Integrity | VidToolbox</title>
        <meta name="description" content="Generate 128-bit MD5 hashes instantly. Perfect for file integrity checks and checksums. Free online cryptographic tool." />
      </Helmet>

      <ToolPage
        title="MD5 Hash Generator"
        icon={Hash}
        description="Quickly generate a 32-character MD5 hash for any text string. Ideal for verifying file integrity, data consistency, and generating checksums for non-sensitive data."
        howToUse={[
          "Enter your text directly into the input area",
          "The MD5 hash is calculated instantly as you type",
          "Click the hash card to copy the fingerprint to your clipboard"
        ]}
        faq={[
          { question: "Is MD5 secure for passwords?", answer: "No. MD5 is considered cryptographically broken and is vulnerable to collision attacks. Do not use it for sensitive security or password hashing." },
          { question: "What is the result format?", answer: "The result is a 128-bit hash value, typically represented in text as a 32-digit hexadecimal number." },
          { question: "When should I use MD5?", answer: "It is perfect for checksums to verify that a file or string hasn't been changed during transmission, where high security is not a requirement." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Input String</label>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to hash..."
                    className="w-full h-48 p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all text-lg font-medium resize-none"
                />
            </div>

            <div className="relative group cursor-pointer" onClick={handleCopy}>
                <div className="bg-slate-900 rounded-[50px] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all hover:scale-[1.01]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[100px] rounded-full"></div>
                    <div className="mb-6 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Binary className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">MD5 Fingerprint Output</span>
                    <div className="text-xl md:text-3xl font-mono font-black text-white break-all leading-tight max-w-2xl group-hover:text-cyan-400 transition-colors">
                        {hash || 'Waiting for input...'}
                    </div>
                    <div className="mt-10">
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white'
                        }`}>
                            {copied ? 'Copied' : 'Click to Copy Hash'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-8 rounded-[32px] flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div className="space-y-1">
                    <p className="font-bold text-amber-900">Security Disclaimer</p>
                    <p className="text-sm text-amber-700 leading-relaxed">
                        MD5 is <strong>not suitable</strong> for advanced security. It is susceptible to "collision attacks" where different inputs produce the same hash. Use SHA-256 for secure cryptographic needs.
                    </p>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
