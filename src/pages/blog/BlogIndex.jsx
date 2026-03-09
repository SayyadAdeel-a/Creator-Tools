import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Layout } from '../../components/Layout'
import { supabase } from '../../lib/supabase'
import { CalendarDays } from 'lucide-react'

export function BlogIndex() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('blog_posts')
            .select('id, title, slug, excerpt, created_at')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .then(({ data }) => {
                setPosts(data || [])
                setLoading(false)
            })
    }, [])

    return (
        <Layout>
            <Helmet>
                <title>Blog — VidToolbox</title>
                <meta name="description" content="Tips, guides and resources for content creators." />
            </Helmet>

            <section className="bg-white border-b border-slate-100 py-14">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-heading font-bold text-slate-900 mb-3">
                        Creator <span className="text-cyan-500">Blog</span>
                    </h1>
                    <p className="text-slate-500">Tips, guides and resources for content creators.</p>
                </div>
            </section>

            <section className="py-12 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center h-48 text-slate-400">Loading posts…</div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-24 text-slate-400">No posts published yet. Check back soon!</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-cyan-200 hover:-translate-y-0.5 transition-all group"
                                >
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h2 className="font-heading font-semibold text-lg text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">{post.title}</h2>
                                    {post.excerpt && <p className="text-slate-500 text-sm line-clamp-3">{post.excerpt}</p>}
                                    <p className="text-cyan-600 text-sm font-medium mt-4">Read more →</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
