import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileCode, Copy, Check, Download, Upload, FileJson, Table, RefreshCcw } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function CsvToJson() {
  const [csv, setCsv] = useState('')
  const [json, setJson] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!csv.trim()) {
        setJson('')
        return
    }

    try {
        const lines = csv.trim().split(/\r?\n/)
        if (lines.length < 2) throw new Error("Need at least a header and one data row")

        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
        const result = []

        for (let i = 1; i < lines.length; i++) {
            const obj = {}
            const currentLine = lines[i].split(',')
            
            headers.forEach((header, index) => {
                let val = currentLine[index]?.trim() || ''
                // Remove quotes
                val = val.replace(/^"|"$/g, '')
                // Auto-type numbers/booleans
                if (!isNaN(val) && val !== '') obj[header] = Number(val)
                else if (val.toLowerCase() === 'true') obj[header] = true
                else if (val.toLowerCase() === 'false') obj[header] = false
                else obj[header] = val
            })
            result.push(obj)
        }

        setJson(JSON.stringify(result, null, 2))
        trackToolUse('CSV to JSON Converter', 'csv-to-json')
    } catch (err) {
        setJson(JSON.stringify({ error: err.message }, null, 2))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => setCsv(e.target.result)
    reader.readAsText(file)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([json], {type: 'application/json'})
    element.href = URL.createObjectURL(file)
    element.download = "data.json"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>CSV to JSON Converter — Data Migration Tool | VidToolbox</title>
        <meta name="description" content="Convert CSV spreadsheet data into clean, formatted JSON. Support for custom headers and file uploads. Perfect for web developers and data analysts." />
      </Helmet>

      <ToolPage
        title="CSV to JSON Converter"
        icon={FileJson}
        description="Bridge the gap between spreadsheets and code. Transform your comma-separated values into a structured JSON array instantly. Fully browser-side and secure."
        howToUse={[
          "Paste your CSV data or upload a .csv file directly",
          "Ensure the first row contains your property headers (keys)",
          "Click 'Transform to JSON' and copy or download the resulting structure"
        ]}
        faq={[
          { question: "Does it handle quotes?", answer: "Yes, our engine automatically strips surrounding quotes from CSV fields to produce clean JSON strings." },
          { question: "Is there a row limit?", answer: "While the tool handles thousands of rows, browser memory limits typically suggest keeping inputs under 50MB for optimal performance." },
          { question: "Can it handle nested data?", answer: "CSV is inherently flat. The converter produces a flat array of objects based on your column headers." }
        ]}
      >
        <div className="p-6 max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Table className="w-3 h-3 text-cyan-500" /> RAW CSV Data
                        </label>
                        <label className="cursor-pointer group flex items-center gap-2 text-[10px] font-black text-cyan-600 uppercase tracking-widest hover:text-cyan-700 transition-colors">
                            <Upload className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                            Upload .csv
                            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                    <textarea 
                        value={csv}
                        onChange={(e) => setCsv(e.target.value)}
                        placeholder="id,name,email&#10;1,John Doe,john@example.com&#10;2,Jane Smith,jane@example.com"
                        className="w-full h-[400px] p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-sm resize-none"
                    />
                    <button 
                        onClick={convert}
                        className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Transform to JSON
                    </button>
                </div>

                {/* Output Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2 h-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileCode className="w-3 h-3 text-emerald-500" /> Formatted JSON Array
                        </label>
                        {json && (
                             <div className="flex gap-4">
                                <button onClick={handleDownload} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 flex items-center gap-1.5 transition-colors">
                                    <Download className="w-3 h-3" /> .json
                                </button>
                                <button onClick={handleCopy} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}>
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                             </div>
                        )}
                    </div>
                    <textarea 
                        value={json}
                        readOnly
                        placeholder="[{ 'id': 1, 'name': 'John Doe' }...]"
                        className="w-full h-[400px] p-8 bg-slate-50 border border-slate-200 rounded-[40px] shadow-inner outline-none text-emerald-700 font-mono text-xs resize-none"
                    />
                    <div className="bg-slate-900 p-8 rounded-[40px] flex items-center justify-between shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-full bg-cyan-500/10 skew-x-12 translate-x-10 pointer-events-none transition-transform group-hover:translate-x-6"></div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Quick Metric</p>
                            <p className="text-white font-black text-xl">
                                {json ? JSON.parse(json).length || 0 : 0} <span className="text-sm text-slate-500 mr-2">Objects Mapped</span>
                            </p>
                        </div>
                        <FileJson className="w-10 h-10 text-white/10 group-hover:text-cyan-400/20 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
