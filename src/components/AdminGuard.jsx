import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function AdminGuard({ children }) {
    const [session, setSession] = useState(undefined) // undefined = loading

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    if (session === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Checking authentication…</p>
                </div>
            </div>
        )
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}
