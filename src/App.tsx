import { useState, useCallback } from 'react'
import { HeroScene } from './components/HeroScene'
import { PackageGrid } from './components/PackageGrid'
import { PackageModal } from './components/PackageModal'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ParticleBackground } from './components/ParticleBackground'
import packagesData from './data/packages.json'
import siteData from './data/site.json'
import type { Package, SiteData } from './types'
import './App.css'

function App() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const packages = packagesData as Package[]
  const site = siteData as SiteData

  const handleSelect = useCallback((pkg: Package) => {
    setSelectedPackage(pkg)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedPackage(null)
  }, [])

  return (
    <div className="app">
      <ParticleBackground />
      <Header site={site} />
      <main>
        <HeroScene
          packages={packages}
          hoveredIndex={hoveredIndex}
          onSelect={handleSelect}
        />
        <PackageGrid
          packages={packages}
          onSelect={handleSelect}
          onHover={setHoveredIndex}
        />
      </main>
      <Footer site={site} />
      {selectedPackage && (
        <PackageModal pkg={selectedPackage} onClose={handleClose} />
      )}
    </div>
  )
}

export default App
