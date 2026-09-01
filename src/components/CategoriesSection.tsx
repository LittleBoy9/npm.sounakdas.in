import { motion } from 'framer-motion'
import './CategoriesSection.css'

const categories = [
  {
    name: 'CLI & Developer Tools',
    description:
      'Terminal dashboards, Git analysis, and command-line utilities built for developer productivity and observability.',
    packages: 'termiwatch, git-vision, changelog-from-commits',
  },
  {
    name: 'Backend & Node.js',
    description:
      'Logging, diagnostics, search, and monitoring utilities for server-side JavaScript and TypeScript applications.',
    packages: 'logpaint, dev-log-monitor, quickfuzz',
  },
  {
    name: 'React & Visualization',
    description:
      'A Tailwind CSS component library, skeleton loaders, animated charts, color editors, and layout primitives for modern React applications.',
    packages: 'onyxkit, instaskeleton, motionchart, rgb-curve, smart-masonry-grid',
  },
  {
    name: 'Browser SDKs',
    description:
      'Zero-config SDKs for collecting context, debugging signals, and monitoring frontend applications in production.',
    packages: 'ghostbug',
  },
]

export function CategoriesSection() {
  return (
    <section className="categories-section">
      <div className="categories-header">
        <motion.h2
          className="categories-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Browse by Category
        </motion.h2>
        <motion.p
          className="categories-subtitle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          From terminal tooling to browser instrumentation — packages for every layer of the stack.
        </motion.p>
      </div>

      <motion.div
        className="categories-grid"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {categories.map((cat) => (
          <div key={cat.name} className="category-card">
            <h3 className="category-name">{cat.name}</h3>
            <p className="category-desc">{cat.description}</p>
            <span className="category-packages">{cat.packages}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
