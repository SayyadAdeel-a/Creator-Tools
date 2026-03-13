import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Link2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function SlugGenerator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const tracked = useRef(false)

  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    const slug = generateSlug(value)
    setOutput(slug)
    if (slug && !tracked.current) {
      trackToolUse('Slug Generator', 'slug-generator')
      tracked.current = true
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <>
      <Helmet>
        <title>URL Slug Generator — Create SEO-Friendly Slugs Free | VidToolbox</title>
        <meta name="description" content="Generate clean, SEO-friendly URL slugs from any text instantly. Lowercase, hyphenated, special-character-free. Free online tool for bloggers, developers and content creators." />
        <meta name="keywords" content="slug generator, URL slug, create URL slug, SEO friendly URL, permalink generator, blog slug tool" />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/slug-generator" />
        <meta property="og:title" content="URL Slug Generator — SEO-Friendly Slugs Free | VidToolbox" />
        <meta property="og:url" content="https://vidtoolbox.qzz.io/tools/slug-generator" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "URL Slug Generator",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/slug-generator",
          "description": "Generate clean, SEO-friendly URL slugs from any text. Free and instant."
        })}</script>
      </Helmet>

      <ToolPage
        title="Slug Generator"
        icon={Link2}
        description="Create URL-friendly slugs from any text."
        introContent="The Slug Generator is a free SEO tool that creates clean, URL-friendly slugs from any text. Perfect for bloggers, content creators, and website owners who need optimized URLs for better search engine rankings. This free online slug generator converts titles into lowercase strings with hyphens, removing special characters and spaces. Use it for WordPress permalinks, blog post URLs, or any web address."
        howToUse={[
          "Enter or paste your text in the input field",
          "The slug is generated automatically in real-time",
          "Click 'Copy' to use the slug in your URLs"
        ]}
        faq={[
          { question: "What is a URL slug?", answer: "A slug is the part of a URL that identifies a specific page in a human-readable way." },
          { question: "Why are slugs important for SEO?", answer: "Clean, descriptive slugs help search engines understand your page content and improve rankings." },
          { question: "Can I customize the generated slug?", answer: "Yes, you can edit the input text to get your desired slug format." },
          { question: "Does this work for non-English text?", answer: "For best results, use English text. Special characters will be removed." }
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
