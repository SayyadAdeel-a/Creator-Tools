import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileText, Copy, Check, Hash, RefreshCcw, Type } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function NumberToWords() {
  const [val, setVal] = useState('1234')
  const [copied, setCopied] = useState(false)

  const toWords = (num) => {
    if (num === 0) return 'zero'
    if (num < 0) return 'negative ' + toWords(Math.abs(num))

    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    const scales = ['', 'thousand', 'million', 'billion']

    let words = ''

    const convertChunk = (n) => {
        let chunk = ''
        if (n >= 100) {
            chunk += ones[Math.floor(n / 100)] + ' hundred '
            n %= 100
        }
        if (n >= 20) {
            chunk += tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ones[n % 10] : '')
        } else if (n > 0) {
            chunk += ones[n]
        }
        return chunk
    }

    let scaleIdx = 0
    let tempNum = num

    while (tempNum > 0) {
        const chunk = tempNum % 1000
        if (chunk !== 0) {
            const chunkWords = convertChunk(chunk)
            words = chunkWords + (scales[scaleIdx] ? ' ' + scales[scaleIdx] : '') + (words ? ' ' + words : '')
        }
        tempNum = Math.floor(tempNum / 1000)
        scaleIdx++
    }

    return words.trim()
  }

  const result = useMemo(() => {
    const n = parseInt(val)
    if (isNaN(n)) return ''
    if (n > 1000000000) return 'Limit: 1 Billion'
    return toWords(n)
  }, [val])

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Number to Words Converter', 'number-to-words')
  }

  return (
    <>
      <Helmet>
        <title>Number to Words Converter — Legal & Financial Tool | Tenreq</title>
        <meta name="description" content="Convert numeric values into written English words instantly. Perfect for writing checks, legal documents, and formal reports. Supports up to 1 billion." />
      </Helmet>

      <ToolPage
        title="Number to Words"
        icon={Type}
        description="Transform digits into formal written English. Essential for professional documentation, bank checks, and financial reporting where clarity is paramount."
        howToUse={[
          "Enter your numeric value (up to 1,000,000,000)",
          "Observe the written form appearing instantly in formal English",
          "Click the conversion card to copy the text to your clipboard"
        ]}
        faq={[
          { question: "Why convert numbers to words?", answer: "In legal and financial contexts (like checks or contracts), writing numbers in words prevents tampering and provides an unambiguous record." },
          { question: "What is the maximum limit?", answer: "Currently, our engine supports values up to 1 Billion (1,000,000,000)." },
          { question: "Does it support decimals?", answer: "This version is optimized for whole integers. For financial cents, you typically append 'and X/100' manually." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-2 text-center">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Digit Input</label>
                    <input 
                        type="number" 
                        value={val} 
                        onChange={(e) => setVal(e.target.value)}
                        placeholder="e.g. 150000"
                        className="w-full max-w-md mx-auto p-5 bg-white border border-slate-200 rounded-3xl text-3xl font-black text-center outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono"
                    />
                </div>
            </div>

            <div className="relative group cursor-pointer" onClick={handleCopy}>
                <div className="bg-slate-900 rounded-[50px] p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] transition-transform hover:scale-[1.01]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[100px] rounded-full"></div>
                    
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 relative z-10">Formal Written Form</span>
                    
                    <div className="text-3xl md:text-4xl font-black text-white capitalize leading-tight relative z-10 max-w-2xl group-hover:text-cyan-400 transition-colors">
                        {result || 'Waiting for digits...'}
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-2 relative z-10">
                         <button 
                            className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                                copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                            }`}
                         >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy Text'}
                         </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-8 h-px bg-slate-200"></span>
                     Financial Accuracy Engine Engaged
                     <span className="w-8 h-px bg-slate-200"></span>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
