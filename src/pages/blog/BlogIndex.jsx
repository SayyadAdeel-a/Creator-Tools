import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Layout } from '../../components/Layout'
import { supabase } from '../../lib/supabase'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'

function readingTime(text) {
    const words = text?.trim().split(/\s+/).length || 0
    const mins = Math.max(1, Math.round(words / 200))
    return `${mins} min read`
}

const CATEGORY_COLORS = [
    'bg-cyan-50 text-cyan-700',
    'bg-violet-50 text-violet-700',
    'bg-emerald-50 text-emerald-700',
    'bg-amber-50 text-amber-700',
    'bg-rose-50 text-rose-700',
]

export function BlogIndex() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('blog_posts')
            .select('id, title, slug, excerpt, content, created_at')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) console.error('Failed to load posts:', error)
                setPosts(data || [])
                setLoading(false)
            })
    }, [])

    const [featured, ...rest] = posts

    return (
        <Layout>
            <Helmet>
                <title>Blog — Tenreq</title>
                <meta name="description" content="Tips, guides and resources for content creators. Learn how to script videos, optimize subtitles, and grow your audience." />
                <link rel="canonical" href="https://tenreq.qzz.io/blog" />
            </Helmet>

            {/* Hero */}
            <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 text-sm font-medium px-4 py-1.5 rounded-full border border-cyan-200 mb-5">
                        ✍️ Creator Resources
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-slate-900 mb-4">
                        The Tenreq <span className="text-cyan-500">Blog</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto">
                        Tips, guides and strategies for YouTubers, subtitle editors, and content creators.
                    </p>
                </div>
            </section>

            <section className="py-14 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        // Skeleton loader
                        <div className="space-y-6">
                            <div className="animate-pulse bg-slate-100 rounded-2xl h-56 w-full" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-44" />
                                ))}
                            </div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="text-5xl mb-4">📝</div>
                            <h2 className="font-heading font-bold text-slate-900 text-xl mb-2">No posts yet</h2>
                            <p className="text-slate-400">Check back soon — content is on the way!</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured post */}
                            {featured && (
                                <Link
                                    to={`/blog/${featured.slug}`}
                                    className="group block bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden mb-10 hover:shadow-xl hover:shadow-slate-200 transition-all"
                                >
                                    <div className="p-8 sm:p-10">
                                        <span className="inline-block bg-cyan-500/20 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full border border-cyan-500/30 mb-5">
                                            Latest Post
                                        </span>
                                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 leading-snug group-hover:text-cyan-300 transition-colors">
                                            {featured.title}
                                        </h2>
                                        {featured.excerpt && (
                                            <p className="text-slate-400 text-base mb-6 line-clamp-2 leading-relaxed">
                                                {featured.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays className="w-4 h-4" />
                                                    {new Date(featured.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" />
                                                    {readingTime(featured.content)}
                                                </span>
                                            </div>
                                            <span className="text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read article <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Remaining posts grid */}
                            {rest.length > 0 && (
                                <>
                                    <h2 className="font-heading font-bold text-slate-900 text-lg mb-5">More Articles</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {rest.map((post, i) => (
                                            <Link
                                                key={post.id}
                                                to={`/blog/${post.slug}`}
                                                className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all flex flex-col"
                                            >
                                                <div className="flex-1">
                                                    <h2 className="font-heading font-semibold text-base text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-3 leading-snug">
                                                        {post.title}
                                                    </h2>
                                                    {post.excerpt && (
                                                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                                                            {post.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400 mt-auto">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarDays className="w-3.5 h-3.5" />
                                                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {readingTime(post.content)}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Layout>
    )
}
