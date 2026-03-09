import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Zap, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Layout } from '../../components/Layout'

export function PublicSignup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => navigate('/'), 2500)
            return () => clearTimeout(timer)
        }
    }, [success, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin }
        })
        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <Layout>
                <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-16">
                    <div className="max-w-sm text-center">
                        <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="w-8 h-8 text-cyan-500" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">Welcome to VidToolbox! 🎉</h2>
                        <p className="text-slate-500 text-sm mb-4">
                            Your account has been created. Redirecting you to the homepage…
                        </p>
                        <div className="w-40 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
                            <div
                                className="h-full bg-cyan-500 rounded-full"
                                style={{ animation: 'grow 2.5s linear forwards' }}
                            />
                        </div>
                        <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
                        <Link to="/" className="inline-block mt-5 text-sm text-cyan-600 hover:underline">
                            Go now →
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <Helmet>
                <title>Sign Up — VidToolbox</title>
                <meta name="description" content="Create a free VidToolbox account to save your preferences and get updates." />
            </Helmet>
            <div className="min-h-[calc(100vh-10rem)] bg-slate-50 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-heading font-bold text-slate-900">Create your account</h1>
                        <p className="text-slate-500 text-sm mt-1">Free forever — no credit card required</p>
                    </div>

                    <form onSubmit={handleSignUp} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="bg-cyan-50 border border-cyan-100 rounded-lg px-4 py-3 text-sm text-cyan-700">
                            ✨ Sign up to stay updated with new tools, tips &amp; resources for creators.
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Min. 6 characters"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-60"
                        >
                            {loading ? 'Creating account…' : 'Create Free Account'}
                        </button>

                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-cyan-600 hover:underline font-medium">Sign in</Link>
                        </p>
                    </form>

                    <p className="text-center text-xs text-slate-400 mt-4">
                        No spam. Unsubscribe any time.
                    </p>
                </div>
            </div>
        </Layout>
    )
}
