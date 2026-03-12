import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Layout } from '../../components/Layout'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'

function readingTime(text) {
    const words = text?.trim().split(/\s+/).length || 0
    const mins = Math.max(1, Math.round(words / 200))
    return `${mins} min read`
}

export function BlogPost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single()
            .then(({ data, error }) => {
                if (error) console.error('Failed to load post:', error)
                setPost(data)
                setLoading(false)
            })
    }, [slug])

    if (loading) {
        return (
            <Layout>
                <div className="max-w-3xl mx-auto px-4 py-24">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-24" />
                        <div className="h-10 bg-slate-200 rounded w-3/4" />
                        <div className="h-4 bg-slate-200 rounded w-full" />
                        <div className="h-4 bg-slate-200 rounded w-full" />
                        <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                </div>
            </Layout>
        )
    }

    if (!post) {
        return (
            <Layout>
                <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                    <div className="text-6xl mb-6">📭</div>
                    <h1 className="text-2xl font-heading font-bold text-slate-900 mb-3">Post Not Found</h1>
                    <p className="text-slate-500 mb-8">This post doesn't exist or hasn't been published yet.</p>
                    <Link to="/blog" className="inline-flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-cyan-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </Layout>
        )
    }

    const schemaJson = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.created_at,
        "author": { "@type": "Organization", "name": "VidToolbox" },
        "publisher": { "@type": "Organization", "name": "VidToolbox", "url": "https://vidtoolbox.qzz.io" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://vidtoolbox.qzz.io/blog/${post.slug}` }
    })

    return (
        <Layout>
            <Helmet>
                <title>{post.title} — VidToolbox</title>
                <meta name="description" content={post.excerpt || post.title} />
                <script type="application/ld+json">{schemaJson}</script>
            </Helmet>

            {/* Hero banner */}
            <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Blog
                    </Link>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {readingTime(post.content)}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight mb-5">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-lg text-slate-500 leading-relaxed border-l-4 border-cyan-400 pl-4">
                            {post.excerpt}
                        </p>
                    )}
                </div>
            </div>

            {/* Article body */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                <article className="prose prose-slate prose-lg max-w-none
                    prose-headings:font-heading prose-headings:text-slate-900 prose-headings:font-bold prose-headings:scroll-mt-20
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:my-4
                    prose-a:text-cyan-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900 prose-strong:font-semibold
                    prose-ul:my-4 prose-ol:my-4
                    prose-li:text-slate-600 prose-li:my-1
                    prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:bg-cyan-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
                    prose-blockquote:text-slate-700
                    prose-code:text-cyan-700 prose-code:bg-cyan-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:border prose-pre:border-slate-800
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-hr:border-slate-200 prose-hr:my-10
                    prose-table:text-sm
                    prose-th:bg-slate-50 prose-th:text-slate-700 prose-th:font-semibold prose-th:px-4 prose-th:py-2.5
                    prose-td:px-4 prose-td:py-2.5 prose-td:border-slate-200 prose-td:text-slate-600
                ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                </article>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-slate-100">
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-cyan-200/60">
                        <div>
                            <p className="font-heading font-bold text-slate-900 text-lg">Try the tools for free</p>
                            <p className="text-slate-500 text-sm mt-1">No sign-up. No limits. Runs in your browser.</p>
                        </div>
                        <Link
                            to="/tools"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all whitespace-nowrap shadow-sm"
                        >
                            Browse All Tools →
                        </Link>
                    </div>
                </div>

                {/* Back link */}
                <div className="mt-10 text-center">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-600 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to all posts
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
