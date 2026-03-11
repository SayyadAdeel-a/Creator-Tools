import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, LayoutGrid, Captions, Type, BookOpen, Info,
  Menu, X, Zap, ChevronDown,
  Eraser, List, Merge, Split, Clock, Hash, Link2, User, LogOut,
  AlignLeft, Undo2, UserCheck, FileCode, Braces,
  Video, Share2, FileText, BarChart3, Timer, Search, MessageSquare,
  Twitter, Instagram, Wand2, TrendingUp, Smartphone, Hash as HashtagIcon
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase } from '../lib/supabase'

const youtubeTools = [
  { name: 'YouTube Title Gen', path: '/tools/youtube-title-generator', icon: Wand2 },
  { name: 'Description Formatter', path: '/tools/youtube-description-formatter', icon: FileText },
  { name: 'Video Timestamps', path: '/tools/timestamp-generator', icon: Clock },
  { name: 'YouTube Tags', path: '/tools/youtube-tags', icon: Search },
  { name: 'Script Outline', path: '/tools/script-outline', icon: List },
  { name: 'Thumbnail Text', path: '/tools/thumbnail-text', icon: Type },
  { name: 'Duration Calculator', path: '/tools/duration-calculator', icon: Timer },
]

const seoTools = [
  { name: 'Word Frequency', path: '/tools/word-frequency', icon: Hash },
  { name: 'Sentence Counter', path: '/tools/sentence-counter', icon: AlignLeft },
  { name: 'Readability Score', path: '/tools/readability', icon: BookOpen },
  { name: 'Title Checker', path: '/tools/title-checker', icon: TrendingUp },
  { name: 'Meta Title', path: '/tools/meta-title', icon: Search },
  { name: 'Duplicate Lines', path: '/tools/duplicate-lines', icon: Eraser },
  { name: 'Text to Bullets', path: '/tools/text-to-bullets', icon: List },
]

const socialTools = [
  { name: 'Instagram Formatter', path: '/tools/instagram-formatter', icon: Instagram },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser },
  { name: 'Hashtag Generator', path: '/tools/hashtag-generator', icon: Hash },
  { name: 'Character Counter', path: '/tools/character-counter', icon: Smartphone },
  { name: 'Bio Length Check', path: '/tools/bio-checker', icon: User },
]

const utilityTools = [
  { name: 'JSON Formatter', path: '/tools/json-formatter', icon: Braces },
  { name: 'Base64 Tool', path: '/tools/base64', icon: FileCode },
  { name: 'URL Encoder', path: '/tools/url-encoder', icon: Link2 },
  { name: 'Random Picker', path: '/tools/random-name-picker', icon: UserCheck },
]

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'All Tools', path: '/tools', icon: LayoutGrid },
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
          'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isActive ? 'text-cyan-600 bg-cyan-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        )}
      >
        <Icon className="w-4 h-4" />
        {label}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform ml-0.5', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-4 h-4 text-slate-400" />
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
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserMenuOpen(false)
    navigate('/')
  }

  const isYoutubeActive = youtubeTools.some(t => location.pathname === t.path)
  const isSeoActive = seoTools.some(t => location.pathname === t.path)
  const isSocialActive = socialTools.some(t => location.pathname === t.path)
  const isUtilityActive = utilityTools.some(t => location.pathname === t.path)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-teal-400 rounded-xl flex items-center justify-center p-1 shadow-lg shadow-cyan-500/20">
                <img src="/logo.svg" alt="VidToolbox Logo font-black" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900 tracking-tight">VidToolbox</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'text-cyan-600 bg-cyan-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}

            <NavDropdown
              label="SEO Tools"
              icon={TrendingUp}
              items={seoTools}
              isActive={isSeoActive}
            />

            <NavDropdown
              label="YouTube"
              icon={Video}
              items={youtubeTools}
              isActive={isYoutubeActive}
            />

            <NavDropdown
              label="Social"
              icon={Share2}
              items={socialTools}
              isActive={isSocialActive}
            />

            <NavDropdown
              label="Utilities"
              icon={LayoutGrid}
              items={utilityTools}
              isActive={isUtilityActive}
            />

            <Link
              to="/about"
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === '/about'
                  ? 'text-cyan-600 bg-cyan-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <Info className="w-4 h-4" />
              About
            </Link>
          </nav>

          {/* Auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-cyan-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-cyan-600" />
                  </div>
                  <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
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
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-5 py-2 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-1 bg-white animate-in slide-in-from-top-4 duration-300 rounded-b-3xl shadow-2xl">
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">SEO Tools</p>
              {seoTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-6 text-sm text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-2 pb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Social Tools</p>
              {socialTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-6 text-sm text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 pb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-2">YouTube Tools</p>
              {youtubeTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-6 text-sm text-slate-600 hover:text-cyan-600 transition-colors" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col gap-3 px-4 pb-6">
              {user ? (
                <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-bold text-red-500 py-2">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-700 py-2" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/signup" className="text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 px-6 py-3 rounded-xl text-center shadow-xl shadow-cyan-500/20" onClick={() => setMobileOpen(false)}>Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
