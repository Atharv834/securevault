import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const pipelineSteps = [
  { id: '01', title: 'Select Any File', text: 'Documents, photos, archives, or source code all enter through the same local-only path.', pos: [-4, 0, 0], short: 'INGEST' },
  { id: '02', title: 'Derive Key', text: 'Argon2id transforms your password into a costly key schedule to slow brute-force attacks.', pos: [-2, 1, -1], short: 'KDF' },
  { id: '03', title: 'Encrypt Twice', text: 'AES-256-GCM protects the payload first, then ChaCha20-Poly1305 wraps the result again.', pos: [0, 0, 1], short: 'SEAL' },
  { id: '04', title: 'Seal Metadata', text: 'Filename and internal structure are hidden inside the vault instead of exposing easy clues.', pos: [2, -1, -1], short: 'MASK' },
  { id: '05', title: 'Export .vault', text: 'The final package stays local, portable, and useless to anyone without the exact password.', pos: [4, 0, 0], short: 'EXPORT' },
];

const overlayPositions = [
    { left: '16%', top: '38%' },
    { left: '31%', top: '71%' },
    { left: '50%', top: '38%' },
    { left: '66%', top: '71%' },
    { left: '82%', top: '38%' },
];

const Connection = ({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            start,
            new THREE.Vector3((start.x + end.x) / 2, (start.y + end.y) / 2 + 0.5, (start.z + end.z) / 2),
            end
        ]);
    }, [start, end]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 20, 0.02, 8, false]} />
            <meshStandardMaterial color="#7B5CFA" transparent opacity={0.2} />
        </mesh>
    );
};

const DataPacket = ({ path }: { path: THREE.CatmullRomCurve3[] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const progressRef = useRef(0);
    const pathIdxRef = useRef(0);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        progressRef.current += delta * 0.4;
        if (progressRef.current >= 1) {
            progressRef.current = 0;
            pathIdxRef.current = (pathIdxRef.current + 1) % path.length;
        }

        const currentCurve = path[pathIdxRef.current];
        const point = currentCurve.getPoint(progressRef.current);
        meshRef.current.position.copy(point);
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            <pointLight color="#00E5FF" intensity={1} distance={2} />
        </mesh>
    );
};

const PipelineScene = () => {
    const curves = useMemo(() => {
        return pipelineSteps.slice(0, -1).map((step, i) => {
            const start = new THREE.Vector3(...step.pos);
            const end = new THREE.Vector3(...pipelineSteps[i + 1].pos);
            return new THREE.CatmullRomCurve3([
                start,
                new THREE.Vector3((start.x + end.x) / 2, (start.y + end.y) / 2 + 0.5, (start.z + end.z) / 2),
                end
            ]);
        });
    }, []);

    return (
        <group>
            {pipelineSteps.map((step) => (
                <group key={step.id} position={new THREE.Vector3(...step.pos)}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh>
                            <sphereGeometry args={[0.3, 32, 32]} />
                            <meshStandardMaterial color="#1a1030" metalness={0.8} roughness={0.2} emissive="#7B5CFA" emissiveIntensity={0.2} />
                        </mesh>
                    </Float>
                    <mesh scale={1.2}>
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshBasicMaterial color="#7B5CFA" transparent opacity={0.05} />
                    </mesh>
                </group>
            ))}

            {pipelineSteps.slice(0, -1).map((step, i) => (
                <Connection
                    key={`conn-${step.id}`}
                    start={new THREE.Vector3(...step.pos)}
                    end={new THREE.Vector3(...pipelineSteps[i + 1].pos)}
                />
            ))}

            <DataPacket path={curves} />
        </group>
    );
};

const ArchitecturePipeline = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="relative z-10 bg-obsidian-900/50 px-6 py-24 backdrop-blur-3xl" id="architecture">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent-primary">Encryption Pipeline</p>
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Zero-Knowledge Architecture</h2>
                </div>

                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="relative h-[500px] overflow-hidden rounded-3xl border border-white/5 bg-[#0f1017] shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,92,250,0.08),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
                        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                            <ambientLight intensity={0.2} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#7B5CFA" />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />
                            <PipelineScene />
                            <Environment preset="night" />
                        </Canvas>

                        <div className="pointer-events-none absolute inset-0">
                            {pipelineSteps.map((step, i) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={overlayPositions[i]}
                                >
                                    <div className="relative min-w-[110px] rounded-2xl border border-accent-primary/20 bg-[#08131b]/90 px-4 py-3 shadow-[0_12px_25px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                                        <div className="absolute left-1/2 top-full h-6 w-px -translate-x-1/2 bg-gradient-to-b from-accent-primary/50 to-transparent" />
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-primary/35 bg-accent-primary/10 font-mono text-sm font-bold text-accent-primary shadow-[0_0_20px_rgba(0,242,255,0.12)]">
                                                {step.id}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">{step.short}</p>
                                                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-white">{step.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {pipelineSteps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onMouseEnter={() => setActiveStep(i)}
                                className={cn(
                                    'group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-500',
                                    activeStep === i
                                        ? 'border-accent-primary/40 bg-accent-primary/10 shadow-[0_0_30px_rgba(0,242,255,0.1)]'
                                        : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                                )}
                            >
                                <div className="relative z-10 flex items-start gap-6">
                                    <div className="flex min-h-14 min-w-14 flex-col items-center justify-center rounded-2xl border border-accent-primary/20 bg-[#07131b] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">step</span>
                                        <span className={cn('font-mono text-lg font-bold', activeStep === i ? 'text-accent-primary' : 'text-white')}>
                                            {step.id}
                                        </span>
                                    </div>
                                    <div className="grow">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                                                {step.short}
                                            </span>
                                            <div className={cn('h-px flex-1', activeStep === i ? 'bg-accent-primary/30' : 'bg-white/8')} />
                                        </div>
                                        <h3 className={cn('mb-2 text-xl font-bold transition-colors', activeStep === i ? 'text-white' : 'text-zinc-400')}>
                                            {step.title}
                                        </h3>
                                        <p className={cn('leading-relaxed transition-colors', activeStep === i ? 'text-zinc-300' : 'text-zinc-500')}>
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArchitecturePipeline;
