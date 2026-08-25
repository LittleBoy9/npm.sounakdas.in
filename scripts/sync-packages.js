import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execFileSync } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function syncPackage(pkg) {
  const today = new Date().toISOString().split('T')[0]

  try {
    const [weekly, total, registry] = await Promise.all([
      fetchJson(`https://api.npmjs.org/downloads/point/last-week/${pkg.name}`),
      fetchJson(`https://api.npmjs.org/downloads/point/2010-01-01:${today}/${pkg.name}`),
      fetchJson(`https://registry.npmjs.org/${pkg.name}`),
    ])

    const latestVersion = registry['dist-tags']?.latest ?? pkg.version
    const publishedAt = registry.time?.[latestVersion]?.split('T')[0] ?? pkg.publishedAt

    const updated = {
      ...pkg,
      version: latestVersion,
      weeklyDownloads: weekly.downloads ?? pkg.weeklyDownloads,
      totalDownloads: total.downloads ?? pkg.totalDownloads,
      publishedAt,
    }

    const badge = updated.weeklyDownloads !== pkg.weeklyDownloads ? ' *' : ''
    console.log(`  ✓ ${pkg.name.padEnd(24)} v${updated.version.padEnd(16)} ${updated.weeklyDownloads} weekly / ${updated.totalDownloads} total${badge}`)
    return updated
  } catch (err) {
    console.warn(`  ✗ ${pkg.name.padEnd(24)} failed (${err.message}) — keeping existing data`)
    return pkg
  }
}

const SITE_URL = 'https://npm.sounakdas.in'

/**
 * Rebuilt from packages.json on every sync so it can never drift from the set of
 * pages the prerender step actually emits. Package `lastmod` uses the package's
 * own publish date rather than today's — a sitemap where every URL claims to have
 * changed today is a spam signal, not a freshness one.
 */
function buildSitemap(packages, today) {
  const url = (loc, lastmod, priority, changefreq) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

  const entries = [
    url(`${SITE_URL}/`, today, '1.0', 'weekly'),
    ...packages.map((pkg) =>
      url(`${SITE_URL}/packages/${pkg.id}`, pkg.publishedAt, '0.8', 'monthly')
    ),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries.join('\n')}\n</urlset>\n`
}

/**
 * https://llmstxt.org/ — a plain-text summary for answer engines that never
 * execute JavaScript. Cheap to emit and kept exact by regenerating it here.
 */
function buildLlmsTxt(packages, site, today) {
  const lines = [
    `# npm.sounakdas.in`,
    ``,
    `> Open source npm packages by ${site.author.name} — CLI tools, React libraries,`,
    `> Node.js utilities, and TypeScript packages. All MIT licensed.`,
    ``,
    `Author: ${site.author.name}`,
    `npm profile: ${site.author.npm}`,
    `GitHub: ${site.author.github}`,
    `Portfolio: ${site.author.website}`,
    `Package data verified: ${today}`,
    ``,
    `## Packages (${packages.length})`,
    ``,
  ]

  for (const pkg of packages) {
    lines.push(
      `- [${pkg.name}](${SITE_URL}/packages/${pkg.id}): ${pkg.description} ` +
        `Version ${pkg.version}, ${pkg.license} licensed, ` +
        `${pkg.weeklyDownloads} weekly / ${pkg.totalDownloads} total downloads. ` +
        `Install with \`npm install ${pkg.name}\`. ` +
        `Tags: ${pkg.tags.join(', ')}. Source: ${pkg.github}`
    )
  }

  lines.push(``, `## Optional`, ``, `- [npm profile](${site.author.npm})`, ``)
  return lines.join('\n')
}

/**
 * The social card bakes the package count into the artwork. Vercel's build image
 * has no SVG rasteriser, so the PNG is committed and only regenerated on machines
 * that have rsvg-convert — the count in the SVG is always corrected either way.
 */
function syncOgImage(count) {
  const svgPath = join(root, 'public/og.svg')
  const pngPath = join(root, 'public/og.png')

  const svg = readFileSync(svgPath, 'utf8')
  const updated = svg.replace(
    /(<text[^>]*id="pkg-count"[^>]*>)[^<]*(<\/text>)/,
    `$1${count}$2`
  )

  if (updated !== svg) writeFileSync(svgPath, updated)

  if (!existsSync(pngPath)) {
    console.warn(`  ! og.png missing — regenerate with: rsvg-convert -w 1200 -h 630 public/og.svg -o public/og.png`)
    return
  }

  try {
    execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', svgPath, '-o', pngPath], {
      stdio: 'ignore',
    })
    console.log(`  → og.png            regenerated (${count} packages)`)
  } catch {
    console.log(`  → og.png            kept (no rsvg-convert on this machine)`)
  }
}

async function main() {
  const packagesPath = join(root, 'src/data/packages.json')
  const sitePath = join(root, 'src/data/site.json')
  const sitemapPath = join(root, 'public/sitemap.xml')

  const packages = JSON.parse(readFileSync(packagesPath, 'utf8'))
  const site = JSON.parse(readFileSync(sitePath, 'utf8'))

  console.log(`\nSyncing ${packages.length} packages from npm registry...\n`)

  const updated = await Promise.all(packages.map(syncPackage))
  const today = new Date().toISOString().split('T')[0]

  writeFileSync(packagesPath, JSON.stringify(updated, null, 2) + '\n')

  site.meta.verifiedAt = today
  writeFileSync(sitePath, JSON.stringify(site, null, 2) + '\n')

  writeFileSync(sitemapPath, buildSitemap(updated, today))
  console.log(`  → sitemap.xml       ${updated.length + 1} URLs`)

  writeFileSync(join(root, 'public/llms.txt'), buildLlmsTxt(updated, site, today))
  console.log(`  → llms.txt          ${updated.length} packages`)

  syncOgImage(updated.length)

  console.log(`\nDone. verifiedAt → ${today}\n`)
}

main().catch(e => { console.error('\n', e.message); process.exit(1) })
