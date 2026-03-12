import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, Type } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function MetaDescriptionChecker() {
  const [text, setText] = useState('')
  const charCount = text.length

  const getStatus = () => {
    if (charCount === 0) return { label: 'Waiting...', color: 'bg-slate-100 text-slate-500', bar: 'bg-slate-200', width: 0 }
    if (charCount <= 154) return { label: 'Good', color: 'bg-green-100 text-green-700', bar: 'bg-green-500', width: (charCount / 160) * 100 }
    if (charCount <= 160) return { label: 'Getting close', color: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500', width: (charCount / 160) * 100 }
    return { label: 'Too long', color: 'bg-red-100 text-red-700', bar: 'bg-red-500', width: 100 }
  }

  const status = getStatus()

  const handleTextChange = (e) => {
    setText(e.target.value)
    if (e.target.value.length === 1) {
      trackToolUse('Meta Description Checker', 'meta-description-checker')
    }
  }

  return (
    <ToolPage
      title="Meta Description Length Checker"
      description="Check if your meta description is the perfect length for Google search results."
      icon={Type}
      howToUse={[
        "Enter or paste your meta description into the text area.",
        "Watch the real-time character count and progress bar.",
        "Aim for a length between 120 and 160 characters for optimal visibility."
      ]}
      faq={[
        {
          question: "What is the ideal meta description length?",
          answer: "Most experts recommend keeping meta descriptions between 120 and 160 characters. This ensures they don't get truncated in search results."
        },
        {
          question: "Does meta description length affect SEO ranking?",
          answer: "While meta descriptions themselves aren't a direct ranking factor, they significantly impact click-through rates (CTR), which is a major signal for search engines."
        },
        {
          question: "Why does the progress bar turn red at 160?",
          answer: "Google usually truncates meta descriptions after about 160 characters (or 960 pixels) to fit them into the search snippet."
        }
      ]}
    >
      <Helmet>
        <title>Meta Description Length Checker — Free SEO Tool | VidToolbox</title>
        <meta name="description" content="Check your meta description length in real-time. Ensure your SEO snippets are perfect for Google search results. Free, instant, and browser-based." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/meta-description-checker" />
      </Helmet>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700 mb-2">Meta Description</label>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${status.color}`}>
              {status.label}
            </span>
            <span className="text-sm font-mono text-slate-500">{charCount}/160 characters</span>
          </div>
        </div>

        <textarea
          className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
          placeholder="Enter your meta description here..."
          value={text}
          onChange={handleTextChange}
        />

        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${status.bar}`}
              style={{ width: `${Math.min(status.width, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-cyan-50 rounded-lg flex gap-3">
          <Info className="w-5 h-5 text-cyan-500 flex-shrink-0" />
          <p className="text-sm text-cyan-700 leading-relaxed">
            Google typically truncates descriptions that are too long. Keeping yours under 160 characters ensures your full call-to-action is visible to potential visitors.
          </p>
        </div>
      </div>
    </ToolPage>
  )
}
