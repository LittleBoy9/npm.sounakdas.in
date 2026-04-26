import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Package } from '../types'
import './PackageModal.css'

interface PackageModalProps {
  pkg: Package
  onClose: () => void
}

export function PackageModal({ pkg, onClose }: PackageModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleCopy() {
    navigator.clipboard.writeText(`npm install ${pkg.name}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="modal-header">
            <div>
              <h2 className="modal-name">{pkg.name}</h2>
              <div className="modal-version-row">
                <span className="modal-version">v{pkg.version}</span>
                <span className="modal-license">{pkg.license}</span>
                <span className="modal-source">npm package</span>
              </div>
            </div>
          </div>

          <p className="modal-description">{pkg.description}</p>

          <div className="modal-meta-grid">
            <div className="meta-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.weeklyDownloads}</span>
                <span className="meta-card-label">Weekly downloads</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v8" />
                <path d="M8.5 11.5 12 8l3.5 3.5" />
                <path d="M5 20h14" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.totalDownloads}</span>
                <span className="meta-card-label">Total downloads to date</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 7V3m8 4V3M4 11h16" />
                <rect x="3" y="5" width="18" height="16" rx="2" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.publishedAt}</span>
                <span className="meta-card-label">Published</span>
              </div>
            </div>

            <div className="meta-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18" />
                <path d="M12 3v18" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.license}</span>
                <span className="meta-card-label">License</span>
              </div>
            </div>
          </div>

          <div className="modal-tags">
            {pkg.tags.map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="modal-install" onClick={handleCopy}>
            <div className="install-header">
              <span className="install-label">Quick Install</span>
              <span className="install-copy">{copied ? 'Copied' : 'Click to copy'}</span>
            </div>
            <code className="install-command">
              <span className="install-prompt">$</span>
              npm install {pkg.name}
            </code>
          </div>

          <div className="modal-links">
            <a href={pkg.npm} target="_blank" rel="noopener noreferrer" className="modal-link npm-link">
              View on npm
            </a>
            <a href={pkg.github} target="_blank" rel="noopener noreferrer" className="modal-link github-link">
              Source Code
            </a>
            {pkg.homepage && (
              <a href={pkg.homepage} target="_blank" rel="noopener noreferrer" className="modal-link homepage-link">
                Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
