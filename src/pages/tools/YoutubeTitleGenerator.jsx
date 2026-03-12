import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Wand2, Check } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const TONES = [
  { id: 'how-to', name: 'How To' },
  { id: 'listicle', name: 'Listicle' },
  { id: 'story', name: 'Story' },
  { id: 'question', name: 'Question' }
]

const TEMPLATES = {
  'how-to': [
    "How to {topic} in {keyword} Easy Steps",
    "How to {topic}: The Ultimate {keyword} Guide",
    "Stop {topic} Wrong: How to {keyword} Properly",
    "Master {topic} With This {keyword} Strategy",
    "How to {topic} (Even if You're a {keyword} Beginner)"
  ],
  'listicle': [
    "{keyword} Best Ways to {topic}",
    "5 Must-Know {topic} Tips for {keyword}",
    "Top 10 {topic} Secrets You Won't Find on {keyword}",
    "The {keyword} List for Better {topic}",
    "Avoid These 5 {topic} Mistakes (Use {keyword} Instead)"
  ],
  'story': [
    "I Tried {topic} for 30 Days — Here's What {keyword} Taught Me",
    "The Truth About {topic}: My {keyword} Experience",
    "How {topic} Changed My Life (Thanks to {keyword})",
    "My Honest {topic} Reveal: The {keyword} Factor",
    "I Spent $1000 on {topic} vs {keyword} — Result?"
  ],
  'question': [
    "Is {topic} Worth It in 2025? ({keyword} Analysis)",
    "Can You Actually {topic} with {keyword}?",
    "Will {topic} Kill Your {keyword} Business?",
    "Why Does Everyone {topic} with {keyword}?",
    "Is This the End of {topic}? ({keyword} Explained)"
  ]
}

export function YoutubeTitleGenerator() {
  const [topic, setTopic] = useState('')
  const [keyword, setKeyword] = useState('')
  const [tone, setTone] = useState('how-to')
  const [titles, setTitles] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null)

  const generateTitles = () => {
    if (!topic.trim()) return

    const selectedTemplates = TEMPLATES[tone]
    const fallbackKeyword = "Simple"
    const finalKeyword = keyword.trim() || fallbackKeyword

    const generated = selectedTemplates.map(template => 
      template.replace(/{topic}/g, topic.trim()).replace(/{keyword}/g, finalKeyword)
    )

    setTitles(generated)
    trackToolUse('YouTube Title Generator', 'youtube-title-generator')
  }

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <>
      <Helmet>
        <title>YouTube Title Generator — Free Video Title Ideas | Tenreq</title>
        <meta name="description" content="Generate high-CTR YouTube titles instantly. Choose from different tones like How To, Listicle, and Story. Free creator tool for viral video titles." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/youtube-title-generator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "YouTube Title Generator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/youtube-title-generator",
          "description": "Generate viral YouTube titles based on your topic and preferred tone. Free and instant."
        })}</script>
      </Helmet>

      <ToolPage
        title="YouTube Title Generator"
        icon={Wand2}
        description="Craft viral-worthy titles for your YouTube videos based on proven psychological formulas and trends."
        howToUse={[
          "Enter your main video topic (e.g., Baking a Cake)",
          "Add an optional keyword or detail (e.g., 5 Minutes)",
          "Select your preferred tone and click Generate"
        ]}
        faq={[
          { question: "Why do titles matter for YouTube?", answer: "Titles along with thumbnails are the first things viewers see. A high-CTR title can significantly boost your views by appealing to curiosity or value." },
          { question: "Can I use these titles on TikTok?", answer: "Yes! While designed for YouTube, these headline formulas work effectively for any short-form or long-form video platform." },
          { question: "Does this tool use AI?", answer: "This version uses advanced templates based on viral patterns. It's fast, consistent, and works entirely in your browser." }
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Main Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Minecraft, Stock Market"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Optional Keyword (Number, Time, Adjective)</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., 5-Minute, Secret"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-3">Choose Tone</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                    tone === t.id 
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-600' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateTitles}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 mb-10 shadow-md"
          >
            <Wand2 className="w-5 h-5" /> Generate titles
          </button>

          {titles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Generated Suggestions</h3>
              <div className="grid grid-cols-1 gap-4">
                {titles.map((title, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleCopy(title, i)}
                    className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span className="text-slate-800 font-semibold text-lg">{title}</span>
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-500 transition-colors">
                      {copiedIndex === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
