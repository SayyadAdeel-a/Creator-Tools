import { Link, useLocation } from 'react-router-dom'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowLeft, Info, ArrowRight } from 'lucide-react'
import { FavoriteButton } from './FavoriteButton'
import { cn } from '../lib/utils'
import { AdSlot } from './AdSlot'
import { Layout } from './Layout'

const faqItems = [
  {
    question: "Is this tool free to use?",
    answer: "Yes, all our tools are completely free to use. No registration required."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! All processing happens locally in your browser. Your data is never sent to any server."
  },
  {
    question: "Do I need to install anything?",
    answer: "No, this tool works entirely in your web browser. No downloads or installations are required."
  },
  {
    question: "Can I use this for commercial purposes?",
    answer: "Yes! Our free tools can be used for both personal and commercial projects without any restrictions."
  }
]

const relatedToolsMap = {
  'srt-to-text': [
    { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', description: 'Remove timestamps from subtitles' },
    { name: 'Subtitle Counter', path: '/tools/subtitle-counter', description: 'Count subtitle lines and characters' },
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' }
  ],
  'subtitle-cleaner': [
    { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert subtitles to plain text' },
    { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Combine multiple SRT files' },
    { name: 'Subtitle Split', path: '/tools/subtitle-split', description: 'Split subtitle files' }
  ],
  'subtitle-counter': [
    { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert subtitles to text' },
    { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Merge subtitle files' },
    { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count YouTube script words' }
  ],
  'subtitle-merge': [
    { name: 'Subtitle Split', path: '/tools/subtitle-split', description: 'Split subtitle files' },
    { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert to plain text' },
    { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', description: 'Clean timestamps' }
  ],
  'subtitle-split': [
    { name: 'Subtitle Merge', path: '/tools/subtitle-merge', description: 'Merge subtitle files' },
    { name: 'Subtitle Counter', path: '/tools/subtitle-counter', description: 'Count subtitle items' },
    { name: 'SRT to Text', path: '/tools/srt-to-text', description: 'Convert to text' }
  ],
  'script-word-counter': [
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' },
    { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count hashtags' },
    { name: 'Title Case', path: '/tools/title-case', description: 'Format titles' }
  ],
  'reading-time': [
    { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count script words' },
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' },
    { name: 'Character Counter', path: '/tools/hashtag-counter', description: 'Count characters' }
  ],
  'title-case': [
    { name: 'Slug Generator', path: '/tools/slug-generator', description: 'Generate URL slugs' },
    { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count hashtags' },
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' }
  ],
  'slug-generator': [
    { name: 'Title Case', path: '/tools/title-case', description: 'Format titles' },
    { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count hashtags' },
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' }
  ],
  'hashtag-counter': [
    { name: 'Hashtag Counter', path: '/tools/hashtag-counter', description: 'Count hashtags' },
    { name: 'Script Word Counter', path: '/tools/script-word-counter', description: 'Count words' },
    { name: 'Reading Time', path: '/tools/reading-time', description: 'Calculate reading time' }
  ]
}

export function ToolPage({ 
  title, 
  description, 
  howToUse, 
  introContent,
  faq = faqItems, 
  icon: Icon,
  children 
}) {
  const location = useLocation()
  const slug = location.pathname.split('/').pop()
  const relatedTools = relatedToolsMap[slug] || []

  return (
    <Layout>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-cyan-500" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-heading font-bold text-slate-900">{title}</h1>
            <p className="text-slate-500 mt-1">{description}</p>
          </div>
        </div>
        <FavoriteButton toolSlug={slug} className="w-10 h-10" />
      </div>

      {/* Rich Intro Content */}
      {introContent && (
        <div className="mb-8 prose prose-slate max-w-none">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-600 leading-relaxed">{introContent}</p>
          </div>
        </div>
      )}
      
      <AdSlot className="mb-6" />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {children}
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">How to use {title}</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 bg-white rounded-xl border border-slate-200 p-5">
          {howToUse.map((step, index) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <Link 
                key={tool.path} 
                to={tool.path}
                className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-1">{tool.name}</h3>
                <p className="text-sm text-slate-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <Accordion.Root type="single" collapsible className="space-y-3">
        <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
        {faq.map((item, index) => (
          <Accordion.Item key={index} value={`item-${index}`} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-slate-900 hover:bg-slate-50 transition-colors">
                {item.question}
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-5 py-4 bg-slate-50 text-slate-600 text-sm leading-relaxed">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <div className="mt-8 bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-heading font-semibold text-slate-900">About This Tool</h2>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          {title} is a free online tool that runs entirely in your browser. 
          Your data is never sent to any server, ensuring complete privacy and security. 
          Use it for personal or commercial projects — no sign-up required.
        </p>
      </div>
      
      <AdSlot className="mt-8" />
    </div>
    </Layout>
  )
}
