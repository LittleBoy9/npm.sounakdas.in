import { motion } from 'framer-motion'
import type { Package } from '../types'
import './PackageGrid.css'

interface PackageGridProps {
  packages: Package[]
  onSelect: (pkg: Package) => void
}

export function PackageGrid({ packages, onSelect }: PackageGridProps) {
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
          <strong>10 public packages</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Primary stack</span>
          <strong>TypeScript, React, Node.js</strong>
        </div>
      </div>

      <div className="package-grid">
        {packages.map((pkg, index) => (
          <motion.article
            key={pkg.id}
            className="package-card"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => onSelect(pkg)}
            style={{ '--pkg-color': pkg.color } as React.CSSProperties}
          >
            <div className="card-accent" />
            <div className="card-header">
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="card-version">v{pkg.version}</span>
            </div>

            <h3 className="card-name">{pkg.name}</h3>
            <p className="card-description">{pkg.description}</p>

            <div className="card-install">
              <span className="card-install-prompt">$</span>
              <code>npm i {pkg.name}</code>
            </div>

            <div className="card-tags">
              {pkg.tags.map((tag) => (
                <span key={tag} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="card-footer">
              <div className="card-downloads">
                <div className="card-download-metric">
                  <span className="card-download-value">{pkg.weeklyDownloads}</span>
                  <span className="card-download-label">weekly downloads</span>
                </div>
                <div className="card-download-divider" />
                <div className="card-download-metric">
                  <span className="card-download-value">{pkg.totalDownloads}</span>
                  <span className="card-download-label">total downloads</span>
                </div>
              </div>
              <div className="card-meta">
                <span className="license-badge">{pkg.license}</span>
                <span className="card-open">
                  Open package
                  <span className="card-open-arrow">↗</span>
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
