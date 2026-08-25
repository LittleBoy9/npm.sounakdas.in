import { Link } from 'react-router-dom'
import './PackagePage.css'

export function NotFoundPage() {
  return (
    <main className="package-page-not-found">
      <h1>Page not found</h1>
      <p>That page doesn't exist. It may have moved, or the link may be wrong.</p>
      <Link to="/" className="back-link">
        ← Back to all packages
      </Link>
    </main>
  )
}
