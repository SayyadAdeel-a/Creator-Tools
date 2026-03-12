import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Copy, Check, Info, Trash2, Search, TrendingUp, Filter, List } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const HASHTAG_MAP = {
  'youtube': {
    high: ['#youtube', '#video', '#contentcreator', '#subscribe', '#youtuber', '#trending', '#viral', '#watch', '#newvideo', '#sub'],
    medium: ['#youtubechannel', '#youtubetips', '#youtubemarketing', '#youtubelife', '#youtubecommunity', '#vlog', '#creators', '#videomarketing', '#shorts', '#youtubeindia'],
    low: ['#smallyoutuber', '#youtubesuccess', '#youtubestrategist', '#youtubecreator', '#growthhacking', '#filmmakingtips', '#youtubesecrets', '#youtubehacks', '#videocreators', '#subscribers']
  },
  'video': {
      high: ['#video', '#viral', '#explore', '#content', '#trending', '#watch', '#love', '#funny', '#highlights', '#awesome'],
      medium: ['#shortvideo', '#videoproduction', '#cinematography', '#videography', '#filmmaking', '#edit', '#effects', '#colorgrading', '#behindthescenes', '#motiongraphics'],
      low: ['#videomaker', '#indiefilm', '#filmeditor', '#videocreator', '#creativevideo', '#visuals', '#dailycontent', '#instavideo', '#shortfilm', '#videomarketingtips']
  },
  'content': {
    high: ['#content', '#marketing', '#digitalmarketing', '#business', '#socialmedia', '#strategy', '#growth', '#entrepreneur', '#success', '#onlinebusiness'],
    medium: ['#contentmarketing', '#contentcreation', '#contentcreator', '#branding', '#inboundmarketing', '#blogging', '#copywriting', '#socialmediastrategy', '#webdevelopment', '#seo'],
    low: ['#growthhack', '#leadgeneration', '#nichemarketing', '#marketingtips', '#contentstrategy', '#brandgrowth', '#digitalstrategist', '#contentideas', '#marketresearch', '#socialmediamanager']
  },
  'blogging': {
    high: ['#blog', '#blogger', '#lifestyle', '#travel', '#fashion', '#food', '#photography', '#writing', '#newpost', '#inspiration'],
    medium: ['#bloggingtips', '#bloggerstyle', '#bloggerlife', '#travelblogger', '#lifestyleblog', '#bloggersofinstagram', '#foodblogger', '#productivity', '#creative', '#writer'],
    low: ['#momblogger', '#fashionblog', '#fitnessblog', '#blogpost', '#problogging', '#digitalnomad', '#bloggerswanted', '#dailyblog', '#bloggingcommunity', '#writeaway']
  },
  'editing': {
    high: ['#editing', '#edit', '#art', '#designer', '#creative', '#photography', '#graphics', '#visuals', '#photoshop', '#aesthetic'],
    medium: ['#videoediting', '#videoeditor', '#premierpro', '#aftereffects', '#filmediting', '#finalcutpro', '#colorgrade', '#editingskills', '#postproduction', '#vfx'],
    low: ['#editorlife', '#creativeediting', '#filmeditor', '#editingsuite', '#editingapps', '#editorcommunity', '#visualstorytelling', '#editingtips', '#digitalart', '#conceptart']
  },
  'tutorial': {
    high: ['#tutorial', '#diy', '#how-to', '#learn', '#education', '#tips', '#skills', '#guide', '#help', '#secrets'],
    medium: ['#stepbystep', '#educationalvideo', '#learning', '#lifelab', '#hacks', '#diycrafts', '#teaching', '#onlinelearning', '#skillshare', '#pro-tips'],
    low: ['#tutorialsvideo', '#diyprojects', '#learnsomethingnew', '#tutoriallife', '#teachyourself', '#how-to-guide', '#easyhowto', '#masterclass', '#studygram', '#course']
  }
}

