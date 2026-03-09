import { supabase } from './supabase'

export const trackToolUse = async (toolName, toolSlug) => {
  try {
    await supabase.from('tool_events').insert({ 
      tool_name: toolName, 
      tool_slug: toolSlug 
    })
  } catch (e) {
    // fail silently, never break the tool
  }
}

export const trackPageView = async (path) => {
  try {
    await supabase.from('page_views').insert({ 
      page_path: path 
    })
  } catch (e) {
    // fail silently
  }
}
