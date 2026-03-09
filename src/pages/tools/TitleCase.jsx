import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Type } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of']

export function TitleCase() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const tracked = useRef(false)

  const convertToTitleCase = (text) => {
    const words = text.trim().split(/\s+/)
    if (words.length === 0) return ''
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase()
      const isFirst = index === 0
      const isLast = index === words.length - 1
      const isException = exceptions.includes(lowerWord)
      if ((isFirst || isLast || !isException) && /^[a-zA-Z]/.test(word)) {
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
      }
      return lowerWord
    }).join(' ')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    const converted = convertToTitleCase(value)
    setOutput(converted)
    if (converted && !tracked.current) {
      trackToolUse('Title Case Converter', 'title-case')
      tracked.current = true
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Title Case Converter — Free Online AP & Chicago Title Case Tool | VidToolbox</title>
        <meta name="description" content="Convert any text to proper AP or Chicago title case online, instantly and free. Great for YouTube titles, blog headlines, and article headings. No account needed." />
        <meta name="keywords" content="title case converter, title case tool, capitalize title online, AP title case, Chicago title case, make title case" />
        <link rel="canonical" href="https://vidtoolbox.vercel.app/tools/title-case" />
        <meta property="og:title" content="Title Case Converter — Free Online Tool | VidToolbox" />
        <meta property="og:url" content="https://vidtoolbox.vercel.app/tools/title-case" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Title Case Converter",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.vercel.app/tools/title-case",
          "description": "Convert text to proper AP or Chicago title case. Free, instant, no sign-up."
        })}</script>
      </Helmet>

      <ToolPage
        title="Title Case Converter"
        icon={Type}
        description="Convert your text to proper title case automatically."
        howToUse={[
          "Enter or paste your text in the input field",
          "The conversion happens automatically in real-time",
          "Click 'Copy' to copy the result to your clipboard"
        ]}
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter your text here..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          {output && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Output (Title Case)</label>
              <div className="w-full px-4 py-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-lg font-medium">
                {output}
              </div>
              <button
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
