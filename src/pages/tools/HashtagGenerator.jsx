import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Hash, Wand2, Plus } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function HashtagGenerator() {
  const [topic, setTopic] = useState('')
  const [groups, setGroups] = useState(null)

  const generateHashtags = () => {
    if (!topic.trim()) return

    const base = topic.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2)
    if (base.length === 0) return

    const primary = base[0]
    
    const high = [
      `#${primary}`, `#${primary}life`, `#${primary}daily`, `#love${primary}`, `#${primary}video`, 
      `#trending`, `#viral`, `#foryou`, `#explore`, `#reels`
    ]
    
    const medium = [
      `#${primary}tips`, `#${primary}tricks`, `#${primary}community`, `#best${primary}`, `#${primary}2024`,
      `#creator`, `#shorts`, `#contentcreator`, `#${primary}tutorial`, `#${primary}how`
    ]
    
    const low = [
      `#${primary}forbeginners`, `#learn${primary}`, `#${primary}secrets`, `#${primary}hacks`, `#inst${primary}`,
      `#${primary}influencer`, `#${primary}expert`, `#${primary}mastery`, `#${primary}journey`, `#${primary}growth`
    ]

    setGroups({ high, medium, low })
    trackToolUse('Hashtag Generator', 'hashtag-generator')
  }

  const handleCopyGroup = (tags) => {
    navigator.clipboard.writeText(tags.join(' '))
  }

  const handleCopyAll = () => {
    if (!groups) return
    const all = [...groups.high, ...groups.medium, ...groups.low].join(' ')
    navigator.clipboard.writeText(all)
  }

  return (
    <>
      <Helmet>
        <title>Hashtag Generator — Reach More People on Social Media | VidToolbox</title>
        <meta name="description" content="Generate relevant hashtags for Instagram, TikTok, and YouTube instantly. Get suggestions for high, medium, and low reach categories to optimize your content strategy. Free hashtag tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/hashtag-generator" />
      </Helmet>

      <ToolPage
        title="Hashtag Generator"
        icon={Hash}
        description="Boost your social media visibility. Enter a topic and get a balanced mix of broad and niche hashtags to help your content reach the right audience."
        howToUse={[
          "Type in your main keyword or video topic",
          "Click 'Generate' to see categorization by reach level",
          "Copy the whole set or pick the groups that fit your post"
        ]}
      >
        <div className="p-6">
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Cooking, Fitness, Tech..."
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
            />
            <button
                onClick={generateHashtags}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center gap-2"
            >
                <Wand2 className="w-5 h-5" /> Generate
            </button>
          </div>

          {groups && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Suggested Hashtags</h3>
                <button onClick={handleCopyAll} className="text-xs font-bold text-cyan-600 hover:underline flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5" /> Copy All 30 Tags
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'High Reach', tags: groups.high, count: '100k+ posts', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                  { title: 'Medium Reach', tags: groups.medium, count: '10k–100k posts', color: 'bg-cyan-50 text-cyan-700 border-cyan-100' },
                  { title: 'Low Reach', tags: groups.low, count: '<10k posts', color: 'bg-slate-50 text-slate-700 border-slate-200' }
                ].map((group, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${group.color} flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">{group.title}</span>
                            <span className="text-[10px] opacity-70 uppercase tracking-wider">{group.count}</span>
                        </div>
                        <button onClick={() => handleCopyGroup(group.tags)} className="p-1.5 hover:bg-white/50 rounded transition-colors" title="Copy Group">
                            <Copy className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {group.tags.map(tag => (
                            <span key={tag} className="text-[11px] font-medium opacity-80 bg-white/40 px-1.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
