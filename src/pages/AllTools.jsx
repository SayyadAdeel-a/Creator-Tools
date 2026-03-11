import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Search, FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, 
  Captions, AlignLeft, Undo2, UserCheck, LayoutGrid, FileCode, Braces, 
  Video, Share2, Instagram, Twitter, Zap, BookOpen 
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { FavoriteButton } from '../components/FavoriteButton'

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
        name: 'Video Creator Tools',
        description: 'Essential formatting tools for YouTubers',
        icon: Video,
        color: 'bg-red-50 text-red-600 border-red-100',
        tools: [
            { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', description: 'Generate viral title ideas', icon: Zap, tags: ['youtube', 'video', 'ideas'] },
            { name: 'Description Formatter', path: '/tools/youtube-description-formatter', description: 'Pro video description formatting', icon: FileText, tags: ['youtube', 'seo', 'format'] },
            { name: 'Video Timestamps', path: '/tools/timestamp-generator', description: 'Create YouTube chapters quickly', icon: Clock, tags: ['youtube', 'timestamps', 'chapters'] },
            { name: 'YouTube Tags', path: '/tools/youtube-tags-extractor', description: 'Extract keywords from text', icon: Hash, tags: ['youtube', 'seo', 'tags'] },
            { name: 'Script Outline', path: '/tools/script-outline-generator', description: 'Structure your next video', icon: List, tags: ['video', 'planning', 'script'] },
            { name: 'Thumbnail Checker', path: '/tools/thumbnail-text-checker', description: 'Optimize thumbnail text', icon: Type, tags: ['youtube', 'design', 'thumbnail'] },
            { name: 'Video Duration', path: '/tools/video-duration-calculator', description: 'Sum up your video clips', icon: Clock, tags: ['video', 'calculator', 'timer'] },
        ]
    },
    {
        name: 'Text & SEO Tools',
        description: 'Optimize your scripts and written content',
        icon: Type,
        color: 'bg-violet-50 text-violet-600 border-violet-100',
        tools: [
            { name: 'Word Frequency', path: '/tools/word-frequency', description: 'Find overused words', icon: Hash, tags: ['seo', 'text', 'analysis'] },
            { name: 'Sentence Counter', path: '/tools/sentence-counter', description: 'Analyze sentence structure', icon: AlignLeft, tags: ['writing', 'stats', 'text'] },
            { name: 'Readability Score', path: '/tools/readability-score', description: 'Check content difficulty', icon: BookOpen, tags: ['seo', 'writing', 'readability'] },
            { name: 'Article Title Checker', path: '/tools/title-checker', description: 'Headline SEO analysis', icon: Type, tags: ['seo', 'copywriting', 'title'] },
            { name: 'Meta Title Checker', path: '/tools/meta-title-checker', description: 'Google search preview', icon: Search, tags: ['seo', 'meta', 'google'] },
            { name: 'Duplicate Remover', path: '/tools/duplicate-line-remover', description: 'Strip duplicate lines', icon: Eraser, tags: ['text', 'cleanup', 'list'] },
            { name: 'Text to Bullets', path: '/tools/text-to-bullets', description: 'Convert text to lists', icon: List, tags: ['format', 'writing', 'list'] },
            { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count words for recording duration', icon: Type, tags: ['script', 'words', 'youtube'] },
            { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading duration', icon: Clock, tags: ['reading', 'time', 'blog'] },
            { name: 'Title Case', path: '/tools/title-case', description: 'Convert text to proper title case', icon: Type, tags: ['title', 'capitalize', 'format'] },
            { name: 'Slug Generator', path: '/tools/slug-generator', description: 'SEO-friendly URL slugs', icon: Link2, tags: ['slug', 'url', 'seo'] },
            { name: 'Keyword Density', path: '/tools/keyword-density', description: 'Analyze frequency relative to total', icon: Hash, tags: ['seo', 'keyword', 'density'] },
            { name: 'Remove Extra Spaces', path: '/tools/remove-extra-spaces', description: 'Clean up text spacing', icon: AlignLeft, tags: ['text', 'clean', 'format'] },
        ]
    },
    {
        name: 'Social Media Tools',
        description: 'Formatted content for all social platforms',
        icon: Share2,
        color: 'bg-pink-50 text-pink-600 border-pink-100',
        tools: [
            { name: 'Instagram Formatter', path: '/tools/instagram-formatter', description: 'Preserve caption spacing', icon: Instagram, tags: ['instagram', 'social', 'format'] },
            { name: 'Thread Splitter', path: '/tools/thread-splitter', description: 'Split text into tweets', icon: Twitter, tags: ['twitter', 'x', 'social'] },
            { name: 'Emoji Remover', path: '/tools/emoji-remover', description: 'Strip emojis from text', icon: Eraser, tags: ['text', 'clean', 'format'] },
            { name: 'Hashtag Generator', path: '/tools/hashtag-generator', description: 'Find viral hashtags', icon: Hash, tags: ['social', 'seo', 'tags'] },
            { name: 'Social Counter', path: '/tools/social-character-counter', description: 'Check limits for all social media', icon: Type, tags: ['social', 'stats', 'limits'] },
            { name: 'Bio Length Check', path: '/tools/bio-length-checker', description: 'Optimize your social bios', icon: UserCheck, tags: ['social', 'bio', 'profile'] },
            { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count and extract all hashtags', icon: Hash, tags: ['hashtag', 'instagram', 'social'] },
        ]
    },
    {
        name: 'Developer & Data Tools',
        description: 'Useful utilities for coders and power users',
        icon: FileCode,
        color: 'bg-amber-50 text-amber-600 border-amber-100',
        tools: [
            { name: 'URL Encoder / Decoder', path: '/tools/url-encoder', description: 'Make strings safe for URLs', icon: Link2, tags: ['url', 'developer', 'encode'] },
            { name: 'Base64 Encoder / Decoder', path: '/tools/base64', description: 'Encode or decode strings', icon: FileCode, tags: ['base64', 'developer', 'decode'] },
            { name: 'JSON Formatter', path: '/tools/json-formatter', description: 'Format or minify JSON', icon: Braces, tags: ['json', 'developer', 'format'] },
        ]
    },
    {
        name: 'Random Generators',
        description: 'Fun and fair tools for picking and splitting',
        icon: UserCheck,
        color: 'bg-green-50 text-green-600 border-green-100',
        tools: [
            { name: 'Random Name Picker', path: '/tools/random-name-picker', description: 'Pick a winner from a list', icon: UserCheck, tags: ['random', 'picker', 'winner'] },
            { name: 'Random Team Generator', path: '/tools/random-team-generator', description: 'Split names into random groups', icon: LayoutGrid, tags: ['random', 'teams', 'groups'] },
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
                <meta name="description" content="Browse all 40+ free tools for content creators — subtitle converters, SEO tools, developer utilities, and more." />
            </Helmet>

            <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-14">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                        All <span className="text-cyan-500">Tools</span>
                    </h1>
                    <p className="text-slate-500 mb-8">40+ free browser-based tools for content creators — no sign-in required.</p>
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
        <div className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all duration-200 group relative">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                </div>
                <FavoriteButton toolSlug={tool.path.split('/').pop()} className="w-8 h-8" />
            </div>
            <Link to={tool.path} className="block">
                <h3 className="font-heading font-semibold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{tool.description}</p>
            </Link>
            <div className="flex flex-wrap gap-1.5">
                {tool.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded-full text-xs text-slate-500">{tag}</span>
                ))}
            </div>
        </div>
    )
}
