import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

export function BlogList() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('blog_posts')
            .select('id, title, slug, published, created_at')
            .order('created_at', { ascending: false })
        setPosts(data || [])
        setLoading(false)
    }

    const deletePost = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post? This cannot be undone.')) return
        await supabase.from('blog_posts').delete().eq('id', id)
        setPosts(posts.filter(p => p.id !== id))
    }

    return (
        <>
            <Helmet><title>Blog Posts — VidToolbox Admin</title></Helmet>
            <AdminLayout>
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-heading font-bold text-slate-900">Blog Posts</h1>
                        <button
                            onClick={() => navigate('/admin/blog/new')}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all"
                        >
                            <Plus className="w-4 h-4" /> New Post
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center h-48 text-slate-400">Loading…</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-100 bg-slate-50">
                                            <th className="px-5 py-3 text-left font-medium text-slate-500">Title</th>
                                            <th className="px-5 py-3 text-left font-medium text-slate-500">Slug</th>
                                            <th className="px-5 py-3 text-left font-medium text-slate-500">Status</th>
                                            <th className="px-5 py-3 text-left font-medium text-slate-500">Date</th>
                                            <th className="px-5 py-3 text-right font-medium text-slate-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {posts.length > 0 ? posts.map((post) => (
                                            <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-5 py-3 font-medium text-slate-900 max-w-xs truncate">{post.title}</td>
                                                <td className="px-5 py-3 text-slate-500 font-mono text-xs">{post.slug}</td>
                                                <td className="px-5 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {post.published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-slate-400">
                                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            to={`/admin/blog/edit/${post.id}`}
                                                            className="p-1.5 text-slate-400 hover:text-cyan-600 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => deletePost(post.id)}
                                                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                                    No blog posts yet.{' '}
                                                    <button onClick={() => navigate('/admin/blog/new')} className="text-cyan-600 hover:underline">Create your first post →</button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
