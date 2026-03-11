import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, FileEdit, Layout } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function YoutubeDescriptionFormatter() {
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState({
    timestamps: true,
    subscribe: true,
    socials: true
  })
  const [output, setOutput] = useState('')

  const formatDescription = () => {
    let result = description.trim()
    const divider = "\n\n" + "—".repeat(20) + "\n\n"

    if (options.timestamps) {
      result += divider + "TIMESTAMPS:\n0:00 Intro\n1:00 Topic 1\n2:00 Topic 2"
    }

    if (options.subscribe) {
      result += divider + "🔔 Subscribe for more: [Link]"
    }

    if (options.socials) {
      result += divider + "CONNECT WITH ME:\n📸 Instagram: [Link]\n🐦 Twitter: [Link]\n🌐 Website: [Link]"
    }

    setOutput(result)
    trackToolUse('YouTube Description Formatter', 'youtube-description-formatter')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>YouTube Description Formatter — Free YouTube SEO Tool | VidToolbox</title>
        <meta name="description" content="Format your YouTube video descriptions with professional dividers, social links, and timestamp placeholders. Free online YouTube SEO tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/youtube-description-formatter" />
      </Helmet>

      <ToolPage
        title="YouTube Description Formatter"
        icon={FileEdit}
        description="Organize your video descriptions with clean formatting, section dividers, and pre-built templates for social links and reminders."
        howToUse={[
          "Paste your raw video description text",
          "Select the extra sections you want to include",
          "Click 'Format' and copy the ready-to-paste result"
        ]}
        faq={[
          { question: "Do the timestamps work automatically?", answer: "Yes, as long as you use the 00:00 format, YouTube will automatically convert them into chapters." },
          { question: "Why is the order important?", answer: "Standard YouTube SEO recommends summary first, then timestamps, then links for maximum reach." },
          { question: "Is there a character limit?", answer: "YouTube allows up to 5,000 characters. Our tool helps you stay within that limit comfortably." }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
            <h3 className="font-medium text-slate-900 mb-4">Description Text</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your video description here..."
              className="w-full h-80 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-6"
            />
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={options.timestamps} 
                  onChange={(e) => setOptions({...options, timestamps: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Add Timestamps Placeholder</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={options.subscribe} 
                  onChange={(e) => setOptions({...options, subscribe: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Add Subscribe Reminder Line</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={options.socials} 
                  onChange={(e) => setOptions({...options, socials: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Add Social Links Placeholder</span>
              </label>
            </div>
          </div>

          <div className="p-6 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900">Formatted Output</h3>
              {output && (
                <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-cyan-600 font-medium">
                  <Copy className="w-4 h-4" /> Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted description will appear here..."
              className="w-full h-[28rem] p-4 border border-slate-200 rounded-xl bg-white outline-none resize-none font-mono text-sm"
            />
          </div>
        </div>

        <div className="p-4 flex justify-end bg-slate-50">
          <button 
            onClick={formatDescription}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700"
          >
            <Layout className="w-5 h-5" /> Format Description
          </button>
        </div>
      </ToolPage>
    </>
  )
}
