import { motion } from 'framer-motion'
import type { SiteData } from '../types'
import './AboutStrip.css'

interface AboutStripProps {
  site: SiteData
}

const traits = [
  'TypeScript-first',
  'Zero-dependency',
  'MIT licensed',
  'Open source',
]

export function AboutStrip({ site }: AboutStripProps) {
  return (
    <motion.section
      className="about-strip"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-inner">
        <div className="about-left">
          <div className="about-avatar">SD</div>
          <div className="about-text">
            <p className="about-name">Sounak Das</p>
            <p className="about-bio">
              I ship cross-stack developer tools that prioritize performance, DX, and
              solving real problems. From terminal monitoring to virtualized grids,
              every package is built to production standards with minimal overhead.
            </p>
            <div className="about-links">
              <a href={site.author.github} target="_blank" rel="noopener noreferrer" className="about-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
              <a href={site.author.website} target="_blank" rel="noopener noreferrer" className="about-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Portfolio
              </a>
              <a href={site.author.npm} target="_blank" rel="noopener noreferrer" className="about-link about-link-npm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0v24h24V0H0zm6.672 18.668H3.328V5.332h3.344v10.004h3.328V5.332h3.328v13.336H6.672zm10.656-6.672h-3.328v3.336h-3.328V5.332h9.984v6.664h-3.328z" />
                </svg>
                npm
              </a>
            </div>
          </div>
        </div>

        <div className="about-traits">
          {traits.map((trait) => (
            <span key={trait} className="about-trait">{trait}</span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
