import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, ListTree, Send } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ScriptOutlineGenerator() {
  const [topic, setTopic] = useState('')
  const [outline, setOutline] = useState(null)

  const generateOutline = () => {
    if (!topic.trim()) return

    const sections = [
      { time: "0:00–0:30", title: "Hook", description: `Grab the audience's attention with a bold statement or question about ${topic}.` },
      { time: "0:30–1:00", title: "Intro", description: `Briefly explain who you are and what the video is about: specifically focusing on ${topic}.` },
      { time: "1:00–3:00", title: "Main Point 1", description: `The basics: What everyone needs to know first about ${topic}.` },
      { time: "3:00–6:00", title: "Main Point 2", description: `Getting deeper into the most important aspects of ${topic}.` },
      { time: "6:00–8:00", title: "Main Point 3", description: `Specific tips and tricks to master ${topic}.` },
      { time: "8:00–9:00", title: "Call to Action", description: `Tell them to subscribe for more content about ${topic} and check out other videos.` },
      { time: "9:00–9:30", title: "Outro", description: `Final thoughts and a goodbye message.` }
    ]

    setOutline(sections)
    trackToolUse('Video Script Outline Generator', 'script-outline-generator')
  }

  const handleCopy = () => {
    if (!outline) return
    const text = outline.map(s => `[${s.time}] ${s.title}\n${s.description}`).join('\n\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Helmet>
        <title>Video Script Outline Generator — Plane Your Content | VidToolbox</title>
        <meta name="description" content="Quickly generate a professional video script outline for your next YouTube video. Enter your topic and get a structured plan instantly. Free online script writing tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/script-outline-generator" />
      </Helmet>

      <ToolPage
        title="Video Script Outline Generator"
        icon={ListTree}
        description="Plan your next video in seconds. Enter a topic and get a structured script outline with hooks, main points, and calls to action."
        howToUse={[
          "Type in your main video topic",
          "Click 'Generate Outline' to create a structure",
          "Copy the outline to your notes or script writing app"
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Video Topic</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., How to start a business in 2024"
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              <button
                onClick={generateOutline}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Send className="w-4 h-4" /> Generate
              </button>
            </div>
          </div>

          {outline && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">Your Script Outline</h3>
                <button onClick={handleCopy} className="text-sm text-cyan-600 font-medium flex items-center gap-1.5">
                  <Copy className="w-4 h-4" /> Copy All
                </button>
              </div>
              <div className="space-y-4">
                {outline.map((section, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded tracking-wider uppercase">{section.time}</span>
                      <h4 className="font-bold text-slate-800">{section.title}</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{section.description}</p>
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
