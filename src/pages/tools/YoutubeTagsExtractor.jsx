import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Hash, Search, Tag as TagIcon } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function YoutubeTagsExtractor() {
  const [text, setText] = useState('')
  const [tags, setTags] = useState([])

  const extractTags = () => {
    if (!text.trim()) return

    // Stopwords to filter out
    const stopwords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'into', 'your', 'video', 'from', 'best', 'how', 'why', 'what', 'who', 'where', 'when'])
    
    // Clean and split text
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopwords.has(word))
    
    // Count frequency
    const freq = {}
    words.forEach(word => freq[word] = (freq[word] || 0) + 1)
    
    // Convert to tag objects and sort by frequency
    const uniqueTags = Object.keys(freq)
      .sort((a, b) => freq[b] - freq[a])
      .slice(0, 30)

    setTags(uniqueTags)
    trackToolUse('YouTube Tags Extractor', 'youtube-tags-extractor')
  }

  const handleCopyTag = (tag) => {
    navigator.clipboard.writeText(tag)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(tags.join(', '))
  }

  return (
    <>
      <Helmet>
        <title>YouTube Tags Extractor — Suggest Video Keywords | VidToolbox</title>
        <meta name="description" content="Extract suggested YouTube tags and keywords from any video title or description instantly. Best free tool for YouTube keyword research." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/youtube-tags-extractor" />
      </Helmet>

      <ToolPage
        title="YouTube Tags Extractor"
        icon={TagIcon}
        description="Extract the most relevant keywords from any video title or description to use as tags for your own content."
        howToUse={[
          "Paste the title or description you want to analyze",
          "Click 'Extract Tags' to generate keyword ideas",
          "Copy individual tags or 'Copy All' to use them"
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Source Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste video title or description here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={extractTags}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 mb-8"
          >
            <Search className="w-5 h-5" /> Extract Tags
          </button>

          {tags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-slate-900">Extracted Tags</h3>
                <button 
                  onClick={handleCopyAll}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4" /> Copy All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyTag(tag)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-cyan-200 hover:text-cyan-600 transition-all font-medium"
                  >
                    <Hash className="w-3 h-3 opacity-40" /> {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
