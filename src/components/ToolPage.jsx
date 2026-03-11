import { Link, useLocation } from 'react-router-dom'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowLeft, Info } from 'lucide-react'
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
    question: "What file formats are supported?",
    answer: "We support the standard SubRip (.srt) format for all subtitle-related tools."
  }
]

export function ToolPage({ 
  title, 
  description, 
  howToUse, 
  faq = faqItems, 
  icon: Icon,
  children 
}) {
  const location = useLocation()
  const slug = location.pathname.split('/').pop()

  return (
    <Layout>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
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
      
      <AdSlot className="mb-6" />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {children}
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">How to use</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 bg-white rounded-xl border border-slate-200 p-5">
          {howToUse.map((step, index) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>
      
      <Accordion.Root type="single" collapsible className="space-y-3">
        <h2 className="text-lg font-heading font-semibold text-slate-900 mb-4">FAQ</h2>
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
          <h2 className="text-lg font-heading font-semibold text-slate-900">About {title}</h2>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          This tool runs entirely in your browser. No data is sent to any server, ensuring complete privacy and security for your content.
        </p>
      </div>
      
      <AdSlot className="mt-8" />
    </div>
    </Layout>
  )
}
