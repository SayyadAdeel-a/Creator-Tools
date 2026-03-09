import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileText, AlignLeft, Type, List, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { parseSRT } from '../../lib/srtParser'
import { trackToolUse } from '../../lib/track'

export function SubtitleCounter() {
  const [input, setInput] = useState('')
  const [stats, setStats] = useState(null)

  const countStats = () => {
    const subtitles = parseSRT(input)
    
    let dialogueLines = 0
    let totalChars = 0
    
    for (const sub of subtitles) {
      const lines = sub.text.split('\n').filter(l => l.trim())
      dialogueLines += lines.length
      totalChars += sub.text.replace(/\n/g, '').length
    }
    
    setStats({
      blocks: subtitles.length,
      lines: dialogueLines,
      characters: totalChars
    })
    trackToolUse('Subtitle Line Counter', 'subtitle-counter')
  }

  return (
    <>
      <Helmet>
        <title>Subtitle Line Counter — Free Online Tool for Creators | VidToolbox</title>
        <meta name="description" content="Count subtitle blocks, dialogue lines, and characters in your SRT files instantly." />
      </Helmet>
      
      <ToolPage
        title="Subtitle Line Counter"
        icon={List}
        description="Get detailed statistics about your SRT subtitle files."
        howToUse={[
          "Paste your SRT content into the textarea",
          "Click 'Count' to analyze the subtitle file",
          "View the statistics below"
        ]}
        faq={[
          { question: "What is a subtitle block?", answer: "A subtitle block is a single subtitle entry containing a sequence number, timestamp, and text." },
          { question: "Does it count hidden text?", answer: "No, it only counts visible dialogue text, not timestamps or sequence numbers." }
        ]}
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Input SRT</label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setStats(null); }}
              placeholder="Paste your SRT content here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm resize-none"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{input.length.toLocaleString()} characters</span>
            <button
              onClick={countStats}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
            >
              Count <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border-t border-slate-200">
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <FileText className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.blocks.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Subtitle Blocks</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <AlignLeft className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.lines.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Dialogue Lines</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <Type className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.characters.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Characters</div>
            </div>
          </div>
        )}
      </ToolPage>
    </>
  )
}
