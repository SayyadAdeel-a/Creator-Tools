import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Percent, Hash, Calculator, RefreshCcw, TrendingUp } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function PercentageCalculator() {
  const [mode, setMode] = useState('of') // 'of', 'what', 'change'
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')

  const result = useMemo(() => {
    const x = parseFloat(val1)
    const y = parseFloat(val2)
    if (isNaN(x) || isNaN(y)) return null

    switch (mode) {
      case 'of': return (x / 100) * y
      case 'what': return (x / y) * 100
      case 'change': return ((y - x) / x) * 100
      default: return null
    }
  }, [mode, val1, val2])

  const handleTrack = () => {
      trackToolUse('Percentage Calculator', 'percentage-calculator')
  }

  return (
    <>
      <Helmet>
        <title>Percentage Calculator — Fast Online Math Tool | VidToolbox</title>
        <meta name="description" content="Calculate percentages, percentage increases, and proportions instantly. Three powerful modes for all your business and financial math needs. Free online calculator." />
      </Helmet>

      <ToolPage
        title="Percentage Calculator"
        icon={Percent}
        description="Solve any percentage problem instantly. Whether you need to find a discount, calculate a growth rate, or determine a proportion, our multi-mode calculator has you covered."
        howToUse={[
          "Choose a calculation mode (Percentage Of, What Percentage, or % Change)",
          "Enter your values into the input fields",
          "The result updates in real-time as you type"
        ]}
        faq={[
          { question: "How is percentage increase calculated?", answer: "The formula is: ((New Value - Original Value) / Original Value) * 100." },
          { question: "Can I use negative numbers?", answer: "Yes, our calculator supports negative values for calculating percentage decreases or negative growth rates." },
          { question: "What is the 'X is what % of Y' mode used for?", answer: "This is commonly used for finding test scores, proportion of goals met, or relative weight of a component in a total." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            {/* Tabs */}
            <div className="flex bg-slate-100 p-2 rounded-3xl gap-2">
                {[
                    { id: 'of', label: 'X% of Y', icon: Hash },
                    { id: 'what', label: 'X is ?% of Y', icon: Calculator },
                    { id: 'change', label: '% Change', icon: TrendingUp }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setMode(tab.id); handleTrack(); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all ${
                            mode === tab.id ? 'bg-white text-cyan-600 shadow-xl shadow-slate-200' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <tab.icon className={`w-4 h-4 ${mode === tab.id ? 'text-cyan-500' : 'text-slate-400'}`} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    {mode === 'of' && (
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-slate-900 font-heading">What is <span className="text-cyan-600">X%</span> of <span className="text-cyan-600">Y</span>?</h4>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Percentage (X)</label>
                                    <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 20" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total Amount (Y)</label>
                                    <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 500" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'what' && (
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-slate-900 font-heading"><span className="text-cyan-600">X</span> is what percentage of <span className="text-cyan-600">Y</span>?</h4>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Part (X)</label>
                                    <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 50" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Total (Y)</label>
                                    <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 200" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'change' && (
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-slate-900 font-heading">% increase/decrease from <span className="text-cyan-600">X</span> to <span className="text-cyan-600">Y</span>?</h4>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Initial Value (X)</label>
                                    <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 100" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Final Value (Y)</label>
                                    <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 150" className="w-full p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Display */}
                <div className="bg-slate-900 p-12 rounded-[50px] text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    <div className="space-y-4 relative z-10">
                        <div className="text-slate-500 text-xs font-black uppercase tracking-widest">Calculated Result</div>
                        <div className="text-7xl font-black text-white tracking-tighter transition-all duration-300 group-hover:scale-105 group-hover:text-cyan-400">
                             {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'}
                             {mode !== 'of' && <span className="text-3xl ml-1 text-slate-400">%</span>}
                        </div>
                        {result !== null && mode === 'change' && (
                            <div className={`text-sm font-bold uppercase tracking-widest ${result >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {result >= 0 ? 'Increase' : 'Decrease'}
                            </div>
                        )}
                        {result === null && (
                            <div className="text-slate-600 text-xs italic">Waiting for input values...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
