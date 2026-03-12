import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AlignLeft, Copy, Download, CheckCircle2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function RemoveExtraSpaces() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleProcess = (val) => {
    setInput(val)
    if (!val) {
      setOutput('')
      return
    }

    const processed = val
      .split('\n')                  // Split into lines
      .map(line => line.trim())      // Trim each line
      .filter(line => line !== '')   // Remove blank lines
      .map(line => line.replace(/\s+/g, ' ')) // Collapse multiple spaces in each line
      .join('\n')                    // Join back

    setOutput(processed)
    
    // Track on first content change
    if (val.length === 1 && !output) {
      trackToolUse('Remove Extra Spaces', 'remove-extra-spaces')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([output], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "cleaned-text.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <ToolPage
      title="Remove Extra Spaces"
      description="Clean up your text by removing double spaces, trailing whitespaces, and empty lines."
      icon={AlignLeft}
      howToUse={[
        "Paste your messy text into the input field.",
        "The tool automatically collapses multiple spaces and removes blank lines.",
        "Copy your perfectly formatted text or download it as a .txt file."
      ]}
      faq={[
        {
          question: "What exactly does this tool remove?",
          answer: "It trims the beginning and end of every line, collapses multiple consecutive spaces into a single space, and removes entirely empty lines."
        },
        {
          question: "Will it mess up my paragraph structure?",
          answer: "It will remove empty lines between paragraphs by default to provide the cleanest possible text. If you want to keep them, we recommend using a standard text editor."
        },
        {
          question: "Is there a limit on text length?",
          answer: "No, you can process thousands of lines instantly right in your browser."
        }
      ]}
    >
      <Helmet>
        <title>Remove Extra Spaces — Online Text Cleaner Tool | VidToolbox</title>
        <meta name="description" content="Clean your text instantly. Remove extra spaces, double spaces, and empty lines to make your content professional and readable. Free online text formatting tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/remove-extra-spaces" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
            <textarea
              className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
              placeholder="Paste your text with extra spaces here..."
              value={input}
              onChange={(e) => handleProcess(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Cleaned Output</label>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30"
                  title="Download .txt"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-80 p-4 bg-slate-100 border border-slate-200 rounded-xl outline-none font-sans text-slate-600 cursor-not-allowed"
              placeholder="Cleaned text will appear here..."
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
