import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Floating3DScene() {
  return (
    <div className="h-screen w-full fixed top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8F45FF" />
        </mesh>
      </Canvas>
    </div>
  )
} 