import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Layers, Copy, Check, Hash, ArrowRight, MoveDown, MoveRight, MoveUpRight, CircleDot } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function GradientGenerator() {
  const [color1, setColor1] = useState('#0ea5e9')
  const [color2, setColor2] = useState('#a855f7')
  const [direction, setDirection] = useState('to right')
  const [copied, setCopied] = useState(false)

  const directions = [
    { name: 'Right', value: 'to right', icon: MoveRight },
    { name: 'Bottom', value: 'to bottom', icon: MoveDown },
    { name: 'Diagonal', value: 'to bottom right', icon: MoveUpRight },
    { name: 'Radial', value: 'radial-gradient', icon: CircleDot }
  ]

  const gradientString = direction === 'radial-gradient'
    ? `radial-gradient(circle, ${color1}, ${color2})`
    : `linear-gradient(${direction}, ${color1}, ${color2})`

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('CSS Gradient Generator', 'gradient-generator')
  }

  return (
    <>
      <Helmet>
        <title>CSS Gradient Generator — Modern Design Tool | Tenreq</title>
        <meta name="description" content="Design beautiful linear and radial CSS gradients. Real-time preview with direction controls and one-click CSS code generation for your projects." />
      </Helmet>

      <ToolPage
        title="CSS Gradient Generator"
        icon={Layers}
        description="Create smooth, modern gradients for your website background or UI elements. Choose your colors, set the direction, and copy the CSS code instantly."
        howToUse={[
          "Select two colors to start the gradient mixture",
          "Toggle between linear directions or radial gradient modes",
          "Copy the generated CSS background property for your stylesheet"
        ]}
        faq={[
          { question: "Can I add more than two colors?", answer: "Currently, our generator is optimized for two-color flagship gradients, which are the industry standard for clean UI components." },
          { question: "What is a radial gradient?", answer: "Unlike linear gradients that move in a line, radial gradients emanate from a central point outward." },
          { question: "Is this CSS cross-browser compatible?", answer: "Yes, the generated code uses standard CSS syntax supported by all modern browsers (Chrome, Safari, Firefox, Edge)." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-10">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Start Color</label>
                        <div className="flex gap-2">
                             <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                             <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 px-4 py-4 bg-white border border-slate-200 rounded-2xl font-mono" />
                        </div>
                    </div>
                    <div className="space-y-3">
                         <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">End Color</label>
                         <div className="flex gap-2">
                              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 px-4 py-4 bg-white border border-slate-200 rounded-2xl font-mono" />
                         </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Gradient Direction</label>
                    <div className="grid grid-cols-4 gap-3">
                        {directions.map((dir) => (
                            <button
                                key={dir.value}
                                onClick={() => setDirection(dir.value)}
                                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all gap-2 ${
                                    direction === dir.value ? 'bg-cyan-50 border-cyan-500 text-cyan-600' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                <dir.icon className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{dir.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-8 space-y-4 shadow-2xl relative overflow-hidden group">
                     <div className="flex items-center justify-between text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                         <span>CSS Property</span>
                         <button onClick={handleCopy} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
                             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                             {copied ? 'Copied' : 'Copy Code'}
                         </button>
                     </div>
                     <div className="font-mono text-cyan-100 text-sm leading-relaxed select-all">
                        background: {gradientString};
                     </div>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Visual Preview</label>
                <div 
                    className="w-full h-full min-h-[500px] rounded-[60px] border-8 border-white shadow-2xl transition-all duration-500 ease-in-out relative group overflow-hidden"
                    style={{ background: gradientString }}
                >
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white font-black uppercase tracking-widest text-xs shadow-2xl">
                             Preview Render
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
