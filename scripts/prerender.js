import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrDir = join(root, '.ssr-build')

const HEAD_START = '<!--seo-head-->'
const HEAD_END = '<!--/seo-head-->'
const APP_MARKER = '<!--app-html-->'

function replaceHead(template, head) {
  const start = template.indexOf(HEAD_START)
  const end = template.indexOf(HEAD_END)
  if (start === -1 || end === -1) {
    throw new Error(`index.html is missing the ${HEAD_START} / ${HEAD_END} markers`)
  }
  return template.slice(0, start) + head + template.slice(end + HEAD_END.length)
}

/**
 * Framer Motion serializes each component's `initial` state into the SSR markup,
 * so the prerendered HTML arrives with `opacity:0` on ~20 elements. main.tsx uses
 * createRoot (not hydrateRoot), so React discards this markup and replays the
 * animations from scratch — meaning the baked-in hidden state buys us nothing and
 * leaves a blank page for anyone whose JS never runs. Strip the hidden state while
 * preserving every other declaration (notably the --pkg-color custom property).
 */
function revealMotion(body) {
  return body.replace(/style="([^"]*)"/g, (match, decls) => {
    const kept = decls
      .split(';')
      .filter((d) => d.trim() && !/^\s*(opacity\s*:\s*0|transform\s*:)/.test(d))
      .join(';')
    return kept ? `style="${kept}"` : ''
  })
}

async function main() {
  const templatePath = join(distDir, 'index.html')
  if (!existsSync(templatePath)) {
    throw new Error('dist/index.html not found — run the client build first')
  }

  const template = readFileSync(templatePath, 'utf8')
  if (!template.includes(APP_MARKER)) {
    throw new Error(`index.html is missing the ${APP_MARKER} marker`)
  }

  const entry = join(ssrDir, 'entry-server.js')
  if (!existsSync(entry)) {
    throw new Error('.ssr-build/entry-server.js not found — run the SSR build first')
  }

  const { render, routes } = await import(pathToFileURL(entry).href)
  const all = routes()

  console.log(`\nPrerendering ${all.length} routes...\n`)

  for (const route of all) {
    const { body, head } = render(route.url)
    const html = replaceHead(template, head).replace(APP_MARKER, revealMotion(body))

    const outPath = join(distDir, route.out)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)

    const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
    console.log(`  ✓ ${route.out.padEnd(46)} ${kb.padStart(6)} kB   ${route.url}`)
  }

  rmSync(ssrDir, { recursive: true, force: true })
  console.log(`\nPrerendered ${all.length} static HTML files.\n`)
}

main().catch((e) => {
  console.error('\nPrerender failed:', e.message, '\n')
  process.exit(1)
})
