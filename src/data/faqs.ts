export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
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
    question: 'How do I generate a changelog from my git commits?',
    answer:
      'Use changelog-from-commits. It reads your git history, parses Conventional Commits, and writes a polished CHANGELOG.md with zero config and zero runtime dependencies. It is monorepo-aware and understands gitmoji.',
  },
  {
    question: 'How can I report bugs or request features?',
    answer:
      'Each package has its own GitHub repository with public issue tracking. Open an issue on the relevant repo and I typically respond within a few days. Pull requests are welcome and appreciated.',
  },
]
