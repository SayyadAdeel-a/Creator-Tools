import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Zap, Mail, Lock, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { Layout } from '../../components/Layout'

export function PublicLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(error.message)
        } else {
            navigate('/')
        }
        setLoading(false)
    }

    return (
        <Layout>
            <Helmet>
                <title>Login — VidToolbox</title>
                <meta name="description" content="Sign in to your VidToolbox account." />
            </Helmet>
            <div className="min-h-[calc(100vh-10rem)] bg-slate-50 flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <img src="/logo.svg" alt="VidToolbox Logo" className="w-10 h-10" />
                        </Link>
                        <h1 className="text-2xl font-heading font-bold text-slate-900">Welcome back</h1>
                        <p className="text-slate-500 text-sm mt-1">Sign in to your VidToolbox account</p>
                    </div>

                    <form onSubmit={handleSignIn} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

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
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-60"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>

                        <p className="text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-cyan-600 hover:underline font-medium">Sign up free</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
