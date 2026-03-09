import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { trackPageView } from '../lib/track'

export function Layout({ children }) {
  const location = useLocation()
  
  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
