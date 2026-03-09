import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Zap, Target, Globe, Heart, Mail } from 'lucide-react'
import { Layout } from '../components/Layout'

const stats = [
    { value: '10+', label: 'Free Tools' },
    { value: '100%', label: 'Browser-Based' },
    { value: '0', label: 'Sign-up Required' },
    { value: '∞', label: 'Uses — No Limits' },
]

const values = [
    {
        icon: Target,
        title: 'Built for Creators',
        description: 'Every tool is designed around the real daily workflow of YouTubers, subtitle editors, bloggers, and social media creators.'
    },
    {
        icon: Globe,
        title: 'Always Free',
        description: 'All tools run entirely in your browser, no account required, no usage limits, no paywall — ever.'
    },
    {
        icon: Heart,
        title: 'Privacy First',
        description: 'Your files and text never leave your device. Everything is processed locally; nothing is sent to our servers.'
    },
]

export function About() {
    return (
        <Layout>
            <Helmet>
                <title>About — VidToolbox</title>
                <meta name="description" content="VidToolbox is a free collection of browser-based tools for content creators — built to save you time, every day." />
            </Helmet>

            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-20">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <img src="/logo.svg" alt="VidToolbox Logo" className="w-14 h-14 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-5">
                        About <span className="text-cyan-500">VidToolbox</span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        A free, no-nonsense toolbox built specifically for content creators who spend too much time on repetitive tasks.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b border-slate-100 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-4xl font-heading font-bold text-cyan-500 mb-1">{s.value}</div>
                                <div className="text-sm text-slate-500">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl font-heading font-bold text-slate-900 mb-5">Our Mission</h2>
                    <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                        <p>
                            Content creators spend hours every week doing repetitive technical work — cleaning subtitle files, counting words, converting formats. That time should go toward creating, not formatting.
                        </p>
                        <p>
                            VidToolbox was built to give creators a reliable set of browser-based utilities that are fast, free, and private. No bloated software, no sign-up walls, no file uploads to mysterious servers — just tools that work.
                        </p>
                        <p>
                            Whether you're editing subtitles for a YouTube video, calculating the reading time for a blog post, or generating URL slugs for your content calendar — we've got you covered.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">What We Stand For</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                                    <v.icon className="w-5 h-5 text-cyan-600" />
                                </div>
                                <h3 className="font-heading font-semibold text-slate-900 mb-2">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-heading font-bold text-white mb-3">Ready to save some time?</h2>
                    <p className="text-cyan-100 mb-8">Pick a tool and get to work — no sign-up needed.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/tools"
                            className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 font-semibold px-6 py-3 rounded-xl hover:bg-cyan-50 transition-colors"
                        >
                            Browse All Tools
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center gap-2 bg-cyan-400/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-cyan-400/40 transition-colors border border-white/20"
                        >
                            <Mail className="w-4 h-4" /> Get Updates
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
