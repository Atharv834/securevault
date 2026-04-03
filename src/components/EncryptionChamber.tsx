import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, PerformanceMonitor, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// --- Procedural Vault Component ---
const ProceduralVault = () => {
  const groupRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const rotationSpeed = useRef(0.008);

  // Materials
  const materials = {
    body: (
      <meshPhysicalMaterial 
        color="#1a1030" metalness={0.95} roughness={0.15} 
        reflectivity={1} clearcoat={0.8} clearcoatRoughness={0.1} 
      />
    ),
    accent: (
      <meshStandardMaterial 
        color="#7B5CFA" metalness={0.7} roughness={0.3} 
        emissive="#4B2CB0" emissiveIntensity={0.4} 
      />
    ),
    bolts: (
      <meshStandardMaterial 
        color="#00E5FF" metalness={1} roughness={0.1} 
        emissive="#00A0CC" emissiveIntensity={0.6} 
      />
    )
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Continuous rotation of the handle wheel
    if (handleRef.current) {
        handleRef.current.rotation.z += rotationSpeed.current;
    }

    // Mouse parallax - multi-layer depth illusion
    const mouseX = (state.mouse.x * window.innerWidth) / 1000;
    const mouseY = (state.mouse.y * window.innerHeight) / 1000;

    if (outerRingRef.current) {
        outerRingRef.current.rotation.y = THREE.MathUtils.lerp(outerRingRef.current.rotation.y, mouseX * 0.1, 0.02);
        outerRingRef.current.rotation.x = THREE.MathUtils.lerp(outerRingRef.current.rotation.x, -mouseY * 0.1, 0.02);
    }
    if (mainRef.current) {
        mainRef.current.rotation.y = THREE.MathUtils.lerp(mainRef.current.rotation.y, mouseX * 0.2, 0.04);
        mainRef.current.rotation.x = THREE.MathUtils.lerp(mainRef.current.rotation.x, -mouseY * 0.2, 0.04);
    }
    if (handleRef.current) {
        handleRef.current.rotation.y = THREE.MathUtils.lerp(handleRef.current.rotation.y, mouseX * 0.4, 0.08);
        handleRef.current.rotation.x = THREE.MathUtils.lerp(handleRef.current.rotation.x, -mouseY * 0.4, 0.08);
    }
  });

  const onPointerOver = () => {
    setHovered(true);
    gsap.to(rotationSpeed, { current: 0.05, duration: 0.3, yoyo: true, repeat: 1 });
  };

  return (
    <group 
        ref={groupRef} 
        onPointerOver={onPointerOver} 
        onPointerOut={() => setHovered(false)}
    >
      {/* Main Body */}
      <group ref={mainRef}>
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.0, 2.6, 0.25]} />
            {materials.body}
        </mesh>
        
        {/* Hinge Components */}
        <mesh position={[-1.0, 0.8, 0.1]}>
            <boxGeometry args={[0.12, 0.4, 0.3]} />
            {materials.body}
        </mesh>
        <mesh position={[-1.0, -0.8, 0.1]}>
            <boxGeometry args={[0.12, 0.4, 0.3]} />
            {materials.body}
        </mesh>

        {/* Outer Ring */}
        <group ref={outerRingRef}>
            <mesh position={[0, 0, 0.15]}>
                <torusGeometry args={[1.4, 0.08, 16, 60]} />
                {materials.body}
            </mesh>
            {/* Bolts */}
            {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[
                    Math.cos(i * Math.PI * 0.25) * 1.4,
                    Math.sin(i * Math.PI * 0.25) * 1.4,
                    0.2
                ]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    {materials.bolts}
                </mesh>
            ))}
            {/* Inner Ring */}
            <mesh position={[0, 0, 0.15]}>
                <torusGeometry args={[0.9, 0.05, 16, 60]} />
                {materials.body}
            </mesh>
        </group>
      </group>

      {/* Handle Wheel Group */}
      <group ref={handleRef} position={[0, 0, 0.2]}>
        <mesh>
            <torusGeometry args={[0.5, 0.07, 16, 40]} />
            {materials.accent}
        </mesh>
        {/* Spokes */}
        {[0, 45, 90, 135].map((angle, i) => (
            <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
                <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
                {materials.accent}
            </mesh>
        ))}
      </group>
    </group>
  );
};

