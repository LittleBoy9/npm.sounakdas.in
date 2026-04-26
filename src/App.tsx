import { useEffect, useState } from 'react'
import { HeroScene } from './components/HeroScene'
import { PackageGrid } from './components/PackageGrid'
import { PackageModal } from './components/PackageModal'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import packagesData from './data/packages.json'
import siteData from './data/site.json'
import type { Package, SiteData } from './types'
import './App.css'

function App() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const packages = packagesData as Package[]
  const site = siteData as SiteData

  useEffect(() => {
    document.title = site.meta.title
    const descriptionTag = document.querySelector('meta[name="description"]')

    if (descriptionTag) {
      descriptionTag.setAttribute('content', site.meta.description)
    }
  }, [site.meta.description, site.meta.title])

  return (
    <div className="app">
      <Header site={site} />
      <main>
        <HeroScene packages={packages} site={site} />
        <PackageGrid packages={packages} onSelect={setSelectedPackage} />
      </main>
      <Footer site={site} />
      {selectedPackage && (
        <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
      )}
    </div>
  )
}

export default App
