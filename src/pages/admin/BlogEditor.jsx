import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

function generateSlug(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

export function BlogEditor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isNew = !id

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [published, setPublished] = useState(false)
    const [slugTouched, setSlugTouched] = useState(false)
    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState('')

    useEffect(() => {
        if (!isNew) {
            supabase.from('blog_posts').select('*').eq('id', id).single().then(({ data }) => {
                if (data) {
                    setTitle(data.title)
                    setSlug(data.slug)
                    setExcerpt(data.excerpt || '')
                    setContent(data.content || '')
                    setPublished(data.published)
                    setSlugTouched(true)
                }
                setLoading(false)
            })
        }
    }, [id, isNew])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        if (!slugTouched) {
            setSlug(generateSlug(e.target.value))
        }
    }

    const showToast = (msg) => {
        setToast(msg)
        setTimeout(() => setToast(''), 3000)
    }

    const handleSave = async () => {
        if (!title.trim() || !slug.trim()) return alert('Title and slug are required.')
        setSaving(true)
        const payload = { title, slug, excerpt, content, published, updated_at: new Date().toISOString() }

        let error
        if (isNew) {
            ({ error } = await supabase.from('blog_posts').insert(payload))
        } else {
            ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id))
        }

        if (error) {
            alert(`Error saving: ${error.message}`)
        } else {
            showToast('Post saved successfully!')
            if (isNew) navigate('/admin/blog')
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64 text-slate-400">Loading post…</div>
            </AdminLayout>
        )
    }

    return (
        <>
            <Helmet><title>{isNew ? 'New Post' : 'Edit Post'} — VidToolbox Admin</title></Helmet>
            <AdminLayout>
                <div className="p-8 max-w-4xl">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/admin/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to posts
                        </Link>
                        {toast && (
                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm px-4 py-2 rounded-lg animate-fade-in-up">
                                <CheckCircle className="w-4 h-4" /> {toast}
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-heading font-bold text-slate-900 mb-6">{isNew ? 'New Blog Post' : 'Edit Post'}</h1>

                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Your post title…"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true) }}
                                placeholder="url-friendly-slug"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm"
                            />
                            <p className="text-xs text-slate-400 mt-1">Public URL: /blog/{slug || 'your-slug'}</p>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Excerpt <span className="text-slate-400 font-normal">(used as SEO meta description)</span>
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value.slice(0, 160))}
                                placeholder="A short summary of this post…"
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
                            />
                            <p className="text-xs text-slate-400 mt-1 text-right">{excerpt.length}/160 characters</p>
                        </div>

                        {/* Markdown editor */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content (Markdown)</label>
                            <div data-color-mode="light">
                                <MDEditor
                                    value={content}
                                    onChange={setContent}
                                    height={480}
                                    preview="live"
                                />
                            </div>
                        </div>

                        {/* Published toggle */}
                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setPublished(!published)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${published ? 'bg-cyan-500' : 'bg-slate-300'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${published ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{published ? 'Published' : 'Draft'}</p>
                                <p className="text-xs text-slate-500">{published ? 'Visible to the public' : 'Not visible on the blog'}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-60"
                        >
                            {saving ? 'Saving…' : isNew ? 'Create Post' : 'Update Post'}
                        </button>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
