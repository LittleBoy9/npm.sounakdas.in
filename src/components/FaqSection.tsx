import { motion } from 'framer-motion'
import './FaqSection.css'

const faqs = [
  {
    question: 'Are these npm packages free for commercial use?',
    answer:
      'Yes. Every package is released under the MIT License, which means you can use them in personal, commercial, and enterprise projects without restrictions. Attribution is appreciated but not required.',
  },
  {
    question: 'Do your packages include TypeScript support?',
    answer:
      'Absolutely. All packages are TypeScript-first and ship with built-in type definitions. You get full IntelliSense, autocompletion, and type safety out of the box with zero additional configuration.',
  },
  {
    question: 'Which package should I use for terminal monitoring?',
    answer:
      'For real-time terminal dashboards with CPU, memory, event loop, and HTTP metrics, use termiwatch. For lightweight, colored logging with a clean API, use logpaint. Both are zero-config and production-ready.',
  },
  {
    question: 'What is the best zero-dependency fuzzy search library?',
    answer:
      'quickfuzz is a blazing-fast, zero-dependency fuzzy search engine optimized for small to medium datasets. It works in both browser and Node.js environments with no external dependencies.',
  },
  {
    question: 'Do you have React components for data visualization?',
    answer:
      'Yes. motionchart provides cinematic animated charts for storytelling, rgb-curve offers a professional-grade RGB curve editor for color grading, and smart-masonry-grid delivers virtualized masonry layouts for performant image galleries.',
  },
  {
    question: 'How can I report bugs or request features?',
    answer:
      'Each package has its own GitHub repository with public issue tracking. Open an issue on the relevant repo and I typically respond within a few days. Pull requests are welcome and appreciated.',
  },
]

export function FaqSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-header">
        <motion.h2
          className="faq-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="faq-subtitle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          Quick answers about licensing, TypeScript support, and choosing the right package for your project.
        </motion.p>
      </div>

      <motion.div
        className="faq-list"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {faqs.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </motion.div>
    </section>
  )
}
