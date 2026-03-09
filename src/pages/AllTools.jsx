import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, Captions } from 'lucide-react'
import { Layout } from '../components/Layout'

const categories = [
    {
        name: 'Subtitle Tools',
        description: 'Work smarter with SRT subtitle files',
        icon: Captions,
        color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
        tools: [
            { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Strip all SRT formatting and export clean plain text', icon: FileText, tags: ['srt', 'convert', 'text'] },
            { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', description: 'Remove timestamps while keeping dialogue intact', icon: Eraser, tags: ['timestamp', 'clean', 'srt'] },
            { name: 'Subtitle Counter', path: '/tools/subtitle-counter', description: 'Count blocks, dialogue lines, and characters', icon: List, tags: ['count', 'stats', 'srt'] },
            { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Combine multiple SRT files into one chronological file', icon: Merge, tags: ['merge', 'combine', 'srt'] },
            { name: 'Subtitle Split', path: '/tools/subtitle-split', description: 'Split a large SRT file by line count or timestamp', icon: Split, tags: ['split', 'divide', 'srt'] },
        ]
    },
    {
        name: 'Text & Script Tools',
        description: 'Optimize your scripts and written content',
        icon: Type,
        color: 'bg-violet-50 text-violet-600 border-violet-100',
        tools: [
            { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count words and estimate video recording duration', icon: Type, tags: ['script', 'words', 'youtube'] },
            { name: 'Reading Time Calculator', path: '/tools/reading-time', description: 'Calculate how long it takes to read any text', icon: Clock, tags: ['reading', 'time', 'blog'] },
            { name: 'Title Case Converter', path: '/tools/title-case', description: 'Convert text to proper AP / Chicago title case', icon: Type, tags: ['title', 'capitalize', 'format'] },
            { name: 'Slug Generator', path: '/tools/slug-generator', description: 'Generate SEO-friendly URL slugs from any text', icon: Link2, tags: ['slug', 'url', 'seo'] },
            { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count and extract all hashtags from social posts', icon: Hash, tags: ['hashtag', 'instagram', 'social'] },
        ]
    }
]

const allTools = categories.flatMap(c => c.tools.map(t => ({ ...t, category: c.name })))

export function AllTools() {
    const [query, setQuery] = useState('')

    const filteredTools = query.trim()
        ? allTools.filter(t =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase()) ||
            t.tags.some(tag => tag.includes(query.toLowerCase()))
        )
        : null

    return (
        <Layout>
            <Helmet>
                <title>All Tools — Free Online Tools for Creators | VidToolbox</title>
                <meta name="description" content="Browse all 10 free tools for content creators — subtitle converters, word counters, slug generators, and more." />
            </Helmet>

            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-14">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                        All <span className="text-cyan-500">Tools</span>
                    </h1>
                    <p className="text-slate-500 mb-8">10 free browser-based tools for content creators — no sign-in required.</p>
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search tools…"
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                        />
                    </div>
                </div>
            </section>

            <section className="py-14 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                    {filteredTools ? (
                        /* Search results */
                        filteredTools.length > 0 ? (
                            <div>
                                <p className="text-sm text-slate-500 mb-5">{filteredTools.length} result{filteredTools.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {filteredTools.map(tool => <ToolCard key={tool.path} tool={tool} />)}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 text-slate-400">
                                <p className="text-lg">No tools found for "<strong>{query}</strong>"</p>
                                <button onClick={() => setQuery('')} className="mt-3 text-sm text-cyan-600 hover:underline">Clear search</button>
                            </div>
                        )
                    ) : (
                        /* Categories */
                        categories.map(cat => (
                            <div key={cat.name}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${cat.color}`}>
                                        <cat.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-heading font-bold text-slate-900">{cat.name}</h2>
                                        <p className="text-sm text-slate-500">{cat.description}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {cat.tools.map(tool => <ToolCard key={tool.path} tool={tool} />)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </Layout>
    )
}

function ToolCard({ tool }) {
    return (
        <Link
            to={tool.path}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200 group"
        >
            <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                <tool.icon className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="font-heading font-semibold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
            <p className="text-slate-500 text-sm mb-3">{tool.description}</p>
            <div className="flex flex-wrap gap-1.5">
                {tool.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs text-slate-500">{tag}</span>
                ))}
            </div>
        </Link>
    )
}
