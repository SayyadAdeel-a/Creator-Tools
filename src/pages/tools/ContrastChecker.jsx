import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Eye, ShieldCheck, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ContrastChecker() {
  const [fg, setFg] = useState('#0ea5e9')
  const [bg, setBg] = useState('#ffffff')

  const hexToRgb = (hex) => {
    let cleanHex = hex.replace('#', '')
    if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(x => x + x).join('')
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    }
  }

  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const ratio = useMemo(() => {
    const l1 = getLuminance(...Object.values(hexToRgb(fg)))
    const l2 = getLuminance(...Object.values(hexToRgb(bg)))
    const brightest = Math.max(l1, l2)
    const darkest = Math.min(l1, l2)
    return (brightest + 0.05) / (darkest + 0.05)
  }, [fg, bg])

  const results = {
    ratio: ratio.toFixed(2),
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5
  }

  const StatusIcon = ({ pass }) => pass ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />

  return (
    <>
      <Helmet>
        <title>WCAG Color Contrast Checker — Accessibility Tool | VidToolbox</title>
        <meta name="description" content="Validate your color combinations against WCAG 2.1 accessibility standards. Check contrast ratios for normal and large text to ensure your designs are readable by everyone." />
      </Helmet>

      <ToolPage
        title="Contrast Ratio Checker"
        icon={ShieldCheck}
        description="Ensure your designs are accessible to everyone. Check the contrast ratio between text and background colors based on WCAG 2.1 guidelines (AA and AAA)."
        howToUse={[
          "Select a foreground (text) color using the picker or HEX code",
          "Select a background color for the container or page",
          "Review the final ratio and accessibility ratings for different text sizes"
        ]}
        faq={[
          { question: "What is a good contrast ratio?", answer: "For standard text, WCAG 2.1 level AA requires a ratio of at least 4.5:1. For large text (18pt+), 3:1 is required." },
          { question: "What is the difference between AA and AAA?", answer: "AA is the standard legal requirement for most websites, while AAA is the highest accessibility bar (7:1 for normal text)." },
          { question: "How is contrast calculated?", answer: "It is based on the relative luminance of the two colors, which measures the perceived brightness on a digital screen." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Text Color (Foreground)</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={fg}
                                onChange={(e) => setFg(e.target.value)}
                                className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 outline-none font-mono font-bold"
                            />
                            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Background Color</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={bg}
                                onChange={(e) => setBg(e.target.value)}
                                className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 outline-none font-mono font-bold"
                            />
                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-16 h-[60px] p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer" />
                        </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-slate-900 shadow-2xl space-y-6 text-center">
                        <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest">Contrast Ratio</h4>
                        <div className="text-6xl font-black text-white tracking-tighter">{results.ratio}:1</div>
                        <div className="flex items-center justify-center gap-3">
                            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${results.aaNormal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                {results.aaNormal ? 'Pass' : 'Fail'} AA
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${results.aaaNormal ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-slate-500'}`}>
                                {results.aaaNormal ? 'Pass' : 'Fail'} AAA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest block">Live Preview</label>
                    <div 
                        className="w-full h-full min-h-[400px] rounded-[40px] border-8 border-white shadow-xl p-10 space-y-8 overflow-hidden transition-colors duration-300"
                        style={{ backgroundColor: bg, color: fg }}
                    >
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black leading-tight">Accurate & Inclusive Design.</h2>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Accessibility is not just a checklist; it's about people. This preview shows how readable your chosen text color is against the background.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Normal Text (AA)', pass: results.aaNormal },
                                { label: 'Large Text (AA)', pass: results.aaLarge },
                                { label: 'Normal Text (AAA)', pass: results.aaaNormal },
                                { label: 'Large Text (AAA)', pass: results.aaaLarge }
                            ].map((test) => (
                                <div key={test.label} className="flex items-center gap-3 p-4 bg-black/5 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <StatusIcon pass={test.pass} />
                                    <span className="text-xs font-bold leading-tight">{test.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
