import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const asyncCSSPlugin = () => {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"(.*?)href="(.*?\.css)">/g,
        `<link rel="preload" as="style"$1href="$2">\n    <link rel="stylesheet" media="print" onload="this.media='all'"$1href="$2">\n    <noscript><link rel="stylesheet"$1href="$2"></noscript>`
      )
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), asyncCSSPlugin()],
})
