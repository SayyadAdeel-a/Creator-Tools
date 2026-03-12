import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Box, Copy, Check, Hash } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function RgbToHex() {
  const [rgb, setRgb] = useState({ r: 14, g: 165, b: 233 })
  const [hex, setHex] = useState('#0ea5e9')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const toHex = (n) => {
      const h = Math.max(0, Math.min(255, n)).toString(16)
      return h.length === 1 ? '0' + h : h
    }
    const result = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
    setHex(result)
  }, [rgb])

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('RGB to HEX Converter', 'rgb-to-hex')
  }

  const handleInputChange = (channel, value) => {
    const n = parseInt(value) || 0
    setRgb(prev => ({ ...prev, [channel]: Math.min(255, Math.max(0, n)) }))
  }

  return (
    <>
      <Helmet>
        <title>RGB to HEX Converter — Web Design Color Tools | Tenreq</title>
        <meta name="description" content="Convert RGB color values to HEX codes instantly. Free online color converter for web developers and designers with live preview and code copying." />
      </Helmet>

      <ToolPage
        title="RGB to HEX Converter"
        icon={Box}
        description="Transform your RGB color values into web-standard HEX codes. Highly accurate conversion for CSS, HTML, and digital design projects."
        howToUse={[
          "Enter values for Red, Green, and Blue (0 to 255)",
          "Observe the live color preview matching your inputs",
          "Click the HEX code to copy it to your clipboard"
        ]}
        faq={[
          { question: "What is the range for RGB values?", answer: "Each channel (Red, Green, Blue) ranges from 0 (no color) to 255 (full intensity)." },
          { question: "Can I use HEX in CSS?", answer: "Yes, HEX is the most common color format used in CSS and HTML for defining colors." },
          { question: "Does order matter?", answer: "Yes, the standard order is Red, then Green, then Blue (RGB)." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                {['r', 'g', 'b'].map((channel) => (
                  <div key={channel} className="space-y-2">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest block text-center">
                      {channel === 'r' ? 'Red' : channel === 'g' ? 'Green' : 'Blue'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgb[channel]}
                      onChange={(e) => handleInputChange(channel, e.target.value)}
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-center font-mono font-bold text-xl transition-all"
                    />
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgb[channel]}
                      onChange={(e) => handleInputChange(channel, e.target.value)}
                      className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                ))}
              </div>

              <div 
                className="w-full h-48 rounded-3xl shadow-2xl shadow-slate-200 border-8 border-white transition-all duration-300"
                style={{ backgroundColor: hex }}
              ></div>
            </div>

            {/* Output Section */}
            <div className="bg-slate-900 p-10 rounded-[40px] text-center space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500 opacity-10 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 opacity-10 blur-3xl rounded-full"></div>
              
              <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Generated Hex Code</h3>
              
              <div className="relative group cursor-pointer" onClick={handleCopy}>
                <div className="text-5xl md:text-6xl font-mono font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {hex.toUpperCase()}
                </div>
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button 
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                            copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied HEX' : 'Copy Code'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
