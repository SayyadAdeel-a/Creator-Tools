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

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
