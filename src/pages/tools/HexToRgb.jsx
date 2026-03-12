import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Palette, Copy, Check, Hash, RefreshCcw } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function HexToRgb() {
  const [hex, setHex] = useState('#0ea5e9')
  const [rgb, setRgb] = useState({ r: 14, g: 165, b: 233 })
  const [hsl, setHsl] = useState({ h: 199, s: 89, l: 48 })
  const [copied, setCopied] = useState('')

  useEffect(() => {
    convert(hex)
  }, [hex])

  const convert = (value) => {
    let cleanHex = value.replace('#', '')
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(x => x + x).join('')
    }
    
    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16)
      const g = parseInt(cleanHex.substring(2, 4), 16)
      const b = parseInt(cleanHex.substring(4, 6), 16)
      
      setRgb({ r, g, b })

      // HSL conversion
      const rRatio = r / 255
      const gRatio = g / 255
      const bRatio = b / 255
      const max = Math.max(rRatio, gRatio, bRatio)
      const min = Math.min(rRatio, gRatio, bRatio)
      let h, s, l = (max + min) / 2

      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case rRatio: h = (gRatio - bRatio) / d + (gRatio < bRatio ? 6 : 0); break
          case gRatio: h = (bRatio - rRatio) / d + 2; break
          case bRatio: h = (rRatio - gRatio) / d + 4; break
        }
        h /= 6
      }
      setHsl({
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      })
    }
  }

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
    trackToolUse('HEX to RGB Converter', 'hex-to-rgb')
  }

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  return (
    <>
      <Helmet>
        <title>HEX to RGB Converter — Design Color Tools | VidToolbox</title>
        <meta name="description" content="Convert HEX color codes to RGB and HSL values instantly. Free online color converter for designers and developers with live preview." />
      </Helmet>

      <ToolPage
        title="HEX to RGB Converter"
        icon={Palette}
        description="Convert hex color codes to RGB and HSL values. Perfect for developers and designers who need precise color values for CSS or design software."
        howToUse={[
          "Enter a 6-digit or 3-digit HEX code (e.g., #0ea5e9)",
          "Use the color picker to select a color visually",
          "Copy the resulting RGB or HSL values with one click"
        ]}
        faq={[
          { question: "What is a HEX color code?", answer: "HEX codes are hexadecimal representations of colors used in web design, consisting of a hashtag followed by six characters (RRGGBB)." },
          { question: "Why convert to RGB?", answer: "Many design programs and CSS frameworks require RGB values for transparency (RGBA) or specific color manipulations." },
          { question: "Does this tool support transparency?", answer: "Currently, this tool focuses on solid HEX to RGB/HSL conversion. For transparency, you can add an alpha value to the RGB result." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">HEX Color Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={hex}
                      onChange={(e) => setHex(e.target.value)}
                      placeholder="0ea5e9"
                      className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none font-mono text-lg"
                    />
                  </div>
                  <input
                    type="color"
                    value={hex.startsWith('#') ? hex : `#${hex}`}
                    onChange={(e) => setHex(e.target.value)}
                    className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer"
                  />
                </div>
              </div>

              {/* Preview Swatch */}
              <div 
                className="w-full h-48 rounded-3xl shadow-xl shadow-slate-200 border-8 border-white transition-all duration-300 transform hover:scale-[1.02]"
                style={{ backgroundColor: hex.startsWith('#') ? hex : `#${hex}` }}
              ></div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>RGB Values</span>
                    <button 
                      onClick={() => handleCopy(rgbString, 'rgb')}
                      className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                    >
                      {copied === 'rgb' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === 'rgb' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['R', 'G', 'B'].map((l, i) => (
                      <div key={l} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="block text-[10px] font-bold text-slate-400 mb-1">{l}</span>
                        <span className="font-mono font-bold text-slate-700">{Object.values(rgb)[i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-center text-slate-600 text-sm">
                    {rgbString}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span>HSL Values</span>
                    <button 
                      onClick={() => handleCopy(hslString, 'hsl')}
                      className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
                    >
                      {copied === 'hsl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === 'hsl' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['H', 'S', 'L'].map((l, i) => (
                      <div key={l} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="block text-[10px] font-bold text-slate-400 mb-1">{l}</span>
                        <span className="font-mono font-bold text-slate-700">{Object.values(hsl)[i]}{i > 0 ? '%' : '°'}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-center text-slate-600 text-sm">
                    {hslString}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
