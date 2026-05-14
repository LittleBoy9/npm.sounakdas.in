import { Routes, Route } from 'react-router-dom'
import { Seo } from './components/Seo'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { ScrollToTop } from './components/ScrollToTop'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { PackagePage } from './pages/PackagePage'
import packagesData from './data/packages.json'
import siteData from './data/site.json'
import type { Package, SiteData } from './types'
import './App.css'

function App() {
  const packages = packagesData as Package[]
  const site = siteData as SiteData

  const gaId = import.meta.env.VITE_GA_ID

  return (
    <div className="app">
      <ScrollToTop />
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <Header site={site} />
      <Routes>
        <Route
          path="/"
          element={<HomePage packages={packages} site={site} />}
        />
        <Route
          path="/packages/:id"
          element={<PackagePage packages={packages} site={site} />}
        />
      </Routes>
      <Footer site={site} />
    </div>
  )
}

export default App
