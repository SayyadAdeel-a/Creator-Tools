import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, Copy, Check, Download, RefreshCw, FileText } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
]

export function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState('paragraphs')
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let result = []
    
    if (type === 'words') {
        for (let i = 0; i < count; i++) {
            result.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
        }
        setText(result.join(' '))
    } else if (type === 'sentences') {
        for (let i = 0; i < count; i++) {
            const len = 5 + Math.floor(Math.random() * 10)
            let s = []
            for (let j = 0; j < len; j++) {
                s.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
            }
            let str = s.join(' ')
            result.push(str.charAt(0).toUpperCase() + str.slice(1) + '.')
        }
        setText(result.join(' '))
    } else {
        for (let i = 0; i < count; i++) {
            let p = []
            const sCount = 3 + Math.floor(Math.random() * 5)
            for (let k = 0; k < sCount; k++) {
                const len = 8 + Math.floor(Math.random() * 8)
                let s = []
                for (let j = 0; j < len; j++) {
                    s.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
                }
                let str = s.join(' ')
                p.push(str.charAt(0).toUpperCase() + str.slice(1) + '.')
            }
            result.push(p.join(' '))
        }
        setText(result.join('\n\n'))
    }
    trackToolUse('Lorem Ipsum Generator', 'lorem-ipsum')
  }

  // Initial generate
  useMemo(() => {
    if (!text) generate()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "lorem-ipsum.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>Lorem Ipsum Generator — Professional Dummy Text | Tenreq</title>
        <meta name="description" content="Generate professional placeholder text for your design mockups. Choose between paragraphs, sentences, or words format. Free online filler text tool." />
      </Helmet>

      <ToolPage
        title="Lorem Ipsum Generator"
        icon={Type}
        description="The designer's essential companion. Generate high-quality Greeked placeholder text to simulate real copy in your UI designs, news layouts, and website prototypes."
        howToUse={[
          "Select the quantity of text you need (e.g., 5 paragraphs)",
          "Choose your format mode: Paragraphs, Sentences, or individual Words",
          "Click Generate for a new variation, or use Copy/Download to export the results"
        ]}
        faq={[
          { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is standard placeholder text used in the design and printing industry to visualize layouts before the real content is available." },
          { question: "Is the text always the same?", answer: "No, our generator randomizes the word order and sentence lengths to ensure your mockups look organic and realistic." },
          { question: "Why is dummy text important?", answer: "It allows designers to focus on visual hierarchy and typography without being distracted by readable content." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-8">
            {/* Controls Bar */}
            <div className="bg-slate-900 p-6 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center gap-4 border-b-8 border-slate-800">
                <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/10 shrink-0">
                    {['paragraphs', 'sentences', 'words'].map((t) => (
                        <button 
                            key={t}
                            onClick={() => setType(t)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                type === t ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                
                <div className="flex-1 flex items-center gap-4 w-full">
                    <div className="p-1 px-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 w-full md:w-48">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Amount</span>
                        <input 
                            type="number" 
                            min="1" 
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="bg-transparent text-white font-bold outline-none flex-1 py-3"
                        />
                    </div>
                    <button 
                        onClick={generate}
                        className="bg-cyan-500 hover:bg-cyan-400 text-white p-3.5 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all active:scale-95"
                    >
                        <RefreshCw className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex gap-2 shrink-0">
                    <button onClick={handleDownload} className="p-3.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl border border-white/10 transition-all">
                        <Download className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={handleCopy}
                        className={`px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                            copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* Output Area */}
            <div className="bg-white border border-slate-200 rounded-[50px] shadow-sm relative group overflow-hidden">
                <div className="absolute top-8 left-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typeface Mockup Zone</span>
                </div>
                <div className="p-12 md:p-20 min-h-[400px]">
                    <div className="prose prose-slate max-w-none">
                        {text.split('\n\n').map((p, i) => (
                            <p key={i} className="text-slate-600 leading-[1.8] text-lg mb-8 last:mb-0 first-letter:text-4xl first-letter:font-black first-letter:text-cyan-500 first-letter:mr-1">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
                
                {/* Visual accents */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-50 -scale-x-100 rounded-tl-[100px] pointer-events-none"></div>
            </div>
            
            <div className="flex justify-center">
                 <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] flex items-center gap-4">
                     <span className="w-12 h-px bg-slate-100"></span>
                     Standard Dummy Engine v1.0
                     <span className="w-12 h-px bg-slate-100"></span>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
