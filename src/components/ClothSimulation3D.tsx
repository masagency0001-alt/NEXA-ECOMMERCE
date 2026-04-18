import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function WavingFabric() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
      meshRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 5, 64, 64]} />
      <MeshDistortMaterial
        color="#ffffff"
        speed={1.5}
        distort={0.4}
        radius={1}
        metalness={0.2}
        roughness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        transmission={0.5}
      />
    </mesh>
  );
}

export default function ClothSimulation3D() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <WavingFabric />
          </Float>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="w-full h-full bg-gradient-to-b from-dark via-transparent to-dark opacity-30" />
      </div>
    </div>
  );
}
