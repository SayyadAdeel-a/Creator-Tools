import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Monitor, Smartphone, Video, Maximize, MoveRight, ArrowRight, RefreshCcw } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const COMMON_RESOLUTIONS = [
  { name: 'Full HD', w: 1920, h: 1080, ratio: '16:9' },
  { name: '4K Ultra HD', w: 3840, h: 2160, ratio: '16:9' },
  { name: 'TikTok / Shorts', w: 1080, h: 1920, ratio: '9:16' },
  { name: 'Instagram Square', w: 1080, h: 1080, ratio: '1:1' },
  { name: 'Classic TV', w: 640, h: 480, ratio: '4:3' },
  { name: 'Ultrawide', w: 2560, h: 1080, ratio: '21:9' }
]

export function AspectRatio() {
  const [mode, setMode] = useState('simplify') // 'simplify', 'calculate'
  const [width, setWidth] = useState('1920')
  const [height, setHeight] = useState('1080')
  const [targetRatioW, setTargetRatioW] = useState('16')
  const [targetRatioH, setTargetRatioH] = useState('9')

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)

  const simplified = useMemo(() => {
    const w = parseInt(width)
    const h = parseInt(height)
    if (!w || !h) return null
    const common = gcd(w, h)
    return `${w/common}:${h/common}`
  }, [width, height])

  const calculatedDim = useMemo(() => {
    const w = parseFloat(targetRatioW)
    const h = parseFloat(targetRatioH)
    const knownW = parseFloat(width)
    if (!w || !h || !knownW) return null
    return Math.round((knownW * h) / w)
  }, [targetRatioW, targetRatioH, width])

  const handleTrack = () => {
    trackToolUse('Aspect Ratio Calculator', 'aspect-ratio')
  }

  return (
    <>
      <Helmet>
        <title>Aspect Ratio Calculator — Video & Photo Tools | VidToolbox</title>
        <meta name="description" content="Calculate and simplify aspect ratios for video and photography. Find dimensions for 16:9, 4:3, 21:9, and more. Free tool for YouTube creators and designers." />
      </Helmet>

      <ToolPage
        title="Aspect Ratio Calculator"
        icon={Maximize}
        description="Master your framing. Calculate missing dimensions, simplify resolutions into ratios, and browse standard video formats for YouTube, TikTok, and cinema."
        howToUse={[
          "Enter your width and height to find the simplified ratio (e.g., 1920x1080 → 16:9)",
          "Switch to 'Calculate' mode to find a missing dimension based on a specific ratio",
          "Check the list of common resolutions to ensure you're using industry standards"
        ]}
        faq={[
          { question: "What is the standard YouTube aspect ratio?", answer: "YouTube's standard player is 16:9. If you upload a different ratio, the player will automatically add pillarboxing or letterboxing." },
          { question: "What is 21:9 used for?", answer: "21:9 is known as Ultrawide or Cinematic aspect ratio, commonly used for movies and immersive gaming monitors." },
          { question: "How is aspect ratio calculated?", answer: "It is the proportional relationship between width and height, usually expressed as two numbers separated by a colon (x:y)." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="flex bg-slate-100 p-2 rounded-3xl gap-2 max-w-md mx-auto">
                <button
                    onClick={() => { setMode('simplify'); handleTrack(); }}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                        mode === 'simplify' ? 'bg-white text-cyan-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Simplify Ratio
                </button>
                <button
                    onClick={() => { setMode('calculate'); handleTrack(); }}
                    className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                        mode === 'calculate' ? 'bg-white text-cyan-600 shadow-lg' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Calculate Missing
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Inputs area */}
                <div className="space-y-8">
                    {mode === 'simplify' ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Width (px)</label>
                                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-5 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Height (px)</label>
                                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-5 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-cyan-500/10 text-xl font-bold" />
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-[40px] p-10 text-center shadow-2xl space-y-4">
                                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">Simplified Ratio</span>
                                <div className="text-6xl font-black text-white">{simplified || '0:0'}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                     <input type="number" value={targetRatioW} onChange={(e) => setTargetRatioW(e.target.value)} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-center" placeholder="W ratio" />
                                     <span className="text-slate-300 text-2xl">:</span>
                                     <input type="number" value={targetRatioH} onChange={(e) => setTargetRatioH(e.target.value)} className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-center" placeholder="H ratio" />
                                </div>
                                <div className="relative">
                                     <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl font-bold pl-32 outline-none" placeholder="Known width" />
                                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 uppercase tracking-widest">Width (Known)</div>
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-[40px] p-10 text-center shadow-2xl space-y-4">
                                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">Calculated Height</span>
                                <div className="text-6xl font-black text-white">{calculatedDim || '0'} <span className="text-xl text-slate-500">px</span></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reference list */}
                <div className="space-y-6">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                         <Monitor className="w-5 h-5 text-cyan-500" /> Resolution Registry
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {COMMON_RESOLUTIONS.map((res) => (
                             <button 
                                key={res.name}
                                onClick={() => { setWidth(res.w.toString()); setHeight(res.h.toString()); }}
                                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-cyan-500 hover:shadow-lg transition-all group"
                             >
                                <div className="text-left">
                                    <p className="text-sm font-bold text-slate-900">{res.name}</p>
                                    <p className="text-[10px] text-slate-400 font-mono">{res.w} x {res.h}</p>
                                </div>
                                <div className="bg-slate-50 px-3 py-1 rounded-lg text-xs font-black text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-600">
                                    {res.ratio}
                                </div>
                             </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
