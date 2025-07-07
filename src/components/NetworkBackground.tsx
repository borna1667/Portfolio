import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface NetworkPoint {
  position: THREE.Vector3
  velocity: THREE.Vector3
  connections: number[]
  originalPosition: THREE.Vector3
  phase: number
}

interface ParticleSystem {
  points: NetworkPoint[]
  mousePosition: THREE.Vector2
  time: number
}

function EnhancedNetworkPoints() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const glowPointsRef = useRef<THREE.Points>(null)
  const particleSystem = useRef<ParticleSystem>({
    points: [],
    mousePosition: new THREE.Vector2(),
    time: 0
  })
  
  const { viewport } = useThree()

  useEffect(() => {
    // Initialize enhanced network points
    const points: NetworkPoint[] = []
    const pointCount = 120 // Increased for denser network

    for (let i = 0; i < pointCount; i++) {
      const x = (Math.random() - 0.5) * 25
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 12
      
      points.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        connections: [],
        phase: Math.random() * Math.PI * 2
      })
    }

    // Enhanced connection algorithm
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = points[i].position.distanceTo(points[j].position)
        if (distance < 4.5) {
          points[i].connections.push(j)
        }
      }
    }

    particleSystem.current.points = points

    // Enhanced mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      particleSystem.current.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
      particleSystem.current.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !glowPointsRef.current) return

    const positions: number[] = []
    const linePositions: number[] = []
    const glowPositions: number[] = []
    const colors: number[] = []
    const lineColors: number[] = []
    const glowColors: number[] = []
    
    particleSystem.current.time = state.clock.getElapsedTime()
    const time = particleSystem.current.time
    const mouse = particleSystem.current.mousePosition

    // Enhanced point animation
    particleSystem.current.points.forEach((point, index) => {
      // Organic floating motion
      const waveOffset = Math.sin(time * 0.5 + point.phase) * 0.5
      const waveOffset2 = Math.cos(time * 0.3 + point.phase * 1.5) * 0.3
      
      point.position.x = point.originalPosition.x + waveOffset + point.velocity.x * time
      point.position.y = point.originalPosition.y + waveOffset2 + point.velocity.y * time
      point.position.z = point.originalPosition.z + Math.sin(time * 0.4 + index * 0.1) * 0.8

      // Enhanced mouse interaction with ripple effect
      const mousePos3D = new THREE.Vector3(
        mouse.x * viewport.width / 2,
        mouse.y * viewport.height / 2,
        0
      )
      
      const distanceToMouse = point.position.distanceTo(mousePos3D)
      const maxInteractionDistance = 8
      
      if (distanceToMouse < maxInteractionDistance) {
        const influence = 1 - (distanceToMouse / maxInteractionDistance)
        const rippleEffect = Math.sin(time * 4 - distanceToMouse * 0.5) * influence * 0.5
        
        const direction = point.position.clone().sub(mousePos3D).normalize()
        point.position.add(direction.multiplyScalar(rippleEffect))
      }

      // Boundary wrapping for continuous motion
      if (Math.abs(point.position.x) > 15) {
        point.position.x = point.originalPosition.x
        point.velocity.x *= -1
      }
      if (Math.abs(point.position.y) > 15) {
        point.position.y = point.originalPosition.y
        point.velocity.y *= -1
      }

      // Color based on movement and interaction
      const speed = point.velocity.length()
      const interactionStrength = Math.max(0, 1 - distanceToMouse / maxInteractionDistance)
      
      const r = 0.2 + speed * 20 + interactionStrength * 0.5
      const g = 0.4 + Math.sin(time + index * 0.1) * 0.3 + interactionStrength * 0.3
      const b = 0.8 + Math.cos(time * 0.5 + index * 0.2) * 0.2

      positions.push(point.position.x, point.position.y, point.position.z)
      colors.push(r, g, b)
      
      // Glow effect for active points
      if (interactionStrength > 0.3 || speed > 0.01) {
        glowPositions.push(point.position.x, point.position.y, point.position.z)
        glowColors.push(r * 1.5, g * 1.5, b * 1.5)
      }
    })

    // Enhanced connections with dynamic opacity and color
    particleSystem.current.points.forEach((point, index) => {
      point.connections.forEach((connectionIndex) => {
        const connectedPoint = particleSystem.current.points[connectionIndex]
        const distance = point.position.distanceTo(connectedPoint.position)
        
        if (distance < 5.5) {
          const opacity = Math.max(0, 1 - distance / 5.5)
          const pulseEffect = Math.sin(time * 2 + index * 0.3) * 0.3 + 0.7
          
          linePositions.push(
            point.position.x, point.position.y, point.position.z,
            connectedPoint.position.x, connectedPoint.position.y, connectedPoint.position.z
          )
          
          // Dynamic line colors
          const lineR = 0.1 + opacity * 0.4 + pulseEffect * 0.2
          const lineG = 0.3 + opacity * 0.5 + pulseEffect * 0.3
          const lineB = 0.8 + opacity * 0.2
          
          lineColors.push(lineR, lineG, lineB, lineR, lineG, lineB)
        }
      })
    })

    // Update geometries with enhanced attributes
    pointsRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )
    pointsRef.current.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    )
    
    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    )
    linesRef.current.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineColors, 3)
    )
    
    if (glowPositions.length > 0) {
      glowPointsRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(glowPositions, 3)
      )
      glowPointsRef.current.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(glowColors, 3)
      )
    }
  })

  return (
    <>
      {/* Main points */}
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.08}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Glow points */}
      <points ref={glowPointsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.15}
          transparent
          opacity={0.4}
          sizeAttenuation={false}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Enhanced lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          transparent
          opacity={0.3}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

export default function NetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <EnhancedNetworkPoints />
      </Canvas>
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/40 pointer-events-none" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
    </div>
  )
}
