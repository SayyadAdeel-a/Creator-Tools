import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Download, Split, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { parseSRT, generateSRT, splitSubtitles, splitSubtitlesByTimestamp } from '../../lib/srtParser'

export function SubtitleSplit() {
  const [input, setInput] = useState('')
  const [splitMode, setSplitMode] = useState('linecount')
  const [splitValue, setSplitValue] = useState(50)
  const [part1, setPart1] = useState('')
  const [part2, setPart2] = useState('')

  const handleSplit = () => {
    const subtitles = parseSRT(input)
    let result1, result2
    
    if (splitMode === 'linecount') {
      [result1, result2] = splitSubtitles(subtitles, parseInt(splitValue, 10))
    } else {
      [result1, result2] = splitSubtitlesByTimestamp(subtitles, splitValue)
    }
    
    setPart1(generateSRT(result1))
    setPart2(generateSRT(result2))
  }

  const downloadPart = (content, partNum) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `part${partNum}.srt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        <title>Subtitle Split Tool — Free Online Tool for Creators | VidToolbox</title>
        <meta name="description" content="Split SRT subtitle files by line count or timestamp. Export two separate files." />
      </Helmet>
      
      <ToolPage
        title="Subtitle Split Tool"
        icon={Split}
        description="Split a single SRT file into two separate files."
        howToUse={[
          "Paste your SRT content into the textarea",
          "Choose split mode (by line count or timestamp) and enter the split point",
          "Download Part 1 and Part 2 separately"
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-medium text-slate-900">Input SRT</h3>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SRT content here..."
              className="w-full h-64 p-4 focus:outline-none font-mono text-sm resize-none"
            />
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={splitMode === 'linecount'}
                      onChange={() => setSplitMode('linecount')}
                      className="text-cyan-500"
                    />
                    <span className="text-sm text-slate-600">By line count</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={splitMode === 'timestamp'}
                      onChange={() => setSplitMode('timestamp')}
                      className="text-cyan-500"
                    />
                    <span className="text-sm text-slate-600">By timestamp</span>
                  </label>
                </div>
                {splitMode === 'linecount' ? (
                  <input
                    type="number"
                    value={splitValue}
                    onChange={(e) => setSplitValue(e.target.value)}
                    placeholder="Split after line..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    min="1"
                  />
                ) : (
                  <input
                    type="text"
                    value={splitValue}
                    onChange={(e) => setSplitValue(e.target.value)}
                    placeholder="00:05:00,000"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-sm"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Output Parts</h3>
            </div>
            <div className="p-4 space-y-4">
              {(part1 || part2) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {part1 && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-900">Part 1</span>
                        <span className="text-xs text-slate-500">{part1.split('\n\n').length} blocks</span>
                      </div>
                      <button
                        onClick={() => downloadPart(part1, 1)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  )}
                  {part2 && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-900">Part 2</span>
                        <span className="text-xs text-slate-500">{part2.split('\n\n').length} blocks</span>
                      </div>
                      <button
                        onClick={() => downloadPart(part2, 2)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Split className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Configure split options and click Split</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button onClick={() => { setInput(''); setPart1(''); setPart2(''); }} className="text-sm text-slate-500 hover:text-slate-700">
            Reset
          </button>
          <button
            onClick={handleSplit}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
          >
            Split <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ToolPage>
    </>
  )
}
