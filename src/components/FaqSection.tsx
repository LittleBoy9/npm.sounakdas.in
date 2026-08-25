import { motion } from 'framer-motion'
import { faqs } from '../data/faqs'
import './FaqSection.css'

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
