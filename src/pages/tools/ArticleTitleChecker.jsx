import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Type, CheckCircle2, AlertCircle, Info, Sparkles, TrendingUp, Smile, Ghost, Zap } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const POWER_WORDS = ['best', 'ultimate', 'proven', 'secret', 'free', 'easy', 'fast', 'now', 'new', 'top', 'guide', 'blueprint', 'master', 'hidden']
const EMOTIONAL_WORDS = ['amazing', 'incredible', 'shocking', 'surprising', 'essential', 'terrifying', 'hilarious', 'guaranteed', 'fail-safe']
const POSITIVE_WORDS = ['happy', 'good', 'great', 'excellent', 'success', 'winning', 'growth', 'love', 'perfect']
const NEGATIVE_WORDS = ['bad', 'fail', 'worst', 'danger', 'scary', 'error', 'mistake', 'lose', 'broken']

export function ArticleTitleChecker() {
  const [title, setTitle] = useState('')

  const analysis = useMemo(() => {
    if (!title.trim()) return null

    let score = 50 // Base score
    const len = title.length
    const words = title.toLowerCase().split(/\s+/)
    
    // Length Score (50-60 is ideal)
    let lengthScore = 0
    if (len >= 50 && len <= 60) lengthScore = 25
    else if (len >= 40 && len <= 70) lengthScore = 15
    else lengthScore = 5
    score += lengthScore

    // Checks
    const hasNumber = /\d+/.test(title)
    const powerWord = words.find(w => POWER_WORDS.includes(w))
    const emotionalWord = words.find(w => EMOTIONAL_WORDS.includes(w))
    
    if (hasNumber) score += 10
    if (powerWord) score += 15
    if (emotionalWord) score += 10

    // Sentiment
    const hasPositive = words.some(w => POSITIVE_WORDS.includes(w))
    const hasNegative = words.some(w => NEGATIVE_WORDS.includes(w))
    let sentiment = 'Neutral'
    if (hasPositive && !hasNegative) sentiment = 'Positive'
    else if (hasNegative && !hasPositive) sentiment = 'Negative'

    // Suggestions
    const suggestions = []
    if (len < 40) suggestions.push("Title is too short. Try adding descriptive words.")
    if (len > 65) suggestions.push("Title is too long. It might get cut off in Google results.")
    if (!hasNumber) suggestions.push("Add a number (e.g. '5 Tips...') to boost engagement.")
    if (!powerWord) suggestions.push("Include a power word like 'Ultimate' or 'Proven'.")
    if (!emotionalWord) suggestions.push("Add an emotional trigger word to appeal to readers.")

    return { 
      score: Math.min(100, score), 
      lengthScore, 
      hasNumber, 
      powerWord, 
      emotionalWord, 
      sentiment, 
      suggestions 
    }
  }, [title])

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-emerald-500 bg-emerald-50'
    if (s >= 60) return 'text-cyan-600 bg-cyan-50'
    return 'text-amber-500 bg-amber-50'
  }

  return (
    <>
      <Helmet>
        <title>Article Title & Headline Checker — CTR Optimization | VidToolbox</title>
        <meta name="description" content="Validate your article headlines and video titles for CTR and SEO performance. Analyze character length, emotional triggers, and audience appeal. Free online Headline score tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/title-checker" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Article Title Checker",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/title-checker",
          "description": "Evaluate SEO and psychological performance of your article titles and headlines with scores and suggestions."
        })}</script>
      </Helmet>

      <ToolPage
        title="Article Title Checker"
        icon={TrendingUp}
        description="Stop guessing if your headlines will work. Use our score formula to analyze your title's length, emotional power, and SEO effectiveness."
        howToUse={[
          "Type your proposed article title or headline into the field",
          "Check the score breakdown to see where you can improve",
          "Follow the custom suggestions below to maximize your Click-Through Rate"
        ]}
        faq={[
            { question: "Why is 50-60 characters the ideal length?", answer: "This is the optimal range for both viewer readability and SEO; Google typically displays the first 60 characters in search results." },
            { question: "How do emotional words help my score?", answer: "Emotional triggers create curiosity or a sense of urgency, which psychologically encourages more clicks than a dry, factual title." },
            { question: "Does a high score guarantee success?", answer: "A high score ensures you're following best practices, but always A/B test with your specific audience to find what resonates best." }
        ]}
      >
        <div className="p-6">
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">Headline Editor</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.length === 15) trackToolUse('Article Title Checker', 'title-checker');
              }}
              placeholder="e.g., The Ultimate Guide to SEO in 2025"
              className="w-full px-6 py-5 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none text-2xl font-bold tracking-tight shadow-sm"
            />
          </div>

          {analysis && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-6 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center ${getScoreColor(analysis.score)}`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Headline Score</p>
                    <p className="text-4xl font-bold mb-1">{analysis.score}</p>
                    <p className="text-[10px] font-bold uppercase">Target: 80+</p>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-cyan-200 transition-all">
                    <Zap className="w-5 h-5 text-cyan-500 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Emotion Power</p>
                    <p className={`text-sm font-bold ${analysis.emotionalWord ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {analysis.emotionalWord ? 'High Impact' : 'Low Impact'}
                    </p>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-cyan-200 transition-all">
                    <Smile className="w-5 h-5 text-cyan-500 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sentiment</p>
                    <p className="text-sm font-bold text-slate-900">{analysis.sentiment}</p>
                </div>
                <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-cyan-200 transition-all">
                    <Type className="w-5 h-5 text-cyan-500 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Length</p>
                    <p className="text-sm font-bold text-slate-900">{title.length} chars</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-500" /> Score Breakdown
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Character Count Pacing', pass: title.length >= 50 && title.length <= 60, icon: Type },
                            { label: 'Includes a Number', pass: analysis.hasNumber, icon: Hash },
                            { label: 'Contains a Power Word', pass: !!analysis.powerWord, icon: Zap },
                            { label: 'Contains Emotional Trigger', pass: !!analysis.emotionalWord, icon: Smile }
                        ].map((check, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${check.pass ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                                        <check.icon className={`w-4 h-4 ${check.pass ? 'text-emerald-500' : 'text-slate-300'}`} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">{check.label}</span>
                                </div>
                                {check.pass ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Ghost className="w-5 h-5 text-slate-200" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-24 h-24" /></div>
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 relative z-10">
                        <AlertCircle className="w-5 h-5 text-amber-500" /> Improvement Tips
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {analysis.suggestions.length > 0 ? (
                            analysis.suggestions.map((s, i) => (
                                <div key={i} className="flex gap-4 p-4 border border-amber-100 bg-amber-50/30 rounded-2xl">
                                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 shrink-0"></div>
                                    <p className="text-sm text-amber-900 font-medium">{s}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-60">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                                <p className="font-bold text-slate-700">Perfect Title!</p>
                                <p className="text-xs text-slate-400">Headlines rarely get better than this.</p>
                            </div>
                        )}
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
