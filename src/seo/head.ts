import type { PageMeta } from './meta'
import { OG_IMAGE, SITE_URL } from './meta'

export const HEAD_START = '<!--seo-head-->'
export const HEAD_END = '<!--/seo-head-->'

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Serializes a PageMeta into the exact set of head tags that live between the
 * HEAD_START / HEAD_END markers in index.html. The prerender step swaps this in
 * per route so crawlers that never execute JavaScript still get correct tags.
 */
export function renderHead(meta: PageMeta): string {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${esc(meta.robots)}" />`,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,

    `<meta property="og:type" content="${esc(meta.ogType)}" />`,
    `<meta property="og:site_name" content="npm.sounakdas.in" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta property="og:locale" content="en_US" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${esc(meta.imageAlt)}" />`,

    `<script type="application/ld+json" id="structured-data">${JSON.stringify(
      meta.jsonLd
    ).replace(/</g, '\\u003c')}</script>`,
  ]

  return [HEAD_START, ...tags.map((t) => `    ${t}`), `    ${HEAD_END}`].join('\n')
}

export { SITE_URL }
