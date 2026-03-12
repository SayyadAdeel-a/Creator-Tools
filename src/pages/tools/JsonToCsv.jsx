import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileJson, Copy, Check, Download, FileSpreadsheet, Table, RefreshCcw, AlertTriangle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function JsonToCsv() {
  const [json, setJson] = useState('')
  const [csv, setCsv] = useState('')
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError(null)
    setCsv('')
    
    if (!json.trim()) return

    try {
        const parsed = JSON.parse(json)
        if (!Array.isArray(parsed)) throw new Error("Input must be a JSON Array of objects.")
        if (parsed.length === 0) throw new Error("JSON array is empty.")

        const headers = Object.keys(parsed[0])
        const csvRows = []

        // Header row
        csvRows.push(headers.join(','))

        // Data rows
        for (const obj of parsed) {
            const values = headers.map(header => {
                let val = obj[header]
                if (val === undefined || val === null) val = ''
                // Handle strings with commas
                if (typeof val === 'string' && val.includes(',')) val = `"${val}"`
                return val
            })
            csvRows.push(values.join(','))
        }

        setCsv(csvRows.join('\n'))
        trackToolUse('JSON to CSV Converter', 'json-to-csv')
    } catch (err) {
        setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(csv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([csv], {type: 'text/csv'})
    element.href = URL.createObjectURL(file)
    element.download = "data.csv"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>JSON to CSV Converter — Spreadsheet Deployment | VidToolbox</title>
        <meta name="description" content="Export your JSON data to CSV format for Excel or Google Sheets. Professional data transformation tool with automatic comma handling." />
      </Helmet>

      <ToolPage
        title="JSON to CSV Converter"
        icon={FileSpreadsheet}
        description="Convert structured JSON arrays into flat CSV files. Perfect for data analysis, spreadsheet modeling, and exporting database contents into readable table formats."
        howToUse={[
          "Paste your JSON array (list of objects) into the input area",
          "Ensure the JSON is valid and consistently formatted",
          "Click 'Export to CSV' and download the file for use in Excel or Sheets"
        ]}
        faq={[
          { question: "What qualifies as valid input?", answer: "The tool expects an array of objects. Each object should have the same set of keys to ensure your CSV columns align properly." },
          { question: "How are commas handled?", answer: "We automatically wrap fields containing commas in double quotes to preserve data integrity across spreadsheet software." },
          { question: "Is my data private?", answer: "Yes. All processing occurs locally in your browser's memory and is never uploaded to any server." }
        ]}
      >
        <div className="p-6 max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileJson className="w-3 h-3 text-cyan-500" /> SOURCE JSON ARRAY
                        </label>
                        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Supports Bulk Data</span>
                    </div>
                    <textarea 
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        placeholder='[&#10;  { "id": 1, "name": "John" },&#10;  { "id": 2, "name": "Jane" }&#10;]'
                        className="w-full h-[400px] p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-xs resize-none"
                    />
                    <button 
                        onClick={convert}
                        className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Export to CSV
                    </button>
                </div>

                {/* Output Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2 h-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Table className="w-3 h-3 text-emerald-500" /> GENERATED CSV STRING
                        </label>
                        {csv && (
                             <div className="flex gap-4">
                                <button onClick={handleDownload} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 flex items-center gap-1.5 transition-colors">
                                    <Download className="w-3 h-3" /> .csv
                                </button>
                                <button onClick={handleCopy} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}>
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                             </div>
                        )}
                    </div>
                    <div className="relative">
                        <textarea 
                            value={csv}
                            readOnly
                            placeholder="id,name&#10;1,John&#10;2,Jane"
                            className="w-full h-[400px] p-8 bg-slate-50 border border-slate-200 rounded-[40px] shadow-inner outline-none text-slate-900 font-mono text-sm resize-none"
                        />
                        {error && (
                            <div className="absolute inset-0 bg-rose-50/90 flex flex-col items-center justify-center p-12 text-center rounded-[40px] animate-in fade-in duration-300">
                                <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
                                <h4 className="font-black text-rose-900 uppercase tracking-widest text-xs mb-2">Parsing Error</h4>
                                <p className="text-sm text-rose-700 font-mono">{error}</p>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[40px] flex items-center justify-between shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-full bg-emerald-500/10 skew-x-12 translate-x-10 pointer-events-none transition-transform group-hover:translate-x-6"></div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Integrity Check</p>
                            <p className="text-white font-black text-xl">
                                {csv ? csv.split('\n').length - 1 : 0} <span className="text-sm text-slate-500 mr-2">Rows Generated</span>
                            </p>
                        </div>
                        <FileSpreadsheet className="w-10 h-10 text-white/10 group-hover:text-emerald-400/20 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
