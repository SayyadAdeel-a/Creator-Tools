import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Users, RotateCcw, LayoutGrid, User } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function RandomTeamGenerator() {
  const [namesText, setNamesText] = useState('')
  const [teamCount, setTeamCount] = useState(2)
  const [teams, setTeams] = useState(null)

  const handleGenerate = () => {
    const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== '')
    if (names.length < teamCount) return

    // Shuffle names using Fisher-Yates algorithm
    const shuffled = [...names]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Split into teams
    const newTeams = Array.from({ length: teamCount }, () => [])
    shuffled.forEach((name, index) => {
      newTeams[index % teamCount].push(name)
    })

    setTeams(newTeams)
    trackToolUse('Random Team Generator', 'random-team-generator')
  }

  return (
    <ToolPage
      title="Random Team Generator"
      description="Quickly divide a list of people into equal, balanced, and random teams for sports, games, or work."
      icon={LayoutGrid}
      howToUse={[
        "Enter your list of participants (one per line) in the text box.",
        "Choose how many teams you want to generate.",
        "Click Generate Teams to instantly see your randomly assigned groups."
      ]}
      faq={[
        {
          question: "How are people distributed into teams?",
          answer: "Our algorithm shuffles the entire list first and then distributes them one by one into the requested number of teams. this ensures total randomness while keeping team sizes as equal as possible."
        },
        {
          question: "What if the number of people isn't divisible by the team count?",
          answer: "The tool will handle this automatically. Some teams might have one more person than others to ensure everyone is included."
        },
        {
          question: "Can I use this for tournament seeding?",
          answer: "Absolutely! It's an excellent way to randomly assign players to brackets or pool groups fairly."
        }
      ]}
    >
      <Helmet>
        <title>Random Team Generator — Quickly Split Lists Online Free | Tenreq</title>
        <meta name="description" content="Instantly split a list of names into random teams. Perfect for sports, classroom groups, and office activities. Free, fair, and no sign-up required." />
        <link rel="canonical" href="https://tenreq.qzz.io/tools/random-team-generator" />
      </Helmet>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Participant List (One per line)</label>
            <textarea
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none font-sans text-slate-700"
              placeholder="Enter names here...&#10;Alice&#10;Bob&#10;Charlie&#10;..."
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
            />
          </div>
          <div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full flex flex-col justify-between">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Number of Teams</label>
                <div className="flex items-center gap-4 mb-6">
                  <input
                    type="number"
                    min="2"
                    max="50"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all font-bold text-center text-xl text-cyan-600"
                    value={teamCount}
                    onChange={(e) => setTeamCount(Math.max(2, parseInt(e.target.value) || 2))}
                  />
                  <Users className="w-8 h-8 text-slate-300 flex-shrink-0" />
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!namesText.trim() || namesText.split('\n').filter(n => n.trim()).length < teamCount}
                className="w-full bg-cyan-500 text-white rounded-xl py-4 font-semibold hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-100 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Generate Teams
              </button>
            </div>
          </div>
        </div>

        {teams && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {teams.map((team, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-cyan-200 transition-all">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                  <span className="font-heading font-bold text-slate-900">Team {idx + 1}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">{team.length} members</span>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {team.map((member, midx) => (
                      <li key={midx} className="flex items-center gap-3 text-sm text-slate-600">
                        <User className="w-3.5 h-3.5 text-cyan-500" />
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
