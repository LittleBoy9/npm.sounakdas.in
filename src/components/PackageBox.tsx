import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import type { Package } from '../types'

interface PackageBoxProps {
  pkg: Package
  position: [number, number, number]
  index: number
  isHovered: boolean
  onSelect: (pkg: Package) => void
  onHover: (index: number | null) => void
}

export function PackageBox({ pkg, position, index, isHovered, onSelect, onHover }: PackageBoxProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const [localHover, setLocalHover] = useState(false)
  const color = new THREE.Color(pkg.color)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime + index * 1.5
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15
    meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.08

    const targetScale = localHover ? 1.15 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })

  return (
    <Float
      speed={1.5 + index * 0.2}
      rotationIntensity={0.2}
      floatIntensity={0.5 + index * 0.1}
      floatingRange={[-0.1, 0.1]}
    >
      <group
        ref={meshRef}
        position={position}
        onClick={() => onSelect(pkg)}
        onPointerOver={() => {
          setLocalHover(true)
          onHover(index)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setLocalHover(false)
          onHover(null)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Main box */}
        <RoundedBox args={[1.6, 1.2, 0.4]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color={localHover ? color : color.clone().multiplyScalar(0.6)}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={localHover ? 0.95 : 0.75}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Glow effect */}
        {localHover && (
          <RoundedBox args={[1.7, 1.3, 0.5]} radius={0.1} smoothness={4}>
            <meshBasicMaterial
              color={pkg.color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </RoundedBox>
        )}

        {/* Icon */}
        <Text
          position={[0, 0.2, 0.22]}
          fontSize={0.35}
          anchorX="center"
          anchorY="middle"
        >
          {pkg.icon}
        </Text>

        {/* Package name */}
        <Text
          position={[0, -0.25, 0.22]}
          fontSize={0.1}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTk6OThhvA.woff2"
          maxWidth={1.4}
          textAlign="center"
        >
          {pkg.name}
        </Text>

        {/* Version badge */}
        <Text
          position={[0, -0.45, 0.22]}
          fontSize={0.07}
          anchorX="center"
          anchorY="middle"
          color="#aaaacc"
        >
          v{pkg.version}
        </Text>

        {/* Edge glow lines */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.6, 1.2, 0.4)]} />
          <lineBasicMaterial color={pkg.color} transparent opacity={localHover ? 0.6 : 0.15} />
        </lineSegments>
      </group>
    </Float>
  )
}