export function HashtagGenerator() {
  const [query, setQuery] = useState('')
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedGroup, setCopiedGroup] = useState(null)

  const activeCategory = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return null
    // Direct match OR find key that is contained in query
    const key = Object.keys(HASHTAG_MAP).find(k => q.includes(k) || k.includes(q))
    return key ? HASHTAG_MAP[key] : null
  }, [query])

  const handleCopyAll = () => {
    if (!activeCategory) return
    const all = [...activeCategory.high, ...activeCategory.medium, ...activeCategory.low].join(' ')
    navigator.clipboard.writeText(all)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
    trackToolUse('Hashtag Generator', 'hashtag-generator')
  }

  const handleCopyGroup = (type) => {
    if (!activeCategory) return
    navigator.clipboard.writeText(activeCategory[type].join(' '))
    setCopiedGroup(type)
    setTimeout(() => setCopiedGroup(null), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Viral Hashtag Generator — Find Smart Tags | VidToolbox</title>
        <meta name="description" content="Generate 30+ viral hashtags for Instagram, YouTube, and TikTok. Get categorized tags based on search volume (High, Medium, Low) to maximize your reach. Free niche tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/hashtag-generator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Hashtag Generator",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/hashtag-generator",
          "description": "Smart hashtag generator with volume categorization for maximum social media growth."
        })}</script>
      </Helmet>

      <ToolPage
        title="Hashtag Generator"
        icon={Hash}
        description="Optimize your reach with categorized hashtags. We research the perfect mix of broad and niche tags based on your video or post topic."
        howToUse={[
          "Type your main topic or niche (e.g., 'Writing', 'Travel', 'Video')",
          "Explore the suggested tags grouped by search volume thresholds",
          "Copy the entire set or specific groups to paste into your social posts"
        ]}
        faq={[
            { question: "Why are hashtags grouped into volume levels?", answer: "Mixing high, medium, and low volume tags is the best strategy. High volume gets initial reach, while low volume helps you trend in specific niches." },
            { question: "How many hashtags should I use?", answer: "Twitter works best with 2-3, but Instagram and YouTube can leverage up to 30 well-chosen tags to maximize search visibility." },
            { question: "Can I use these for TikTok?", answer: "Absolutely. TikTok uses a mix of broad #fyp tags and targeted niche tags, all of which are included in our smart generation logic." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-heading flex items-center justify-center gap-2">
                <Search className="w-5 h-5 text-cyan-500" /> What's your topic?
            </h3>
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., youtube, editing, blogging..."
                    className="w-full px-8 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-2xl font-bold tracking-tight shadow-xl transition-all"
                />
                <button onClick={() => setQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            {!activeCategory && query.trim() !== '' && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3 animate-pulse">
                     <Info className="w-4 h-4 text-amber-500 shrink-0" />
                     <p className="text-xs text-amber-900 font-bold uppercase tracking-widest leading-none">Category Not Found — Try 'video' or 'editing'</p>
                </div>
            )}
          </div>

          {activeCategory && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="flex items-center gap-4 relative z-10 font-heading">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">30 Growth Tags Ready</h4>
                        <p className="text-xs text-slate-400 italic">Optimized mix for maximum engagement.</p>
                    </div>
                </div>
                <button
                    onClick={handleCopyAll}
                    className={`w-full sm:w-auto px-10 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl relative z-10 ${
                        copiedAll 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white text-slate-900 hover:bg-cyan-50'
                    }`}
                >
                    {copiedAll ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copiedAll ? 'All Copied' : 'Copy All Hasthags'}
                </button>
                <div className="absolute top-0 right-0 w-[500px] h-full bg-cyan-500/10 skew-x-12 translate-x-32 pointer-events-none"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'high', label: 'High Volume', color: 'text-rose-500', bg: 'bg-rose-50', icon: TrendingUp },
                  { id: 'medium', label: 'Medium/Niche', color: 'text-amber-500', bg: 'bg-amber-50', icon: Filter },
                  { id: 'low', label: 'Low/Targeted', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: List }
                ].map((group) => (
                  <div key={group.id} className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300 group flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <group.icon className={`w-5 h-5 ${group.color}`} />
                            <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 font-heading">{group.label}</h4>
                        </div>
                        <button 
                            onClick={() => handleCopyGroup(group.id)}
                            className={`p-2.5 rounded-xl transition-all ${
                                copiedGroup === group.id 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-50 text-slate-400 hover:bg-cyan-50 hover:text-cyan-600'
                            }`}
                            title="Copy group"
                        >
                            {copiedGroup === group.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-1">
                        {activeCategory[group.id].map((tag) => (
                            <span key={tag} className={`text-xs font-bold px-3 py-1.5 rounded-lg border border-transparent shadow-sm transition-all hover:scale-105 cursor-default ${group.bg} ${group.color} hover:border-slate-200`}>
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
