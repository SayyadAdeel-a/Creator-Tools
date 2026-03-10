// scripts/generate-sitemap.js
// Run at build time: node scripts/generate-sitemap.js
// Fetches published blog posts from Supabase and writes public/sitemap.xml

import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = 'https://vidtoolbox.qzz.io'

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
    const lines = ['  <url>', `    <loc>${SITE_URL}${page.loc}</loc>`]
    if (page.lastmod) lines.push(`    <lastmod>${page.lastmod}</lastmod>`)
    lines.push(`    <changefreq>${page.changefreq}</changefreq>`)
    lines.push(`    <priority>${page.priority}</priority>`)
    lines.push('  </url>')
    return lines.join('\n')
}

async function main() {
    let allPages = [...STATIC_PAGES]

    const supabaseUrl = process.env.VITE_SUPABASE_URL
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
        try {
            const supabase = createClient(supabaseUrl, supabaseKey)
            const { data: posts, error } = await supabase
                .from('blog_posts')
                .select('slug, created_at, updated_at')
                .eq('published', true)
                .order('created_at', { ascending: false })

            if (error) {
                console.warn('⚠️  Sitemap: Supabase error, using static pages only:', error.message)
            } else if (posts?.length) {
                const blogPages = posts.map(post => ({
                    loc: `/blog/${post.slug}`,
                    changefreq: 'monthly',
                    priority: '0.7',
                    lastmod: (post.updated_at || post.created_at || '').split('T')[0],
                }))
                allPages = [...allPages, ...blogPages]
                console.log(`✅  Sitemap: Added ${blogPages.length} blog post(s)`)
            }
        } catch (err) {
            console.warn('⚠️  Sitemap: Could not reach Supabase:', err.message)
        }
    } else {
        console.warn('⚠️  Sitemap: No Supabase env vars found, using static pages only')
    }

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        allPages.map(urlTag).join('\n'),
        '</urlset>',
    ].join('\n')

    const outPath = join(__dirname, '..', 'public', 'sitemap.xml')
    writeFileSync(outPath, xml, 'utf-8')
    console.log(`✅  Sitemap written to public/sitemap.xml (${allPages.length} URLs)`)
}

main()
