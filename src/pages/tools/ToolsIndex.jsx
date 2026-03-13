import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FileText, Type, Hash, Clock, Split, Merge, Eraser, List, Link2, ArrowRight } from 'lucide-react'
import { Layout } from '../components/Layout'

const youtubeTools = [
  { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count words and estimate video duration for your YouTube scripts', icon: Type },
  { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate how long it takes to read your content', icon: Clock },
]

const subtitleTools = [
  { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert SRT subtitle files to plain text', icon: FileText },
  { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', description: 'Remove timestamps from subtitles', icon: Eraser },
  { name: 'Subtitle Counter', path: '/tools/subtitle-counter', description: 'Count subtitle blocks, lines, and characters', icon: List },
  { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Combine multiple SRT files into one', icon: Merge },
  { name: 'Subtitle Split', path: '/tools/subtitle-split', description: 'Split SRT files by line count or timestamp', icon: Split },
]

const textTools = [
  { name: 'Title Case Converter', path: '/tools/title-case', description: 'Convert text to proper title case', icon: Type },
  { name: 'Slug Generator', path: '/tools/slug-generator', description: 'Create URL-friendly slugs', icon: Link2 },
  { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count and extract hashtags from text', icon: Hash },
  { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate estimated reading time', icon: Clock },
]

export function ToolsIndex() {
  return (
    <Layout>
      <Helmet>
        <title>Free Online Tools for Content Creators - VidToolbox</title>
        <meta name="description" content="Free online tools for content creators. SRT subtitle converter, word counter, slug generator, reading time calculator, hashtag counter and more. No sign-up required." />
      </Helmet>
      
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
            Free Online <span className="text-cyan-500">Tools</span> for Content Creators
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Boost your content creation with our free, fast, and privacy-focused tools. 
            No sign-up required — everything runs in your browser.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* YouTube Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Type className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900">YouTube Tools</h2>
                <p className="text-slate-600">Optimize your YouTube videos with these free tools</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {youtubeTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="block p-5 border border-slate-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                    <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Subtitle Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900">Subtitle Tools</h2>
                <p className="text-slate-600">Work with SRT subtitle files easily</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subtitleTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="block p-5 border border-slate-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                    <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Text & SEO Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900">Text & SEO Tools</h2>
                <p className="text-slate-600">Format text and optimize for search engines</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {textTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="block p-5 border border-slate-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <tool.icon className="w-5 h-5 text-cyan-500" />
                    <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4">Why Use VidToolbox?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600 text-sm">All tools run instantly in your browser. No waiting, no uploads.</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Privacy Focused</h3>
              <p className="text-slate-600 text-sm">Your data never leaves your browser. We don't store any of your content.</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Always Free</h3>
              <p className="text-slate-600 text-sm">No sign-up required. No hidden fees. Completely free forever.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
