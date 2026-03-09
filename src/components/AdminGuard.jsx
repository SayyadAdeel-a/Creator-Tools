import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

// Add your authorized admin emails here
const ADMIN_EMAILS = ['adeelsayyad.a@gmail.com']

export function AdminGuard({ children }) {
    const [user, setUser] = useState(undefined) // undefined = loading

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return () => subscription.unsubscribe()
    }, [])

    if (user === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Checking permissions…</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />
    }

    // Check if user email is in the authorized list
    if (!ADMIN_EMAILS.includes(user.email)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-heading font-bold text-slate-900 mb-2">Access Denied</h1>
                    <p className="text-slate-500 text-sm mb-6">
                        You do not have administrative privileges to access this area.
                    </p>
                    <a href="/" className="inline-block bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        Return to Homepage
                    </a>
                </div>
            </div>
        )
    }

    return children
}
