import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Package } from '../types'
import './PackageGrid.css'

interface PackageGridProps {
  packages: Package[]
  onSelect: (pkg: Package) => void
  onHover: (index: number | null) => void
}

export function PackageGrid({ packages, onSelect, onHover }: PackageGridProps) {
  return (
    <section className="package-grid-section" id="packages">
      <div className="section-header">
        <motion.div
          className="section-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          npm registry
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          All Packages
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Production-ready tools built for the modern web
        </motion.p>
      </div>
      <div className="package-grid">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            index={index}
            onSelect={onSelect}
            onHover={onHover}
          />
        ))}
      </div>
    </section>
  )
}

function PackageCard({
  pkg,
  index,
  onSelect,
  onHover,
}: {
  pkg: Package
  index: number
  onSelect: (pkg: Package) => void
  onHover: (index: number | null) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
    onHover(null)
  }

  return (
    <motion.div
      className="package-card-wrapper"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        className={`package-card ${isHovered ? 'is-hovered' : ''}`}
        onClick={() => onSelect(pkg)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true)
          onHover(index)
        }}
        onMouseLeave={handleMouseLeave}
        style={{
          '--pkg-color': pkg.color,
          rotateX,
          rotateY,
          transformPerspective: 1000,
        } as React.CSSProperties & { rotateX: any; rotateY: any; transformPerspective: number }}
      >
        {/* Animated gradient border */}
        <div className="card-border-glow" style={{
          background: `conic-gradient(from var(--border-angle, 0deg), transparent 40%, ${pkg.color} 50%, transparent 60%)`,
        }} />
        <div className="card-inner">
          <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${pkg.color}20, transparent 70%)` }} />

          <div className="card-header">
            <div className="card-icon-wrapper" style={{ background: `${pkg.color}12`, borderColor: `${pkg.color}25` }}>
              <span className="card-icon">{pkg.icon}</span>
            </div>
            <span className="card-version" style={{ color: pkg.color }}>v{pkg.version}</span>
          </div>

          <h3 className="card-name">{pkg.name}</h3>
          <p className="card-description">{pkg.description}</p>

          <div className="card-tags">
            {pkg.tags.map((tag) => (
              <span key={tag} className="card-tag" style={{ borderColor: pkg.color + '25', color: pkg.color, background: pkg.color + '08' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="card-footer">
            <div className="card-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{pkg.downloads}</span>
            </div>
            <div className="card-stat">
              <span className="license-badge">{pkg.license}</span>
            </div>
            <div className="card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
