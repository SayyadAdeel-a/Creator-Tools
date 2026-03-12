import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Copy, Check, RefreshCw, Layers, List, Binary } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function UuidGenerator() {
  const [uuids, setUuids] = useState([])
  const [bulkCount, setBulkCount] = useState(10)
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)

  const generateSingle = useCallback(() => {
    const newId = crypto.randomUUID()
    setUuids([newId])
    trackToolUse('UUID Generator - Single', 'uuid-generator')
  }, [])

  const generateBulk = useCallback(() => {
    const count = Math.min(100, Math.max(1, bulkCount))
    const newIds = Array.from({ length: count }, () => crypto.randomUUID())
    setUuids(newIds)
    trackToolUse('UUID Generator - Bulk', 'uuid-generator')
  }, [bulkCount])

  // Initial generate
  useMemo(() => {
    if (uuids.length === 0) generateSingle()
  }, [])

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const handleCopyOne = (id, idx) => {
    navigator.clipboard.writeText(id)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <>
      <Helmet>
        <title>UUID v4 Generator — Bulk Unique Identifiers | VidToolbox</title>
        <meta name="description" content="Generate cryptographically strong UUID v4 identifiers instantly. Support for single generation and bulk batches up to 100." />
      </Helmet>

      <ToolPage
        title="UUID Generator"
        icon={Hash}
        description="Create RFC 4122 compliant version 4 UUIDs. Our generator uses the browser's native secure random number generator to ensure absolute uniqueness for your databases and API projects."
        howToUse={[
          "Click 'Single Generate' for a quick unique ID",
          "Enter a quantity (up to 100) and click 'Bulk Generate' for a batch list",
          "Use 'Copy All' or individual icons to transfer IDs to your code"
        ]}
        faq={[
          { question: "What is UUID v4?", answer: "Version 4 UUIDs are globally unique identifiers generated using random or pseudo-random numbers." },
          { question: "Are they truly unique?", answer: "The probability of a duplicate is effectively zero. Even with trillions of UUIDs generated, a collision is statistically impossible." },
          { question: "Is this secure?", answer: "Yes. We use the browser's `crypto.randomUUID()` which uses a cryptographically secure random number generator (CSPRNG)." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-10">
            {/* Control Bridge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl border-b-8 border-slate-800 flex flex-col justify-between group">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Binary className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-white font-bold">Standard Single</h3>
                        </div>
                        <p className="text-slate-400 text-xs mb-8">Generate one high-entropy identifier for a single use-case.</p>
                    </div>
                    <button 
                        onClick={generateSingle}
                        className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all active:scale-95"
                    >
                        New Identifier
                    </button>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <Layers className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-slate-900 font-bold">Bulk Engine</h3>
                        </div>
                        <div className="relative mb-8">
                            <input 
                                type="number"
                                value={bulkCount}
                                onChange={(e) => setBulkCount(parseInt(e.target.value) || 0)}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-bold pl-32 outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity:</div>
                        </div>
                    </div>
                    <button 
                        onClick={generateBulk}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10"
                    >
                        Generate Batch Batch
                    </button>
                </div>
            </div>

            {/* Output List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <List className="w-4 h-4 text-slate-400" />
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identifier Stream</h4>
                    </div>
                    {uuids.length > 1 && (
                        <button 
                            onClick={handleCopyAll}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                                copiedAll ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {copiedAll ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedAll ? 'Copied' : 'Copy All List'}
                        </button>
                    )}
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-[50px] p-8 md:p-12 space-y-3">
                    {uuids.map((id, idx) => (
                        <div 
                            key={id} 
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-cyan-500 transition-all animate-in fade-in slide-in-from-left-4 duration-300"
                            style={{ animationDelay: `${idx * 30}ms` }}
                        >
                            <span className="font-mono text-xs md:text-sm font-bold text-slate-400 group-hover:text-cyan-600 transition-colors">
                                <span className="mr-4 opacity-30 select-none">#{idx + 1}</span>
                                {id}
                            </span>
                            <button 
                                onClick={() => handleCopyOne(id, idx)}
                                className={`p-2.5 rounded-xl transition-all ${
                                    copiedIdx === idx ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 group-hover:text-cyan-600'
                                }`}
                            >
                                {copiedIdx === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}

function useMemo(fn, deps) {
    const [val, setVal] = useState(null)
    useEffect(() => {
        fn()
    }, deps)
    return val
}
