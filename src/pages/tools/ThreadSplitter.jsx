import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Copy, Twitter, Split, Check } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function ThreadSplitter() {
  const [text, setText] = useState('')
  const [limit, setLimit] = useState(280)
  const [tweets, setTweets] = useState([])

  const splitThread = () => {
    if (!text.trim()) return

    const result = []
    const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text]
    
    let currentTweet = ''
    let tweetIndex = 1

    sentences.forEach((sentence) => {
      const prefix = `${tweetIndex}/ `
      if ((prefix + currentTweet + sentence).length <= limit) {
        currentTweet += sentence
      } else {
        if (currentTweet) {
          result.push(`${tweetIndex}/ ${currentTweet.trim()}`)
          tweetIndex++
        }
        currentTweet = sentence
      }
    })

    if (currentTweet) {
      result.push(`${tweetIndex}/ ${currentTweet.trim()}`)
    }

    setTweets(result)
    trackToolUse('Twitter/X Thread Splitter', 'thread-splitter')
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(tweets.join('\n\n'))
  }

  const handleCopyOne = (t) => {
    navigator.clipboard.writeText(t)
  }

  return (
    <>
      <Helmet>
        <title>Twitter/X Thread Splitter — Split Long Text into Tweets | VidToolbox</title>
        <meta name="description" content="Easily split long blog posts or thoughts into a perfectly numbered Twitter thread. Avoid cutting mid-sentence and stay under the character limit. Free online tool." />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/thread-splitter" />
      </Helmet>

      <ToolPage
        title="Twitter/X Thread Splitter"
        icon={Twitter}
        description="Turn your long-form articles into viral Twitter threads. We automatically split your text at sentence boundaries and add numbering for you."
        howToUse={[
          "Paste your long text into the input area",
          "Adjust the character limit if needed (default 280 for X)",
          "Click 'Split' and copy your individual tweet cards"
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Long Text Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your long thoughts or article here..."
              className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none mb-4"
            />
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Char Limit:</span>
                    <input 
                        type="number" 
                        value={limit} 
                        onChange={(e) => setLimit(parseInt(e.target.value) || 280)}
                        className="w-20 px-2 py-1 border border-slate-200 rounded text-sm font-bold"
                    />
                </div>
                <button
                    onClick={splitThread}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2.5 rounded-xl font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
                >
                    <Split className="w-4 h-4" /> Split into Thread
                </button>
            </div>
          </div>

          {tweets.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900">{tweets.length} Tweets Generated</h3>
                <button onClick={handleCopyAll} className="text-xs font-bold text-cyan-600 hover:underline flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5" /> Copy All Tweets
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {tweets.map((tweet, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 relative group hover:border-cyan-200 transition-colors shadow-sm">
                    <div className="text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">{tweet}</div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <span className={`text-[10px] font-bold ${tweet.length > limit ? 'text-red-500' : 'text-slate-400'}`}>
                            {tweet.length} / {limit}
                        </span>
                        <button 
                            onClick={() => handleCopyOne(tweet)}
                            className="text-xs font-bold text-cyan-600 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Copy className="w-3 h-3" /> Copy Tweet
                        </button>
                    </div>
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
