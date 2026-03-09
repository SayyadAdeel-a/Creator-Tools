import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { Layout } from '../../components/Layout'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, CalendarDays } from 'lucide-react'

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
                <div className="flex items-center justify-center h-64 text-slate-400">Loading…</div>
            </Layout>
        )
    }

    if (!post) {
        return (
            <Layout>
                <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                    <div className="text-5xl mb-4">📭</div>
                    <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Post Not Found</h1>
                    <p className="text-slate-500 mb-6">This post doesn't exist or hasn't been published yet.</p>
                    <Link to="/blog" className="text-cyan-600 hover:underline">← Back to Blog</Link>
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
        "publisher": { "@type": "Organization", "name": "VidToolbox", "url": "https://vidtoolbox.vercel.app" },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://vidtoolbox.vercel.app/blog/${post.slug}` }
    })

    return (
        <Layout>
            <Helmet>
                <title>{post.title} — VidToolbox</title>
                <meta name="description" content={post.excerpt || post.title} />
                <script type="application/ld+json">{schemaJson}</script>
            </Helmet>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>

                <h1 className="text-4xl font-heading font-bold text-slate-900 mb-8 leading-tight">{post.title}</h1>

                {/* Prose content */}
                <article className="prose prose-slate prose-headings:font-heading prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </div>
        </Layout>
    )
}
