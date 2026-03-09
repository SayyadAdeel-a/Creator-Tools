import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-semibold text-slate-900">VidToolbox</span>
          </Link>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} VidToolbox. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">Home</Link>
            <Link to="/tools/srt-to-text" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">Tools</Link>
            <Link to="/blog" className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
