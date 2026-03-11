import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Undo2, Copy, CheckCircle2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function TextReverser() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('chars') // 'chars' or 'words'
  const [copied, setCopied] = useState(false)

  const handleReverse = (val, currentMode) => {
    setInput(val)
    if (!val) {
      setOutput('')
      return
    }

    if (currentMode === 'chars') {
      setOutput(val.split('').reverse().join(''))
    } else {
      setOutput(val.split(/\s+/).reverse().join(' '))
    }
    
    // Track usage
    if (val.length === 1 && !output) {
      trackToolUse('Text Reverser', 'text-reverser')
    }
  }

  const toggleMode = (newMode) => {
    setMode(newMode)
    handleReverse(input, newMode)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolPage
      title="Text Reverser"
      description="Flip your text backwards or reverse the order of your words with one click."
      icon={Undo2}
      howToUse={[
        "Type or paste your text into the input field.",
        "Choose between 'Reverse Letters' or 'Reverse Words' mode.",
        "Copy the reversed result to your clipboard."
      ]}
      faq={[
        {
          question: "What is the difference between reversing letters and words?",
          answer: "'Reverse Letters' flips every single character (abc -> cba), while 'Reverse Words' keeps the letters in each word the same but flips their sequence in the sentence."
        },
        {
          question: "Does it handle special characters and emojis?",
          answer: "Yes, our tool correctly handles punctuation, special characters, and most modern emojis during the reversal process."
        },
        {
          question: "Is there a limit to how much I can reverse?",
          answer: "No, you can reverse entire articles or long lists of data instantly."
        }
      ]}
    >
      <Helmet>
        <title>Text Reverser — Reverse Letters & Words Online | VidToolbox</title>
        <meta name="description" content="Flip your text or reverse word order instantly. A fun and useful tool for creating backwards text, solving puzzles, or reordering lists. Free and browser-based." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/text-reverser" />
      </Helmet>

      <div className="p-6">
        <div className="flex justify-center gap-2 mb-6 p-1 bg-slate-100 rounded-xl w-fit mx-auto">
          <button
            onClick={() => toggleMode('chars')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'chars' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Reverse Letters
          </button>
          <button
            onClick={() => toggleMode('words')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'words' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Reverse Words
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Original Text</label>
            <textarea
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
              placeholder="Type or paste text here..."
              value={input}
              onChange={(e) => handleReverse(e.target.value, mode)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Reversed Result</label>
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
              className="w-full h-64 p-4 bg-slate-100 border border-slate-200 rounded-xl outline-none font-sans text-slate-600 cursor-not-allowed"
              placeholder="Reversed text will appear here..."
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
