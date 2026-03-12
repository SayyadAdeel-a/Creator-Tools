import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { CalendarRange, Calendar, Clock, BarChart, Coffee, Briefcase } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { trackToolUse } from '../../lib/track'

export function DateDifference() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const diffData = useMemo(() => {
    if (!start || !end) return null

    const d1 = new Date(start)
    const d2 = new Date(end)
    const diffTime = Math.abs(d2 - d1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Working days calculation
    let workingDays = 0
    let tempDate = new Date(Math.min(d1, d2))
    const finalDate = new Date(Math.max(d1, d2))
    
    while (tempDate <= finalDate) {
      const day = tempDate.getDay()
      if (day !== 0 && day !== 6) workingDays++
      tempDate.setDate(tempDate.getDate() + 1)
    }

    const weeks = (diffDays / 7).toFixed(1)
    const months = (diffDays / 30.44).toFixed(1)
    const years = (diffDays / 365.25).toFixed(1)

    return { diffDays, workingDays, weeks, months, years }
  }, [start, end])

  const handleTrack = () => {
    trackToolUse('Days Between Dates Calculator', 'date-difference')
  }

  return (
    <>
      <Helmet>
        <title>Days Between Dates Calculator — Project Timeline Tool | VidToolbox</title>
        <meta name="description" content="Calculate the exact number of days, weeks, and working days between two dates. Ideal for project management and timeline planning." />
      </Helmet>

      <ToolPage
        title="Days Between Dates"
        icon={CalendarRange}
        description="Plan your timelines with precision. Calculate the total duration between any two dates, isolate working days for business planning, and see the breakdown in weeks and months."
        howToUse={[
          "Select a start date from the first calendar picker",
          "Select an end date from the second calendar picker",
          "Review the total day count and the working day (Monday-Friday) analysis"
        ]}
        faq={[
          { question: "Are weekends excluded in 'Working Days'?", answer: "Yes, our working day calculation automatically excludes Saturdays and Sundays to help with business project planning." },
          { question: "Does this account for leap years?", answer: "Yes, because we use the underlying JavaScript Date engine, leap years and varying month lengths are handled systematically." },
          { question: "What is the 'Weeks' calculation?", answer: "It is the total number of days divided by 7, providing a precise roadmap for sprint planning." }
        ]}
      >
        <div className="p-6 max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-10 rounded-[40px] border border-slate-100 items-end">
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Start Date
                    </label>
                    <input 
                        type="date" 
                        value={start} 
                        onChange={(e) => { setStart(e.target.value); handleTrack(); }}
                        className="w-full p-5 bg-white border border-slate-200 rounded-3xl text-lg font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 cursor-pointer"
                    />
                </div>
                <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
                         <Calendar className="w-3 h-3" /> End Date
                     </label>
                     <input 
                         type="date" 
                         value={end} 
                         onChange={(e) => { setEnd(e.target.value); handleTrack(); }}
                         className="w-full p-5 bg-white border border-slate-200 rounded-3xl text-lg font-bold outline-none focus:ring-4 focus:ring-cyan-500/10 cursor-pointer"
                     />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Primary Card */}
                <div className="lg:col-span-1 bg-slate-900 rounded-[50px] p-12 text-center shadow-2xl relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Total Duration</span>
                    <div className="text-7xl font-black text-white whitespace-nowrap">
                        {diffData ? diffData.diffDays : '0'}
                    </div>
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Total Days</span>
                </div>

                {/* Secondary Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:border-cyan-200 transition-all group">
                        <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                            <Briefcase className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Days</p>
                            <p className="text-3xl font-black text-slate-900">{diffData ? diffData.workingDays : '0'} <span className="text-sm font-bold text-slate-300">Mon-Fri</span></p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:border-purple-200 transition-all group">
                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Clock className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Week Count</p>
                            <p className="text-3xl font-black text-slate-900">{diffData ? diffData.weeks : '0'} <span className="text-sm font-bold text-slate-300">Wks</span></p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex items-center gap-6 sm:col-span-2">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                             <BarChart className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="flex flex-wrap gap-8">
                             <div>
                                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Approx Months</span>
                                 <span className="font-bold text-slate-700">{diffData ? diffData.months : '0'}</span>
                             </div>
                             <div>
                                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Approx Years</span>
                                 <span className="font-bold text-slate-700">{diffData ? diffData.years : '0'}</span>
                             </div>
                        </div>
                        <p className="ml-auto text-xs text-slate-400 italic font-medium hidden md:block">
                            * Includes weekends calculation
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </ToolPage>
    </>
  )
}
