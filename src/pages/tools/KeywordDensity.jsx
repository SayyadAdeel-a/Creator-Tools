import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, Search } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function KeywordDensity() {
  const [text, setText] = useState('')
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState(null)

  const handleCheck = () => {
    if (!text || !keyword) return
    
    const words = text.trim().toLowerCase().split(/\s+/)
    const totalWords = words.length
    const kw = keyword.trim().toLowerCase()
    
    // Simple count of exact matches
    const count = words.filter(w => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") === kw).length
    const density = totalWords > 0 ? (count / totalWords) * 100 : 0

    setResult({
      count,
      density: density.toFixed(2),
      totalWords
    })
    
    trackToolUse('Keyword Density Checker', 'keyword-density')
  }

  return (
    <ToolPage
      title="Keyword Density Checker"
      description="Find out how often a specific keyword appears in your text relative to the total word count."
      icon={Hash}
      howToUse={[
        "Paste your full content into the main text area.",
        "Enter the specific keyword or phrase you want to analyze.",
        "Click the Check Density button to see your results."
      ]}
      faq={[
        {
          question: "What is a good keyword density for SEO?",
          answer: "Most SEO experts recommend a keyword density of 1-2%. This helps search engines understand the topic without triggering 'keyword stuffing' penalties."
        },
        {
          question: "Does this tool count partial matches?",
          answer: "No, this tool performs an exact match check (case-insensitive) to give you the most accurate density percentage for your target keyword."
        },
        {
          question: "Why does keyword density matter?",
          answer: "It helps you stay focused on your primary topic while ensuring your content remains natural and readable for humans."
        }
      ]}
    >
      <Helmet>
        <title>Keyword Density Checker — Free SEO Content Tool | VidToolbox</title>
        <meta name="description" content="Calculate your keyword density instantly. Optimize your blog posts and articles for SEO by checking target keyword frequency. Free and browser-based." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/keyword-density" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Content</label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
              placeholder="Paste your article or blog post content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Keyword</label>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                placeholder="e.g. youtube seo"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={!text || !keyword}
              className="w-full bg-cyan-500 text-white rounded-xl py-3 font-semibold hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Density
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center animate-fade-in-up">
            <h3 className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Analysis Results</h3>
            <div className="text-3xl font-heading font-bold text-slate-900 mb-1">
              Found {result.count} times — {result.density}% density
            </div>
            <p className="text-slate-400 text-sm">
              Across {result.totalWords} total words
            </p>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
