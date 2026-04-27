import { readFileSync, writeFileSync } from 'fs'
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

  const sitemap = readFileSync(sitemapPath, 'utf8')
  writeFileSync(sitemapPath, sitemap.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${today}</lastmod>`))

  console.log(`\nDone. verifiedAt → ${today}\n`)
}

main().catch(e => { console.error('\n', e.message); process.exit(1) })
