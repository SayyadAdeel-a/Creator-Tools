import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileEdit, Copy, Check, Download, Eye, Code2, RefreshCcw, FileCode } from 'lucide-react'
import { marked } from 'marked'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState('# Sample Title\n\nThis is a **markdown** preview.\n\n* List item 1\n* List item 2')
  const [tab, setTab] = useState('html') // html, preview
  const [copied, setCopied] = useState(false)

  const html = useMemo(() => {
    try {
        return marked.parse(markdown)
    } catch (e) {
        return 'Error parsing markdown'
    }
  }, [markdown])

  const handleCopy = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackToolUse('Markdown to HTML Converter', 'markdown-to-html')
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([html], {type: 'text/html'})
    element.href = URL.createObjectURL(file)
    element.download = "page.html"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      <Helmet>
        <title>Markdown to HTML Converter — Fast Documentation Tool | VidToolbox</title>
        <meta name="description" content="Convert Markdown syntax into clean HTML code instantly. Features a real-time previewer and professional HTML code output for your web projects." />
      </Helmet>

      <ToolPage
        title="Markdown to HTML"
        icon={FileEdit}
        description="Write simply, export professionally. Transform your markdown files into semantic HTML code for blogs, documentation, and web assets with a high-fidelity live preview."
        howToUse={[
          "Paste or type your markdown syntax into the editor area",
          "Switch between the 'HTML Code' and 'Live Preview' tabs to verify results",
          "Copy the generated code or download it as a dedicated .html file"
        ]}
        faq={[
          { question: "Which markdown version is supported?", answer: "We use the Marked engine, which supports standard CommonMark and GFM (GitHub Flavored Markdown) syntax." },
          { question: "Is the HTML secure?", answer: "All conversion happens client-side. For added safety, we recommend using a sanitizer if you plan to inject this HTML into a public-facing database." },
          { question: "Does it support images?", answer: "Yes, standard image markdown tags will render in the preview tab as long as the source URL is valid and accessible." }
        ]}
      >
        <div className="p-6 max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Editor Column */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileEdit className="w-3 h-3 text-cyan-500" /> Markdown Editor
                        </label>
                        <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">GFM Enabled</span>
                    </div>
                    <textarea 
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Type markdown here..."
                        className="w-full h-[600px] p-8 bg-white border border-slate-200 rounded-[40px] shadow-sm outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all font-mono text-sm resize-none"
                    />
                </div>

                {/* Output/Preview Column */}
                <div className="space-y-6">
                    <div className="flex bg-slate-100 p-2 rounded-[32px] gap-2">
                        <button 
                            onClick={() => setTab('html')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[26px] font-bold text-xs uppercase tracking-widest transition-all ${
                                tab === 'html' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Code2 className="w-4 h-4" /> HTML Code
                        </button>
                        <button 
                            onClick={() => setTab('preview')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[26px] font-bold text-xs uppercase tracking-widest transition-all ${
                                tab === 'preview' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Eye className="w-4 h-4" /> Live Preview
                        </button>
                    </div>

                    <div className="relative group">
                        <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                             <button onClick={handleDownload} className="p-2.5 bg-white border border-slate-100 rounded-xl shadow-lg text-slate-400 hover:text-cyan-600 transition-all">
                                <Download className="w-4 h-4" />
                             </button>
                             <button onClick={handleCopy} className={`p-2.5 rounded-xl shadow-lg border border-slate-100 transition-all ${copied ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-cyan-600'}`}>
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                             </button>
                        </div>

                        {tab === 'html' ? (
                            <textarea 
                                value={html}
                                readOnly
                                className="w-full h-[524px] p-8 md:p-12 bg-slate-900 text-cyan-400 rounded-[40px] shadow-2xl font-mono text-xs resize-none outline-none border-b-8 border-slate-800"
                            />
                        ) : (
                            <div className="w-full h-[524px] p-8 md:p-12 bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-y-auto prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-cyan-600 prose-img:rounded-2xl">
                                <div dangerouslySetInnerHTML={{ __html: html }} />
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center justify-between group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <FileCode className="w-5 h-5 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Document Analysis</p>
                                <p className="font-bold text-slate-700 text-sm">
                                    {html.length.toLocaleString()} <span className="text-slate-400">Characters Generated</span>
                                </p>
                            </div>
                         </div>
                         <RefreshCcw className="w-5 h-5 text-slate-200 animate-in spin-in-180 duration-1000" />
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
