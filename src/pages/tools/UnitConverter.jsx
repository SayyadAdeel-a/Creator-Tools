import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Ruler, Scale, Thermometer, ArrowRightLeft, MoveRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const CONVERSIONS = {
  length: [
    { id: 'mm', name: 'Millimeters', factor: 0.001 },
    { id: 'cm', name: 'Centimeters', factor: 0.01 },
    { id: 'm', name: 'Meters', factor: 1 },
    { id: 'km', name: 'Kilometers', factor: 1000 },
    { id: 'inch', name: 'Inches', factor: 0.0254 },
    { id: 'foot', name: 'Feet', factor: 0.3048 },
    { id: 'mile', name: 'Miles', factor: 1609.34 }
  ],
  weight: [
    { id: 'mg', name: 'Milligrams', factor: 0.001 },
    { id: 'g', name: 'Grams', factor: 1 },
    { id: 'kg', name: 'Kilograms', factor: 1000 },
    { id: 'lb', name: 'Pounds', factor: 453.592 },
    { id: 'oz', name: 'Ounces', factor: 28.3495 }
  ],
  temperature: [
    { id: 'c', name: 'Celsius' },
    { id: 'f', name: 'Fahrenheit' },
    { id: 'k', name: 'Kelvin' }
  ]
}

export function UnitConverter() {
  const [category, setCategory] = useState('length') // length, weight, temperature
  const [val, setVal] = useState('1')
  const [fromUnit, setFromUnit] = useState('m')

  const results = useMemo(() => {
    const input = parseFloat(val)
    if (isNaN(input)) return []

    if (category === 'temperature') {
        let baseC = 0
        if (fromUnit === 'c') baseC = input
        else if (fromUnit === 'f') baseC = (input - 32) * 5/9
        else if (fromUnit === 'k') baseC = input - 273.15

        return [
            { id: 'c', name: 'Celsius', res: baseC },
            { id: 'f', name: 'Fahrenheit', res: (baseC * 9/5) + 32 },
            { id: 'k', name: 'Kelvin', res: baseC + 273.15 }
        ]
    }

    const currentCat = CONVERSIONS[category]
    const baseVal = input * currentCat.find(u => u.id === fromUnit).factor
    
    return currentCat.map(u => ({
        ...u,
        res: baseVal / u.factor
    }))
  }, [category, val, fromUnit])

  const handleTrack = () => {
    trackToolUse('Universal Unit Converter', 'unit-converter')
  }

  return (
    <>
      <Helmet>
        <title>Universal Unit Converter — Length, Weight, Temp | VidToolbox</title>
        <meta name="description" content="Calculate and convert between metric and imperial units instantly. Supports length, weight, and temperature conversions with real-time updates." />
      </Helmet>

      <ToolPage
        title="Universal Unit Converter"
        icon={ArrowRightLeft}
        description="Switch between measurement systems with ease. Convert lengths, weights, and temperatures using highly precise mathematical constants."
        howToUse={[
          "Select a category (Length, Weight, or Temperature) from the top tabs",
          "Enter your source value and select the 'From' unit",
          "Review the comparative list to see the value in all other units simultaneously"
        ]}
        faq={[
          { question: "Are these conversions precise?", answer: "Yes, we use standard international conversion factors (e.g., 1 inch = 25.4mm) to ensure laboratory-grade accuracy." },
          { question: "Does this support metric and imperial?", answer: "Absolutely. You can convert between Kilometers and Miles, or Kilograms and Pounds seamlessly." },
          { question: "What temperature scale is best for science?", answer: "Kelvin (K) is the primary unit of temperature in the International System of Units (SI) and is used extensively in scientific context." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            {/* Category selection */}
            <div className="flex bg-slate-900 p-2 rounded-[32px] gap-2 max-w-xl mx-auto border-8 border-slate-900 shadow-2xl">
                 {[
                     { id: 'length', label: 'Length', icon: Ruler },
                     { id: 'weight', label: 'Weight', icon: Scale },
                     { id: 'temperature', label: 'Temperature', icon: Thermometer }
                 ].map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => { setCategory(cat.id); setFromUnit(CONVERSIONS[cat.id][0].id); handleTrack(); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xs transition-all ${
                            category === cat.id ? 'bg-cyan-500 text-white shadow-xl shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                    </button>
                 ))}
            </div>

            {/* Main converter area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-6">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Initial Value</label>
                        <input 
                            type="number" 
                            value={val} 
                            onChange={(e) => setVal(e.target.value)}
                            className="w-full p-5 bg-white border border-slate-200 rounded-3xl text-2xl font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">From Unit</label>
                        <div className="space-y-2">
                             {CONVERSIONS[category].map((u) => (
                                <button
                                    key={u.id}
                                    onClick={() => setFromUnit(u.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                        fromUnit === u.id ? 'bg-white border-cyan-500 text-cyan-600 shadow-lg' : 'bg-transparent border-transparent text-slate-500 hover:bg-white/50'
                                    }`}
                                >
                                    <span className="text-sm font-bold">{u.name}</span>
                                    <span className="text-[10px] font-mono opacity-50">{u.id}</span>
                                </button>
                             ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                     <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-4 mb-6">Equivalents Matrix</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {results.map((res) => (
                             <div key={res.id} className={`p-8 rounded-[38px] border bg-white transition-all shadow-sm ${res.id === fromUnit ? 'border-cyan-500 bg-cyan-50/30' : 'border-slate-100'}`}>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{res.name}</span>
                                    {res.id === fromUnit && <div className="px-2 py-0.5 bg-cyan-500 text-white text-[8px] font-black rounded-full uppercase">Current</div>}
                                </div>
                                <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
                                    {res.res.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                </div>
                                <div className="mt-4 flex items-center gap-2 group cursor-pointer" onClick={() => { setFromUnit(res.id); setVal(res.res.toString()) }}>
                                     <span className="text-[8px] font-black text-cyan-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Swap as base</span>
                                     <ArrowRightLeft className="w-3 h-3 text-cyan-300 group-hover:text-cyan-500 ml-auto" />
                                </div>
                             </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
