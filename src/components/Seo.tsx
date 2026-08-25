import { useEffect } from 'react'
import type { Package, SiteData } from '../types'
import { buildHomeMeta, buildPackageMeta, OG_IMAGE } from '../seo/meta'
import type { PageMeta } from '../seo/meta'

interface SeoProps {
  packages: Package[]
  site: SiteData
  activePackage?: Package
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps the head in sync during client-side navigation. The first paint of every
 * route is already correct thanks to the prerender step (scripts/prerender.js),
 * which serializes this same PageMeta into static HTML — so this only matters
 * once React Router takes over.
 */
function apply(meta: PageMeta) {
  document.title = meta.title

  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setMeta('meta[name="robots"]', 'name', 'robots', meta.robots)
  setLink('canonical', meta.canonical)

  setMeta('meta[property="og:type"]', 'property', 'og:type', meta.ogType)
  setMeta('meta[property="og:url"]', 'property', 'og:url', meta.canonical)
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE)
  setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.imageAlt)

  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', OG_IMAGE)
  setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.imageAlt)

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'structured-data'
  script.textContent = JSON.stringify(meta.jsonLd)

  document.getElementById('structured-data')?.remove()
  document.head.appendChild(script)
}

export function Seo({ packages, site, activePackage }: SeoProps) {
  useEffect(() => {
    apply(
      activePackage
        ? buildPackageMeta(activePackage, site)
        : buildHomeMeta(packages, site)
    )
  }, [packages, site, activePackage])

  return null
}
