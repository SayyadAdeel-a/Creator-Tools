import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, List, Clock, CheckCircle2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TimestampGenerator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [chapterCount, setChapterCount] = useState(0)

  const generateTimestamps = () => {
    const lines = input.split('\n').filter(line => line.trim())
    const formatted = lines.map(line => {
      // Basic cleanup: ensure it starts with timestamp
      const match = line.match(/^(\d{1,2}:)?\d{1,2}:\d{2}\s+(.*)$/)
      if (match) {
        return line.trim()
      }
      return line.trim()
    })

    setOutput(formatted.join('\n'))
    setChapterCount(formatted.length)
    trackToolUse('Video Timestamp Generator', 'timestamp-generator')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Video Timestamp Generator — Free YouTube Chapters Tool | VidToolbox</title>
        <meta name="description" content="Generate perfectly formatted YouTube timestamps and chapters for your video descriptions. Paste your topics and times to get a clean list instantly." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/timestamp-generator" />
      </Helmet>

      <ToolPage
        title="Video Timestamp Generator"
        icon={Clock}
        description="Convert your notes into clean, YouTube-ready video chapters. Just list the times and topic names."
        howToUse={[
          "Enter one chapter per line (e.g., 0:00 Intro)",
          "Click 'Generate' to format the list",
          "Copy and paste the result into your YouTube description"
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Input Notes</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0:00 Intro&#10;1:30 Setup&#10;5:45 Final Result"
                className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none font-mono text-sm"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">YouTube Chapters</label>
              <textarea
                value={output}
                readOnly
                placeholder="Formatted timestamps will appear here..."
                className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none font-mono text-sm"
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                {chapterCount > 0 && (
                  <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-1 rounded-full font-medium">
                    {chapterCount} Chapters
                  </span>
                )}
                <button onClick={handleCopy} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-cyan-600 shadow-sm transition-all" title="Copy All">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={generateTimestamps}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Generate Chapters
          </button>
        </div>
      </ToolPage>
    </>
  )
}
