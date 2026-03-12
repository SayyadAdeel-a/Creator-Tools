import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { UserCheck, RotateCcw, Trophy, Trash2 } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function RandomNamePicker() {
  const [namesText, setNamesText] = useState('')
  const [pickedName, setPickedName] = useState(null)
  const [removeAfterPick, setRemoveAfterPick] = useState(false)
  const [isPicking, setIsPicking] = useState(false)

  const handlePick = () => {
    const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== '')
    if (names.length === 0) return

    setIsPicking(true)
    setPickedName(null)

    // Visual effect: delay picking
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * names.length)
      const winner = names[randomIndex]
      setPickedName(winner)
      setIsPicking(false)

      if (removeAfterPick) {
        const remaining = names.filter((_, i) => i !== randomIndex)
        setNamesText(remaining.join('\n'))
      }
      
      trackToolUse('Random Name Picker', 'random-name-picker')
    }, 600)
  }

  const handleReset = () => {
    setPickedName(null)
  }

  return (
    <ToolPage
      title="Random Name Picker"
      description="Pick a winner or choose a random person from a list fairly and instantly."
      icon={UserCheck}
      howToUse={[
        "Type or paste your list of names, one per line.",
        "Check the 'Remove after pick' box if you don't want the same person picked twice.",
        "Click the Pick Random button to see the result."
      ]}
      faq={[
        {
          question: "How random is the picker?",
          answer: "It uses a standard pseudorandom number generator (Math.random) which is perfectly fair for giveaways, classroom activities, and group decisions."
        },
        {
          question: "Can I pick from a very long list?",
          answer: "Yes, you can paste hundreds or even thousands of names into the list field."
        },
        {
          question: "What happens if I check 'Remove picked name'?",
          answer: "The winning name will be automatically deleted from your list after being shown, making it easy to run multiple rounds without repeats."
        }
      ]}
    >
      <Helmet>
        <title>Random Name Picker — Pick a Winner Online Free | Tenreq</title>
        <meta name="description" content="Pick a random name from your list instantly. Perfect for giveaways, raffles, and choosing winners fairly. No sign-up required, 100% free and private." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/random-name-picker" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">List of Names (One per line)</label>
            <textarea
              className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
              placeholder="Enter names here...&#10;John Doe&#10;Jane Smith&#10;..."
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
            />
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="removeName"
                className="w-4 h-4 text-cyan-500 rounded border-slate-300 focus:ring-cyan-500"
                checked={removeAfterPick}
                onChange={(e) => setRemoveAfterPick(e.target.checked)}
              />
              <label htmlFor="removeName" className="text-sm text-slate-600 cursor-pointer select-none">
                Remove picked name from list
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {!pickedName && !isPicking ? (
              <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl w-full">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-semibold mb-2">Ready to pick?</h3>
                <p className="text-slate-500 text-sm mb-6">Enter at least one name to start the generator.</p>
                <button
                  onClick={handlePick}
                  disabled={!namesText.trim()}
                  className="w-full bg-cyan-500 text-white rounded-xl py-3 font-semibold hover:bg-cyan-600 transition-colors disabled:opacity-50"
                >
                  Pick Random Winner
                </button>
              </div>
            ) : isPicking ? (
              <div className="text-center w-full">
                <div className="animate-bounce inline-block p-4 bg-cyan-50 rounded-full mb-4">
                  <RotateCcw className="w-12 h-12 text-cyan-500 animate-spin" />
                </div>
                <div className="text-xl font-heading font-bold text-slate-900">Selecting...</div>
              </div>
            ) : (
              <div className="text-center w-full animate-in zoom-in duration-300">
                <div className="p-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-xl shadow-cyan-200 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 overflow-hidden -rotate-12 scale-150">
                    {Array.from({length: 20}).map((_, i) => <Trophy key={i} className="w-12 h-12 text-white" />)}
                  </div>
                  <Trophy className="w-16 h-16 text-white mx-auto mb-4 relative z-10" />
                  <div className="text-white text-sm font-medium uppercase tracking-widest mb-2 relative z-10">The Winner is</div>
                  <div className="text-4xl md:text-5xl font-heading font-black text-white relative z-10 truncate px-2">
                    {pickedName}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePick}
                    className="flex-1 bg-cyan-500 text-white rounded-xl py-3 font-semibold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-100 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Pick Again
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-3 bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Clear result"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
