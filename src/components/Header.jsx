import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, LayoutGrid, Captions, Type, BookOpen, Info,
  Menu, X, Zap, ChevronDown,
  Eraser, List, Merge, Split, Clock, Hash, Link2, User, LogOut,
  AlignLeft, Undo2, UserCheck, FileCode, Braces,
  Video, Share2, FileText, BarChart3, Timer, Search, MessageSquare,
  Twitter, Instagram, Wand2, TrendingUp, Smartphone, Palette, Calculator, ShieldCheck, Layers, Tag, Sun, Percent, Maximize, HardDrive, Ruler, Baby, CalendarRange
} from 'lucide-react'
import { cn } from '../lib/utils'

const youtubeTools = [
  { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', icon: Wand2 },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', icon: FileText },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', icon: Clock },
  { name: 'YouTube Tags', path: '/tools/youtube-tags', icon: Search },
]

const seoTools = [
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash },
  { name: 'Sentence Counter', path: '/tools/sentence-counter', icon: AlignLeft },
  { name: 'Readability Score', path: '/tools/readability', icon: BookOpen },
  { name: 'Title Checker', path: '/tools/title-checker', icon: TrendingUp },
]

const designTools = [
  { name: 'HEX to RGB', path: '/tools/hex-to-rgb', icon: Palette },
  { name: 'RGB to HEX', icon: Layers, path: '/tools/rgb-to-hex' },
  { name: 'Color Palette', path: '/tools/color-palette', icon: Wand2 },
  { name: 'Contrast Checker', path: '/tools/contrast-checker', icon: ShieldCheck },
  { name: 'Gradient Gen', path: '/tools/gradient-generator', icon: Layers },
  { name: 'Color Name', path: '/tools/color-name', icon: Tag },
  { name: 'Tint & Shade', path: '/tools/tint-shade', icon: Sun },
]

const calculatorTools = [
  { name: 'Pct Calculator', path: '/tools/percentage-calculator', icon: Percent },
  { name: 'Aspect Ratio', path: '/tools/aspect-ratio', icon: Maximize },
  { name: 'File Size', path: '/tools/file-size', icon: HardDrive },
  { name: 'Unit Converter', path: '/tools/unit-converter', icon: Ruler },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: Baby },
  { name: 'Date Difference', path: '/tools/date-difference', icon: CalendarRange },
  { name: 'Num to Words', path: '/tools/number-to-words', icon: Type },
]

const socialTools = [
  { name: 'Instagram Format', path: '/tools/instagram-formatter', icon: Instagram },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser },
  { name: 'Hashtag Gen', path: '/tools/hashtag-generator', icon: Hash },
  { name: 'Char Counter', path: '/tools/character-counter', icon: Smartphone },
  { name: 'Bio Check', path: '/tools/bio-checker', icon: User },
]

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Tools', path: '/tools', icon: LayoutGrid },
  { name: 'Blog', path: '/blog', icon: MessageSquare },
]

function NavDropdown({ label, icon: Icon, items, isActive }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1 px-2.5 py-2 rounded-lg text-[13px] font-bold transition-colors',
          isActive ? 'text-cyan-600 bg-cyan-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        )}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
        <ChevronDown className={cn('w-3 h-3 transition-transform ml-0.5', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-3.5 h-3.5 text-slate-400" />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let subscription = null;
    import('../lib/supabase').then(({ supabase }) => {
      supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
      const { data } = supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ?? null)
      })
      subscription = data.subscription;
    });
    return () => { if (subscription) subscription.unsubscribe() }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    const { supabase } = await import('../lib/supabase');
    await supabase.auth.signOut()
    setUserMenuOpen(false)
    navigate('/')
  }

  const isDesignActive = designTools.some(t => location.pathname === t.path)
  const isCalculatorActive = calculatorTools.some(t => location.pathname === t.path)
  const isSocialActive = socialTools.some(t => location.pathname === t.path)
  const isYoutubeActive = youtubeTools.some(t => location.pathname === t.path)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 lg:gap-6 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-teal-400 rounded-xl flex items-center justify-center p-1 shadow-lg shadow-cyan-500/20">
                <img src="/logo.svg" alt="VidToolbox Logo font-black" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-heading font-bold text-lg lg:text-xl text-slate-900 tracking-tight hidden sm:block">VidToolbox</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold transition-colors',
                  location.pathname === item.path
                    ? 'text-cyan-600 bg-cyan-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            ))}

            <NavDropdown label="Design" icon={Palette} items={designTools} isActive={isDesignActive} />
            <NavDropdown label="Calculators" icon={Calculator} items={calculatorTools} isActive={isCalculatorActive} />
            <NavDropdown label="Social" icon={Share2} items={socialTools} isActive={isSocialActive} />
            <NavDropdown label="YouTube" icon={Video} items={youtubeTools} isActive={isYoutubeActive} />

            <Link
              to="/about"
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold transition-colors',
                location.pathname === '/about' ? 'text-cyan-600 bg-cyan-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <Info className="w-3.5 h-3.5" />
              About
            </Link>
          </nav>

          {/* Auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0 ml-auto xl:ml-0">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-cyan-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-600" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <p className="px-4 py-2 text-xs text-slate-400 truncate">{user.email}</p>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-[13px] font-bold text-slate-600 hover:text-slate-900 px-3 py-2">Login</Link>
                <Link to="/signup" className="text-[13px] font-bold text-white bg-slate-900 hover:bg-cyan-600 px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/10">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button aria-label="Toggle mobile menu" className="xl:hidden p-2 ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden py-4 border-t border-slate-200 space-y-1 bg-white animate-in slide-in-from-top-4 duration-300 rounded-b-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 py-3 px-4 text-sm font-bold text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-4 h-4" /> {item.name}
              </Link>
            ))}

            <div className="pt-4 pb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Design Tools</p>
              <div className="grid grid-cols-2 px-2">
                {designTools.map((t) => (
                    <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-[12px] text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                    <t.icon className="w-3.5 h-3.5 text-slate-400" /> {t.name}
                    </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 pb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Calculators</p>
              <div className="grid grid-cols-2 px-2">
                {calculatorTools.map((t) => (
                    <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-[12px] text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                    <t.icon className="w-3.5 h-3.5 text-slate-400" /> {t.name}
                    </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 pb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Social Tools</p>
              <div className="grid grid-cols-2 px-2">
                {socialTools.map((t) => (
                    <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-[12px] text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                    <t.icon className="w-3.5 h-3.5 text-slate-400" /> {t.name}
                    </Link>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex flex-col gap-3 px-4 pb-6">
              {user ? (
                <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-bold text-red-500 py-2">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-700 py-2" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/signup" className="text-sm font-bold text-white bg-slate-900 px-6 py-3 rounded-xl text-center shadow-xl shadow-slate-900/20" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
