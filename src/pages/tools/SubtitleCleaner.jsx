import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Upload, Copy, Download, Eraser, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SubtitleCleaner() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setInput(event.target.result)
      cleanSubtitles(event.target.result)
    }
    reader.readAsText(file)
  }

  const cleanSubtitles = (srtContent) => {
    const lines = srtContent.split('\n')
    const result = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (/^\d{2}:\d{2}:\d{2},\d{3}\s*-->\s*\d{2}:\d{2}:\d{2},\d{3}$/.test(trimmed)) continue
      result.push(line)
    }

    setOutput(result.join('\n').trim())
  }

  const handleClean = () => {
    cleanSubtitles(input)
    trackToolUse('Subtitle Cleaner', 'subtitle-cleaner')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cleaned.srt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        <title>Subtitle Cleaner — Remove Timestamps from SRT Files Free | Tenreq</title>
        <meta name="description" content="Clean SRT subtitle files by removing all timestamps while keeping the dialogue intact. Free, instant, no upload required. Perfect for turning subtitles into a readable script." />
        <meta name="keywords" content="subtitle cleaner, remove SRT timestamps, clean subtitle file, subtitle to script, remove timestamps from SRT" />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/subtitle-cleaner" />
        <meta property="og:title" content="Subtitle Cleaner — Remove Timestamps from SRT Files | Tenreq" />
        <meta property="og:url" content="https://tenreq.qzz.io/tools/subtitle-cleaner" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Subtitle Cleaner",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/subtitle-cleaner",
          "description": "Remove timestamps from SRT subtitle files and keep only the dialogue text. Free and instant."
        })}</script>
      </Helmet>

      <ToolPage
        title="Subtitle Timestamp Remover"
        icon={Eraser}
        description="Remove only the timestamp lines from your SRT files while keeping sequence numbers and dialogue."
        howToUse={[
          "Paste your SRT content or upload an .srt file",
          "Click the 'Clean' button to remove timestamps",
          "Copy or download the cleaned subtitle file"
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
              {input.length.toLocaleString()} characters
            </div>
          </div>

          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Cleaned Output</h3>
              <div className="flex items-center gap-2">
                {output && (
                  <>
                    <button onClick={handleCopy} className="p-2 text-slate-400 hover:text-cyan-600" title="Copy">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={handleDownload} className="p-2 text-slate-400 hover:text-cyan-600" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Cleaned subtitles will appear here..."
              className="w-full h-80 p-4 focus:outline-none font-mono text-sm resize-none bg-slate-50"
            />
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              {output.length.toLocaleString()} characters
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button onClick={() => { setInput(''); setOutput(''); }} className="text-sm text-slate-500 hover:text-slate-700">
            Reset
          </button>
          <button onClick={handleClean} className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700">
            Clean <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ToolPage>
    </>
  )
}
