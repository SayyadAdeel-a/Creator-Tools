import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { List, Copy, Check, Info, Settings2, Trash2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const BULLET_STYLES = [
  { id: 'dot', label: '• Circle', symbol: '•' },
  { id: 'dash', label: '- Dash', symbol: '-' },
  { id: 'arrow', label: '→ Arrow', symbol: '→' },
  { id: 'check', label: '✓ Check', symbol: '✓' },
  { id: 'numbered', label: '1. Numbered', symbol: '1.' }
]

export function TextToBullets() {
  const [input, setInput] = useState('')
  const [style, setStyle] = useState('dot')
  const [copied, setCopied] = useState(false)

  const formatBullets = () => {
    if (!input.trim()) return ''
    
    const lines = input.split(/\n/).filter(line => line.trim().length > 0)
    const selectedStyle = BULLET_STYLES.find(s => s.id === style)
    
    const formatted = lines.map((line, i) => {
        let cleanLine = line.trim()
        // Capitalize first letter
        cleanLine = cleanLine.charAt(0).toUpperCase() + cleanLine.slice(1)
        
        const prefix = style === 'numbered' ? `${i + 1}.` : selectedStyle.symbol
        return `${prefix} ${cleanLine}`
    })

    return formatted.join('\n')
  }

  const output = formatBullets()

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Text to Bullet Points', 'text-to-bullets')
  }

  return (
    <>
      <Helmet>
        <title>Text to Bullet Points — Viral List Maker | VidToolbox</title>
        <meta name="description" content="Quickly convert a list of sentences or ideas into a crisp, formatted bullet list. Choose from multiple styles like arrows, dashes, circles, and numbered lists. Ideal for social media and content creators." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/text-to-bullets" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Text to Bullet Points",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/text-to-bullets",
          "description": "Structure your text into organized bullet points with style selectors and auto-capitalization."
        })}</script>
      </Helmet>

      <ToolPage
        title="Text to Bullet Points"
        icon={List}
        description="Organize your thoughts into professional lists. Instantly convert raw text lines into stylized bullet points with consistent spacing and grammar."
        howToUse={[
          "Paste your sentences or points (one per line) into the editor",
          "Select your favorite bullet style (Arrow, Check, Numbered, etc.)",
          "Click copy to get your perfectly formatted list for social or blog posts"
        ]}
        faq={[
            { question: "Why should I use bullet points?", answer: "Bullet points make your content easier to scan and improve readability, especially on mobile devices where 'walls of text' are often skipped." },
            { question: "What is the best style for X (Twitter)?", answer: "Arrows (→) and Checks (✓) are highly popular for creating viral educational threads as they draw the eye down through your message." },
            { question: "How does auto-formatting work?", answer: "We automatically trim leading/trailing spaces and ensure each point begins with a capital letter, ensuring a high-quality professional look." }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <List className="w-5 h-5 text-cyan-500" /> Raw Text
                </h3>
                <button onClick={() => setInput('')} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter each point on a new line..."
              className="w-full h-80 p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-8 text-slate-700 leading-relaxed font-sans"
            />
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2"><Settings2 className="w-4 h-4 text-cyan-500" /> Select Bullet Style</h4>
              <div className="grid grid-cols-2 font-heading sm:grid-cols-3 gap-3">
                {BULLET_STYLES.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                            style === s.id 
                            ? 'bg-white border-cyan-500 text-cyan-600 shadow-md ring-2 ring-cyan-500/10' 
                            : 'bg-white/50 border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                    >
                        {s.label}
                    </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Styled Result</h3>
              <button 
                  onClick={handleCopy} 
                  disabled={!output}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xl border ${
                      copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:border-slate-300'
                  }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy List'}
              </button>
            </div>
            
            <textarea
              value={output}
              readOnly
              placeholder="Your formatted bullet list will appear here..."
              className="w-full h-[32rem] p-6 border border-slate-200 rounded-2xl bg-white outline-none resize-none font-mono text-sm leading-relaxed text-slate-700 shadow-inner"
            />

            <div className="mt-6 flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                    Format: Each line is trimmed, capitalized, and prefixed with your chosen style. Perfect for direct pastes into WordPress, Substack, or Notion.
                </p>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
