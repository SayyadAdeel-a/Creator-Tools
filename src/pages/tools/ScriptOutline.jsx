import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { List, Copy, Clock, Zap, Check } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ScriptOutline() {
  const [topic, setTopic] = useState('')
  const [duration, setDuration] = useState('10')
  const [outline, setOutline] = useState(null)
  const [copied, setCopied] = useState(false)

  const durations = [
    { label: 'Shorts (60s)', value: '1' },
    { label: 'Standard (5m)', value: '5' },
    { label: 'Deep Dive (10m)', value: '10' },
    { label: 'Full Guide (20m)', value: '20' }
  ]

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60)
    const sec = totalSeconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  const generateOutline = () => {
    if (!topic.trim()) return

    const totalSeconds = parseInt(duration) * 60
    
    // Relative weights for sections
    const structure = [
      { section: 'Hook', weight: 0.05, description: `Start with a strong question or visual about ${topic}.` },
      { section: 'Intro', weight: 0.1, description: `Explain what we're doing and why it matters.` },
      { section: 'Main Point 1', weight: 0.2, description: `The fundamentals of ${topic}.` },
      { section: 'Main Point 2', weight: 0.25, description: `Deep dive into the core mechanics.` },
      { section: 'Main Point 3', weight: 0.2, description: `Pro tips and advanced strategies.` },
      { section: 'CTA & Summary', weight: 0.1, description: `Ask for subs and recap the key takeaway.` },
      { section: 'Outro', weight: 0.1, description: `End with a related video suggestion.` }
    ]

    let currentTimestamp = 0
    const calculated = structure.map(item => {
        const time = formatTime(currentTimestamp)
        const durationForSection = Math.round(totalSeconds * item.weight)
        currentTimestamp += durationForSection
        return { ...item, time }
    })

    setOutline(calculated)
    trackToolUse('Video Script Outline Generator', 'script-outline')
  }

  const handleCopy = () => {
    if (!outline) return
    const text = outline.map(o => `${o.time} - ${o.section}: ${o.description}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Video Script Outline Generator — Visual Storytelling Tool | VidToolbox</title>
        <meta name="description" content="Generate structured outlines for your YouTube videos in seconds. Choose your target duration and get timestamped sections to help you script faster and better." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/script-outline" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Video Script Outline Generator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/script-outline",
          "description": "Structure your video content for better retention with timestamped outlines and section prompts."
        })}</script>
      </Helmet>

      <ToolPage
        title="Video Script Outline Generator"
        icon={List}
        description="Stop staring at a blank page. Structure your next video project with professional sections and pacing based on your target duration."
        howToUse={[
          "Enter your video topic or primary lesson",
          "Select your target video length (1-20 minutes)",
          "Click 'Generate Outline' to see a structured breakdown with timestamps"
        ]}
        faq={[
            { question: "Why is a video outline important?", answer: "An outline ensures your video flows logically, keeps you on track during filming, and prevents rambling — all critical for viewer retention." },
            { question: "Can I use these for podcasting?", answer: "Absolutely! The structure (Hook > Intro > Deep Dive > Outro) is the gold standard for all long-form educational content." },
            { question: "How accurate are the timestamps?", answer: "They are based on standard pacing models for high-retention videos. Use them as targets while scripting or filming." }
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Video Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to Edit Videos, Stock Market 101"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 whitespace-nowrap">Target Duration</label>
              <div className="flex gap-2">
                {durations.map((d) => (
                    <button
                        key={d.value}
                        onClick={() => setDuration(d.value)}
                        className={`flex-1 py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                            duration === d.value 
                            ? 'bg-cyan-50 border-cyan-500 text-cyan-600' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                    >
                        {d.label}
                    </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generateOutline}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-10 shadow-md"
          >
            <Zap className="w-5 h-5" /> Generate Outline
          </button>

          {outline && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Your Script Outline</h3>
                  <button onClick={handleCopy} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                      copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied Outline!' : 'Copy Script'}
                  </button>
              </div>
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner space-y-6">
                {outline.map((o, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                        <div className="w-16 py-1 bg-white border border-slate-200 rounded-lg text-center text-xs font-mono font-bold text-cyan-600 shadow-sm bg-gradient-to-b from-white to-slate-50">
                            {o.time}
                        </div>
                        {i < outline.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-2 group-hover:bg-cyan-200 transition-colors"></div>}
                    </div>
                    <div className="pb-6">
                        <h4 className="font-bold text-slate-900 mb-1">{o.section}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{o.description}</p>
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
