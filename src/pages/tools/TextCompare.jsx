import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Split, RefreshCw, Layers } from 'lucide-react'
import { diff_match_patch } from 'diff-match-patch'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TextCompare() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffs, setDiffs] = useState(null)

  const handleCompare = () => {
    const dmp = new diff_match_patch()
    const d = dmp.diff_main(text1, text2)
    dmp.diff_cleanupSemantic(d)
    setDiffs(d)
    trackToolUse('Text Compare', 'text-compare')
  }

  const renderDiff = () => {
    if (!diffs) return null

    return (
      <div className="p-4 bg-slate-900 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed min-h-[200px]">
        {diffs.map(([type, text], i) => {
          let className = 'text-slate-300'
          if (type === 1) className = 'bg-green-900/50 text-green-200 px-0.5 rounded'
          if (type === -1) className = 'bg-red-900/50 text-red-200 px-0.5 rounded line-through decoration-red-500/50'
          
          return (
            <span key={i} className={className}>
              {text}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <ToolPage
      title="Text Compare (Diff Checker)"
      description="Instantly highlight the differences between two blocks of text, scripts, or code."
      icon={Split}
      howToUse={[
        "Enter your original text into the 'Text A' area.",
        "Enter the modified version into the 'Text B' area.",
        "Click Compare to see exactly what changed, what was added, and what was removed."
      ]}
      faq={[
        {
          question: "How does the highlighting work?",
          answer: "Green highlights indicate text that was added in Text B. Red highlights with a strike-through indicate text that was removed from Text A."
        },
        {
          question: "Is this suitable for code?",
          answer: "Yes! It uses a semantic diff algorithm that works great for comparing different versions of scripts, code snippets, or blog drafts."
        },
        {
          question: "Is my text data stored?",
          answer: "Never. The comparison happens entirely within your web browser. No data leaves your computer."
        }
      ]}
    >
      <Helmet>
        <title>Text Compare — Online Diff Checker Tool | Tenreq</title>
        <meta name="description" content="Compare two blocks of text and see the differences instantly. Highlight additions and deletions in your scripts or articles. Free, online, and secure." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/text-compare" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Text A (Original)</label>
            <textarea
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-xs text-slate-700"
              placeholder="Paste original text here..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Text B (Modified)</label>
            <textarea
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-xs text-slate-700"
              placeholder="Paste modified text here..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleCompare}
            disabled={!text1 && !text2}
            className="px-8 py-3 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors disabled:opacity-50 flex items-center gap-2 group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Compare Text
          </button>
        </div>

        {diffs && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold">
              <Layers className="w-5 h-5 text-cyan-500" />
              Comparison Result
            </div>
            {renderDiff()}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
