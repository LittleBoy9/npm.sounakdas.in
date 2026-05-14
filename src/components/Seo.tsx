import { useEffect } from 'react'
import type { Package, SiteData } from '../types'

interface SeoProps {
  packages: Package[]
  site: SiteData
  activePackage?: Package
}

export function Seo({ packages, site, activePackage }: SeoProps) {
  useEffect(() => {
    if (activePackage) {
      document.title = `${activePackage.name} — npm package by ${site.author.name}`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', activePackage.description)
      }
    } else {
      document.title = `${site.author.name} · npm Packages & Developer Tools`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Open source npm packages by Sounak Das — CLI tools, React libraries, Node.js utilities, and TypeScript packages. MIT licensed, zero-dependency.'
        )
      }
    }
  }, [activePackage, site])

  useEffect(() => {
    let graph: unknown[]

    if (activePackage) {
      graph = [
        {
          '@type': 'SoftwareSourceCode',
          '@id': `https://npm.sounakdas.in/packages/${activePackage.id}`,
          name: activePackage.name,
          description: activePackage.description,
          url: `https://npm.sounakdas.in/packages/${activePackage.id}`,
          codeRepository: activePackage.github,
          version: activePackage.version,
          datePublished: activePackage.publishedAt,
          license: 'https://opensource.org/licenses/MIT',
          programmingLanguage: {
            '@type': 'ComputerLanguage',
            name: 'TypeScript',
          },
          author: { '@id': 'https://npm.sounakdas.in/#person' },
          keywords: activePackage.tags.join(', '),
          ...(activePackage.homepage ? { sameAs: activePackage.homepage } : {}),
        },
        {
          '@type': 'Person',
          '@id': 'https://npm.sounakdas.in/#person',
          name: site.author.name,
          url: site.author.website,
          sameAs: [
            site.author.github,
            site.author.npm,
            site.author.website,
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Packages',
              item: 'https://npm.sounakdas.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: activePackage.name,
              item: `https://npm.sounakdas.in/packages/${activePackage.id}`,
            },
          ],
        },
      ]
    } else {
      graph = [
        {
          '@type': 'WebSite',
          '@id': 'https://npm.sounakdas.in/#website',
          url: 'https://npm.sounakdas.in',
          name: 'npm.sounakdas.in',
          description:
            'Open source npm packages by Sounak Das — CLI tools, React components, Node.js utilities, TypeScript libraries.',
          author: { '@id': 'https://npm.sounakdas.in/#person' },
          inLanguage: 'en-US',
        },
        {
          '@type': 'Person',
          '@id': 'https://npm.sounakdas.in/#person',
          name: site.author.name,
          url: site.author.website,
          sameAs: [
            site.author.github,
            site.author.npm,
            site.author.website,
          ],
          knowsAbout: [
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'Open Source Software',
            'npm',
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://npm.sounakdas.in/#packages',
          name: 'npm packages by Sounak Das',
          description:
            'Open source JavaScript and TypeScript packages published by Sounak Das on npm.',
          numberOfItems: packages.length,
          itemListElement: packages.map((pkg, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'SoftwareSourceCode',
              '@id': pkg.npm,
              name: pkg.name,
              description: pkg.description,
              url: `https://npm.sounakdas.in/packages/${pkg.id}`,
              codeRepository: pkg.github,
              version: pkg.version,
              datePublished: pkg.publishedAt,
              license: 'https://opensource.org/licenses/MIT',
              programmingLanguage: {
                '@type': 'ComputerLanguage',
                name: 'TypeScript',
              },
              author: { '@id': 'https://npm.sounakdas.in/#person' },
              keywords: pkg.tags.join(', '),
              ...(pkg.homepage ? { sameAs: pkg.homepage } : {}),
            },
          })),
        },
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'structured-data'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    })

    document.getElementById('structured-data')?.remove()
    document.head.appendChild(script)

    return () => {
      document.getElementById('structured-data')?.remove()
    }
  }, [packages, site, activePackage])

  return null
}
