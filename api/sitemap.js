// api/sitemap.js — Vercel Serverless Function (CommonJS)
// Serves a live sitemap that auto-includes all published blog posts from Supabase.
// Route: GET /sitemap.xml  (via vercel.json rewrite)

const SITE_URL = 'https://vidtoolbox.vercel.app'

const STATIC_PAGES = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/tools', changefreq: 'weekly', priority: '0.9' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
    { loc: '/about', changefreq: 'monthly', priority: '0.6' },
    { loc: '/privacy', changefreq: 'monthly', priority: '0.4' },
    { loc: '/tools/srt-to-text', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/subtitle-cleaner', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/subtitle-counter', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/subtitle-merge', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/subtitle-split', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/script-word-counter', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/reading-time', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/title-case', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/slug-generator', changefreq: 'monthly', priority: '0.8' },
    { loc: '/tools/hashtag-counter', changefreq: 'monthly', priority: '0.8' },
]

function urlTag(page) {
    return [
        '  <url>',
        `    <loc>${SITE_URL}${page.loc}</loc>`,
        page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>` : '',
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        '  </url>',
    ].filter(Boolean).join('\n')
}

module.exports = async function handler(req, res) {
    try {
        const supabaseUrl = process.env.VITE_SUPABASE_URL
        const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

        let blogPages = []

        if (supabaseUrl && supabaseKey) {
            const apiRes = await fetch(
                `${supabaseUrl}/rest/v1/blog_posts?select=slug,created_at,updated_at&published=eq.true&order=created_at.desc`,
                {
                    headers: {
                        apikey: supabaseKey,
                        Authorization: `Bearer ${supabaseKey}`,
                    },
                }
            )

            if (apiRes.ok) {
                const posts = await apiRes.json()
                blogPages = posts.map(post => ({
                    loc: `/blog/${post.slug}`,
                    changefreq: 'monthly',
                    priority: '0.7',
                    lastmod: (post.updated_at || post.created_at || '').split('T')[0],
                }))
            } else {
                console.error('Supabase fetch failed:', apiRes.status, await apiRes.text())
            }
        }

        const allPages = [...STATIC_PAGES, ...blogPages]

        const xml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            allPages.map(urlTag).join('\n'),
            '</urlset>',
        ].join('\n')

        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
        res.status(200).send(xml)
    } catch (err) {
        console.error('Sitemap error:', err)
        res.status(500).send('Error generating sitemap')
    }
}
