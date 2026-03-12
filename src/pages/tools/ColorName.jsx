import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, Copy, Check, Hash, Tag, Info } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const CSS_COLORS = {
  "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
  "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff",
  "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00",
  "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c",
  "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9",
  "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00",
  "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff",
  "dimgray": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0", "font-bold": "#228b22",
  "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700",
  "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f", "honeydew": "#f0fff0",
  "hotpink": "#ff69b4", "indianred": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
  "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6",
  "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3", "lightgreen": "#90ee90",
  "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899",
  "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
  "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23",
  "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98",
  "paleturquoise": "#afeeee", "palevioletred": "#db7093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f",
  "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "rebeccapurple": "#663399",
  "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072",
  "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0",
  "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f",
  "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347",
  "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00", "yellowgreen": "#9acd32"
}

export function ColorName() {
  const [hex, setHex] = useState('#0ea5e9')
  const [copied, setCopied] = useState(false)

  const hexToRgb = (h) => {
    let cleanHex = h.replace('#', '')
    if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(x => x + x).join('')
    if (cleanHex.length !== 6) return { r: 0, g: 0, b: 0 }
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    }
  }

  const result = useMemo(() => {
    const target = hexToRgb(hex)
    let minDiff = Infinity
    let nearestName = "Custom Color"
    let nearestHex = "#000000"

    Object.entries(CSS_COLORS).forEach(([name, colorHex]) => {
      const current = hexToRgb(colorHex)
      const diff = Math.sqrt(
        Math.pow(target.r - current.r, 2) +
        Math.pow(target.g - current.g, 2) +
        Math.pow(target.b - current.b, 2)
      )
      if (diff < minDiff) {
        minDiff = diff
        nearestName = name
        nearestHex = colorHex
      }
    })

    return { name: nearestName, hex: nearestHex, exact: minDiff === 0 }
  }, [hex])

  const handleCopy = () => {
    navigator.clipboard.writeText(result.name)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Color Name Finder', 'color-name')
  }

  return (
    <>
      <Helmet>
        <title>Color Name Finder — Identify HEX Colors | VidToolbox</title>
        <meta name="description" content="Instantly find the nearest matching CSS name for any HEX color. Identify over 140 standard web colors and their corresponding codes." />
      </Helmet>

      <ToolPage
        title="Color Name Finder"
        icon={Tag}
        description="Ever see a color and wonder what it's legally called in code? Input a HEX value and we'll find the closest official CSS color name for you."
        howToUse={[
          "Enter your custom HEX code or pick one with the color tool",
          "See the nearest match from the 140 standard CSS color names",
          "Copy the name to use in your CSS 'color' or 'background' properties"
        ]}
        faq={[
          { question: "How many color names are there?", answer: "Modern browsers support 140 standard color names defined in the CSS3 Color Module." },
          { question: "What if it's not an exact match?", answer: "We calculate the mathematical distance between your color's RGB values and the standard named colors to find the closest possible sibling." },
          { question: "Are these names safe for all browsers?", answer: "Yes, standard CSS color names like 'Crimson' or 'SkyBlue' are supported by all modern web browsers." }
        ]}
      >
        <div className="p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Input */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Input Color</label>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                value={hex}
                                onChange={(e) => setHex(e.target.value)}
                                className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 outline-none font-mono font-bold"
                            />
                        </div>
                        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                    </div>
                </div>

                <div className="aspect-square w-full rounded-[40px] border-8 border-white shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor: hex }}></div>
                     <div className="absolute bottom-6 left-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white font-black uppercase tracking-widest text-[10px]">
                         Your Selected Color
                     </div>
                </div>
            </div>

            {/* Output */}
            <div className="space-y-8">
                <div className="bg-slate-900 rounded-[50px] p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <h3 className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">Nearest Named Match</h3>
                    
                    <div className="space-y-2">
                        <div className="text-5xl font-black text-white font-heading capitalize truncate px-4">
                            {result.name}
                        </div>
                        <div className="text-slate-500 font-mono text-sm">{result.hex}</div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                         <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${result.exact ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
                             {result.exact ? 'Exact Match' : 'Closest Sibling'}
                         </div>
                         <button 
                            onClick={handleCopy}
                            className={`px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all ${
                                copied ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-cyan-50'
                            }`}
                         >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy Name'}
                         </button>
                    </div>

                    <div className="w-24 h-24 absolute -top-4 -right-4 bg-white/5 rounded-full blur-xl"></div>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
                     <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                     <p className="text-xs text-slate-500 leading-relaxed italic">
                        The name <strong>{result.name}</strong> is a standard CSS keyword. In your code, you can use `color: {result.name};` instead of the HEX values.
                     </p>
                </div>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
