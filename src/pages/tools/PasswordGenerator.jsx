import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Shield, Copy, Check, RefreshCw, Settings } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const charset = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    }

    let allChars = ''
    let initialPass = ''

    // Ensure at least one of each selected type
    if (options.upper) {
      allChars += charset.upper
      initialPass += charset.upper[Math.floor(Math.random() * charset.upper.length)]
    }
    if (options.lower) {
      allChars += charset.lower
      initialPass += charset.lower[Math.floor(Math.random() * charset.lower.length)]
    }
    if (options.numbers) {
      allChars += charset.numbers
      initialPass += charset.numbers[Math.floor(Math.random() * charset.numbers.length)]
    }
    if (options.symbols) {
      allChars += charset.symbols
      initialPass += charset.symbols[Math.floor(Math.random() * charset.symbols.length)]
    }

    if (!allChars) return setPassword('')

    for (let i = initialPass.length; i < length; i++) {
      initialPass += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle
    const finalPass = initialPass.split('').sort(() => Math.random() - 0.5).join('')
    setPassword(finalPass)
  }, [length, options])

  useEffect(() => {
    generate()
  }, [generate])

  const strength = (() => {
    let score = 0
    if (password.length > 12) score++
    if (password.length > 20) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' }
    if (score === 3) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' }
    if (score === 4) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' }
    return { label: 'Very Strong', color: 'bg-cyan-500', text: 'text-cyan-500' }
  })()

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Password Generator', 'password-generator')
  }

  return (
    <>
      <Helmet>
        <title>Random Password Generator — Secure & Encrypted | Tenreq</title>
        <meta name="description" content="Generate highly secure, random passwords with custom length and character options. Create unhackable passwords for your accounts instantly." />
      </Helmet>

      <ToolPage
        title="Password Generator"
        icon={Shield}
        description="Secure your digital life with unhackable passwords. Customize character types and length up to 64 characters for maximum protection."
        howToUse={[
          "Choose the desired password length using the slider",
          "Select character types (Uppercase, Numbers, Symbols) to include",
          "Click Generate for a new version or Copy to use it immediately"
        ]}
        faq={[
          { question: "Are these passwords stored?", answer: "No. All passwords are generated locally in your browser and are never sent to our servers." },
          { question: "What makes a password 'Very Strong'?", answer: "A mix of character types and a length of at least 16+ characters significantly increases entropy against brute-force attacks." },
          { question: "Should I use symbols?", answer: "Yes. Adding symbols like $ % ^ & makes your password exponentially harder to crack by increasing the character set." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Display */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[40px] p-10 text-center shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border-8 border-slate-800">
                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                <div className="space-y-6 relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Secure String Output</div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-white break-all leading-relaxed tracking-wider px-4">
                    {password || 'Select options...'}
                  </div>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <button 
                      onClick={generate}
                      className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all flex items-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleCopy}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                        copied ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-xl shadow-cyan-500/20'
                      }`}
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied to Clipboard' : 'Copy Password'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-cyan-500" /> Security Parameters
                  </h4>
                  <span className={`text-xs font-black uppercase tracking-widest ${strength.text}`}>
                    Strength: {strength.label}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Length: {length}</span>
                  </div>
                  <input 
                    type="range" min="8" max="64" value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${strength.color}`} 
                      style={{ width: `${(password.length / 64) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(options).map((key) => (
                    <button
                      key={key}
                      onClick={() => setOptions(prev => ({ ...prev, [key]: !prev[key] }))}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all group ${
                        options[key] ? 'bg-cyan-50 border-cyan-500 text-cyan-700' : 'bg-white border-slate-100 text-slate-400 grayscale hover:grayscale-0'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                        options[key] ? 'bg-cyan-600 border-cyan-600' : 'border-slate-200 bg-slate-50'
                      }`}>
                        {options[key] && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold capitalize">
                        {key === 'upper' ? 'Uppercase' : key === 'lower' ? 'Lowercase' : key}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
                <Shield className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Security Note:</strong> For maximum safety, always use a unique password for every account and enable Multi-Factor Authentication (MFA) whenever possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
