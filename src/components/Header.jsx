import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Sun, Zap, Type, Hash, Clock, Split, Merge, Eraser, List, Link2 } from 'lucide-react'
import { cn } from '../lib/utils'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'All Tools', path: '/tools/srt-to-text' },
]

const tools = [
  { name: 'SRT to Text', path: '/tools/srt-to-text', icon: Type },
  { name: 'Subtitle Cleaner', path: '/tools/subtitle-cleaner', icon: Eraser },
  { name: 'Subtitle Counter', path: '/tools/subtitle-counter', icon: List },
  { name: 'Subtitle Merge', path: '/tools/subtitle-merge', icon: Merge },
  { name: 'Subtitle Split', path: '/tools/subtitle-split', icon: Split },
  { name: 'Script Word Counter', path: '/tools/script-word-counter', icon: Type },
  { name: 'Reading Time', path: '/tools/reading-time', icon: Clock },
  { name: 'Title Case', path: '/tools/title-case', icon: Type },
  { name: 'Slug Generator', path: '/tools/slug-generator', icon: Link2 },
  { name: 'Hashtag Counter', path: '/tools/hashtag-counter', icon: Hash },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900">VidToolbox</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cyan-600",
                  location.pathname === item.path ? 'text-cyan-600' : 'text-slate-600'
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="relative">
              <button 
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyan-600",
                  location.pathname.startsWith('/tools') ? 'text-cyan-600' : 'text-slate-600'
                )}
              >
                Tools <ChevronDown className={cn("w-4 h-4 transition-transform", toolsDropdownOpen && "rotate-180")} />
              </button>
              
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 max-h-96 overflow-y-auto">
                  {tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-colors"
                      onClick={() => setToolsDropdownOpen(false)}
                    >
                      <tool.icon className="w-4 h-4 text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors">
              <Sun className="w-5 h-5" />
            </button>
            <Link 
              to="/" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/" 
              className="text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <Link to="/" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/tools/srt-to-text" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>All Tools</Link>
            <div className="py-2">
              <span className="text-sm font-medium text-slate-900">Tools</span>
              <div className="mt-2 pl-4 space-y-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="flex items-center gap-2 py-1 text-sm text-slate-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <tool.icon className="w-4 h-4" /> {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
