-- ============================================
-- SUPABASE SETUP FOR VIDTOOLBOX
-- Run these queries in Supabase SQL Editor
-- ============================================

-- TABLE: tool_events
CREATE TABLE tool_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name text NOT NULL,
  tool_slug text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- TABLE: page_views
CREATE TABLE page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- TABLE: blog_posts
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- tool_events: Anyone can INSERT, only authenticated can SELECT
ALTER TABLE tool_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert tool_events" ON tool_events
  FOR INSERT TO anon, authenticated, auth.uid() WITH CHECK (true);

CREATE POLICY "Authenticated can select tool_events" ON tool_events
  FOR SELECT TO authenticated USING (true);

-- page_views: Anyone can INSERT, only authenticated can SELECT
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page_views" ON page_views
  FOR INSERT TO anon, authenticated, auth.uid() WITH CHECK (true);

CREATE POLICY "Authenticated can select page_views" ON page_views
  FOR SELECT TO authenticated USING (true);

-- blog_posts: 
-- Anyone can SELECT published posts
-- Only authenticated users can SELECT all, INSERT, UPDATE, DELETE
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Authenticated can insert blog_posts" ON blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update blog_posts" ON blog_posts
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can delete blog_posts" ON blog_posts
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- OPTIONAL: Create indexes for better performance
-- ============================================

CREATE INDEX idx_tool_events_created_at ON tool_events(created_at DESC);
CREATE INDEX idx_tool_events_tool_slug ON tool_events(tool_slug);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
