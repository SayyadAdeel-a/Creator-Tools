import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Home } from './pages/Home'
const SrtToText = lazy(() => import('./pages/tools/SrtToText').then(module => ({ default: module.SrtToText })));
const SubtitleCleaner = lazy(() => import('./pages/tools/SubtitleCleaner').then(module => ({ default: module.SubtitleCleaner })));
const SubtitleCounter = lazy(() => import('./pages/tools/SubtitleCounter').then(module => ({ default: module.SubtitleCounter })));
const SubtitleMerge = lazy(() => import('./pages/tools/SubtitleMerge').then(module => ({ default: module.SubtitleMerge })));
const SubtitleSplit = lazy(() => import('./pages/tools/SubtitleSplit').then(module => ({ default: module.SubtitleSplit })));
const ScriptWordCounter = lazy(() => import('./pages/tools/ScriptWordCounter').then(module => ({ default: module.ScriptWordCounter })));
const ReadingTime = lazy(() => import('./pages/tools/ReadingTime').then(module => ({ default: module.ReadingTime })));
const TitleCase = lazy(() => import('./pages/tools/TitleCase').then(module => ({ default: module.TitleCase })));
const SlugGenerator = lazy(() => import('./pages/tools/SlugGenerator').then(module => ({ default: module.SlugGenerator })));
const HashtagCounter = lazy(() => import('./pages/tools/HashtagCounter').then(module => ({ default: module.HashtagCounter })));
const MetaDescriptionChecker = lazy(() => import('./pages/tools/MetaDescriptionChecker').then(module => ({ default: module.MetaDescriptionChecker })));
const KeywordDensity = lazy(() => import('./pages/tools/KeywordDensity').then(module => ({ default: module.KeywordDensity })));
const TextCompare = lazy(() => import('./pages/tools/TextCompare').then(module => ({ default: module.TextCompare })));
const RemoveExtraSpaces = lazy(() => import('./pages/tools/RemoveExtraSpaces').then(module => ({ default: module.RemoveExtraSpaces })));
const TextReverser = lazy(() => import('./pages/tools/TextReverser').then(module => ({ default: module.TextReverser })));
const RandomNamePicker = lazy(() => import('./pages/tools/RandomNamePicker').then(module => ({ default: module.RandomNamePicker })));
const RandomTeamGenerator = lazy(() => import('./pages/tools/RandomTeamGenerator').then(module => ({ default: module.RandomTeamGenerator })));
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder').then(module => ({ default: module.UrlEncoder })));
const Base64 = lazy(() => import('./pages/tools/Base64').then(module => ({ default: module.Base64 })));
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter').then(module => ({ default: module.JsonFormatter })));
const YoutubeTitleGenerator = lazy(() => import('./pages/tools/YoutubeTitleGenerator').then(module => ({ default: module.YoutubeTitleGenerator })));
const YoutubeDescriptionFormatter = lazy(() => import('./pages/tools/YoutubeDescriptionFormatter').then(module => ({ default: module.YoutubeDescriptionFormatter })));
const TimestampGenerator = lazy(() => import('./pages/tools/TimestampGenerator').then(module => ({ default: module.TimestampGenerator })));
const YoutubeTags = lazy(() => import('./pages/tools/YoutubeTags').then(module => ({ default: module.YoutubeTags })));
const ScriptOutline = lazy(() => import('./pages/tools/ScriptOutline').then(module => ({ default: module.ScriptOutline })));
const ThumbnailText = lazy(() => import('./pages/tools/ThumbnailText').then(module => ({ default: module.ThumbnailText })));
const DurationCalculator = lazy(() => import('./pages/tools/DurationCalculator').then(module => ({ default: module.DurationCalculator })));
const WordFrequency = lazy(() => import('./pages/tools/WordFrequency').then(module => ({ default: module.WordFrequency })));
const SentenceCounter = lazy(() => import('./pages/tools/SentenceCounter').then(module => ({ default: module.SentenceCounter })));
const ReadabilityScore = lazy(() => import('./pages/tools/ReadabilityScore').then(module => ({ default: module.ReadabilityScore })));
const ArticleTitleChecker = lazy(() => import('./pages/tools/ArticleTitleChecker').then(module => ({ default: module.ArticleTitleChecker })));
const MetaTitleChecker = lazy(() => import('./pages/tools/MetaTitleChecker').then(module => ({ default: module.MetaTitleChecker })));
const DuplicateLineRemover = lazy(() => import('./pages/tools/DuplicateLineRemover').then(module => ({ default: module.DuplicateLineRemover })));
const TextToBullets = lazy(() => import('./pages/tools/TextToBullets').then(module => ({ default: module.TextToBullets })));
const InstagramFormatter = lazy(() => import('./pages/tools/InstagramFormatter').then(module => ({ default: module.InstagramFormatter })));
const ThreadSplitter = lazy(() => import('./pages/tools/ThreadSplitter').then(module => ({ default: module.ThreadSplitter })));
const EmojiRemover = lazy(() => import('./pages/tools/EmojiRemover').then(module => ({ default: module.EmojiRemover })));
const HashtagGenerator = lazy(() => import('./pages/tools/HashtagGenerator').then(module => ({ default: module.HashtagGenerator })));
const CharacterCounter = lazy(() => import('./pages/tools/CharacterCounter').then(module => ({ default: module.CharacterCounter })));
const BioChecker = lazy(() => import('./pages/tools/BioChecker').then(module => ({ default: module.BioChecker })));
const HexToRgb = lazy(() => import('./pages/tools/HexToRgb').then(module => ({ default: module.HexToRgb })));
const RgbToHex = lazy(() => import('./pages/tools/RgbToHex').then(module => ({ default: module.RgbToHex })));
const ColorPalette = lazy(() => import('./pages/tools/ColorPalette').then(module => ({ default: module.ColorPalette })));
const ContrastChecker = lazy(() => import('./pages/tools/ContrastChecker').then(module => ({ default: module.ContrastChecker })));
const GradientGenerator = lazy(() => import('./pages/tools/GradientGenerator').then(module => ({ default: module.GradientGenerator })));
const ColorName = lazy(() => import('./pages/tools/ColorName').then(module => ({ default: module.ColorName })));
const TintShade = lazy(() => import('./pages/tools/TintShade').then(module => ({ default: module.TintShade })));
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator').then(module => ({ default: module.PercentageCalculator })));
const AspectRatio = lazy(() => import('./pages/tools/AspectRatio').then(module => ({ default: module.AspectRatio })));
const FileSizeConverter = lazy(() => import('./pages/tools/FileSizeConverter').then(module => ({ default: module.FileSizeConverter })));
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter').then(module => ({ default: module.UnitConverter })));
const AgeCalculator = lazy(() => import('./pages/tools/AgeCalculator').then(module => ({ default: module.AgeCalculator })));
const DateDifference = lazy(() => import('./pages/tools/DateDifference').then(module => ({ default: module.DateDifference })));
const NumberToWords = lazy(() => import('./pages/tools/NumberToWords').then(module => ({ default: module.NumberToWords })));
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator').then(module => ({ default: module.PasswordGenerator })));
const PasswordStrength = lazy(() => import('./pages/tools/PasswordStrength').then(module => ({ default: module.PasswordStrength })));
const Md5Generator = lazy(() => import('./pages/tools/Md5Generator').then(module => ({ default: module.Md5Generator })));
const Sha256Generator = lazy(() => import('./pages/tools/Sha256Generator').then(module => ({ default: module.Sha256Generator })));
const LoremIpsum = lazy(() => import('./pages/tools/LoremIpsum').then(module => ({ default: module.LoremIpsum })));
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator').then(module => ({ default: module.UuidGenerator })));
const CsvToJson = lazy(() => import('./pages/tools/CsvToJson').then(module => ({ default: module.CsvToJson })));
const JsonToCsv = lazy(() => import('./pages/tools/JsonToCsv').then(module => ({ default: module.JsonToCsv })));
const MarkdownToHtml = lazy(() => import('./pages/tools/MarkdownToHtml').then(module => ({ default: module.MarkdownToHtml })));
const HtmlToMarkdown = lazy(() => import('./pages/tools/HtmlToMarkdown').then(module => ({ default: module.HtmlToMarkdown })));
const HtmlEncoder = lazy(() => import('./pages/tools/HtmlEncoder').then(module => ({ default: module.HtmlEncoder })));
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter').then(module => ({ default: module.CaseConverter })));
const LineSorter = lazy(() => import('./pages/tools/LineSorter').then(module => ({ default: module.LineSorter })));
import { AdminGuard } from './components/AdminGuard'
const AdminLogin = lazy(() => import('./pages/admin/Login').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.AdminDashboard })));
const BlogList = lazy(() => import('./pages/admin/BlogList').then(module => ({ default: module.BlogList })));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor').then(module => ({ default: module.BlogEditor })));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex').then(module => ({ default: module.BlogIndex })));
const BlogPost = lazy(() => import('./pages/blog/BlogPost').then(module => ({ default: module.BlogPost })));
const PublicLogin = lazy(() => import('./pages/auth/Login').then(module => ({ default: module.PublicLogin })));
const PublicSignup = lazy(() => import('./pages/auth/Signup').then(module => ({ default: module.PublicSignup })));
const AllTools = lazy(() => import('./pages/AllTools').then(module => ({ default: module.AllTools })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Privacy = lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin"></div></div>}>
          <Routes>
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
          
          <Route path="/tools/youtube-title-generator" element={<YoutubeTitleGenerator />} />
          <Route path="/tools/youtube-description-formatter" element={<YoutubeDescriptionFormatter />} />
          <Route path="/tools/timestamp-generator" element={<TimestampGenerator />} />
          <Route path="/tools/youtube-tags" element={<YoutubeTags />} />
          <Route path="/tools/script-outline" element={<ScriptOutline />} />
          <Route path="/tools/thumbnail-text" element={<ThumbnailText />} />
          <Route path="/tools/duration-calculator" element={<DurationCalculator />} />
          <Route path="/tools/word-frequency" element={<WordFrequency />} />
          <Route path="/tools/sentence-counter" element={<SentenceCounter />} />
          <Route path="/tools/readability" element={<ReadabilityScore />} />
          <Route path="/tools/title-checker" element={<ArticleTitleChecker />} />
          <Route path="/tools/meta-title" element={<MetaTitleChecker />} />
          <Route path="/tools/duplicate-lines" element={<DuplicateLineRemover />} />
          <Route path="/tools/text-to-bullets" element={<TextToBullets />} />
          <Route path="/tools/instagram-formatter" element={<InstagramFormatter />} />
          <Route path="/tools/thread-splitter" element={<ThreadSplitter />} />
          <Route path="/tools/emoji-remover" element={<EmojiRemover />} />
          <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
          <Route path="/tools/character-counter" element={<CharacterCounter />} />
          <Route path="/tools/bio-checker" element={<BioChecker />} />
          <Route path="/tools/hex-to-rgb" element={<HexToRgb />} />
          <Route path="/tools/rgb-to-hex" element={<RgbToHex />} />
          <Route path="/tools/color-palette" element={<ColorPalette />} />
          <Route path="/tools/contrast-checker" element={<ContrastChecker />} />
          <Route path="/tools/gradient-generator" element={<GradientGenerator />} />
          <Route path="/tools/color-name" element={<ColorName />} />
          <Route path="/tools/tint-shade" element={<TintShade />} />
          <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tools/aspect-ratio" element={<AspectRatio />} />
          <Route path="/tools/file-size" element={<FileSizeConverter />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/age-calculator" element={<AgeCalculator />} />
          <Route path="/tools/date-difference" element={<DateDifference />} />
          <Route path="/tools/number-to-words" element={<NumberToWords />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/password-strength" element={<PasswordStrength />} />
          <Route path="/tools/md5-generator" element={<Md5Generator />} />
          <Route path="/tools/sha256-generator" element={<Sha256Generator />} />
          <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="/tools/csv-to-json" element={<CsvToJson />} />
          <Route path="/tools/json-to-csv" element={<JsonToCsv />} />
          <Route path="/tools/markdown-to-html" element={<MarkdownToHtml />} />
          <Route path="/tools/html-to-markdown" element={<HtmlToMarkdown />} />
          <Route path="/tools/html-encoder" element={<HtmlEncoder />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/line-sorter" element={<LineSorter />} />

          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<PublicLogin />} />
          <Route path="/signup" element={<PublicSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin/blog" element={<AdminGuard><BlogList /></AdminGuard>} />
          <Route path="/admin/blog/new" element={<AdminGuard><BlogEditor /></AdminGuard>} />
          <Route path="/admin/blog/edit/:id" element={<AdminGuard><BlogEditor /></AdminGuard>} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
