export function parseSRT(content) {
  const blocks = content.trim().split(/\n\n+/)
  const subtitles = []
  
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length < 3) continue
    
    const index = parseInt(lines[0], 10)
    if (isNaN(index)) continue
    
    const timestampLine = lines[1]
    const timestampMatch = timestampLine.match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/)
    if (!timestampMatch) continue
    
    const startTime = timestampMatch[1]
    const endTime = timestampMatch[2]
    const text = lines.slice(2).join('\n')
    
    subtitles.push({
      index,
      startTime,
      endTime,
      text
    })
  }
  
  return subtitles
}

export function generateSRT(subtitles) {
  return subtitles.map((sub, i) => {
    return `${i + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}`
  }).join('\n\n')
}

export function timestampToMs(timestamp) {
  const match = timestamp.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/)
  if (!match) return 0
  
  const hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const seconds = parseInt(match[3], 10)
  const ms = parseInt(match[4], 10)
  
  return hours * 3600000 + minutes * 60000 + seconds * 1000 + ms
}

export function msToTimestamp(ms) {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = ms % 1000
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`
}

export function mergeSubtitles(subtitlesList) {
  let merged = []
  
  for (const subtitles of subtitlesList) {
    merged = [...merged, ...subtitles]
  }
  
  merged.sort((a, b) => timestampToMs(a.startTime) - timestampToMs(b.startTime))
  
  return merged.map((sub, i) => ({
    ...sub,
    index: i + 1
  }))
}

export function splitSubtitles(subtitles, splitIndex) {
  const part1 = subtitles.slice(0, splitIndex)
  const part2 = subtitles.slice(splitIndex)
  
  if (part2.length === 0) return [part1, []]
  
  const offsetMs = timestampToMs(part2[0].startTime)
  
  const adjustedPart2 = part2.map(sub => ({
    ...sub,
    startTime: msToTimestamp(timestampToMs(sub.startTime) - offsetMs),
    endTime: msToTimestamp(timestampToMs(sub.endTime) - offsetMs)
  }))
  
  return [part1, adjustedPart2]
}

export function splitSubtitlesByTimestamp(subtitles, timestamp) {
  const splitMs = timestampToMs(timestamp)
  const splitIndex = subtitles.findIndex(sub => timestampToMs(sub.startTime) >= splitMs)
  
  if (splitIndex === -1) return [subtitles, []]
  
  return splitSubtitles(subtitles, splitIndex)
}
