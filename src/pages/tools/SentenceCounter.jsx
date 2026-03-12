import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { AlignLeft, Hash, Clock, FileText, BarChart3, Info } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SentenceCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    if (!text.trim()) return { sentences: 0, words: 0, characters: 0, paragraphs: 0, avgWords: 0 }
    
    const sentences = (text.match(/[^\.!\?]+[\.!\?]+/g) || []).length
    const words = text.trim().split(/\s+/).length
    const characters = text.length
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length
    const avgWords = sentences > 0 ? (words / sentences).toFixed(1) : words
    
    return { sentences, words, characters, paragraphs, avgWords }
  }, [text])

  const handleInput = (e) => {
    setText(e.target.value)
    if (e.target.value.length === 10) trackToolUse('Sentence Counter', 'sentence-counter')
  }

  return (
    <>
      <Helmet>
        <title>Sentence & Paragraph Counter — Content Analyzer | Tenreq</title>
        <meta name="description" content="Calculate sentence count, word counts, and average words per sentence in real-time. Professional tool for writers and editors to improve readability." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/sentence-counter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Sentence Counter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/sentence-counter",
          "description": "Real-time analysis of your writing structure — sentences, words, characters and paragraphs."
        })}</script>
      </Helmet>

      <ToolPage
        title="Sentence Counter"
        icon={AlignLeft}
        description="Verify your article's structural pacing with real-time stats. Monitor sentence counts and average length as you write or paste."
        howToUse={[
          "Paste your content or write directly into the editor",
          "Watch the stat cards update in real-time at the top",
          "Aim for varied sentence lengths to keep readers engaged"
        ]}
        faq={[
            { question: "What is the ideal words-per-sentence average?", answer: "For general audiences, aim for 15-20 words per sentence. Anything over 25 words can start to feel difficult to digest." },
            { question: "How are paragraphs counted?", answer: "We count 'breaks' where there is text present. Blank lines are ignored to give you an accurate representation of your content's layout." },
            { question: "Is this tool suitable for academic writing?", answer: "Yes! Use it to ensure your paragraphs don't become too long and to track your characters for specific length requirements." }
        ]}
      >
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Sentences', val: stats.sentences, icon: Hash, color: 'text-cyan-600' },
                { label: 'Words', val: stats.words, icon: BarChart3, color: 'text-slate-900' },
                { label: 'Characters', val: stats.characters, icon: FileText, color: 'text-slate-900' },
                { label: 'Paragraphs', val: stats.paragraphs, icon: AlignLeft, color: 'text-slate-900' }
            ].map((stat, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center group hover:border-cyan-200 transition-all">
                    <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-100 transition-colors">
                        <stat.icon className="w-4.5 h-4.5 text-cyan-500" />
                    </div>
                    <p className={`text-2xl font-bold font-mono mb-1 ${stat.color}`}>{stat.val}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
            ))}
          </div>

          <div className="relative mb-6">
            <textarea
              value={text}
              onChange={handleInput}
              placeholder="Paste your content here..."
              className="w-full h-80 p-6 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none resize-none font-medium text-slate-700 leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                    <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Average Pacing</p>
                    <p className="text-xl font-bold flex items-baseline gap-2">
                        {stats.avgWords} <span className="text-xs font-medium text-cyan-400">words per sentence</span>
                    </p>
                </div>
            </div>
            <div className="text-xs text-slate-400 max-w-xs italic relative z-10 group-hover:text-slate-200 transition-colors">
                <Info className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
                Aim for 12-18 words to maximize engagement on social media and modern blogs.
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform">
                <AlignLeft className="w-24 h-24" />
            </div>
          </div>
        </div>
      </ToolPage>
    </>
  )
}
