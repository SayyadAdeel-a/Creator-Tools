import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Upload, Copy, Download, FileText, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SrtToText() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setInput(event.target.result)
      convertToText(event.target.result)
    }
    reader.readAsText(file)
  }

  const convertToText = (srtContent) => {
    const lines = srtContent.split('\n')
    const result = []
    let lastWasEmpty = false

    for (const line of lines) {
      const trimmed = line.trim()

      if (/^\d+$/.test(trimmed)) continue
      if (/^\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}$/.test(trimmed)) continue

      if (trimmed === '') {
        if (!lastWasEmpty) {
          result.push('')
          lastWasEmpty = true
        }
      } else {
        result.push(trimmed)
        lastWasEmpty = false
      }
    }

    setOutput(result.filter(line => line !== '').join(' '))
  }

  const handleConvert = () => {
    convertToText(input)
    trackToolUse('SRT to Text Converter', 'srt-to-text')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputLength = input.length
  const outputLength = output.length

  return (
    <>
      <Helmet>
        <title>SRT to Text Converter — Free Online Tool | VidToolbox</title>
        <meta name="description" content="Convert SRT subtitle files to plain text online, free and instantly. Remove sequence numbers, timestamps, and blank lines — get clean readable text. No upload required, works in your browser." />
        <meta name="keywords" content="SRT to text, convert SRT to text, remove subtitle timestamps, subtitle to plain text, free SRT converter online" />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/srt-to-text" />
        <meta property="og:title" content="SRT to Text Converter — Free Online Tool | VidToolbox" />
        <meta property="og:description" content="Convert SRT subtitle files to plain text instantly — no sign-up, no upload limits. Runs entirely in your browser." />
        <meta property="og:url" content="https://vidtoolbox.qzz.io/tools/srt-to-text" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SRT to Text Converter",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/srt-to-text",
          "description": "Convert SRT subtitle files to plain text. Remove timestamps and sequence numbers. Free, instant, browser-based."
        })}</script>
      </Helmet>

      <ToolPage
        title="SRT to Text Converter"
        icon={FileText}
        description="Convert your SRT subtitle files to clean, readable plain text."
        howToUse={[
          "Paste your SRT content into the input textarea or upload an .srt file",
          "Click the 'Convert' button to process the file",
          "Copy the result or download it as a .txt file"
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Input SRT</h3>
              <input
                type="file"
                ref={fileInputRef}
                accept=".srt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                <Upload className="w-4 h-4" /> Upload file
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SRT content here..."
              className="w-full h-80 p-4 focus:outline-none font-mono text-sm resize-none"
            />
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              {inputLength.toLocaleString()} characters
            </div>
          </div>

          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Plain Text</h3>
              <div className="flex items-center gap-2">
                {output && (
                  <>
                    <button
                      onClick={handleCopy}
                      className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Converted text will appear here..."
              className="w-full h-80 p-4 focus:outline-none font-mono text-sm resize-none bg-slate-50"
            />
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              {outputLength.toLocaleString()} characters
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            onClick={() => { setInput(''); setOutput(''); }}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Reset
          </button>
          <button
            onClick={handleConvert}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-sm hover:shadow"
          >
            Convert <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ToolPage>
    </>
  )
}
