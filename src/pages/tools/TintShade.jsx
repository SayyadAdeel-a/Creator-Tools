import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Sun, Moon, Copy, Check, Hash, ArrowUp, ArrowDown } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TintShade() {
  const [hex, setHex] = useState('#0ea5e9')
  const [copied, setCopied] = useState(null)

  const h2r = (h) => {
    let c = h.replace('#', '')
    if(c.length === 3) c = c.split('').map(x => x + x).join('')
    return {
      r: parseInt(c.substring(0,2), 16),
      g: parseInt(c.substring(2,4), 16),
      b: parseInt(c.substring(4,6), 16)
    }
  }

  const r2h = (r, g, b) => {
    const f = (n) => {
        const h = Math.max(0, Math.min(255, n)).toString(16)
        return h.length === 1 ? '0' + h : h
    }
    return `#${f(r)}${f(g)}${f(b)}`
  }

  const generate = useMemo(() => {
    const { r, g, b } = h2r(hex)
    const tints = []
    const shades = []

    for(let i = 1; i <= 5; i++) {
        const factor = i * 0.15
        // Tints: mix with white (255)
        tints.push(r2h(
            Math.round(r + (255 - r) * factor),
            Math.round(g + (255 - g) * factor),
            Math.round(b + (255 - b) * factor)
        ))
        // Shades: mix with black (0)
        shades.push(r2h(
            Math.round(r * (1 - factor)),
            Math.round(g * (1 - factor)),
            Math.round(b * (1 - factor))
        ))
    }

    return { tints: tints.reverse(), shades: shades }
  }, [hex])

  const handleCopy = (color, id) => {
    navigator.clipboard.writeText(color)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
    trackToolUse('Tint & Shade Generator', 'tint-shade')
  }

  return (
    <>
      <Helmet>
        <title>Tint & Shade Generator — Color Variant Tool | VidToolbox</title>
        <meta name="description" content="Generate 5 lighter tints and 5 darker shades for any HEX color. Perfect for building hover states and UI depth in your design projects. Free online color tool." />
      </Helmet>

      <ToolPage
        title="Tint & Shade Generator"
        icon={Sun}
        description="Expand your color palette. Input a core brand color to instantly generate professional tints (lighter) and shades (darker) for UI elements, hover states, and shadows."
        howToUse={[
          "Select your base color using the HEX input or color picker",
          "Observe the vertical spectrum of tints moving toward white and shades toward black",
          "Click any variant to copy its HEX code for your CSS or design tool"
        ]}
        faq={[
          { question: "What is a color tint?", answer: "A tint is created by adding white to a pure color, effectively increasing its lightness while maintaining its hue." },
          { question: "What is a color shade?", answer: "A shade is created by adding black to a pure color, which increases its darkness and depth." },
          { question: "When should I use these?", answer: "Use tints for background highlights and secondary buttons. Use shades for shadows, text contrast, and active hover states." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto space-y-12">
            {/* Input */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <div className="space-y-3 w-full max-w-[300px]">
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest text-center block">Base Color</label>
                     <div className="flex gap-2">
                        <input
                            type="text"
                            value={hex}
                            onChange={(e) => setHex(e.target.value)}
                            className="flex-1 px-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-mono font-bold text-center"
                        />
                        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-full min-h-[56px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                     </div>
                 </div>
            </div>

            {/* Variants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Tints */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <Sun className="w-5 h-5 text-amber-500" />
                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900">Lighter Tints</h4>
                    </div>
                    <div className="space-y-2">
                        {generate.tints.map((c, i) => (
                            <button 
                                key={`tint-${i}`}
                                onClick={() => handleCopy(c, `t-${i}`)}
                                className="w-full h-16 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex group relative"
                            >
                                <div className="h-full flex-1 transition-transform group-hover:scale-[1.05]" style={{ backgroundColor: c }}></div>
                                <div className="absolute inset-y-0 right-0 w-32 bg-white/20 backdrop-blur-md flex items-center justify-center border-l border-white/30 group-hover:bg-white/40">
                                    <span className="font-mono text-[10px] font-black tracking-widest text-slate-900 uppercase">
                                        {copied === `t-${i}` ? <Check className="w-4 h-4 mx-auto" /> : c}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Shades */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <Moon className="w-5 h-5 text-indigo-500" />
                        <h4 className="font-black text-sm uppercase tracking-widest text-slate-900">Darker Shades</h4>
                    </div>
                    <div className="space-y-2">
                        {generate.shades.map((c, i) => (
                            <button 
                                key={`shade-${i}`}
                                onClick={() => handleCopy(c, `s-${i}`)}
                                className="w-full h-16 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex group relative"
                            >
                                <div className="h-full flex-1 transition-transform group-hover:scale-[1.05]" style={{ backgroundColor: c }}></div>
                                <div className="absolute inset-y-0 right-0 w-32 bg-black/20 backdrop-blur-sm flex items-center justify-center border-l border-white/10 group-hover:bg-black/30">
                                    <span className="font-mono text-[10px] font-black tracking-widest text-white uppercase">
                                        {copied === `s-${i}` ? <Check className="w-4 h-4 mx-auto" /> : c}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Center Swatch */}
            <div className="flex justify-center">
                 <div className="bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100 flex items-center gap-4 animate-in fade-in duration-1000">
                     <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: hex }}></div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Core Fragment</span>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
