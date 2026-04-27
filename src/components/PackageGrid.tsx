import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Package } from '../types'
import './PackageGrid.css'

interface PackageGridProps {
  packages: Package[]
  onSelect: (pkg: Package) => void
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

export function PackageGrid({ packages, onSelect }: PackageGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const totalDownloads = packages.reduce((sum, p) => sum + p.totalDownloads, 0)

  const tags = useMemo(() => {
    const freq: Record<string, number> = {}
    packages.forEach(p => p.tags.forEach(t => { freq[t] = (freq[t] || 0) + 1 }))
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
  }, [packages])

  const filtered = activeTag
    ? packages.filter(p => p.tags.includes(activeTag))
    : packages

  return (
    <section className="package-grid-section" id="packages">
      <div className="section-header">
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          published under sounakdas
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          Package Registry
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Click any card for install commands, links, tags, and release details.
        </motion.p>
      </div>

      <div className="package-grid-summary">
        <div className="summary-card">
          <span className="summary-label">Collection</span>
          <strong>{packages.length} public packages</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total downloads</span>
          <strong>{formatCount(totalDownloads)} all time</strong>
        </div>
      </div>

      <div className="tag-filter-bar">
        <button
          className={`tag-filter-chip ${activeTag === null ? 'active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All
          <span className="tag-filter-count">{packages.length}</span>
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`tag-filter-chip ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
          >
            {tag}
            <span className="tag-filter-count">
              {packages.filter(p => p.tags.includes(tag)).length}
            </span>
          </button>
        ))}
      </div>

      <motion.div className="package-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((pkg) => (
            <motion.article
              key={pkg.id}
              layout
              className="package-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22 }}
              onClick={() => onSelect(pkg)}
              style={{ '--pkg-color': pkg.color } as React.CSSProperties}
            >
              <div className="card-accent" />

              <div className="card-header">
                <span className="card-icon">{pkg.icon}</span>
                <div className="card-header-meta">
                  <span className="card-version">v{pkg.version}</span>
                  <span className="license-badge">{pkg.license}</span>
                </div>
              </div>

              <h3 className="card-name">{pkg.name}</h3>
              <p className="card-description">{pkg.description}</p>

              <div className="card-install">
                <span className="card-install-prompt">$</span>
                <code>npm i {pkg.name}</code>
              </div>

              <div className="card-tags">
                {pkg.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`card-tag ${activeTag === tag ? 'card-tag-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveTag(prev => prev === tag ? null : tag)
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="card-footer">
                <div className="card-downloads">
                  <div className="card-download-metric">
                    <span className="card-download-value">{formatCount(pkg.weeklyDownloads)}</span>
                    <span className="card-download-label">weekly</span>
                  </div>
                  <div className="card-download-divider" />
                  <div className="card-download-metric">
                    <span className="card-download-value">{formatCount(pkg.totalDownloads)}</span>
                    <span className="card-download-label">total</span>
                  </div>
                </div>
                <span className="card-open">
                  Open
                  <span className="card-open-arrow">↗</span>
                </span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="tag-filter-empty">
          No packages tagged <strong>{activeTag}</strong>.
        </div>
      )}
    </section>
  )
}
