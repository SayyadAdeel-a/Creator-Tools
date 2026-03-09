import { supabase } from './supabase'

export const trackToolUse = async (toolName, toolSlug) => {
  try {
    const { error } = await supabase.from('tool_events').insert({
      tool_name: toolName,
      tool_slug: toolSlug
    })
    if (error) console.error('Error tracking tool use:', error)
  } catch (e) {
    console.error('Exception tracking tool use:', e)
  }
}

export const trackPageView = async (path) => {
  try {
    const { error } = await supabase.from('page_views').insert({
      page_path: path
    })
    if (error) console.error('Error tracking page view:', error)
  } catch (e) {
    console.error('Exception tracking page view:', e)
  }
}
