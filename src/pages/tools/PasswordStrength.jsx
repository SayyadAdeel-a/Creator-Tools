import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Eye, EyeOff, ShieldCheck, Check, X, ShieldAlert, Zap } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function PasswordStrength() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const checks = [
    { label: 'Has Upper Case', met: /[A-Z]/.test(password) },
    { label: 'Has Lower Case', met: /[a-z]/.test(password) },
    { label: 'Has Numbers', met: /[0-9]/.test(password) },
    { label: 'Has Symbols', met: /[^A-Za-z0-9]/.test(password) },
    { label: 'Length 8+', met: password.length >= 8 },
    { label: 'Length 12+', met: password.length >= 12 }
  ]

  const score = checks.filter(c => c.met).length

  const getStatus = () => {
    if (password.length === 0) return { label: 'Waiting...', color: 'bg-slate-200', text: 'text-slate-400' }
    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' }
    if (score <= 4) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' }
    if (score === 5) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' }
    return { label: 'Very Strong', color: 'bg-cyan-500', text: 'text-cyan-500' }
  }

  const status = getStatus()

  return (
    <>
      <Helmet>
        <title>Password Strength Checker — Audit Your Security | VidToolbox</title>
        <meta name="description" content="Instantly test the strength of your passwords. Our checker analyzes entropy, length, and character complexity to provide a security score." />
      </Helmet>

      <ToolPage
        title="Password Strength Checker"
        icon={ShieldCheck}
        description="Don't leave your accounts at risk. Our advanced security auditor tests your passwords against professional complexity standards to ensure you're protected from brute-force attacks."
        howToUse={[
          "Type or paste your password into the secure input field",
          "Toggle the eye icon to verify spelling if needed",
          "Review the checklist and score bar to identify areas for security improvement"
        ]}
        faq={[
          { question: "How safe is this checker?", answer: "Extremely safe. Your password never leaves your browser; the analysis script runs locally on your device." },
          { question: "Why do I need a 12+ character password?", answer: "Each additional character increases the difficulty of cracking the password exponentially. A 12-character password can take centuries to crack compared to minutes for a 7-character one." },
          { question: "What is entropy in security?", answer: "Entropy is a measure of randomness. The more varied your characters and the longer the string, the higher the entropy and security." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[50px] border border-slate-100 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
                
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Input Password for Analysis</label>
                        <button 
                            onClick={() => setShow(!show)}
                            className="text-xs font-bold text-cyan-600 flex items-center gap-2 hover:bg-cyan-50 px-3 py-1 rounded-full transition-colors"
                        >
                            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {show ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <input 
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); trackToolUse('Password Strength Checker', 'password-strength'); }}
                        className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[32px] text-2xl font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono"
                        placeholder="••••••••••••••••"
                    />
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center px-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strength Score</span>
                        <span className={`text-xs font-black uppercase tracking-widest ${status.text}`}>
                            {status.label} ({score}/6)
                        </span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex gap-1 p-1">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div 
                                key={i}
                                className={`flex-1 rounded-full transition-all duration-500 ${i <= score ? status.color : 'bg-white opacity-50'}`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {checks.map((check, idx) => (
                        <div 
                            key={idx}
                            className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all ${
                                check.met ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-50 text-slate-400'
                            }`}
                        >
                            <span className="text-xs font-bold">{check.label}</span>
                            {check.met ? <Check className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 opacity-20" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                 <div className="bg-slate-900 px-8 py-4 rounded-3xl flex items-center gap-4 text-white shadow-xl shadow-slate-900/10 animate-in fade-in duration-1000">
                     <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Entropy Analysis Active</span>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
