import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileCode, Copy, Check, Download, RefreshCcw, Layout, FileText, FileEdit } from 'lucide-react'
import TurndownService from 'turndown'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function HtmlToMarkdown() {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is a <strong>paragraph</strong>.</p>')
  const [markdown, setMarkdown] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    if (!html.trim()) {
        setMarkdown('')
        return
    }
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    })
    const result = turndownService.turndown(html)
    setMarkdown(result)
    trackToolUse('HTML to Markdown Converter', 'html-to-markdown')
  }

  // Initial convert
  useMemo(() => {
    if (!markdown) convert()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([markdown], {type: 'text/markdown'})
    element.href = URL.createObjectURL(file)
    element.download = "content.md"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>HTML to Markdown Converter — Clean Code Export | Tenreq</title>
        <meta name="description" content="Cleanly convert complex HTML into readable Markdown. Perfect for migrating website content to CMS platforms or documentation. Free online converter." />
      </Helmet>

      <ToolPage
        title="HTML to Markdown"
        icon={FileCode}
        description="Scrape and sanitize. Transform messy HTML code into beautifully formatted, readable Markdown. Ideal for content migration, documentation backups, and developer workflows."
        howToUse={[
          "Paste your raw HTML source code into the editor area",
          "Click 'Convert to Markdown' to process the elements and attributes",
          "Review the cleaned output and use the copy/download tools to export your .md file"
        ]}
        faq={[
          { question: "Does it support nested tags?", answer: "Yes, our converter accurately handles nested divs, spans, lists, and tables, translating them into their closest markdown equivalents." },
          { question: "Will it preserve formatting?", answer: "Basic styling (bold, italic, links, images) is preserved. CSS-based styling is stripped to ensure a clean, platform-independent markdown output." },
          { question: "Is there an HTML limit?", answer: "The tool processes large documents efficiently, but extremely complex scripts or non-standard tags may be ignored during the cleanup process." }
        ]}
      >
        <div className="p-6 max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* HTML Source */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Layout className="w-3 h-3 text-cyan-500" /> SOURCE HTML CODE
                        </label>
                        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Supports Full Document</span>
                    </div>
                    <textarea 
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        placeholder="Paste HTML here..."
                        className="w-full h-[500px] p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-xs resize-none"
                    />
                    <button 
                        onClick={convert}
                        className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Convert to Markdown
                    </button>
                </div>

                {/* Markdown Output */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileEdit className="w-3 h-3 text-emerald-500" /> SANITIZED MARKDOWN
                        </label>
                        <div className="flex gap-4">
                            <button onClick={handleDownload} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 flex items-center gap-1.5 transition-colors">
                                <Download className="w-3 h-3" /> .md
                            </button>
                            <button onClick={handleCopy} className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors ${copied ? 'text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`}>
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        <textarea 
                            value={markdown}
                            readOnly
                            placeholder="# Output ready..."
                            className="w-full h-[500px] p-10 md:p-12 bg-slate-50 border border-slate-100 rounded-[40px] shadow-inner text-slate-900 font-mono text-sm resize-none outline-none group-hover:bg-white transition-colors duration-500"
                        />
                        <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-50 pointer-events-none">
                            <FileText className="w-6 h-6 text-slate-200" />
                        </div>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[40px] flex items-center justify-between shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-full bg-cyan-500/10 skew-x-12 translate-x-10 pointer-events-none transition-transform group-hover:translate-x-6"></div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Code Scrub Metric</p>
                            <p className="text-white font-black text-xl">
                                {markdown.split('\n').length || 0} <span className="text-sm text-slate-500 mr-2">Markdown Lines</span>
                            </p>
                        </div>
                        <FileCode className="w-10 h-10 text-white/10 group-hover:text-cyan-400/20 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}

function useMemo(fn, deps) {
    const [called, setCalled] = useState(false)
    useEffect(() => {
        if (!called) {
            fn()
            setCalled(true)
        }
    }, [called, ...deps])
}
