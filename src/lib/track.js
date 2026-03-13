export const trackToolUse = (toolName, toolSlug) => {
  const run = async () => {
    try {
      const { supabase } = await import('./supabase')
      const { error } = await supabase.from('tool_events').insert({
        tool_name: toolName,
        tool_slug: toolSlug
      })
      if (error) console.error('Error tracking tool use:', error)
    } catch (e) {
      console.error('Exception tracking tool use:', e)
    }
  }
  if (window.requestIdleCallback) window.requestIdleCallback(run)
  else setTimeout(run, 1000)
}

export const trackPageView = (path) => {
  const run = async () => {
    try {
      const { supabase } = await import('./supabase')
      const { error } = await supabase.from('page_views').insert({
        page_path: path
      })
      if (error) console.error('Error tracking page view:', error)
    } catch (e) {
      console.error('Exception tracking page view:', e)
    }
  }
  if (window.requestIdleCallback) window.requestIdleCallback(run)
  else setTimeout(run, 1000)
}
