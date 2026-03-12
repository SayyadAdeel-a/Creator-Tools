import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Copy, Check, Info, Eraser } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function YoutubeTags() {
  const [input, setInput] = useState('')
  const [tags, setTags] = useState([])
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedComma, setCopiedComma] = useState(false)

  const extractTags = () => {
    let extracted = []
    
    // Check if it's HTML source or comma separated
    if (input.includes('<meta name="keywords" content="')) {
        const match = input.match(/<meta name="keywords" content="([^"]+)">/)
        if (match) extracted = match[1].split(',').map(t => t.trim())
    } else {
        extracted = input.split(/,|\n/).map(t => t.trim()).filter(t => t.length > 0)
    }

    setTags(extracted)
    trackToolUse('YouTube Tags Extractor', 'youtube-tags')
  }

  const handleCopyTags = () => {
    navigator.clipboard.writeText(tags.join(' '))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const handleCopyComma = () => {
    navigator.clipboard.writeText(tags.join(','))
    setCopiedComma(true)
    setTimeout(() => setCopiedComma(false), 2000)
  }

  const charCount = tags.join(',').length
  const limit = 500

  return (
    <>
      <Helmet>
        <title>YouTube Tags Extractor — Analyze Video Keywords | Tenreq</title>
        <meta name="description" content="Extract hidden tags from any YouTube video page source or clean up your comma-separated tag lists. Track character limits and copy tags for SEO instantly." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/youtube-tags" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "YouTube Tags Extractor",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/youtube-tags",
          "description": "Analyze competitor keywords or prepare your own tag lists with character count tracking."
        })}</script>
      </Helmet>

      <ToolPage
        title="YouTube Tags Extractor"
        icon={Hash}
        description="Clean and organize tags for better YouTube SEO. Extract from page source or manage your own lists easily."
        howToUse={[
          "Paste YouTube page source OR a raw comma-separated list of tags",
          "Click 'Extract Tags' to see individual keywords visualized as chips",
          "Monitor the character limit (max 500) and copy your selection"
        ]}
        faq={[
            { question: "How do I get tags from a YouTube video?", answer: "Right-click the video page, select 'View Page Source', and find 'keywords'. Or just paste the whole source here, and we'll find them automatically." },
            { question: "Are tags still important in 2025?", answer: "While titles and descriptions are primary signals, tags still help YouTube's algorithm understand misspelled search queries and niche topics." },
            { question: "What is the tag limit?", answer: "YouTube allows exactly 500 **characters** (not words) for the tags field. Our tool tracks this as you edit." }
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2 font-heading">Input (Source or Comma List)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste comma-separated words OR HTML source code from YouTube..."
              className="w-full h-40 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-4"
            />
            <div className="flex gap-3">
                <button
                    onClick={extractTags}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                >
                    Extract Tags
                </button>
                <button
                    onClick={() => { setInput(''); setTags([]); }}
                    className="px-6 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all"
                >
                    <Eraser className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <Hash className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Total Tags</p>
                        <p className="text-lg font-bold text-slate-900">{tags.length}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <Info className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Total Characters</p>
                        <p className={`text-lg font-bold ${charCount > limit ? 'text-red-500' : 'text-slate-900'}`}>{charCount} / {limit}</p>
                    </div>
                </div>
            </div>
          </div>

          {tags.length > 0 && (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900">Extracted Tags</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleCopyTags}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                                copiedAll ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            Copy All
                        </button>
                        <button 
                            onClick={handleCopyComma}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                                copiedComma ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {copiedComma ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            CSV Copy
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                    {tags.map((tag, i) => (
                        <div key={i} className="px-3 py-1.5 bg-white text-slate-700 text-sm font-medium border border-slate-200 rounded-lg shadow-sm hover:border-cyan-200 transition-colors">
                            {tag}
                        </div>
                    ))}
                </div>
                {charCount > limit && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium text-center">
                        Warning: Your tags exceed YouTube's 500-character limit. Please remove some keywords.
                    </div>
                )}
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
