import type { Package, SiteData } from '../types'
import './HeroScene.css'

interface HeroSceneProps {
  packages: Package[]
  site: SiteData
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
  const leadPackage = packages[0]

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
            <span className="hero-panel-pill">verified {site.meta.verifiedAt}</span>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">{packages.length}</span>
              <span className="stat-label">Packages published</span>
            </div>
            <div className="stat">
              <span className="stat-value">{weeklyDownloads} downloads</span>
              <span className="stat-label">Weekly downloads</span>
            </div>
            <div className="stat">
              <span className="stat-value">{lifetimeDownloads} downloads</span>
              <span className="stat-label">Total downloads to date</span>
            </div>
          </div>

          <div className="hero-command">
            <span className="hero-command-prompt">$</span>
            <span>npm i {leadPackage?.name ?? 'package-name'}</span>
          </div>

          <div className="hero-tags">
            <span>developer tools</span>
            <span>React</span>
            <span>Node.js</span>
            <span>CLI</span>
            <span>UI utilities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
