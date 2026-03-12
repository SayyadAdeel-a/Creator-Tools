import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { BookOpen, AlertCircle, CheckCircle2, Info, Clock, BarChart3 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ReadabilityScore() {
  const [text, setText] = useState('')

  const countSyllables = (word) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '')
    if (word.length <= 3) return 1
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    const syllables = word.match(/[aeiouy]{1,2}/g)
    return syllables ? syllables.length : 1
  }

  const results = useMemo(() => {
    if (!text.trim()) return null
    
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    const sentences = (text.match(/[^\.!\?]+[\.!\?]+/g) || []).length || 1
    const totalWords = words.length
    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0)

    // Formula: 206.835 - 1.015(words/sentences) - 84.6(syllables/words)
    const score = 206.835 - 1.015 * (totalWords / sentences) - 84.6 * (totalSyllables / totalWords)
    const finalScore = Math.max(0, Math.min(100, Math.round(score)))

    let grade, audience, color, bg, icon
    if (finalScore >= 90) {
      grade = "Grade 5"; audience = "Very Easy to Read"; color = "text-emerald-500"; bg = "bg-emerald-50 border-emerald-200"; icon = CheckCircle2
    } else if (finalScore >= 80) {
      grade = "Grade 6"; audience = "Easy to Read"; color = "text-emerald-500"; bg = "bg-emerald-50 border-emerald-200"; icon = CheckCircle2
    } else if (finalScore >= 70) {
      grade = "Grade 7"; audience = "Fairly Easy"; color = "text-emerald-500"; bg = "bg-emerald-50 border-emerald-200"; icon = CheckCircle2
    } else if (finalScore >= 60) {
      grade = "Grade 8-9"; audience = "Standard Audience"; color = "text-cyan-600"; bg = "bg-cyan-50 border-cyan-200"; icon = Info
    } else if (finalScore >= 50) {
      grade = "Grade 10-12"; audience = "Fairly Difficult"; color = "text-amber-500"; bg = "bg-amber-50 border-amber-200"; icon = AlertCircle
    } else if (finalScore >= 30) {
      grade = "College"; audience = "Difficult to Read"; color = "text-red-500"; bg = "bg-red-50 border-red-200"; icon = AlertCircle
    } else {
      grade = "College Graduate"; audience = "Very Confusing"; color = "text-red-500"; bg = "bg-red-50 border-red-200"; icon = AlertCircle
    }

    return { score: finalScore, grade, audience, color, bg, icon }
  }, [text])

  const handleInput = (e) => {
      setText(e.target.value)
      if (e.target.value.length === 50) trackToolUse('Readability Score Checker', 'readability')
  }

  return (
    <>
      <Helmet>
        <title>Readability Score Checker — Flesch Reading Ease Tool | VidToolbox</title>
        <meta name="description" content="Calculate your content's Flesch Reading Ease score instantly. Check grade levels and audience difficulty to ensure your writing is clear and engaging. Free SEO tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/readability" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Readability Score Checker",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/readability",
          "description": "Analyze writing difficulty using the Flesch-Kincaid scale. Optimize for search and reader engagement."
        })}</script>
      </Helmet>

      <ToolPage
        title="Readability Score Checker"
        icon={BookOpen}
        description="Optimize your writing for your target audience. We calculate readability using the Flesch-Kincaid scale to ensure your message is clear and effective."
        howToUse={[
          "Paste your blog post, script, or long-form copy into the editor",
          "Check the real-time scoring and color-coded status at the top",
          "Simplify complex words or split long sentences to improve the result"
        ]}
        faq={[
            { question: "What is a good Flesch Reading Ease score?", answer: "For general marketing content and blogs, aim for a score between 60 and 70 (Grade 8-9 level). This ensures maximum reach and retention." },
            { question: "How does the formula work?", answer: "It weighs the average sentence length and average syllable count per word. Long sentences and multi-syllabic words lower your score." },
            { question: "Should I always aim for 'Easy'?", answer: "Not necessarily. If your audience is highly technical or academic, a 'College' or 'Difficult' score might be appropriate for the niche." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center relative overflow-hidden group hover:border-cyan-200 transition-all ${!results && 'opacity-30 pointer-events-none'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform"><Clock className="w-16 h-16" /></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reading Ease</p>
                <p className="text-5xl font-bold text-slate-900 mb-2 font-mono">{results ? results.score : '0'}</p>
                <div className="h-1.5 w-24 bg-slate-100 rounded-full mx-auto relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${results ? results.score : 0}%` }}></div>
                </div>
            </div>
            <div className={`p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center relative overflow-hidden group hover:border-cyan-200 transition-all ${!results && 'opacity-30 pointer-events-none'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform"><BarChart3 className="w-16 h-16" /></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Grade Level</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{results ? results.grade : '—'}</p>
                <p className="text-xs text-slate-400 font-medium">Flesch Grade Scale</p>
            </div>
            <div className={`p-6 border rounded-3xl shadow-sm text-center flex flex-col items-center justify-center transition-all ${results ? results.bg : 'bg-slate-50 border-slate-100 opacity-30'}`}>
                {results ? <results.icon className={`w-10 h-10 mb-2 ${results.color}`} /> : <BookOpen className="w-10 h-10 mb-2 text-slate-300" />}
                <p className={`text-2xl font-bold ${results ? results.color : 'text-slate-400'}`}>{results ? results.audience : 'No Content'}</p>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Recommended Action</p>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={handleInput}
              placeholder="Paste your content here to calculate readability..."
              className="w-full h-96 p-8 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none resize-none font-medium text-slate-700 leading-relaxed shadow-inner text-lg"
            />
            {!text && (
                <div className="absolute top-8 left-8 pointer-events-none text-slate-300 italic flex items-center gap-2">
                    Start typing to see your audience score...
                </div>
            )}
          </div>
        </div>
      </ToolPage>
    </>
  )
}
