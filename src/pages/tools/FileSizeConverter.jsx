import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { HardDrive, ArrowRightLeft, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const UNITS = [
  { id: 'b', name: 'Bytes (B)', factor: 1 },
  { id: 'kb', name: 'Kilobytes (KB)', factor: 1024 },
  { id: 'mb', name: 'Megabytes (MB)', factor: 1024 ** 2 },
  { id: 'gb', name: 'Gigabytes (GB)', factor: 1024 ** 3 },
  { id: 'tb', name: 'Terabytes (TB)', factor: 1024 ** 4 }
]

export function FileSizeConverter() {
  const [value, setValue] = useState('1')
  const [unit, setUnit] = useState('mb')

  const conversions = useMemo(() => {
    const val = parseFloat(value)
    if (isNaN(val)) return []

    const currentUnit = UNITS.find(u => u.id === unit)
    const bytes = val * currentUnit.factor

    return UNITS.map(u => ({
      ...u,
      result: bytes / u.factor
    }))
  }, [value, unit])

  const formatResult = (num) => {
    if (num === 0) return '0'
    if (num < 0.0001) return num.toExponential(4)
    return num.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 0 })
  }

  return (
    <>
      <Helmet>
        <title>File Size Converter — Digital Storage Tools | Tenreq</title>
        <meta name="description" content="Calculate and convert between Bytes, KB, MB, GB, and TB instantly. Understand your digital storage limits and file requirements with our simultaneous unit converter." />
      </Helmet>

      <ToolPage
        title="File Size Converter"
        icon={HardDrive}
        description="Convert digital storage units with binary precision (1024 base). See how many bytes are in a terabyte or calculate the exact megabyte count for your video files instantly."
        howToUse={[
          "Enter the number value you wish to convert",
          "Select the starting unit (e.g., Megabytes) from the dropdown",
          "Review the conversion table to see the value in all other units simultaneously"
        ]}
        faq={[
          { question: "Is this based on 1000 or 1024?", answer: "This tool uses the standard binary calculation (1024), which is how operating systems like Windows and macOS calculate file sizes." },
          { question: "What is larger, a Gigabyte or a Terabyte?", answer: "A Terabyte is significantly larger. 1 TB = 1,024 GB." },
          { question: "Why do my files look smaller on my drive?", answer: "Drives are often sold using decimal base (1000), but computers read them in binary base (1024), leading to a perceived 'missing' space." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Input Size</label>
                    <input 
                        type="number" 
                        value={value} 
                        onChange={(e) => { setValue(e.target.value); trackToolUse('File Size Converter', 'file-size'); }}
                        className="w-full p-5 bg-white border border-slate-200 rounded-3xl text-2xl font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono"
                    />
                </div>
                <div className="w-full md:w-64 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Unit</label>
                    <select 
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full p-5 bg-white border border-slate-200 rounded-3xl text-lg font-bold outline-none cursor-pointer hover:border-cyan-500 transition-colors"
                    >
                        {UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                 <div className="flex items-center gap-3 mb-2">
                     <FileCheck className="w-5 h-5 text-emerald-500" />
                     <h3 className="font-bold text-slate-900">Transformation Matrix</h3>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversions.map((c) => (
                        <div key={c.id} className={`p-8 rounded-[38px] border transition-all duration-300 ${c.id === unit ? 'bg-cyan-600 border-cyan-500 shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 hover:border-cyan-200 shadow-sm'}`}>
                             <div className="flex justify-between items-start mb-6">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${c.id === unit ? 'text-cyan-200' : 'text-slate-400'}`}>{c.name}</span>
                                {c.id === unit && <CheckCircle2 className="w-4 h-4 text-white" />}
                             </div>
                             <div className={`text-3xl font-black font-mono tracking-tight break-all ${c.id === unit ? 'text-white' : 'text-slate-900'}`}>
                                {formatResult(c.result)}
                             </div>
                             <div className={`mt-4 pt-4 border-t flex items-center justify-between ${c.id === unit ? 'border-cyan-500/30' : 'border-slate-50'}`}>
                                 <span className={`text-[8px] font-black uppercase tracking-tighter ${c.id === unit ? 'text-cyan-300' : 'text-slate-300'}`}>Unit ID: {c.id}</span>
                                 <ChevronRight className={`w-3 h-3 ${c.id === unit ? 'text-cyan-300' : 'text-slate-200'}`} />
                             </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
