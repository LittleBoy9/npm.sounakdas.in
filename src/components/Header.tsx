import { Link } from 'react-router-dom'
import type { SiteData } from '../types'
import './Header.css'

interface HeaderProps {
  site: SiteData
}

export function Header({ site }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-mark">npm</span>
          <span className="logo-text">sounakdas</span>
        </Link>
        <nav className="header-nav">
          <Link to="/#packages" className="nav-link">Packages</Link>
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
