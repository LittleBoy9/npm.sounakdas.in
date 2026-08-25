import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import packagesData from './data/packages.json'
import siteData from './data/site.json'
import type { Package, SiteData } from './types'
import { buildHomeMeta, buildNotFoundMeta, buildPackageMeta } from './seo/meta'
import { renderHead } from './seo/head'

const packages = packagesData as Package[]
const site = siteData as SiteData

export interface Route {
  /** URL path the app should render. */
  url: string
  /** Path of the HTML file to emit, relative to the output dir. */
  out: string
}

export function routes(): Route[] {
  return [
    { url: '/', out: 'index.html' },
    ...packages.map((pkg) => ({
      url: `/packages/${pkg.id}`,
      out: `packages/${pkg.id}/index.html`,
    })),
    { url: '/__not-found__', out: '404.html' },
  ]
}

export function render(url: string): { body: string; head: string } {
  const body = renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </StrictMode>
  )

  let meta
  if (url === '/') {
    meta = buildHomeMeta(packages, site)
  } else {
    const id = url.replace('/packages/', '')
    const pkg = packages.find((p) => p.id === id)
    meta = pkg ? buildPackageMeta(pkg, site) : buildNotFoundMeta()
  }

  return { body, head: renderHead(meta) }
}
