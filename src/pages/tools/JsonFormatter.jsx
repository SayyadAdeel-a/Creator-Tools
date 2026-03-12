import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Braces, Copy, CheckCircle2, ShieldAlert } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    if (!input) return
    setError(false)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      trackToolUse('JSON Formatter', 'json-formatter')
    } catch (e) {
      setError(true)
      setOutput('Invalid JSON — check your syntax. Make sure you use double quotes for keys and strings.')
    }
  }

  const handleMinify = () => {
    if (!input) return
    setError(false)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      trackToolUse('JSON Minifier', 'json-formatter')
    } catch (e) {
      setError(true)
      setOutput('Invalid JSON — check your syntax.')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPage
      title="JSON Formatter & Minifier"
      description="Clean up messy JSON code with proper indentation or compress it into a single line for production."
      icon={Braces}
      howToUse={[
        "Paste your raw JSON string into the input box.",
        "Click Format for a readable, indented version.",
        "Click Minify to remove all whitespace and compress your JSON."
      ]}
      faq={[
        {
          question: "Why is my JSON showing as invalid?",
          answer: "JSON requires strict syntax: keys and strings must be in double quotes (\"\"), not single quotes (''). Also, ensure there are no trailing commas at the end of objects or arrays."
        },
        {
          question: "Is this tool safe for sensitive data?",
          answer: "Yes, our processing happens entirely in your browser memory. Your JSON content is never uploaded to our servers."
        },
        {
          question: "Can it handle large JSON files?",
          answer: "It can comfortably handle JSON strings up to several megabytes in size instantly."
        }
      ]}
    >
      <Helmet>
        <title>JSON Formatter & Minifier Online — Free Developer Tool | Tenreq</title>
        <meta name="description" content="Format your JSON with beautiful indentation or minify it for production. Validate your JSON syntax instantly. Free, secure, and developer-friendly." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/json-formatter" />
      </Helmet>

      <div className="p-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Raw JSON Input</label>
        <textarea
          className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-sm text-slate-700"
          placeholder='{"key": "value", "list": [1, 2, 3]}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleFormat}
            disabled={!input}
            className="flex-1 bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50"
          >
            Format JSON
          </button>
          <button
            onClick={handleMinify}
            disabled={!input}
            className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Minify JSON
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Result Output</label>
            <button
              onClick={handleCopy}
              disabled={!output || error}
              className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30"
              title="Copy result"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <textarea
              className={`w-full h-80 p-4 rounded-xl outline-none font-mono text-sm cursor-not-allowed border ${
                error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              placeholder="Properly formatted or minified JSON will appear here..."
              value={output}
              readOnly
            />
            {error && (
              <div className="absolute top-4 right-4 text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
