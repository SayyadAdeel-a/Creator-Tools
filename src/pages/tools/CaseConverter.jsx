import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, Copy, Check, RefreshCcw, CaseLower, CaseUpper, Heading1, Hash } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function CaseConverter() {
  const [text, setText] = useState('the Quick brown fox JUMPS over the lazy dog')
  const [copied, setCopied] = useState(false)

  const convert = useCallback((mode) => {
    let result = text
    switch (mode) {
      case 'upper':
        result = text.toUpperCase()
        break
      case 'lower':
        result = text.toLowerCase()
        break
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
        break
      case 'title':
        result = text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
        break
      case 'camel':
        result = text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.substring(1)).join('')
        break
      case 'snake':
        result = text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join('_')
        break
    }
    setText(result)
    trackToolUse(`Case Converter - ${mode}`, 'case-converter')
  }, [text])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Case Converter — Multi-Format Text Tool | Tenreq</title>
        <meta name="description" content="Switch between UPPERCASE, lowercase, Title Case, camelCase, and more instantly. Clean up your text and code formatting with our professional case converter." />
      </Helmet>

      <ToolPage
        title="Case Converter"
        icon={Type}
        description="Transform your text structure in a single click. Whether you need formal Sentence case for a document or snake_case for a programming variable, our engine handles the transition instantly."
        howToUse={[
          "Paste your raw text into the input field",
          "Click any of the six transformation buttons (e.g., Title Case or camelCase)",
          "The text updates immediately; use the copy button to export the result"
        ]}
        faq={[
          { question: "What is 'Sentence case'?", answer: "Sentence case capitalizes the first letter of every sentence and converts everything else to lowercase, mimicking formal writing." },
          { question: "When should I use camelCase?", answer: "camelCase is a standard naming convention in programming languages like JavaScript where the first word is lowercase and subsequent words start with a capital letter." },
          { question: "Does it preserve punctuation?", answer: "Standard cases (Upper, Lower, Sentence, Title) preserve all punctuation. Coding cases (camel, snake) may strip special characters to ensure valid identifier formatting." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Type className="w-3 h-3 text-cyan-500" /> ACTIVE TEXT BUFFER
                    </label>
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                            copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy Result'}
                    </button>
                </div>
                
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-[400px] p-10 md:p-12 bg-white border border-slate-200 rounded-[50px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all text-xl font-medium leading-relaxed resize-none"
                    placeholder="Enter text here..."
                />
            </div>

            {/* Controls Palette */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { id: 'upper', label: 'UPPERCASE', icon: CaseUpper },
                    { id: 'lower', label: 'lowercase', icon: CaseLower },
                    { id: 'sentence', label: 'Sentence case', icon: RefreshCcw },
                    { id: 'title', label: 'Title Case', icon: Heading1 },
                    { id: 'camel', label: 'camelCase', icon: Type },
                    { id: 'snake', label: 'snake_case', icon: Hash },
                ].map((mode) => (
                    <button 
                        key={mode.id}
                        onClick={() => convert(mode.id)}
                        className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-3xl hover:border-cyan-500 hover:shadow-xl transition-all group group"
                    >
                        <mode.icon className="w-6 h-6 text-slate-300 group-hover:text-cyan-500 mb-4 transition-colors" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900">{mode.label}</span>
                    </button>
                ))}
            </div>

            <div className="flex justify-center">
                 <div className="bg-slate-50 px-12 py-3 rounded-full border border-slate-100 text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">
                     Linguistic Transformation Layer v1.0
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
