import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Plus, Trash2, Clock, Check } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TimestampGenerator() {
  const [chapters, setChapters] = useState([
    { time: '0:00', title: 'Intro' }
  ])
  const [copied, setCopied] = useState(false)

  const addRow = () => {
    setChapters([...chapters, { time: '', title: '' }])
  }

  const removeRow = (index) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter((_, i) => i !== index))
    }
  }

  const updateChapter = (index, field, value) => {
    const newChapters = [...chapters]
    newChapters[index][field] = value
    setChapters(newChapters)
  }

  const getFormattedList = () => {
    return chapters
      .filter(c => c.time.trim() || c.title.trim())
      .map(c => `${c.time.trim()} ${c.title.trim()}`)
      .join('\n')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedList())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Video Timestamp Generator', 'timestamp-generator')
  }

  return (
    <>
      <Helmet>
        <title>Video Timestamp Generator — YouTube Chapter Maker | VidToolbox</title>
        <meta name="description" content="Generate correctly formatted timestamps and chapters for your YouTube video descriptions. Free online timestamp maker for creators." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/timestamp-generator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Video Timestamp Generator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/timestamp-generator",
          "description": "Easily create formatted YouTube timestamps for better engagement and viewer retention."
        })}</script>
      </Helmet>

      <ToolPage
        title="Video Timestamp Generator"
        icon={Clock}
        description="Create perfectly formatted video chapters for YouTube descriptions. Just enter your times and titles — we'll do the rest."
        howToUse={[
          "Add time and title for each chapter row",
          "Click 'Add Row' for more video sections",
          "Copy the full list and paste into your YouTube description"
        ]}
        faq={[
            { question: "How do YouTube chapters work?", answer: "When you list timestamps starting with 0:00 in your description, YouTube automatically divides your video into sections called chapters." },
            { question: "Does the order matter?", answer: "Yes, you must list your timestamps in chronological order (ascending time) for YouTube to recognize them as chapters." },
            { question: "Why should I use chapters?", answer: "Chapters improve viewer retention by making it easy to find specific sections, and they can also show up separately in Google search results." }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-500" /> Chapter List
            </h3>
            
            <div className="space-y-3 mb-6">
                {chapters.map((chapter, index) => (
                    <div key={index} className="flex gap-2 group">
                        <input
                            type="text"
                            value={chapter.time}
                            onChange={(e) => updateChapter(index, 'time', e.target.value)}
                            placeholder="0:00"
                            className="w-24 px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-center font-mono"
                        />
                        <input
                            type="text"
                            value={chapter.title}
                            onChange={(e) => updateChapter(index, 'title', e.target.value)}
                            placeholder="Chapter Title"
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                        />
                        <button 
                            onClick={() => removeRow(index)}
                            className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Remove Chapter"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button 
                onClick={addRow}
                className="w-full bg-white border-2 border-dashed border-slate-200 text-slate-500 py-3 rounded-xl font-bold hover:border-cyan-300 hover:text-cyan-600 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" /> Add Row
            </button>
          </div>

          <div className="p-6 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Final Format</h3>
              <button 
                  onClick={handleCopy} 
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                      copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:text-cyan-600 hover:border-cyan-200'
                  }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied List!' : 'Copy to Description'}
              </button>
            </div>
            <textarea
              value={getFormattedList()}
              readOnly
              placeholder="0:00 Intro..."
              className="w-full h-80 p-4 border border-slate-200 rounded-2xl bg-white outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 shadow-inner"
            />
          </div>
        </div>
      </ToolPage>
    </>
  )
}
