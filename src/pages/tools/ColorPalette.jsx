import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Palette, Copy, Check, Hash, Wand2, Layers, Grid } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ColorPalette() {
  const [baseHex, setBaseHex] = useState('#0ea5e9')
  const [copied, setCopied] = useState(null)

  const hexToRgb = (hex) => {
    let cleanHex = hex.replace('#', '')
    if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(x => x + x).join('')
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    }
  }

  const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
      const h = Math.max(0, Math.min(255, n)).toString(16)
      return h.length === 1 ? '0' + h : h
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    if (max === min) h = s = 0
    else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b) ? 6 : 0; break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h, s, l) => {
    s /= 100; l /= 100; h /= 360
    let r, g, b
    if (s === 0) r = g = b = l
    else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1; if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3)
    }
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))
  }

  const palette = useMemo(() => {
    const { r, g, b } = hexToRgb(baseHex)
    const { h, s, l } = rgbToHsl(r, g, b)

    return {
      analogous: [
        hslToHex((h + 330) % 360, s, l),
        hslToHex((h + 345) % 360, s, l),
        baseHex,
        hslToHex((h + 15) % 360, s, l),
        hslToHex((h + 30) % 360, s, l)
      ],
      triadic: [
        baseHex,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l)
      ],
      complementary: [
        baseHex,
        hslToHex((h + 180) % 360, s, l)
      ],
      monochromatic: [
        hslToHex(h, s, Math.max(0, l - 30)),
        hslToHex(h, s, Math.max(0, l - 15)),
        baseHex,
        hslToHex(h, s, Math.min(100, l + 15)),
        hslToHex(h, s, Math.min(100, l + 30))
      ]
    }
  }, [baseHex])

  const handleCopy = (hex, idx) => {
    navigator.clipboard.writeText(hex)
    setCopied(`${hex}-${idx}`)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCopyCSS = () => {
    const css = `:root {
  --color-base: ${baseHex};
  --color-1: ${palette.analogous[0]};
  --color-2: ${palette.analogous[1]};
  --color-3: ${palette.analogous[3]};
  --color-4: ${palette.analogous[4]};
}`
    navigator.clipboard.writeText(css)
    setCopied('css-vars')
    setTimeout(() => setCopied(null), 2000)
    trackToolUse('Color Palette Generator', 'color-palette')
  }

  return (
    <>
      <Helmet>
        <title>Color Palette Generator — Design Systems Tool | VidToolbox</title>
        <meta name="description" content="Generate beautiful analogous, triadic, and complementary color palettes based on a base HEX color. Free tool for designers and front-end developers." />
      </Helmet>

      <ToolPage
        title="Color Palette Generator"
        icon={Wand2}
        description="Create professional color schemes instantly. Input a base color to generate complementary, triadic, and analogous palettes with ready-to-use CSS variables."
        howToUse={[
          "Select a base color using the hex input or color picker",
          "Browse the generated palettes for different color harmonies",
          "Copy individual hex codes or the entire palette as CSS variables"
        ]}
        faq={[
          { question: "What are analogous colors?", answer: "Analogous colors are groups of colors that are next to each other on the color wheel, creating a serene and comfortable design." },
          { question: "What is a triadic palette?", answer: "A triadic color scheme uses colors that are evenly spaced around the color wheel, offering high contrast and vibrant balance." },
          { question: "Can I use these in CSS variables?", answer: "Yes! Use the 'Copy as CSS Variables' button to get code you can paste directly into your stylesheet." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            
            {/* Base Color Selection */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">Start with a Base Color</h3>
                    <p className="text-slate-500 text-sm">We'll build the entire design system around this choice.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={baseHex}
                            onChange={(e) => setBaseHex(e.target.value)}
                            className="pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 outline-none font-mono font-bold"
                        />
                    </div>
                    <input
                        type="color"
                        value={baseHex}
                        onChange={(e) => setBaseHex(e.target.value)}
                        className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer"
                    />
                    <button 
                        onClick={handleCopyCSS}
                        className={`px-6 h-[60px] rounded-2xl font-bold flex items-center gap-2 transition-all ${
                            copied === 'css-vars' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10'
                        }`}
                    >
                        {copied === 'css-vars' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        Copy CSS Variables
                    </button>
                </div>
            </div>

            {/* Palettes Grid */}
            <div className="space-y-12">
                 {[
                     { name: 'Analogous Harmony', icon: Layers, colors: palette.analogous },
                     { name: 'Monochromatic Tones', icon: Grid, colors: palette.monochromatic },
                     { name: 'Triadic Balance', icon: Palette, colors: palette.triadic, cols: 'grid-cols-3' },
                     { name: 'Complementary Contrast', icon: Wand2, colors: palette.complementary, cols: 'grid-cols-2' }
                 ].map((section) => (
                    <div key={section.name} className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                                <section.icon className="w-4 h-4" />
                            </div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-500">{section.name}</h4>
                        </div>

                        <div className={`grid ${section.cols || 'grid-cols-5'} gap-4`}>
                            {section.colors.map((color, idx) => (
                                <div 
                                    key={`${color}-${idx}`} 
                                    onClick={() => handleCopy(color, idx)}
                                    className="group cursor-pointer space-y-3"
                                >
                                    <div 
                                        className="aspect-square rounded-3xl border-4 border-white shadow-xl shadow-slate-100 group-hover:scale-105 transition-transform relative overflow-hidden"
                                        style={{ backgroundColor: color }}
                                    >
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                            {copied === `${color}-${idx}` ? <Check className="text-white w-6 h-6" /> : <Copy className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-mono text-[10px] font-black tracking-widest text-slate-400 uppercase">{color}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                 ))}
            </div>
        </div>
      </ToolPage>
    </>
  )
}