// --- Multi-Layer Particle System ---
const ParticleSystem = () => {
    const scroll = useScroll();
    
    // Layer A: Orbital Particles
    const orbitalPoints = useMemo(() => {
        const count = 100;
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                rx: 0.8 + Math.random() * 1.7,
                ry: 0.8 + Math.random() * 1.7,
                rz: Math.random() * 1,
                speed: 0.2 + Math.random() * 1.0,
                phase: Math.random() * Math.PI * 2,
                cx: (Math.random() - 0.5) * 0.5,
                cy: (Math.random() - 0.5) * 0.5,
            });
        }
        return data;
    }, []);

    const orbitalRef = useRef<THREE.Points>(null);

    // Layer B: Data Stream Particles
    const streamCount = 300;
    const streamPositions = useMemo(() => new Float32Array(streamCount * 3), []);
    const streamData = useMemo(() => {
        return Array.from({ length: streamCount }, () => ({
            radius: 6,
            velocity: 0.01 + Math.random() * 0.03,
            direction: new THREE.Vector3().randomDirection(),
            pos: new THREE.Vector3()
        })).map(d => {
            d.pos.copy(d.direction).multiplyScalar(d.radius);
            return d;
        });
    }, []);

    const streamRef = useRef<THREE.Points>(null);

    // Layer C: Ambient Field
    const ambientCount = 1500;
    const ambientPositions = useMemo(() => {
        const p = new Float32Array(ambientCount * 3);
        for (let i = 0; i < ambientCount; i++) {
            p[i * 3] = (Math.random() - 0.5) * 30;
            p[i * 3 + 1] = (Math.random() - 0.5) * 30;
            p[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return p;
    }, []);

    const ambientRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Update Orbital
        if (orbitalRef.current) {
            const positions = orbitalRef.current.geometry.attributes.position.array as Float32Array;
            orbitalPoints.forEach((p, i) => {
                positions[i * 3] = p.cx + Math.cos(time * p.speed + p.phase) * p.rx;
                positions[i * 3 + 1] = p.cy + Math.sin(time * p.speed + p.phase) * p.ry;
                positions[i * 3 + 2] = Math.sin(time * p.speed * 0.7 + p.phase) * p.rz;
            });
            orbitalRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Update Stream
        if (streamRef.current) {
            const positions = streamRef.current.geometry.attributes.position.array as Float32Array;
            streamData.forEach((d, i) => {
                d.pos.sub(d.direction.clone().multiplyScalar(d.velocity));
                if (d.pos.length() < 0.8) {
                    d.direction.randomDirection();
                    d.pos.copy(d.direction).multiplyScalar(d.radius);
                }
                positions[i * 3] = d.pos.x;
                positions[i * 3 + 1] = d.pos.y;
                positions[i * 3 + 2] = d.pos.z;
            });
            streamRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Update Ambient
        if (ambientRef.current) {
            ambientRef.current.rotation.y += 0.0005;
            ambientRef.current.rotation.x += 0.0002;
        }
    });

    return (
        <group>
            {/* Layer A */}
            <points ref={orbitalRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={orbitalPoints.length} array={new Float32Array(orbitalPoints.length * 3)} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.015} color="#7B5CFA" transparent opacity={0.8} sizeAttenuation />
            </points>

            {/* Layer B */}
            <points ref={streamRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={streamCount} array={streamPositions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.01} color="#00E5FF" transparent opacity={0.6} sizeAttenuation />
            </points>

            {/* Layer C */}
            <points ref={ambientRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={ambientCount} array={ambientPositions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.008} color="#3B2080" transparent opacity={0.3} sizeAttenuation />
            </points>
        </group>
    );
};

// --- Camera Management ---
const CinematicCamera = () => {
    const scroll = useScroll();
    const { camera } = useThree();
    
    const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 5),      // Hero
        new THREE.Vector3(2, 1, 6),      
        new THREE.Vector3(-1, 2, 9),     
        new THREE.Vector3(0, 0, 14),     // How It Works
        new THREE.Vector3(3, -1, 18),    // Features
        new THREE.Vector3(0, 0, 22),     // Download
    ]), []);

    useFrame((state) => {
        const offset = scroll.offset;
        const point = cameraPath.getPoint(offset * 0.8);
        camera.position.lerp(point, 0.05);
        camera.lookAt(0, 0, 0);
    });

    return null;
};

// --- Lighting Rig ---
const LightRig = () => {
    const keyLightRef = useRef<THREE.PointLight>(null);
    const rimLightRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (keyLightRef.current) {
            keyLightRef.current.position.x = Math.cos(time * 0.6) * 4;
            keyLightRef.current.position.y = Math.sin(time * 0.4) * 2;
            keyLightRef.current.position.z = Math.sin(time * 0.6) * 3 + 2;
        }
        if (rimLightRef.current) {
            rimLightRef.current.position.x = -Math.cos(time * 0.6) * 3;
            rimLightRef.current.position.z = -Math.sin(time * 0.6) * 2 + 2;
        }
    });

    return (
        <group>
            <pointLight ref={keyLightRef} color="#7B5CFA" intensity={6} distance={15} />
            <pointLight ref={rimLightRef} color="#00E5FF" intensity={3} distance={12} />
            <pointLight position={[0, -3, 2]} color="#3020A0" intensity={2} distance={8} />
            <ambientLight intensity={0.5} color="#0a0820" />
        </group>
    );
};

const EncryptionChamber = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-obsidian-950">
      <Canvas 
        shadows 
        dpr={[1, 1.5]} // Limit high-frequency resolution jumps
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
            antialias: true, 
            alpha: false, // Ensure solid background to prevent layer flickering
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        }}
        onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#0a0815'), 1);
        }}
      >
        <PerformanceMonitor 
            onIncline={() => {}} // Remove automatic resolution scaling
            onDecline={() => {}}
        />
        <CinematicCamera />
        <LightRig />
        
        <ProceduralVault />
        <ParticleSystem />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default EncryptionChamber;
