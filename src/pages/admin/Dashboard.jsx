import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Wrench, TrendingUp, FileText, Eye } from 'lucide-react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

function StatCard({ icon: Icon, label, value, color }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-500">{label}</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{value ?? '—'}</div>
        </div>
    )
}

function relativeTime(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
}

export function AdminDashboard() {
    const [stats, setStats] = useState({})
    const [toolChart, setToolChart] = useState([])
    const [trafficChart, setTrafficChart] = useState([])
    const [recentActivity, setRecentActivity] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        const todayStart = new Date()
        todayStart.setHours(0, 0, 0, 0)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

        const [
            { count: totalToolUses },
            { count: toolUsesToday },
            { count: totalPosts },
            { count: pageViewsToday },
            { data: toolEvents30d },
            { data: pageViews30d },
            { data: recentEvents },
        ] = await Promise.all([
            supabase.from('tool_events').select('*', { count: 'exact', head: true }),
            supabase.from('tool_events').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
            supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
            supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', todayStart.toISOString()),
            supabase.from('tool_events').select('tool_name, created_at').gte('created_at', thirtyDaysAgo),
            supabase.from('page_views').select('created_at').gte('created_at', thirtyDaysAgo),
            supabase.from('tool_events').select('tool_name, created_at').order('created_at', { ascending: false }).limit(20),
        ])

        setStats({ totalToolUses, toolUsesToday, totalPosts, pageViewsToday })

        // Group tool events by tool_name
        const toolCounts = {}
        for (const e of toolEvents30d || []) {
            const key = e.tool_name.replace(' Tool', '').replace(' Converter', '').replace(' Calculator', '').replace(' Generator', '').replace(' Counter', '')
            toolCounts[key] = (toolCounts[key] || 0) + 1
        }
        setToolChart(Object.entries(toolCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count))

        // Group page views by day
        const dayCounts = {}
        for (const v of pageViews30d || []) {
            const day = new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            dayCounts[day] = (dayCounts[day] || 0) + 1
        }
        setTrafficChart(Object.entries(dayCounts).map(([date, views]) => ({ date, views })))

        setRecentActivity(recentEvents || [])
        setLoading(false)
    }

    return (
        <>
            <Helmet><title>Dashboard — VidToolbox Admin</title></Helmet>
            <AdminLayout>
                <div className="p-8">
                    <h1 className="text-2xl font-heading font-bold text-slate-900 mb-6">Dashboard</h1>

                    {loading ? (
                        <div className="flex items-center justify-center h-48 text-slate-400">Loading…</div>
                    ) : (
                        <>
                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                                <StatCard icon={Wrench} label="Total Tool Uses" value={stats.totalToolUses?.toLocaleString()} color="bg-cyan-500" />
                                <StatCard icon={TrendingUp} label="Tool Uses Today" value={stats.toolUsesToday?.toLocaleString()} color="bg-violet-500" />
                                <StatCard icon={FileText} label="Blog Posts" value={stats.totalPosts?.toLocaleString()} color="bg-emerald-500" />
                                <StatCard icon={Eye} label="Page Views Today" value={stats.pageViewsToday?.toLocaleString()} color="bg-amber-500" />
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-xl border border-slate-200 p-5">
                                    <h2 className="font-heading font-semibold text-slate-900 mb-4">Top Tools (Last 30 Days)</h2>
                                    {toolChart.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={220}>
                                            <BarChart data={toolChart} margin={{ top: 0, right: 0, left: -20, bottom: 40 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} angle={-30} textAnchor="end" />
                                                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                                                <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p className="text-slate-400 text-sm text-center py-12">No data yet</p>
                                    )}
                                </div>

                                <div className="bg-white rounded-xl border border-slate-200 p-5">
                                    <h2 className="font-heading font-semibold text-slate-900 mb-4">Traffic — Page Views (Last 30 Days)</h2>
                                    {trafficChart.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={220}>
                                            <LineChart data={trafficChart} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                                                <Line type="monotone" dataKey="views" stroke="#22d3ee" strokeWidth={2} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p className="text-slate-400 text-sm text-center py-12">No data yet</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100">
                                    <h2 className="font-heading font-semibold text-slate-900">Recent Tool Activity</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50">
                                                <th className="px-5 py-3 text-left font-medium text-slate-500">Tool</th>
                                                <th className="px-5 py-3 text-right font-medium text-slate-500">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {recentActivity.length > 0 ? recentActivity.map((event, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-5 py-3 text-slate-900">{event.tool_name}</td>
                                                    <td className="px-5 py-3 text-slate-400 text-right">{relativeTime(event.created_at)}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={2} className="px-5 py-8 text-center text-slate-400">No activity recorded yet</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </AdminLayout>
        </>
    )
}
