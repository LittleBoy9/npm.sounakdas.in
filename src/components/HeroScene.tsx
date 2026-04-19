import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { FloatingParticles } from './FloatingParticles'
import { PackageBox } from './PackageBox'
import { CenterPiece } from './CenterPiece'
import type { Package } from '../types'
import './HeroScene.css'

interface HeroSceneProps {
  packages: Package[]
  hoveredIndex: number | null
  onSelect: (pkg: Package) => void
}

function getPackagePositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = []
  const radius = 4
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * 1.2
    const z = Math.sin(angle * 0.8) * 1.5
    positions.push([x, y, z])
  }
  return positions
}

export function HeroScene({ packages, hoveredIndex, onSelect }: HeroSceneProps) {
  const positions = getPackagePositions(packages.length)

  return (
    <section className="hero-scene">
      <div className="hero-overlay">
        <div className="hero-badge">
          <span className="badge-dot" />
          Open Source Ecosystem
        </div>
        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-accent">npm</span>
            <span className="hero-dim">.sounakdas.in</span>
          </span>
        </h1>
        <p className="hero-subtitle">
          Crafting developer tools that push boundaries.<br />
          <span className="hero-typed">TypeScript-first. Zero compromise.</span>
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{packages.length}</span>
            <span className="stat-label">Packages</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">50k+</span>
            <span className="stat-label">Weekly Downloads</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">MIT</span>
            <span className="stat-label">Licensed</span>
          </div>
        </div>
        <div className="hero-cta-group">
          <a href="#packages" className="hero-cta-primary">
            <span>Explore Packages</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17l9.2-9.2M17 17V7.8H7.8"/>
            </svg>
          </a>
          <a href="https://github.com/sounakdas" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary">
            View on GitHub
          </a>
        </div>
        <p className="hero-hint">Drag to orbit the 3D scene</p>
      </div>
      <Canvas className="hero-canvas" dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.5, 9]} fov={45} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.8}
          />

          {/* Lighting */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} color="#e8e8ff" />
          <pointLight position={[-6, 4, -6]} intensity={1.5} color="#6c63ff" distance={20} />
          <pointLight position={[6, -3, 6]} intensity={0.8} color="#ff6b6b" distance={15} />
          <pointLight position={[0, 6, 0]} intensity={0.6} color="#a855f7" distance={15} />
          <spotLight
            position={[0, 12, 0]}
            angle={0.4}
            penumbra={1}
            intensity={1}
            color="#6c63ff"
          />

          <Stars radius={50} depth={60} count={1500} factor={3} saturation={0.5} fade speed={0.5} />

          <Environment preset="night" />

          <CenterPiece />

          <FloatingParticles count={400} />

          {packages.map((pkg, i) => (
            <PackageBox
              key={pkg.id}
              pkg={pkg}
              position={positions[i]}
              index={i}
              isHovered={hoveredIndex === i}
              onSelect={onSelect}
              onHover={() => {}}
            />
          ))}

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={1.5}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005] as any}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  )
}
