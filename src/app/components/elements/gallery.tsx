"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture, Html } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'

// Types
type PictureData = {
  url: string
  title: string
  description: string
  position: [number, number, number]
  rotation?: [number, number, number]
}

// Gallery Wall Component
function Walls() {
  const wallTexture = useTexture('https://res.cloudinary.com/dnyrrcacd/image/upload/v1746268026/porto%20commerce%20web-v1/Porto%20web/bg-texture_kyjvun.jpg')
  const floorTexture = useTexture('https://res.cloudinary.com/dnyrrcacd/image/upload/v1746268165/porto%20commerce%20web-v1/Porto%20web/black-stones-tiled-floor_uja5kw.jpg')
  const ceilingTexture = useTexture('https://res.cloudinary.com/dnyrrcacd/image/upload/v1745681711/porto%20commerce%20web-v1/Porto%20web/bg_i7aidp.jpg')
  
  // Ukuran yang konsisten
  const wallWidth = 20
  const wallHeight = 8
  const wallDepth = 0.2 // Ketebalan dinding
  const roomDepth = 10

  return (
    <>
      {/* Lantai */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.5, 0]}
      >
        <planeGeometry args={[wallWidth * 1, wallWidth * 1]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* Dinding Belakang */}
      <mesh 
        position={[0, wallHeight/2 - 1.5, -wallWidth/2 - wallDepth/2]}
      >
        <boxGeometry args={[wallWidth, wallHeight, wallDepth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Dinding Depan */}
      <mesh 
        position={[0, wallHeight/2 - 1.5, roomDepth]}
        rotation={[0, Math.PI, 0]} // Berputar 180 derajat
      >
        <boxGeometry args={[wallWidth, wallHeight, wallDepth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Dinding Samping Kiri */}
      <mesh 
        position={[-wallWidth/2 - wallDepth/2, wallHeight/2 - 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[wallWidth, wallHeight, wallDepth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Dinding Samping Kanan */}
      <mesh 
        position={[wallWidth/2 + wallDepth/2, wallHeight/2 - 1.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <boxGeometry args={[wallWidth, wallHeight, wallDepth]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Langit-langit (Atap) */}
      <mesh 
        position={[0, wallHeight - 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[wallWidth, roomDepth]} />
        <meshStandardMaterial map={ceilingTexture} />
      </mesh>
    </>
  )
}

// Picture Frame Component with Interaction
function PictureFrame({ data, onClick }: { data: PictureData, onClick: () => void }) {
  const frameRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(data.url)
  
  useFrame(() => {
    if (frameRef.current) {
      // Small hover animation
      frameRef.current.rotation.y = THREE.MathUtils.lerp(
        frameRef.current.rotation.y,
        0,
        0.1
      )
    }
  })

  return (
    <group position={data.position} rotation={data.rotation || [0, 0, 0]}>
      {/* Frame */}
      <mesh 
        ref={frameRef}
        onClick={onClick}
        onPointerOver={() => {
          if (frameRef.current) {
            frameRef.current.rotation.y = 0.1
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerOut={() => {
          if (frameRef.current) {
            frameRef.current.rotation.y = 0
            document.body.style.cursor = 'auto'
          }
        }}
      >
        <boxGeometry args={[1.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#c9b8a7" />
      </mesh>
      
      {/* Canvas */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.7, 1.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  )
}

// Popup Component
function PicturePopup({ data, onClose }: { data: PictureData | null, onClose: () => void }) {
  if (!data) return null

  return (
    <Html center>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '80vw',
          maxHeight: '80vh',
          overflow: 'auto',
          textAlign: 'center'
        }}>
          <h2>{data.title}</h2>
          <img 
            src={data.url} 
            alt={data.title}
            style={{ maxWidth: '100%', maxHeight: '60vh', margin: '10px 0' }}
          />
          <p>{data.description}</p>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Html>
  )
}

// Main Gallery Scene
function GalleryScene() {
  const [selectedPicture, setSelectedPicture] = useState<PictureData | null>(null)

  // Gallery data - 3x4 grid (3 columns, 4 rows)
  const pictures: PictureData[] = [
    // Back Wall (3 pictures)
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Mountain Sunrise',
      description: 'Beautiful sunrise captured in the Alps during summer 2022',
      position: [-3, 2, -10],
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Ocean Waves',
      description: 'Powerful ocean waves crashing against the cliffs in Portugal',
      position: [0, 2, -10],
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Autumn Forest',
      description: 'Colorful autumn foliage in a Japanese forest',
      position: [3, 2, -10],
    },

    // Left Wall (4 pictures)
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Urban Architecture',
      description: 'Modern architecture in downtown Singapore',
      position: [-10, 2, -3],
      rotation: [0, Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Street Photography',
      description: 'Candid moment in a busy Tokyo street',
      position: [-10, 2, 0],
      rotation: [0, Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Portrait Series',
      description: 'Portrait of an elder craftsman in Vietnam',
      position: [-10, 2, 3],
      rotation: [0, Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Abstract Art',
      description: 'Experimental light painting photography',
      position: [-10, 2, 6],
      rotation: [0, Math.PI/2, 0]
    },

    // Right Wall (4 pictures)
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Wildlife',
      description: 'Rare shot of a snow leopard in the Himalayas',
      position: [10, 2, -3],
      rotation: [0, -Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Macro Photography',
      description: 'Extreme close-up of a dewdrop on a leaf',
      position: [10, 2, 0],
      rotation: [0, -Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Night Sky',
      description: 'Milky Way captured with long exposure',
      position: [10, 2, 3],
      rotation: [0, -Math.PI/2, 0]
    },
    {
      url: 'https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg',
      title: 'Underwater',
      description: 'Coral reef ecosystem in the Great Barrier Reef',
      position: [10, 2, 6],
      rotation: [0, -Math.PI/2, 0]
    }
  ]

  return (
    <>
      <Walls />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[0, 5, 0]} 
        angle={0.5} 
        intensity={1} 
        penumbra={1} 
        castShadow
      />
      <pointLight position={[-10, 3, -5]} intensity={0.5} />
      <pointLight position={[10, 3, -5]} intensity={0.5} />

      {/* Pictures */}
      {pictures.map((pic, index) => (
        <PictureFrame 
          key={index}
          data={pic}
          onClick={() => setSelectedPicture(pic)}
        />
      ))}

      {/* Popup */}
      <PicturePopup 
        data={selectedPicture} 
        onClose={() => setSelectedPicture(null)} 
      />

      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
    </>
  )
}

export default function Gallery() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas shadows camera={{ position: [0, 1, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <GalleryScene />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  )
}