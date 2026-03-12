import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, ExternalLink, LogOut, Zap } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'

const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Blog Posts', path: '/admin/blog', icon: FileText },
]

export function AdminLayout({ children }) {
    const navigate = useNavigate()
    const location = useLocation()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
                <div className="p-5 border-b border-slate-100">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="VidToolbox Logo" className="w-7 h-7" />
                        <span className="font-heading font-bold text-slate-900">VidToolbox</span>
                    </Link>
                    <p className="text-xs text-slate-400 mt-1 pl-9">Admin Panel</p>
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                location.pathname === item.path
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-3 border-t border-slate-100 space-y-0.5">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View Site
                    </a>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}
