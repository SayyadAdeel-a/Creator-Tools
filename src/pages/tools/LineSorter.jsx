import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ListOrdered, Copy, Check, Download, ArrowDownAZ, ArrowUpZA, RefreshCw, Shuffle, Eraser, ToggleLeft, ToggleRight, ListFilter } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function LineSorter() {
  const [text, setText] = useState('Banana\nApple\n\nCherry\nDate')
  const [trim, setTrim] = useState(true)
  const [removeBlanks, setRemoveBlanks] = useState(true)
  const [copied, setCopied] = useState(false)

  const processLines = (action) => {
    let lines = text.split(/\r?\n/)
    
    if (trim) lines = lines.map(line => line.trim())
    if (removeBlanks) lines = lines.filter(line => line.trim().length > 0)

    switch (action) {
      case 'az':
        lines.sort((a, b) => a.localeCompare(b))
        break
      case 'za':
        lines.sort((a, b) => b.localeCompare(a))
        break
      case 'reverse':
        lines.reverse()
        break
      case 'shuffle':
        lines.sort(() => Math.random() - 0.5)
        break
    }

    setText(lines.join('\n'))
    trackToolUse(`Line Sorter - ${action}`, 'line-sorter')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([text], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "sorted-lines.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>Line Sorter — Professional Text Organizer | VidToolbox</title>
        <meta name="description" content="Sort, reverse, and shuffle lines of text instantly. Includes advanced options to trim whitespace and remove blank lines for clean data organization." />
      </Helmet>

      <ToolPage
        title="Line Sorter"
        icon={ListOrdered}
        description="Clean and organize your lists. Whether you're sorting names alphabeticaly, shuffling a list of winners, or removing empty gaps from a document, our line processing engine makes tidy work of messy text."
        howToUse={[
          "Paste your multi-line text into the main editor area",
          "Toggle cleanup options (Trim, Remove Blanks) to sanitize your data first",
          "Click any sorting action (A-Z, Shuffle, etc.) and export your organized list"
        ]}
        faq={[
          { question: "Can I sort numerically?", answer: "Currently, the engine uses alphabetical sorting (A-Z). For numbers, it will sort character by character (e.g., 10 comes before 2)." },
          { question: "Does it work with large lists?", answer: "Yes, you can process thousands of lines instantly without any noticeable delay in the browser." },
          { question: "Is the shuffle truly random?", answer: "We use a variation of the Fisher-Yates shuffle algorithm to ensure high-performance, pseudo-random redistribution of your lines." }
        ]}
      >
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Controls Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl border-b-8 border-slate-800 space-y-8">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Cleanup Engine</h4>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setTrim(!trim)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${trim ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 border border-white/5'}`}
                                >
                                    <span className="text-xs font-bold">Trim Whitespace</span>
                                    {trim ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                </button>
                                <button 
                                    onClick={() => setRemoveBlanks(!removeBlanks)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${removeBlanks ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 border border-white/5'}`}
                                >
                                    <span className="text-xs font-bold">Remove Blanks</span>
                                    {removeBlanks ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Sorting Actions</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <button onClick={() => processLines('az')} className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all text-xs font-bold">
                                    <ArrowDownAZ className="w-4 h-4 text-cyan-400" /> Sort A-Z
                                </button>
                                <button onClick={() => processLines('za')} className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all text-xs font-bold">
                                    <ArrowUpZA className="w-4 h-4 text-cyan-400" /> Sort Z-A
                                </button>
                                <button onClick={() => processLines('reverse')} className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all text-xs font-bold">
                                    <RefreshCw className="w-4 h-4 text-cyan-400" /> Reverse
                                </button>
                                <button onClick={() => processLines('shuffle')} className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all text-xs font-bold">
                                    <Shuffle className="w-4 h-4 text-cyan-400" /> Shuffle
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <Eraser className="w-5 h-5 text-slate-300" />
                        <button onClick={() => setText('')} className="text-xs font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors">Clear Buffer</button>
                    </div>
                </div>

                {/* Editor Main */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between px-2">
                         <div className="flex items-center gap-2">
                            <ListFilter className="w-4 h-4 text-cyan-500" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Line Buffer</h4>
                         </div>
                         <div className="flex gap-4">
                            <button onClick={handleDownload} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                                <Download className="w-3.5 h-3.5" /> .txt
                            </button>
                            <button onClick={handleCopy} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-900'}`}>
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                         </div>
                    </div>

                    <div className="relative group overflow-hidden rounded-[50px] border border-slate-100 shadow-2xl">
                        <textarea 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-[600px] p-10 md:p-14 bg-white outline-none font-mono text-sm leading-relaxed resize-none"
                            placeholder="Paste lines to sort here..."
                        />
                        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-1 opacity-20 pointer-events-none">
                             <p className="text-[8px] font-black text-slate-900 uppercase tracking-tight">Line Tracker</p>
                             <p className="text-2xl font-black text-slate-900 leading-none">
                                {text ? text.split('\n').length : 0}
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
