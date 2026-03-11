import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Home } from './pages/Home'
import { SrtToText } from './pages/tools/SrtToText'
import { SubtitleCleaner } from './pages/tools/SubtitleCleaner'
import { SubtitleCounter } from './pages/tools/SubtitleCounter'
import { SubtitleMerge } from './pages/tools/SubtitleMerge'
import { SubtitleSplit } from './pages/tools/SubtitleSplit'
import { ScriptWordCounter } from './pages/tools/ScriptWordCounter'
import { ReadingTime } from './pages/tools/ReadingTime'
import { TitleCase } from './pages/tools/TitleCase'
import { SlugGenerator } from './pages/tools/SlugGenerator'
import { HashtagCounter } from './pages/tools/HashtagCounter'
import { MetaDescriptionChecker } from './pages/tools/MetaDescriptionChecker'
import { KeywordDensity } from './pages/tools/KeywordDensity'
import { TextCompare } from './pages/tools/TextCompare'
import { RemoveExtraSpaces } from './pages/tools/RemoveExtraSpaces'
import { TextReverser } from './pages/tools/TextReverser'
import { RandomNamePicker } from './pages/tools/RandomNamePicker'
import { RandomTeamGenerator } from './pages/tools/RandomTeamGenerator'
import { UrlEncoder } from './pages/tools/UrlEncoder'
import { Base64 } from './pages/tools/Base64'
import { JsonFormatter } from './pages/tools/JsonFormatter'
import { AdminGuard } from './components/AdminGuard'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { BlogList } from './pages/admin/BlogList'
import { BlogEditor } from './pages/admin/BlogEditor'
import { BlogIndex } from './pages/blog/BlogIndex'
import { BlogPost } from './pages/blog/BlogPost'
import { PublicLogin } from './pages/auth/Login'
import { PublicSignup } from './pages/auth/Signup'
import { AllTools } from './pages/AllTools'
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<AllTools />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/tools/srt-to-text" element={<SrtToText />} />
          <Route path="/tools/subtitle-cleaner" element={<SubtitleCleaner />} />
          <Route path="/tools/subtitle-counter" element={<SubtitleCounter />} />
          <Route path="/tools/subtitle-merge" element={<SubtitleMerge />} />
          <Route path="/tools/subtitle-split" element={<SubtitleSplit />} />
          <Route path="/tools/script-word-counter" element={<ScriptWordCounter />} />
          <Route path="/tools/reading-time" element={<ReadingTime />} />
          <Route path="/tools/title-case" element={<TitleCase />} />
          <Route path="/tools/slug-generator" element={<SlugGenerator />} />
          <Route path="/tools/hashtag-counter" element={<HashtagCounter />} />
          <Route path="/tools/meta-description-checker" element={<MetaDescriptionChecker />} />
          <Route path="/tools/keyword-density" element={<KeywordDensity />} />
          <Route path="/tools/text-compare" element={<TextCompare />} />
          <Route path="/tools/remove-extra-spaces" element={<RemoveExtraSpaces />} />
          <Route path="/tools/text-reverser" element={<TextReverser />} />
          <Route path="/tools/random-name-picker" element={<RandomNamePicker />} />
          <Route path="/tools/random-team-generator" element={<RandomTeamGenerator />} />
          <Route path="/tools/url-encoder" element={<UrlEncoder />} />
          <Route path="/tools/base64" element={<Base64 />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />

          {/* Public blog */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Public auth */}
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/signup" element={<PublicSignup />} />

          {/* Admin — no auth required */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin — auth required */}
          <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin/blog" element={<AdminGuard><BlogList /></AdminGuard>} />
          <Route path="/admin/blog/new" element={<AdminGuard><BlogEditor /></AdminGuard>} />
          <Route path="/admin/blog/edit/:id" element={<AdminGuard><BlogEditor /></AdminGuard>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App

