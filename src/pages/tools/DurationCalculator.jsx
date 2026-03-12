import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Clock, Plus, Trash2, Eraser, Check, Video, Info } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function DurationCalculator() {
  const [clips, setClips] = useState([''])
  const [copied, setCopied] = useState(false)

  const addClip = () => {
    setClips([...clips, ''])
  }

  const removeClip = (index) => {
    if (clips.length > 1) {
      setClips(clips.filter((_, i) => i !== index))
    }
  }

  const updateClip = (index, value) => {
    const newClips = [...clips]
    newClips[index] = value
    setClips(newClips)
  }

  const clearAll = () => {
    setClips([''])
  }

  const parseToSeconds = (timeStr) => {
    const parts = timeStr.split(':').map(Number)
    if (parts.length === 2) return (parts[0] * 60) + parts[1]
    if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2]
    return 0
  }

  const formatSeconds = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const validSeconds = clips.map(parseToSeconds).filter(s => s > 0)
  const totalSeconds = validSeconds.reduce((acc, s) => acc + s, 0)
  const avgSeconds = validSeconds.length > 0 ? Math.round(totalSeconds / validSeconds.length) : 0
  const maxSeconds = validSeconds.length > 0 ? Math.max(...validSeconds) : 0
  const minSeconds = validSeconds.length > 0 ? Math.min(...validSeconds) : 0

  const handleCopy = () => {
    navigator.clipboard.writeText(formatSeconds(totalSeconds))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Video Duration Calculator', 'duration-calculator')
  }

  return (
    <>
      <Helmet>
        <title>Video Duration Calculator — Sum Up Your Video Clips | VidToolbox</title>
        <meta name="description" content="Calculate the total duration of your video recording sessions or editing timeline. Support for MM:SS and HH:MM:SS formats with average clip length and statistics. Free online tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/duration-calculator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Video Duration Calculator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/duration-calculator",
          "description": "Sum up multiple clip durations and analyze your video recording sessions effortlessly."
        })}</script>
      </Helmet>

      <ToolPage
        title="Video Duration Calculator"
        icon={Video}
        description="Plan your editing timeline. Just enter the length of your raw clips and we'll calculate the total running time and averages for you."
        howToUse={[
          "Enter your clip durations in MM:SS or HH:MM:SS format",
          "Click 'Add Clip' to include more recording segments",
          "Watch the total duration and statistics update in real-time"
        ]}
        faq={[
            { question: "What formats do you support?", answer: "We support MM:SS (Minutes:Seconds) and HH:MM:SS (Hours:Minutes:Seconds) for precise calculation across long projects." },
            { question: "Why do I need a clip calculator?", answer: "It's essential for planning your video length and comparing raw footage vs. final edited runtime." },
            { question: "How are averages calculated?", answer: "We take the sum of all valid entries and divide by the number of clips you've input." }
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-slate-200">
          <div className="p-6 border-r border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 font-heading">
                    <Plus className="w-5 h-5 text-cyan-500" /> Clips
                </h3>
                <button onClick={clearAll} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                    <Eraser className="w-3.5 h-3.5" /> Clear All
                </button>
            </div>
            
            <div className="space-y-3 mb-6">
                {clips.map((clip, index) => (
                    <div key={index} className="flex gap-2 group">
                        <div className="w-8 h-10 flex items-center justify-center text-xs font-bold text-slate-300 group-hover:text-cyan-500 transition-colors">
                            {index + 1}
                        </div>
                        <input
                            type="text"
                            value={clip}
                            onChange={(e) => updateClip(index, e.target.value)}
                            placeholder="e.g., 01:30"
                            className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-lg font-mono"
                        />
                        <button 
                            onClick={() => removeClip(index)}
                            className="p-2.5 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Remove Clip"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button 
                onClick={addClip}
                className="w-full bg-white border-2 border-dashed border-slate-200 text-slate-500 py-3 rounded-xl font-bold hover:border-cyan-200 hover:text-cyan-600 transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" /> Add Clip
            </button>
          </div>

          <div className="p-6 bg-slate-50 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 font-heading">Total Duration</h3>
              <button 
                  onClick={handleCopy} 
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                      copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {copied ? 'Copied Time!' : 'Copy HH:MM:SS'}
              </button>
            </div>

            <div className="mb-10 text-center py-10 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600"></div>
                <div className="text-6xl font-bold text-slate-900 font-mono tracking-wider">
                    {formatSeconds(totalSeconds)}
                </div>
                <div className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Global Timestamp (HH:MM:SS)</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: 'Average Clip', val: formatSeconds(avgSeconds), color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { label: 'Longest Segment', val: formatSeconds(maxSeconds), color: 'text-slate-900', bg: 'bg-white' },
                    { label: 'Shortest Segment', val: formatSeconds(minSeconds), color: 'text-slate-900', bg: 'bg-white' },
                    { label: 'Total Clips', val: validSeconds.length, color: 'text-slate-900', bg: 'bg-white' }
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl border border-slate-200 shadow-sm ${stat.bg}`}>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.val}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-start gap-3 p-4 bg-white/50 border border-slate-200 rounded-2xl">
                <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                    Tip: For precise calculation, use the **SS.ms** format if needed, though this version focuses on full seconds for simplicity.
                </p>
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
