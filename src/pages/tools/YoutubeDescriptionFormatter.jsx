import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, FileEdit, FileText, Check, Download, Layout } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function YoutubeDescriptionFormatter() {
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState({
    timestamps: true,
    subscribe: true,
    socials: true,
    hashtags: true
  })
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const formatDescription = () => {
    let result = description.trim()
    const divider = "\n\n" + "—".repeat(20) + "\n\n"

    if (options.timestamps) {
      result += divider + "TIMESTAMPS:\n0:00 Intro\n1:30 Topic 1\n5:45 Conclusion"
    }

    if (options.subscribe) {
      result += divider + "🔔 Subscribe for more: [Your Link Here]"
    }

    if (options.socials) {
      result += divider + "CONNECT WITH ME:\n📸 Instagram: [Link]\n🐦 Twitter: [Link]\n🌐 Website: [Link]"
    }

    if (options.hashtags) {
        result += divider + "HASHTAGS:\n#youtube #creativity #video"
    }

    setOutput(result)
    trackToolUse('YouTube Description Formatter', 'youtube-description-formatter')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([output], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "youtube_description.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>YouTube Description Formatter — SEO & Structure Tool | VidToolbox</title>
        <meta name="description" content="Organize your video descriptions with professional headers, social links, and timestamp sections. Free online YouTube description editor." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/youtube-description-formatter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "YouTube Description Formatter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/youtube-description-formatter",
          "description": "Format and structure your YouTube descriptions for better SEO and engagement. Free and easy-to-use tool."
        })}</script>
      </Helmet>

      <ToolPage
        title="YouTube Description Formatter"
        icon={FileEdit}
        description="Format and structure your YouTube descriptions for better SEO and viewer engagement. No sign-in required."
        howToUse={[
          "Paste your raw video description text above",
          "Select the extra sections you want to include via checkboxes",
          "Click 'Format' and copy or download the result"
        ]}
        faq={[
            { question: "Why is the order of a description important?", answer: "YouTube SEO relies on the first 2-3 lines for keywords, then value-add sections like timestamps and links for viewer retention." },
            { question: "What are the character limits for descriptions?", answer: "YouTube allows up to 5,000 characters. While our tool helps you format, always ensure you don't exceed this limit." },
            { question: "Should I add timestamps manually?", answer: "Yes, you should manually edit the placeholders with your actual video timestamps. YouTube then converts these into clickable chapters." }
          ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-500" /> Description Content
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your main video script summary or intro here..."
              className="w-full h-80 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-8 text-slate-700 leading-relaxed"
            />
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-widest mb-2">Extra Sections</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={options.timestamps} 
                    onChange={(e) => setOptions({...options, timestamps: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Timestamps</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={options.subscribe} 
                    onChange={(e) => setOptions({...options, subscribe: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Subscribe CTA</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={options.socials} 
                    onChange={(e) => setOptions({...options, socials: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Social Links</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                    type="checkbox" 
                    checked={options.hashtags} 
                    onChange={(e) => setOptions({...options, hashtags: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Hashtags Section</span>
                </label>
              </div>
            </div>
            
            <button 
                onClick={formatDescription}
                className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 shadow-md"
            >
                <Layout className="w-5 h-5" /> Format Description
            </button>
          </div>

          <div className="p-6 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Live Preview</h3>
              <div className="flex gap-2">
                <button 
                    onClick={handleDownload} 
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-cyan-600 hover:border-cyan-200 transition-all shadow-sm"
                    title="Download as .txt"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                    onClick={handleCopy} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                        copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:text-cyan-600 hover:border-cyan-200'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Your formatted YouTube description will appear here..."
              className="w-full h-[32rem] p-4 border border-slate-200 rounded-2xl bg-white outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 shadow-inner"
            />
          </div>
        </div>
      </ToolPage>
    </>
  )
}
