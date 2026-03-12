import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Calendar, Cake, Clock, Gift, Hash, Baby } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [nowDate, setNowDate] = useState(new Date().toISOString().split('T')[0])

  const ageData = useMemo(() => {
    if (!dob) return null

    const birth = new Date(dob)
    const now = new Date(nowDate)
    
    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    // Next Birthday
    const nextBday = new Date(birth)
    nextBday.setFullYear(now.getFullYear())
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1)
    
    const diffTime = nextBday.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayBorn = weekdays[birth.getDay()]

    return { years, months, days, nextBdayDays: diffDays, dayBorn }
  }, [dob, nowDate])

  const handleTrack = () => {
    trackToolUse('Age Calculator', 'age-calculator')
  }

  return (
    <>
      <Helmet>
        <title>Professional Age Calculator — Years, Months, Days | VidToolbox</title>
        <meta name="description" content="Calculate your exact age in years, months, and days. Countdown to your next birthday and discover what day of the week you were born." />
      </Helmet>

      <ToolPage
        title="Professional Age Calculator"
        icon={Baby}
        description="Timing is everything. Discover your exact age down to the day, calculate the countdown to your next milestone, and explore historical context for your birth date."
        howToUse={[
          "Select your Date of Birth from the calendar picker",
          "Optionally adjust the 'Today's Date' field to calculate age at a specific point in time",
          "Instantly view your age, birthday countdown, and the day of the week you were born"
        ]}
        faq={[
          { question: "How is the age calculated?", answer: "We calculate the exact calendar difference between the two dates, accounting for leap years and varying month lengths." },
          { question: "Can I use this for historical dates?", answer: "Yes, our tool supports any valid Gregorian calendar date, making it useful for historical research or family trees." },
          { question: "What is the 'Next Birthday' countdown?", answer: "It shows the total number of days remaining until your next birthday anniversary." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 {/* Input area */}
                 <div className="space-y-8">
                     <div className="space-y-4">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pl-2">Select Date of Birth</label>
                         <input 
                            type="date" 
                            value={dob} 
                            onChange={(e) => { setDob(e.target.value); handleTrack(); }}
                            className="w-full p-6 bg-white border border-slate-200 rounded-[32px] text-xl font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all cursor-pointer"
                         />
                     </div>
                     <div className="space-y-4">
                         <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pl-2">Calculate At Date (Default: Today)</label>
                         <input 
                            type="date" 
                            value={nowDate} 
                            onChange={(e) => setNowDate(e.target.value)}
                            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[32px] text-lg font-bold outline-none cursor-pointer"
                         />
                     </div>

                     <div className="bg-slate-900 rounded-[50px] p-12 text-center shadow-2xl space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                        <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">Current Age Assessment</span>
                        <div className="text-6xl font-black text-white relative z-10">
                            {ageData ? ageData.years : '0'} <span className="text-xl text-slate-500">Years Old</span>
                        </div>
                        {ageData && (
                            <p className="text-slate-400 font-bold relative z-10 text-sm">
                                + {ageData.months} Months and {ageData.days} Days
                            </p>
                        )}
                     </div>
                 </div>

                 {/* Results grid */}
                 <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:border-cyan-200 transition-colors">
                        <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Gift className="w-8 h-8 text-cyan-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Birthday In</p>
                            <p className="text-3xl font-black text-slate-900">{ageData ? ageData.nextBdayDays : '---'} <span className="text-sm text-slate-400">Days</span></p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:border-purple-200 transition-colors">
                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                            <Calendar className="w-8 h-8 text-purple-500" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Day of Birth</p>
                            <p className="text-3xl font-black text-slate-900 uppercase tracking-tight">{ageData ? ageData.dayBorn : '---'}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center gap-6">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                            <Clock className="w-8 h-8 text-slate-400" />
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed italic">
                            Time is the most valuable asset. Tracking your milestones helps you stay focused on what truly matters in your growth journey.
                         </p>
                    </div>
                 </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
