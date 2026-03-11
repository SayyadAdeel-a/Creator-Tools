import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, LayoutGrid, Captions, Type, BookOpen, Info,
  Menu, X, Zap, ChevronDown,
  Eraser, List, Merge, Split, Clock, Hash, Link2, User, LogOut,
  AlignLeft, Undo2, UserCheck, FileCode, Braces,
  Video, Share2, FileText, BarChart3, Timer, Search, MessageSquare,
  Twitter, Instagram, Wand2, TrendingUp, Hash as HashtagIcon
} from 'lucide-react'
import { cn } from '../lib/utils'
import { supabase } from '../lib/supabase'

const subtitleTools = [
  { name: 'SRT to Text', path: '/tools/srt-to-text', icon: Captions },
  { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', icon: Eraser },
  { name: 'Subtitle Counter', path: '/tools/subtitle-counter', icon: List },
  { name: 'Subtitle Merge', path: '/tools/subtitle-merge', icon: Merge },
  { name: 'Subtitle Split', path: '/tools/subtitle-split', icon: Split },
]

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
  { name: 'Title Checker', path: '/tools/title-checker', icon: Type },
  { name: 'Meta Title', path: '/tools/meta-title', icon: Search },
  { name: 'Duplicate Lines', path: '/tools/duplicate-lines', icon: Eraser },
  { name: 'Text to Bullets', path: '/tools/text-to-bullets', icon: List },
]

const textTools = [
  { name: 'Word Frequency Old', path: '/tools/word-frequency', icon: BarChart3 },
  { name: 'Readability Old', path: '/tools/readability', icon: BookOpen },
  { name: 'Title Checker', path: '/tools/title-checker', icon: UserCheck },
  { name: 'Meta Title Checker', path: '/tools/meta-title', icon: Search },
  { name: 'Duplicate Remover', path: '/tools/duplicate-lines', icon: Eraser },
  { name: 'Text to Bullets', path: '/tools/text-to-bullets', icon: List },
  { name: 'Reading Time', path: '/tools/reading-time', icon: Clock },
]

const socialTools = [
  { name: 'Instagram Formatter', path: '/tools/instagram-formatter', icon: Instagram },
  { name: 'Thread Splitter', path: '/tools/thread-splitter', icon: Twitter },
  { name: 'Emoji Remover', path: '/tools/emoji-remover', icon: Eraser },
  { name: 'Hashtag Generator', path: '/tools/hashtag-generator', icon: HashtagIcon },
  { name: 'Social Counter', path: '/tools/social-character-counter', icon: Hash },
  { name: 'Bio Length Check', path: '/tools/bio-length-checker', icon: User },
]

const utilityTools = [
  { name: 'JSON Formatter', path: '/tools/json-formatter', icon: Braces },
  { name: 'Base64 Encoder', path: '/tools/base64', icon: FileCode },
  { name: 'URL Encoder', path: '/tools/url-encoder', icon: Link2 },
  { name: 'Random Name Picker', path: '/tools/random-name-picker', icon: UserCheck },
  { name: 'Random Team Generator', path: '/tools/random-team-generator', icon: LayoutGrid },
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
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
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

  const isSubtitleActive = location.pathname.startsWith('/tools/srt') || location.pathname.startsWith('/tools/subtitle')
  const isYoutubeActive = youtubeTools.some(t => location.pathname === t.path)
  const isSeoActive = seoTools.some(t => location.pathname === t.path)
  const isTextActive = textTools.some(t => location.pathname === t.path)
  const isSocialActive = socialTools.some(t => location.pathname === t.path)
  const isUtilityActive = utilityTools.some(t => location.pathname === t.path)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.svg" alt="VidToolbox Logo" className="w-8 h-8" />
            <span className="font-heading font-bold text-xl text-slate-900">VidToolbox</span>
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
              label="YouTube Tools"
              icon={Video}
              items={youtubeTools}
              isActive={isYoutubeActive}
            />

            <NavDropdown
              label="Social Tools"
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
                  className="text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-4 py-2 rounded-lg transition-all"
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
          <div className="md:hidden py-4 border-t border-slate-200 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 py-2.5 px-2 text-sm text-slate-600 hover:text-cyan-600 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="w-4 h-4" /> {item.name}
              </Link>
            ))}

            <div className="pt-2 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">SEO Tools</p>
              {seoTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-sm text-slate-600 hover:text-cyan-600" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            <div className="pt-1 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">YouTube Tools</p>
              {youtubeTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-sm text-slate-600 hover:text-cyan-600" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            <div className="pt-1 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">Subtitle Tools</p>
              {subtitleTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-sm text-slate-600 hover:text-cyan-600" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            <div className="pt-1 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">Social Tools</p>
              {socialTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-sm text-slate-600 hover:text-cyan-600" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>
            <div className="pt-1 pb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">Utility Tools</p>
              {utilityTools.map((t) => (
                <Link key={t.path} to={t.path} className="flex items-center gap-2 py-2 px-4 text-sm text-slate-600 hover:text-cyan-600" onClick={() => setMobileOpen(false)}>
                  <t.icon className="w-4 h-4 text-slate-400" /> {t.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 flex gap-3 px-2">
              {user ? (
                <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-red-500">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-slate-600" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/signup" className="text-sm font-medium text-white bg-cyan-500 px-4 py-1.5 rounded-lg" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
