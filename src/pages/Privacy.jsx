import { Helmet } from 'react-helmet-async'
import { Shield, Lock, EyeOff, ServerOff } from 'lucide-react'
import { Layout } from '../components/Layout'

export function Privacy() {
    return (
        <Layout>
            <Helmet>
                <title>Privacy Policy — VidToolbox</title>
                <meta name="description" content="Privacy Policy for VidToolbox. We are a privacy-first collection of tools for creators where everything happens in your browser." />
            </Helmet>

            {/* Hero */}
            <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-500">
                        Last updated: March 2024
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="prose prose-slate max-w-none text-slate-600">
                        <h2 className="text-xl font-heading font-bold text-slate-900 mt-0">Introduction</h2>
                        <p>
                            At VidToolbox, we believe that your data belongs to you. This Privacy Policy outlines how we handle information across our website and tools. Our core philosophy is <strong>Privacy by Design</strong>.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                                <ServerOff className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-slate-900 text-sm mb-1">No Server Uploads</h3>
                                <p className="text-xs text-slate-500 leading-tight">Your files and text stay in your browser.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                                <Lock className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-slate-900 text-sm mb-1">Local Processing</h3>
                                <p className="text-xs text-slate-500 leading-tight">Everything happens on your device.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                                <EyeOff className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-slate-900 text-sm mb-1">No Tracking</h3>
                                <p className="text-xs text-slate-500 leading-tight">We don't sell or share your data.</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-heading font-bold text-slate-900">1. Data Collection</h2>
                        <p>
                            Most of our tools operate entirely on the client-side. This means that when you use a tool like the "SRT to Text" converter or "Hashtag Counter", the processing is done by your own browser using JavaScript. We do not receive, store, or have access to any content you paste inside these tools.
                        </p>

                        <h2 className="text-xl font-heading font-bold text-slate-900">2. Voluntary Account Information</h2>
                        <p>
                            If you choose to create an account or sign up for our mailing list, we collect your <strong>email address</strong>. This is used solely to provide you with updates, new tools, and resources for creators. You can unsubscribe at any time.
                        </p>

                        <h2 className="text-xl font-heading font-bold text-slate-900">3. Analytics</h2>
                        <p>
                            To improve our website, we collect anonymous usage statistics (such as which tools are the most popular). This data does not contain any personally identifiable information (PII). We use it only to understand which areas of VidToolbox need the most attention and improvement.
                        </p>

                        <h2 className="text-xl font-heading font-bold text-slate-900">4. Third-Party Services</h2>
                        <p>
                            We use <strong>Supabase</strong> for authentication and our database. When you sign up, your email is stored securely by Supabase according to their privacy standards.
                        </p>

                        <h2 className="text-xl font-heading font-bold text-slate-900">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please feel free to reach out via our contact channels.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
