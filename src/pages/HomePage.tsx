import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { HeroScene } from '../components/HeroScene'
import { AboutStrip } from '../components/AboutStrip'
import { CategoriesSection } from '../components/CategoriesSection'
import { PackageGrid } from '../components/PackageGrid'
import { FaqSection } from '../components/FaqSection'
import type { Package, SiteData } from '../types'

interface HomePageProps {
  packages: Package[]
  site: SiteData
}

export function HomePage({ packages, site }: HomePageProps) {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#packages') {
      const el = document.getElementById('packages')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
      }
    }
  }, [hash])

  return (
    <>
      <Seo packages={packages} site={site} />
      <main>
        <HeroScene packages={packages} site={site} />
        <AboutStrip site={site} />
        <CategoriesSection />
        <PackageGrid packages={packages} />
        <FaqSection />
      </main>
    </>
  )
}
