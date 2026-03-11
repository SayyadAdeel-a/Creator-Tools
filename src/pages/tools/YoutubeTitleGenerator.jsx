import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Sparkles, Wand2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState('')
  const [titles, setTitles] = useState([])

  const generateTitles = () => {
    if (!topic.trim()) return

    // Simple keyword extraction (remove common words)
    const stopwords = ['a', 'the', 'is', 'in', 'on', 'at', 'to', 'of', 'and', 'or', 'my', 'how', 'video', 'about']
    const words = topic.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/)
    const keywords = words.filter(w => w.length > 2 && !stopwords.includes(w))
    const mainTopic = keywords.slice(0, 3).join(' ') || topic

    const patterns = [
      `How to ${mainTopic} in 5 Minutes`,
      `10 Simple Ways to ${mainTopic}`,
      `Why ${mainTopic} is Changing Everything`,
      `The Ultimate Guide to ${mainTopic}`,
      `${mainTopic}: Everything You Need to Know`
    ]

    setTitles(patterns)
    trackToolUse('YouTube Title Generator', 'youtube-title-generator')
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Helmet>
        <title>YouTube Title Generator — Free Video Title Ideas | VidToolbox</title>
        <meta name="description" content="Generate catchy and viral YouTube titles for your videos instantly. Get 5 unique title formats based on your topic. Free and no registration required." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/youtube-title-generator" />
      </Helmet>

      <ToolPage
        title="YouTube Title Generator"
        icon={Wand2}
        description="Describe your video topic and generate professional, clickable YouTube title suggestions instantly."
        howToUse={[
          "Enter your video topic or a brief description",
          "Click 'Generate Titles' to see suggestions",
          "Copy the best title format for your video"
        ]}
        faq={[
          { question: "How does it generate titles?", answer: "We extract the core keywords from your description and slot them into high-performing headline formulas used by top creators." },
          { question: "Are these titles SEO-friendly?", answer: "Yes, they are designed to include your main keywords while maintaining a high Click-Through Rate (CTR)." },
          { question: "Can I use these for other platforms?", answer: "Absolutely! While designed for YouTube, these titles work great for TikTok, Reels, and blog posts too." }
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Video Topic</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., how to bake a chocolate cake at home without an oven"
              className="w-full h-24 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
            />
          </div>

          <button
            onClick={generateTitles}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 mb-8"
          >
            <Wand2 className="w-5 h-5" /> Generate Titles
          </button>

          {titles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-slate-900 mb-3">Suggested Titles</h3>
              {titles.map((title, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl group hover:border-cyan-200 transition-colors">
                  <span className="text-slate-700 font-medium">{title}</span>
                  <button
                    onClick={() => handleCopy(title)}
                    className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                    title="Copy Title"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
