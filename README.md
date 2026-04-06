```markdown
# VidToolbox

A comprehensive web-based toolkit built for content creators. VidToolbox provides 68+ specialized utilities to streamline video production, editing, and channel management workflows.

## Features

- **68+ Creator Tools** — Utilities covering thumbnail generation, metadata optimization, analytics helpers, and video processing
- **Anonymous Analytics** — Track tool usage without compromising user privacy
- **SEO-Optimized Blog** — Self-hosted content hub to build domain authority and organic traffic
- **AdSense Integration** — Monetized through strategic ad placement
- **Clean, Modern UI** — Built with Tailwind CSS for a fast, responsive experience

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS + Shadcn components
- **Backend:** Supabase (database, auth, edge functions)
- **Deployment:** Vercel
- **Analytics:** Custom anonymous usage tracking
- **Monetization:** Google AdSense

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Google AdSense account (for monetization)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/vidtoolbox.git
cd vidtoolbox
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

## Project Structure

```
vidtoolbox/
├── src/
│   ├── components/     # Reusable UI components
│   ├── tools/          # Individual tool implementations
│   ├── pages/          # Route pages
│   ├── lib/            # Utilities and helpers
│   └── blog/           # Blog content and components
├── public/             # Static assets
└── supabase/           # Database schemas and edge functions
```

## Roadmap

- [ ] Complete remaining tool implementations (currently at 68+)
- [ ] Add user accounts for tool history and favorites
- [ ] Implement batch processing for multi-file operations
- [ ] Expand blog content for SEO growth
- [ ] Mobile app version

## Contributing

This is a personal project, but suggestions and feedback are welcome! Open an issue if you find bugs or have feature ideas.

## License

MIT License - feel free to use this project as inspiration for your own creator tools.

---

Built by [Sayyad Adeel](https://github.com/SayyadAdeel-a) | Shipped with AI-assisted development
```
