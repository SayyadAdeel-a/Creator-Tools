import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

export function FavoriteButton({ toolSlug, className }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserAndStatus = async () => {
      const { data } = await supabase.auth.getSession()
      const u = data.session?.user ?? null
      setUser(u)
      if (u) {
        checkFavStatus(u.id)
      }
    }
    fetchUserAndStatus()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) checkFavStatus(u.id)
      else setIsFavorite(false)
    })

    return () => subscription.unsubscribe()
  }, [toolSlug])

  const checkFavStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('tool_slug', toolSlug)
        .maybeSingle()
      
      setIsFavorite(!!data)
    } catch (err) {
      console.error('Check favorite error:', err)
    }
  }

  const toggleFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      if (window.confirm('Please login to add tools to your favorites. Go to login page?')) {
        navigate('/login')
      }
      return
    }

    setLoading(true)
    if (isFavorite) {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_slug', toolSlug)
      
      if (!error) {
        setIsFavorite(false)
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))
      }
    } else {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, tool_slug: toolSlug })
      
      if (!error) {
        setIsFavorite(true)
        window.dispatchEvent(new CustomEvent('favoritesUpdated'))
      }
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={cn(
        "p-2 transition-all hover:scale-110 disabled:opacity-50",
        isFavorite ? "text-amber-400" : "text-slate-300 hover:text-amber-200",
        className
      )}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={cn("w-full h-full", isFavorite && "fill-current")} />
    </button>
  )
}
