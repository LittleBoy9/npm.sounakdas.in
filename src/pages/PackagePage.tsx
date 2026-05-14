import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import type { Package, SiteData } from '../types'
import './PackagePage.css'

interface PackagePageProps {
  packages: Package[]
  site: SiteData
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

export function PackagePage({ packages, site }: PackagePageProps) {
  const { id } = useParams<{ id: string }>()
  const [copied, setCopied] = useState(false)
  const pkg = packages.find((p) => p.id === id)

  function handleCopy() {
    if (!pkg) return
    navigator.clipboard.writeText(`npm install ${pkg.name}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!pkg) {
    return (
      <div className="package-page-not-found">
        <h1>Package not found</h1>
        <p>We couldn't find a package with that name.</p>
        <Link to="/" className="back-link">
          ← Back to all packages
        </Link>
      </div>
    )
  }

  return (
    <>
      <Seo packages={packages} site={site} activePackage={pkg} />
      <main className="package-page" style={{ '--pkg-color': pkg.color } as React.CSSProperties}>
        <div className="package-page-inner">
          <Link to="/" className="back-link">
            ← All packages
          </Link>

          <div className="package-page-header">
            <span className="package-page-icon">{pkg.icon}</span>
            <div>
              <h1 className="package-page-name">{pkg.name}</h1>
              <div className="package-page-version-row">
                <span className="package-page-version">v{pkg.version}</span>
                <span className="package-page-license">{pkg.license}</span>
                <span className="package-page-source">npm package</span>
              </div>
            </div>
          </div>

          <p className="package-page-description">{pkg.description}</p>

          <div className="package-page-meta-grid">
            <div className="meta-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <div>
                <span className="meta-card-value">{formatCount(pkg.weeklyDownloads)}</span>
                <span className="meta-card-label">Weekly downloads</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v8" />
                <path d="M8.5 11.5 12 8l3.5 3.5" />
                <path d="M5 20h14" />
              </svg>
              <div>
                <span className="meta-card-value">{formatCount(pkg.totalDownloads)}</span>
                <span className="meta-card-label">Total downloads</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3M4 11h16" />
                <rect x="3" y="5" width="18" height="16" rx="2" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.publishedAt}</span>
                <span className="meta-card-label">Published</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.license}</span>
                <span className="meta-card-label">License</span>
              </div>
            </div>
          </div>

          <div className="package-page-tags">
            {pkg.tags.map((tag) => (
              <span key={tag} className="package-page-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="package-page-install" onClick={handleCopy}>
            <div className="install-header">
              <span className="install-label">Quick Install</span>
              <span className="install-copy">
                {copied ? '✓ Copied' : 'Click to copy'}
              </span>
            </div>
            <code className="install-command">
              <span className="install-prompt">$</span>
              npm install {pkg.name}
            </code>
          </div>

          <div className="package-page-links">
            <a
              href={pkg.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link npm-link"
            >
              View on npm
            </a>
            <a
              href={pkg.github}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link github-link"
            >
              Source Code
            </a>
            {pkg.homepage && (
              <a
                href={pkg.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link homepage-link"
              >
                Demo / Docs
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
