import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Upload, Download, FileText, X, Merge, ArrowRight } from 'lucide-react'
import { ToolPage } from '../../components/ToolPage'
import { parseSRT, mergeSubtitles, generateSRT } from '../../lib/srtParser'
import { trackToolUse } from '../../lib/track'

export function SubtitleMerge() {
  const [files, setFiles] = useState([])
  const [output, setOutput] = useState('')
  const [fileNames, setFileNames] = useState([])
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)

    Promise.all(
      uploadedFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            resolve({ name: file.name, content: event.target.result })
          }
          reader.readAsText(file)
        })
      })
    ).then(results => {
      const newFiles = [...files, ...results]
      setFiles(newFiles)
      setFileNames(newFiles.map(r => r.name))
      mergeFiles(newFiles)
    })
  }

  const mergeFiles = (allFiles) => {
    const subtitlesList = allFiles.map(f => parseSRT(f.content))
    const merged = mergeSubtitles(subtitlesList)
    setOutput(generateSRT(merged))
    trackToolUse('Subtitle Merge Tool', 'subtitle-merge')
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'merged.srt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    setFileNames(newFiles.map(f => f.name))
    if (newFiles.length > 0) {
      mergeFiles(newFiles)
    } else {
      setOutput('')
    }
  }

  return (
    <>
      <Helmet>
        <title>Subtitle Merge Tool — Combine Multiple SRT Files Online Free | VidToolbox</title>
        <meta name="description" content="Merge multiple SRT subtitle files into one chronologically ordered file online. Free, instant, and runs entirely in your browser — no sign-up, no file upload to servers." />
        <meta name="keywords" content="merge SRT files, combine subtitle files, SRT merge tool, join SRT files, subtitle combiner online" />
        <link rel="canonical" href="https://vidtoolbox.qzz.io/tools/subtitle-merge" />
        <meta property="og:title" content="Subtitle Merge Tool — Combine SRT Files Online | VidToolbox" />
        <meta property="og:url" content="https://vidtoolbox.qzz.io/tools/subtitle-merge" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Subtitle Merge Tool",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "url": "https://vidtoolbox.qzz.io/tools/subtitle-merge",
          "description": "Merge multiple SRT files into one. Free, browser-based, no upload to servers."
        })}</script>
      </Helmet>

      <ToolPage
        title="Subtitle Merge Tool"
        icon={Merge}
        description="Combine multiple SRT subtitle files into a single file."
        howToUse={[
          "Upload multiple .srt files using the dropzone",
          "Files will be automatically merged in chronological order",
          "Download the combined subtitle file"
        ]}
        faq={[
          { question: "How are files ordered?", answer: "Files are sorted by the first timestamp in each file, so they play in the correct sequence." },
          { question: "Will numbering be correct?", answer: "Yes, all subtitle blocks are re-indexed sequentially from 1." }
        ]}
      >
        <div className="p-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50/30 transition-colors"
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Drop .srt files here or click to upload</p>
            <p className="text-sm text-slate-400 mt-2">Multiple files supported</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".srt"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          {fileNames.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-slate-700">{fileNames.length} files uploaded:</p>
              <div className="flex flex-wrap gap-2">
                {fileNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 max-w-[200px] truncate">{name}</span>
                    <button onClick={() => removeFile(index)} className="text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {output && (
            <div className="mt-6 flex items-center justify-between bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Merge className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Files merged successfully</p>
                  <p className="text-xs text-slate-500">{output.split('\n\n').length} subtitle blocks</p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          )}
        </div>
      </ToolPage>
    </>
  )
}
