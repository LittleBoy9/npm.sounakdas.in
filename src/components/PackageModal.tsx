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
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="modal-glow" style={{ background: `radial-gradient(ellipse at 30% -20%, ${pkg.color}25, transparent 60%)` }} />
          <div className="modal-glow-2" style={{ background: `radial-gradient(ellipse at 80% 100%, ${pkg.color}10, transparent 50%)` }} />

          <div className="modal-header">
            <div className="modal-icon-wrapper" style={{ background: `${pkg.color}12`, borderColor: `${pkg.color}30` }}>
              <span className="modal-icon">{pkg.icon}</span>
            </div>
            <div>
              <h2 className="modal-name">{pkg.name}</h2>
              <div className="modal-version-row">
                <span className="modal-version" style={{ color: pkg.color }}>v{pkg.version}</span>
                <span className="modal-license">{pkg.license}</span>
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
                <span className="meta-card-value">{pkg.downloads}</span>
                <span className="meta-card-label">Downloads</span>
              </div>
            </div>
            <div className="meta-card">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <span className="meta-card-value">{pkg.license}</span>
                <span className="meta-card-label">License</span>
              </div>
            </div>
          </div>

          <div className="modal-tags">
            {pkg.tags.map((tag) => (
              <span key={tag} className="modal-tag" style={{ borderColor: pkg.color + '30', color: pkg.color, background: pkg.color + '08' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="modal-install" onClick={handleCopy}>
            <div className="install-header">
              <span className="install-label">Quick Install</span>
              <span className="install-copy">{copied ? 'Copied!' : 'Click to copy'}</span>
            </div>
            <code className="install-command">
              <span className="install-prompt">$</span> npm install {pkg.name}
            </code>
          </div>

          <div className="modal-links">
            <a href={pkg.npm} target="_blank" rel="noopener noreferrer" className="modal-link npm-link" style={{ '--link-color': pkg.color } as React.CSSProperties}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0h-1.333v-4h-1.334v4h-1.333v-4h-1.334v4h-2.666V8.667h8.001v5.331z"/>
              </svg>
              View on npm
            </a>
            <a href={pkg.github} target="_blank" rel="noopener noreferrer" className="modal-link github-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Source Code
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
