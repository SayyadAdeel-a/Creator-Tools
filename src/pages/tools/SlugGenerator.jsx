import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Link2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SlugGenerator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    const slug = generateSlug(value)
    setOutput(slug)
    if (slug) trackToolUse('Slug Generator', 'slug-generator')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>Slug Generator — Free Online Tool for Creators | VidToolbox</title>
        <meta name="description" content="Generate URL-friendly slugs from any text." />
      </Helmet>

      <ToolPage
        title="Slug Generator"
        icon={Link2}
        description="Create URL-friendly slugs from any text."
        howToUse={[
          "Enter or paste your text in the input field",
          "The slug is generated automatically in real-time",
          "Click 'Copy' to use the slug in your URLs"
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
              <label className="block text-sm font-medium text-slate-700 mb-2">Generated Slug</label>
              <div className="w-full px-4 py-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 font-mono text-lg">
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
