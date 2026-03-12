import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Twitter, Split, Copy, Check, Hash, AlertTriangle, List, ArrowDownWideArrow } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ThreadSplitter() {
  const [text, setText] = useState('')
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  
  const TWEET_LIMIT = 280

  const tweets = useMemo(() => {
    if (!text.trim()) return []

    const result = []
    // Split by sentences or paragraph breaks to keep context together
    const sentences = text.match(/[^.!?\n]+[.!?\n]+(?:\s|$)/g) || [text]
    
    let currentTweet = ''
    let tweetNumber = 1

    sentences.forEach((sentence) => {
      const cleanSentence = sentence.trim()
      if (!cleanSentence) return

      // Prefix + Sentence — will this fit?
      const prefix = `${tweetNumber}/ `
      const potentialContent = currentTweet ? `${currentTweet} ${cleanSentence}` : cleanSentence

      if ((prefix + potentialContent).length <= TWEET_LIMIT) {
        currentTweet = potentialContent
      } else {
        // Current doesn't fit with new sentence, push current and start new
        if (currentTweet) {
          result.push(`${tweetNumber}/ ${currentTweet}`)
          tweetNumber++
        }
        
        // Handle case where single sentence is longer than TWEET_LIMIT (rare, but split strictly)
        let longSentence = cleanSentence
        while (longSentence.length > TWEET_LIMIT - 6) { // Buffer for numbering
            const chunk = longSentence.substring(0, TWEET_LIMIT - 10)
            result.push(`${tweetNumber}/ ${chunk}...`)
            tweetNumber++
            longSentence = longSentence.substring(chunk.length)
        }
        currentTweet = longSentence
      }
    })

    if (currentTweet) {
      result.push(`${tweetNumber}/ ${currentTweet}`)
    }

    return result
  }, [text])

  const handleCopyAll = () => {
    if (tweets.length === 0) return
    navigator.clipboard.writeText(tweets.join('\n\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
    trackToolUse('Twitter Thread Splitter', 'thread-splitter')
  }

  const handleCopyOne = (t, idx) => {
    navigator.clipboard.writeText(t)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Twitter/X Thread Splitter — Split Long Text for Threads | Tenreq</title>
        <meta name="description" content="Effortlessly split your long-form thoughts or blog posts into a perfectly numbered Twitter thread. Stay under the 280 character limit with automatic sentence splitting." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/thread-splitter" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Twitter Thread Splitter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://tenreq.qzz.io/tools/thread-splitter",
          "description": "Divide and conquer your long-form text into a numbered sequence of tweets for X/Twitter engagement."
        })}</script>
      </Helmet>

      <ToolPage
        title="Twitter/X Thread Splitter"
        icon={Twitter}
        description="Transform long articles into viral Twitter threads. We automatically split your text into 280-character chunks while preserving sentences and adding numbering."
        howToUse={[
          "Paste your long text or article into the input area",
          "Review the generated tweet cards and check character counts",
          "Copy individual tweets or get the whole thread in one click"
        ]}
        faq={[
            { question: "How does the tool decide where to split?", answer: "We prioritize splitting at sentence boundaries (. ! ?) to ensure your thoughts remain cohesive and easy to read. Each split is carefully calculated to stay within the 280-character limit." },
            { question: "Is numbering added automatically?", answer: "Yes! Every tweet begins with a number (e.g., 1/, 2/) so your audience can easily follow the sequence of your thread." },
            { question: "What if a sentence is over 280 characters?", answer: "We'll force-split the sentence and add an ellipsis (...) to ensure No tweet is rejected by Twitter for being over the limit." }
        ]}
      >
        <div className="p-6">
          <div className="mb-10">
            <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2 font-heading tracking-tight">
                <List className="w-5 h-5 text-cyan-500" /> Source Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your long thoughts or article content here..."
              className="w-full h-64 p-6 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 outline-none resize-none text-slate-700 font-medium leading-relaxed shadow-inner shadow-slate-100 text-lg transition-all"
            />
          </div>

          {tweets.length > 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-slate-900 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Twitter className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">{tweets.length} Tweets Generated</h4>
                        <p className="text-xs text-slate-400 italic">Ready for a viral thread.</p>
                    </div>
                </div>
                <button
                    onClick={handleCopyAll}
                    className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl relative z-10 ${
                        copiedAll 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white text-slate-900 hover:bg-cyan-50'
                    }`}
                >
                    {copiedAll ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copiedAll ? 'Thread Copied' : 'Copy Full Thread'}
                </button>
                <div className="absolute -right-10 -bottom-10 opacity-10 blur-xl w-48 h-48 bg-cyan-600 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tweets.map((tweet, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 relative group hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <span className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 text-sm">{i + 1}</span>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${
                            tweet.length > 270 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                            {tweet.length} / 280
                        </div>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed text-lg break-words whitespace-pre-wrap mb-10">{tweet}</p>
                    <button 
                        onClick={() => handleCopyOne(tweet, i)}
                        className={`absolute bottom-6 right-6 p-4 rounded-2xl transition-all shadow-lg ${
                            copiedIndex === i 
                            ? 'bg-emerald-500 text-white translate-y-0 scale-105' 
                            : 'bg-slate-900 text-white hover:bg-cyan-600 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'
                        }`}
                        title="Copy individual tweet"
                    >
                        {copiedIndex === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    {tweet.length > TWEET_LIMIT && (
                        <div className="absolute top-6 left-[70px] flex items-center gap-1.5 text-red-500 group-hover:scale-105 transition-transform">
                             <AlertTriangle className="w-4 h-4" />
                             <span className="text-[10px] font-black uppercase">Over Limit</span>
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
