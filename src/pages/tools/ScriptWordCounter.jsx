import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, AlignLeft, Clock, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ScriptWordCounter() {
  const [input, setInput] = useState('')
  const [stats, setStats] = useState(null)

  const calculateStats = () => {
    const words = input.trim().split(/\s+/).filter(w => w.length > 0)
    const chars = input.length
    const wordCount = words.length

    const minutes = wordCount / 130
    const mins = Math.floor(minutes)
    const secs = Math.round((minutes - mins) * 60)
    const duration = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`

    setStats({ words: wordCount, chars, duration })
    trackToolUse('YouTube Script Word Counter', 'script-word-counter')
  }

  return (
    <>
      <Helmet>
        <title>YouTube Script Word Counter — Estimate Video Duration Free | VidToolbox</title>
        <meta name="description" content="Count words in your YouTube or podcast script and estimate how long your video will be. Free online tool based on a 130 wpm speaking rate. No sign-up, works instantly in your browser." />
        <meta name="keywords" content="YouTube script word counter, video script word count, estimate video duration, script length calculator, word counter for video" />
        <link rel="canonical" href="https://vidtoolbox.vercel.app/tools/script-word-counter" />
        <meta property="og:title" content="YouTube Script Word Counter — Estimate Video Duration | VidToolbox" />
        <meta property="og:url" content="https://vidtoolbox.vercel.app/tools/script-word-counter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "YouTube Script Word Counter",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.vercel.app/tools/script-word-counter",
          "description": "Count words in video scripts and estimate video duration. Free, browser-based tool."
        })}</script>
      </Helmet>

      <ToolPage
        title="YouTube Script Word Counter"
        icon={Type}
        description="Calculate word count, character count, and estimated video duration."
        howToUse={[
          "Paste your video script into the textarea",
          "Click 'Calculate' to get statistics",
          "Use the estimated duration to plan your video length"
        ]}
        faq={[
          { question: "What is the speaking rate used?", answer: "We use 130 words per minute, which is a natural conversational pace." },
          { question: "Does it count different languages?", answer: "Yes, it counts all words separated by whitespace." }
        ]}
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Script</label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); if (!e.target.value.trim()) setStats(null); }}
              placeholder="Paste your YouTube script here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{input.length.toLocaleString()} characters</span>
            <button
              onClick={calculateStats}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
            >
              Calculate <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border-t border-slate-200">
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <Type className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.words.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Words</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <AlignLeft className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.chars.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Characters</div>
            </div>
            <div className="bg-cyan-50 rounded-xl p-5 text-center">
              <Clock className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">{stats.duration}</div>
              <div className="text-sm text-slate-600 mt-1">Video Duration</div>
            </div>
          </div>
        )}
      </ToolPage>
    </>
  )
}
