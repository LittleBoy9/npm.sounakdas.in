import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function CenterPiece() {
  const torusRef = useRef<THREE.Mesh>(null!)
  const torusRef2 = useRef<THREE.Mesh>(null!)
  const torusRef3 = useRef<THREE.Mesh>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3
      torusRef.current.rotation.y = t * 0.2
    }
    if (torusRef2.current) {
      torusRef2.current.rotation.x = t * 0.2 + Math.PI / 3
      torusRef2.current.rotation.y = t * 0.3 + Math.PI / 4
    }
    if (torusRef3.current) {
      torusRef3.current.rotation.x = t * 0.15 + Math.PI / 6
      torusRef3.current.rotation.z = t * 0.25
    }
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
    }
  })

  return (
    <group>
      {/* Core glowing sphere */}
      <Sphere ref={sphereRef} args={[0.6, 64, 64]}>
        <MeshDistortMaterial
          color="#6c63ff"
          emissive="#6c63ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[0.65, 32, 32]}>
        <meshBasicMaterial
          color="#6c63ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#6c63ff" transparent opacity={0.6} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={torusRef2}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={torusRef3}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.3} />
      </mesh>

      {/* Orbiting dots on ring 1 */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <OrbitDot key={i} ringRadius={1.5} index={i} total={6} speed={0.3} color="#6c63ff" size={0.04} />
      ))}

      {/* Orbiting dots on ring 2 */}
      {[0, 1, 2, 3].map((i) => (
        <OrbitDot key={`r2-${i}`} ringRadius={1.8} index={i} total={4} speed={0.2} color="#a855f7" size={0.03} />
      ))}
    </group>
  )
}

function OrbitDot({ ringRadius, index, total, speed, color, size }: {
  ringRadius: number; index: number; total: number; speed: number; color: string; size: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + (index / total) * Math.PI * 2
    ref.current.position.x = Math.cos(t) * ringRadius
    ref.current.position.y = Math.sin(t) * ringRadius * 0.5
    ref.current.position.z = Math.sin(t) * ringRadius * 0.3
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
