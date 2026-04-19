import type { SiteData } from '../types'
import './Footer.css'

interface FooterProps {
  site: SiteData
}

export function Footer({ site }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">npm.sounakdas.in</span>
          <p className="footer-tagline">{site.author.tagline}</p>
        </div>
        <div className="footer-links">
          <a href={site.author.website} target="_blank" rel="noopener noreferrer">Portfolio</a>
          <a href={site.author.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.author.npm} target="_blank" rel="noopener noreferrer">npm</a>
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} {site.author.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
