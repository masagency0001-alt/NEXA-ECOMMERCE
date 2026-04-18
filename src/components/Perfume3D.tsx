import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Bottle() {
  const meshRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      {/* The Glass Bottle Body */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 2.5, 32]} />
        <MeshDistortMaterial
          color="#c5a059"
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.6}
          transmission={0.9}
        />
      </mesh>

      {/* The Liquid Inside */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 1.8, 32]} />
        <MeshWobbleMaterial 
          color="#8b6c36" 
          factor={0.3} 
          speed={1.5} 
          roughness={0} 
          metalness={1}
        />
      </mesh>

      {/* The Cap */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 32]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={1} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = 50;
  const meshRef = useRef<THREE.Points>(null);

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#c5a059" transparent opacity={0.6} />
    </points>
  );
}

export default function Perfume3D() {
  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Bottle />
          </Float>
          <FloatingParticles />
          <Environment preset="night" />
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="w-full h-full bg-gradient-to-t from-dark via-transparent to-dark opacity-40" />
      </div>
    </div>
  );
}
