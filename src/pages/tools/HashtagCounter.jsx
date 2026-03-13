import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hash, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function HashtagCounter() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const countHashtags = () => {
    const regex = /#[\w]+/g
    const matches = input.match(regex) || []
    const unique = [...new Set(matches)]
    setResult({ total: matches.length, unique: unique.length, hashtags: unique })
    trackToolUse('Hashtag Counter', 'hashtag-counter')
  }

  return (
    <>
      <Helmet>
        <title>Hashtag Counter — Count & Extract Instagram Hashtags Free | VidToolbox</title>
        <meta name="description" content="Count total and unique hashtags in any text. Instantly extract all hashtags from your Instagram, Twitter or TikTok captions. Free online tool, no sign-up needed." />
        <meta name="keywords" content="hashtag counter, count hashtags, Instagram hashtag counter, extract hashtags, unique hashtag counter, hashtag tool online" />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/hashtag-counter" />
        <meta property="og:title" content="Hashtag Counter — Count & Extract Hashtags Free | VidToolbox" />
        <meta property="og:url" content="https://vidtoolbox.qzz.io/tools/hashtag-counter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Hashtag Counter",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/hashtag-counter",
          "description": "Count and extract hashtags from social media posts. Free, instant, no sign-up."
        })}</script>
      </Helmet>

      <ToolPage
        title="Hashtag Counter"
        icon={Hash}
        description="Count hashtags in your social media posts and extract unique hashtags."
        introContent="The Hashtag Counter is a free social media tool for Instagram, Twitter/X, TikTok, and LinkedIn creators. Count hashtags, track usage, and optimize your hashtag strategy. This free tool shows total and unique hashtags, helping you stay within platform limits (Instagram allows up to 30, Twitter has a character limit). Perfect for influencers, marketers, and content creators who want to maximize their reach."
        howToUse={[
          "Paste your social media post or caption into the textarea",
          "Click 'Count Hashtags' to analyze the text",
          "View the total count and unique hashtags below"
        ]}
        faq={[
          { question: "How many hashtags can I use on Instagram?", answer: "Instagram allows up to 30 hashtags per post. Using the right mix can improve your reach." },
          { question: "Does it work for TikTok?", answer: "Yes! Works for any platform that uses hashtags including TikTok, Twitter, LinkedIn, and Facebook." },
          { question: "What's the difference between total and unique hashtags?", answer: "Total counts all hashtags including duplicates. Unique shows only distinct hashtags." },
          { question: "Can I copy all hashtags at once?", answer: "Yes, the extracted hashtags are displayed in a copy-friendly format." }
        ]}
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Text</label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); if (!e.target.value.trim()) setResult(null); }}
              placeholder="Paste your text with hashtags here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">{input.length.toLocaleString()} characters</span>
            <button
              onClick={countHashtags}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
            >
              Count Hashtags <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {result && (
          <div className="border-t border-slate-200 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-cyan-50 rounded-xl p-5 text-center">
                <Hash className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-900">{result.total}</div>
                <div className="text-sm text-slate-600 mt-1">Total Hashtags</div>
              </div>
              <div className="bg-cyan-50 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-slate-900">{result.unique}</div>
                <div className="text-sm text-slate-600 mt-1">Unique Hashtags</div>
              </div>
            </div>

            {result.hashtags.length > 0 && (
              <div>
                <h3 className="font-medium text-slate-900 mb-3">Found Hashtags:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ToolPage>
    </>
  )
}
