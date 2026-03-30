import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const vaultSegments = [
  { name: "SVLT", size: "4 bytes", note: "Magic header for validation", tone: "accent-primary", width: 1 },
  { name: "Salt", size: "16 bytes", note: "Argon2id entropy seed", tone: "violet-500", width: 1.5 },
  { name: "Filename", size: "Variable", note: "Encrypted original name and extension", tone: "amber-400", width: 2 },
  { name: "Nonces", size: "24 bytes", note: "Unique values for both cipher layers", tone: "teal-400", width: 1.8 },
  { name: "Tags", size: "32 bytes", note: "Authentication proofs for tamper detection", tone: "rose-500", width: 1.5 },
  { name: "Payload", size: "Original size", note: "Encrypted data body disguised as random noise", tone: "accent-secondary", width: 5.5 },
];

const VaultStructure = () => {
    const [activeSegment, setActiveSegment] = useState(vaultSegments[0]);

    return (
        <section className="py-24 px-6 relative z-10" id="format">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <p className="text-accent-primary font-mono text-sm tracking-widest uppercase">Vault Anatomy</p>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Interactive Structure Analysis</h2>
                    <p className="text-zinc-500 leading-relaxed">
                        Hover or tap the segments below to see what a .vault file reveals, and what it refuses to. 
                        Every byte is hardened against forensic analysis.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Visual Byte Map */}
                    <div className="flex w-full h-16 rounded-2xl overflow-hidden glass border border-white/10 p-1">
                        {vaultSegments.map((segment) => (
                            <button
                                key={segment.name}
                                onMouseEnter={() => setActiveSegment(segment)}
                                className={cn(
                                    "relative h-full transition-all duration-300 group flex items-center justify-center overflow-hidden border-x border-obsidian-950/20",
                                    activeSegment.name === segment.name ? "opacity-100 scale-100" : "opacity-40 hover:opacity-70 scale-[0.98]"
                                )}
                                style={{ 
                                    flex: segment.width,
                                    backgroundColor: activeSegment.name === segment.name ? `var(--color-${segment.tone})` : `rgba(255,255,255,0.1)`
                                }}
                            >
                                <span className={cn(
                                    "text-[10px] font-bold uppercase transition-colors",
                                    activeSegment.name === segment.name ? "text-obsidian-950" : "text-white/40 group-hover:text-white"
                                )}>
                                    {segment.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Segment Detail Card */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center bg-obsidian-900/40 p-8 rounded-3xl glass border border-white/5">
                        <div className="relative aspect-video rounded-2xl bg-obsidian-950 border border-white/5 overflow-hidden group">
                           <div className="absolute inset-0 bg-accent-primary/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-obsidian-950 to-transparent" />
                           
                           <div className="absolute inset-0 flex items-center justify-center p-8">
                                <motion.div 
                                    key={activeSegment.name}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center"
                                >
                                    <div className="text-6xl font-black text-white/5 mb-2 select-none tracking-tighter">
                                        {activeSegment.size.toUpperCase()}
                                    </div>
                                    <h3 
                                        className="text-4xl font-bold transition-colors"
                                        style={{ color: `var(--color-${activeSegment.tone})` }}
                                    >
                                        {activeSegment.name}
                                    </h3>
                                </motion.div>
                           </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSegment.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <p className="text-accent-primary font-mono text-[10px] tracking-widest uppercase">Segment Identity</p>
                                    <h4 className="text-3xl font-bold text-white">{activeSegment.name}</h4>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-fit">
                                    <span className="text-zinc-500 text-sm mr-2">Allocated Size:</span>
                                    <span className="text-white font-mono">{activeSegment.size}</span>
                                </div>
                                <p className="text-xl text-zinc-400 font-light leading-relaxed">
                                    {activeSegment.note}. In SecureVault, even the metadata is considered part of the payload, ensuring no leakage during transit.
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VaultStructure;
