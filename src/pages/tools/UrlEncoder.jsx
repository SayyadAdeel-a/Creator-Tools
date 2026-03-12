import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link2, Copy, CheckCircle2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function UrlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    if (!input) return
    setOutput(encodeURIComponent(input))
    trackToolUse('URL Encoder', 'url-encoder')
  }

  const handleDecode = () => {
    if (!input) return
    try {
      setOutput(decodeURIComponent(input))
      trackToolUse('URL Decoder', 'url-encoder')
    } catch (e) {
      setOutput('Error: Invalid URL encoding')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPage
      title="URL Encoder / Decoder"
      description="Convert text into a safe URL format or decode encoded URLs back to human-readable text."
      icon={Link2}
      howToUse={[
        "Type or paste your text/URL into the input field.",
        "Click Encode to make it safe for URLs (e.g. spaces become %20).",
        "Click Decode to turn %20 back into spaces and special characters back to normal."
      ]}
      faq={[
        {
          question: "When should I use URL encoding?",
          answer: "You should use it when you need to include special characters (like spaces, &, ?, =) in a URL query parameter without breaking the link."
        },
        {
          question: "Does this tool store my URLs?",
          answer: "No, all conversion happens instantly in your browser. We never see or store the data you process."
        },
        {
          question: "Is it safe for non-English characters?",
          answer: "Yes, our tool uses standard UTF-8 encoding which correctly supports Greek, Arabic, Chinese characters, and even emojis."
        }
      ]}
    >
      <Helmet>
        <title>URL Encoder & Decoder Online — Free Developer Tool | VidToolbox</title>
        <meta name="description" content="Encode or decode URLs instantly. Convert special characters to percent-encoded format for safe web usage. Free, easy to use, and browser-based." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/url-encoder" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Input Text / URL</label>
            <textarea
              className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-sm text-slate-700"
              placeholder="Enter text or encoded URL here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleEncode}
                disabled={!input}
                className="flex-1 bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                disabled={!input}
                className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Decode
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Result</label>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30"
                title="Copy result"
              >
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <textarea
              className="w-full h-[375px] p-4 bg-slate-100 border border-slate-200 rounded-xl outline-none font-mono text-sm text-slate-600 cursor-not-allowed"
              placeholder="Result will appear here..."
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
