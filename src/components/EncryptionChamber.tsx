import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Backdrop, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 200 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y += 0.001;
        ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f2ff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const EncryptionChamberModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.sin(time / 2);
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 100]} scale={1.5}>
          <MeshDistortMaterial
            color="#121216"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#7000ff"
            emissiveIntensity={0.2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>
      
      {/* Outer Cage */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2.5, 0]} />
        <meshStandardMaterial 
          color="#00f2ff" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>
    </group>
  );
};

const EncryptionChamber = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7000ff" />
        
        <EncryptionChamberModel />
        <ParticleField />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default EncryptionChamber;
