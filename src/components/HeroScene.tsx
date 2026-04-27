import { useEffect, useState } from 'react'
import type { Package, SiteData } from '../types'
import './HeroScene.css'

interface HeroSceneProps {
  packages: Package[]
  site: SiteData
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

function totalWeeklyDownloads(packages: Package[]) {
  return packages.reduce((total, pkg) => total + pkg.weeklyDownloads, 0)
}

function totalLifetimeDownloads(packages: Package[]) {
  return packages.reduce((total, pkg) => total + pkg.totalDownloads, 0)
}

export function HeroScene({ packages, site }: HeroSceneProps) {
  const weeklyDownloads = totalWeeklyDownloads(packages)
  const lifetimeDownloads = totalLifetimeDownloads(packages)

  const [cmdIndex, setCmdIndex] = useState(0)
  const [cmdVisible, setCmdVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCmdVisible(false)
      setTimeout(() => {
        setCmdIndex(i => (i + 1) % packages.length)
        setCmdVisible(true)
      }, 280)
    }, 2600)
    return () => clearInterval(interval)
  }, [packages.length])

  const marqueeItems = [...packages, ...packages]

  return (
    <section className="hero-scene">
      <div className="hero-overlay">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="badge-dot" />
            npm author portfolio
          </div>
          <h1 className="hero-title">
            Sounak Das
            <span className="hero-title-accent"> on npm</span>
          </h1>
          <p className="hero-lead">
            I publish small, focused packages for developers.
          </p>
          <p className="hero-subtitle">
            This site is my package portfolio: the tools, UI libraries, experiments, and reusable modules I have shipped under <code>sounakdas</code>.
          </p>
          <div className="hero-cta-group">
            <a href="#packages" className="hero-cta-primary">Explore my packages</a>
            <a href={site.author.npm} target="_blank" rel="noopener noreferrer" className="hero-cta-secondary">
              Visit npm profile
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-header">
            <span className="hero-panel-label">Portfolio snapshot</span>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{packages.length}</span>
              <span className="stat-label">Packages published</span>
            </div>
            <div className="stat">
              <span className="stat-value">{formatCount(weeklyDownloads)}</span>
              <span className="stat-label">Weekly downloads</span>
            </div>
            <div className="stat">
              <span className="stat-value">{formatCount(lifetimeDownloads)}</span>
              <span className="stat-label">Total downloads</span>
            </div>
          </div>

          <div className="hero-command">
            <span className="hero-command-prompt">$</span>
            <span
              className="hero-command-pkg"
              style={{ opacity: cmdVisible ? 1 : 0 }}
            >
              npm i {packages[cmdIndex]?.name}
            </span>
          </div>

          <div className="hero-marquee">
            <div
              className="hero-marquee-track"
              style={{ '--marquee-count': packages.length } as React.CSSProperties}
            >
              {marqueeItems.map((pkg, i) => (
                <span
                  key={`${pkg.id}-${i}`}
                  className="hero-pkg-chip"
                  style={{ '--pkg-color': pkg.color } as React.CSSProperties}
                >
                  <span className="chip-icon">{pkg.icon}</span>
                  <span className="chip-name">{pkg.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
