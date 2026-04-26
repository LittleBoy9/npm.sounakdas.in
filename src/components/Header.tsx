import type { SiteData } from '../types'
import './Header.css'

interface HeaderProps {
  site: SiteData
}

export function Header({ site }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="header-logo">
          <span className="logo-mark">npm</span>
          <span className="logo-text">sounakdas</span>
        </a>
        <nav className="header-nav">
          <a href="#packages" className="nav-link">Packages</a>
          <a href={site.author.website} target="_blank" rel="noopener noreferrer" className="nav-link">
            Portfolio
          </a>
          <a href={site.author.github} target="_blank" rel="noopener noreferrer" className="nav-link">
            GitHub
          </a>
          <a href={site.author.npm} target="_blank" rel="noopener noreferrer" className="nav-link nav-cta">
            npm Profile
          </a>
        </nav>
      </div>
    </header>
  )
}
