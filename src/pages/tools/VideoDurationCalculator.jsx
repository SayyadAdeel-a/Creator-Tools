import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Plus, Trash2, Timer, Video } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function VideoDurationCalculator() {
  const [clips, setClips] = useState([{ id: 1, label: 'Intro', time: '00:30' }])
  const [total, setTotal] = useState('00:00:30')
  const [avg, setAvg] = useState('00:30')

  useEffect(() => {
    calculateTotal()
  }, [clips])

  const addClip = () => {
    setClips([...clips, { id: Date.now(), label: `Clip ${clips.length + 1}`, time: '01:00' }])
    trackToolUse('Video Duration Calculator', 'video-duration-calculator')
  }

  const removeClip = (id) => {
    if (clips.length > 1) {
      setClips(clips.filter(c => c.id !== id))
    }
  }

  const handleTimeChange = (id, val) => {
    setClips(clips.map(c => c.id === id ? { ...c, time: val } : c))
  }

  const calculateTotal = () => {
    let totalSec = 0
    clips.forEach(c => {
      const parts = c.time.split(':')
      if (parts.length === 2) {
        totalSec += (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0)
      }
    })

    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    
    setTotal(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
    
    const avgSec = Math.round(totalSec / clips.length)
    const am = Math.floor(avgSec / 60)
    const as = avgSec % 60
    setAvg(`${am.toString().padStart(2, '0')}:${as.toString().padStart(2, '0')}`)
  }

  return (
    <>
      <Helmet>
        <title>Video Duration Calculator — Sum Up Your Video Clips | VidToolbox</title>
        <meta name="description" content="Calculate the total duration of your video clips instantly. Add multiple clip lengths to find the total video duration and average clip time. Free online tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/video-duration-calculator" />
      </Helmet>

      <ToolPage
        title="Video Duration Calculator"
        icon={Timer}
        description="Planning a video with multiple segments? Add each clip's duration to see the total length and average segment time instantly."
        howToUse={[
          "Add your clip names and durations in MM:SS format",
          "Click 'Add Clip' to insert more segments",
          "The total video duration updates automatically as you edit"
        ]}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Duration</span>
                <span className="text-4xl font-mono font-bold text-slate-900">{total}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Avg. Clip Length</span>
                <span className="text-4xl font-mono font-bold text-slate-700">{avg}</span>
              </div>
            </div>
            <button
              onClick={addClip}
              className="flex items-center gap-2 bg-cyan-50 text-cyan-600 px-4 py-2.5 rounded-xl font-medium hover:bg-cyan-100 transition-all border border-cyan-100"
            >
              <Plus className="w-5 h-5" /> Add Clip
            </button>
          </div>

          <div className="space-y-3">
            {clips.map((clip) => (
              <div key={clip.id} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200 group">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <Video className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={clip.label}
                  onChange={(e) => setClips(clips.map(c => c.id === clip.id ? { ...c, label: e.target.value } : c))}
                  placeholder="Clip label"
                  className="flex-1 bg-transparent border-none outline-none font-medium text-slate-700"
                />
                <input
                  type="text"
                  value={clip.time}
                  onChange={(e) => handleTimeChange(clip.id, e.target.value)}
                  placeholder="MM:SS"
                  className="w-24 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-center font-mono focus:ring-2 focus:ring-cyan-500"
                />
                <button 
                  onClick={() => removeClip(clip.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove Clip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ToolPage>
    </>
  )
}
