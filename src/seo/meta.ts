import type { Package, SiteData } from '../types'
import { faqs } from '../data/faqs'

export const SITE_URL = 'https://npm.sounakdas.in'
export const OG_IMAGE = `${SITE_URL}/og.png`

const HOME_TITLE = 'Sounak Das · npm Packages & Developer Tools'
const HOME_DESCRIPTION =
  'Open source npm packages by Sounak Das — CLI tools, React libraries, Node.js utilities, and TypeScript packages. MIT licensed, zero-dependency.'

export interface PageMeta {
  title: string
  description: string
  canonical: string
  ogType: string
  imageAlt: string
  robots: string
  jsonLd: Record<string, unknown>
}

function personNode(site: SiteData) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: site.author.name,
    url: site.author.website,
    sameAs: [site.author.github, site.author.npm, site.author.website],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Open Source Software',
      'npm',
    ],
  }
}

function packageNode(pkg: Package, canonical: string) {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': canonical,
    name: pkg.name,
    description: pkg.description,
    url: canonical,
    codeRepository: pkg.github,
    version: pkg.version,
    datePublished: pkg.publishedAt,
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: { '@type': 'ComputerLanguage', name: 'TypeScript' },
    runtimePlatform: 'Node.js',
    author: { '@id': `${SITE_URL}/#person` },
    keywords: pkg.tags.join(', '),
    installUrl: pkg.npm,
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/DownloadAction',
        userInteractionCount: pkg.totalDownloads,
        description: 'Total npm downloads',
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/DownloadAction',
        userInteractionCount: pkg.weeklyDownloads,
        description: 'Weekly npm downloads',
      },
    ],
    ...(pkg.homepage ? { sameAs: pkg.homepage } : {}),
  }
}

export function buildHomeMeta(packages: Package[], site: SiteData): PageMeta {
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    imageAlt: 'npm.sounakdas.in — Open source packages by Sounak Das',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: 'npm.sounakdas.in',
          description: HOME_DESCRIPTION,
          author: { '@id': `${SITE_URL}/#person` },
          publisher: { '@id': `${SITE_URL}/#person` },
          inLanguage: 'en-US',
        },
        personNode(site),
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/#webpage`,
          url: `${SITE_URL}/`,
          name: HOME_TITLE,
          description: HOME_DESCRIPTION,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#person` },
          mainEntity: { '@id': `${SITE_URL}/#packages` },
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE_URL}/#packages`,
          name: 'npm packages by Sounak Das',
          description:
            'Open source JavaScript and TypeScript packages published by Sounak Das on npm.',
          numberOfItems: packages.length,
          itemListOrder: 'https://schema.org/ItemListUnordered',
          itemListElement: packages.map((pkg, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: packageNode(pkg, `${SITE_URL}/packages/${pkg.id}`),
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    },
  }
}

export function buildPackageMeta(pkg: Package, site: SiteData): PageMeta {
  const canonical = `${SITE_URL}/packages/${pkg.id}`
  return {
    title: `${pkg.name} — npm package by ${site.author.name}`,
    description: pkg.description,
    canonical,
    ogType: 'article',
    imageAlt: `${pkg.name} — npm package by ${site.author.name}`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        packageNode(pkg, canonical),
        personNode(site),
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonical}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Packages', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: pkg.name, item: canonical },
          ],
        },
      ],
    },
  }
}

export function buildNotFoundMeta(): PageMeta {
  return {
    title: 'Page not found · npm.sounakdas.in',
    description: 'The page you are looking for does not exist.',
    canonical: `${SITE_URL}/`,
    ogType: 'website',
    imageAlt: 'npm.sounakdas.in — Open source packages by Sounak Das',
    robots: 'noindex, follow',
    jsonLd: { '@context': 'https://schema.org', '@graph': [] },
  }
}
