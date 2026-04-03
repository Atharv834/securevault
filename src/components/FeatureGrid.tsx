import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, LayoutGrid, Terminal, SignalHigh, Fingerprint } from 'lucide-react';

const features = [
  { 
    title: "100% Fully Offline", 
    text: "No internet connection needed. Ever. SecureVault operates entirely on your physical machine, isolated from network threats.",
    icon: Zap,
    color: "#00f2ff"
  },
  { 
    title: "Zero Cloud Exposure", 
    text: "No cloud, no sync, no remote servers. Your private keys and vaulted data never leave your local storage, ensuring absolute security.",
    icon: Shield,
    color: "#7000ff"
  },
  { 
    title: "Double Encryption", 
    text: "Two modern ciphers protect the same payload so a single failure mode never exposes the original file.",
    icon: Fingerprint,
    color: "#00f2ff"
  },
  { 
    title: "Metadata Concealment", 
    text: "Sensitive filename data is hidden inside the encrypted envelope instead of leaking through the file system.",
    icon: SignalHigh,
    color: "#7000ff"
  },
  { 
    title: "Windows-Friendly Flow", 
    text: "The experience is tuned for desktop users who want secure storage without learning a terminal-first workflow.",
    icon: LayoutGrid,
    color: "#00f2ff"
  },
  { 
    title: "Zero Telemetry", 
    text: "The product pitch is simple: the app makes cryptographic guarantees, not analytics dashboards.",
    icon: Terminal,
    color: "#7000ff"
  },
];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            '--shimmer-x': `${(x / rect.width) * 100}%`,
            '--shimmer-y': `${(y / rect.height) * 100}%`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: 'all 0.5s ease'
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style as any}
            className="group relative glass p-8 rounded-2xl border border-white/10 hover:border-transparent transition-all duration-300 overflow-hidden"
        >
            {/* Holographic Shimmer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--shimmer-x,50%)_var(--shimmer-y,50%),rgba(123,92,250,0.15)_0%,rgba(0,229,255,0.08)_30%,transparent_70%)]" />
            
            {/* Spinning Border */}
            <div className="absolute -inset-[1px] rounded-2xl z-[-1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_var(--border-angle,0deg),transparent_20%,#7B5CFA_40%,#00E5FF_50%,transparent_70%)] animate-[spin-border_3s_linear_infinite]" />

            <div className="relative z-10 pointer-events-none">
                <div className="p-3 rounded-xl bg-obsidian-900 border border-white/10 w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-primary/10 group-hover:border-accent-primary/20">
                    <feature.icon className="w-6 h-6 text-accent-primary" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                    {feature.text}
                </p>
            </div>
            
            {/* Index indicator */}
            <div className="absolute bottom-4 right-6 text-[4rem] font-black text-white/5 group-hover:text-accent-primary/5 select-none transition-colors pointer-events-none">
                {(index + 1).toString().padStart(2, '0')}
            </div>
        </motion.div>
    );
};

const FeatureGrid = () => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-accent-primary font-mono text-sm tracking-widest uppercase"
                    >
                        Why it feels credible
                    </motion.p>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                    >
                        Built for cautious users, but shaped like a modern desktop product.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={feature.title} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
