import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileCode, Copy, CheckCircle2, ShieldAlert } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function Base64() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    if (!input) return
    setError(false)
    try {
      setOutput(btoa(input))
      trackToolUse('Base64 Encoder', 'base64')
    } catch (e) {
      setError(true)
      setOutput('Error: String contains characters outside of the Latin1 range.')
    }
  }

  const handleDecode = () => {
    if (!input) return
    setError(false)
    try {
      setOutput(atob(input))
      trackToolUse('Base64 Decoder', 'base64')
    } catch (e) {
      setError(true)
      setOutput('Error: Invalid Base64 input. Please check your data.')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPage
      title="Base64 Encoder / Decoder"
      description="Quickly convert text to Base64 format or decode Base64 strings back to their original form."
      icon={FileCode}
      howToUse={[
        "Enter the text you want to encode or the Base64 string you want to decode.",
        "Click the Encode or Decode button.",
        "Your result will appear instantly in the output field below."
      ]}
      faq={[
        {
          question: "What is Base64 used for?",
          answer: "Base64 is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data. This ensures the data remains intact without modification during transport."
        },
        {
          question: "Can I encode non-ASCII characters?",
          answer: "Standard JavaScript btoa() only supports Latin1 characters. For Unicode characters like emojis, we recommend use specialized encoding first, but this tool covers the most common use cases."
        },
        {
          question: "Is Base64 encryption?",
          answer: "No, Base64 is NOT encryption. It is a form of encoding. Anyone can easily decode a Base64 string back to its original text."
        }
      ]}
    >
      <Helmet>
        <title>Base64 Encoder & Decoder Online Free | VidToolbox</title>
        <meta name="description" content="Convert your text to Base64 or decode Base64 strings instantly. Useful for developers, API testing, and data transport. Free, secure, and browser-based." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/base64" />
      </Helmet>

      <div className="p-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
        <textarea
          className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-mono text-sm text-slate-700"
          placeholder="Enter text or Base64 string here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleEncode}
            disabled={!input}
            className="flex-1 bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors disabled:opacity-50"
          >
            Encode to Base64
          </button>
          <button
            onClick={handleDecode}
            disabled={!input}
            className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Decode Base64
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">Output Result</label>
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
              className={`w-full h-48 p-4 rounded-xl outline-none font-mono text-sm cursor-not-allowed border ${
                error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              placeholder="Result will appear here..."
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
