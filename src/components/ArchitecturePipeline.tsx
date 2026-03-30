import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const pipelineSteps = [
  { id: "01", title: "Select Any File", text: "Documents, photos, archives, or source code all enter through the same local-only path." },
  { id: "02", title: "Derive Key", text: "Argon2id transforms your password into a costly key schedule to slow brute-force attacks." },
  { id: "03", title: "Encrypt Twice", text: "AES-256-GCM protects the payload first, then ChaCha20-Poly1305 wraps the result again." },
  { id: "04", title: "Seal Metadata", text: "Filename and internal structure are hidden inside the vault instead of exposing easy clues." },
  { id: "05", title: "Export .vault", text: "The final package stays local, portable, and useless to anyone without the exact password." },
];

const ArchitecturePipeline = () => {
    return (
        <section className="py-24 px-6 bg-obsidian-900/50 backdrop-blur-3xl relative z-10" id="architecture">
            <div className="container max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    <div className="lg:w-1/3 sticky top-32">
                        <p className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4">Encryption Pipeline</p>
                        <h2 className="text-4xl font-bold text-white mb-6">Zero-Knowledge. <br /> Zero-Network.</h2>
                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            Every byte is processed locally. SecureVault is designed for <span className="text-white font-semibold">100% offline usage</span>. Your data never touches a network interface, ensuring zero risk of cloud breaches or unauthorized sync.
                        </p>
                        
                        <div className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-obsidian-950 bg-accent-primary/20 flex items-center justify-center text-[10px] text-accent-primary font-bold">
                                        Layer {i}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-zinc-400">Total isolation architecture</div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {pipelineSteps.map((step, i) => (
                            <motion.div 
                                key={step.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative glass p-6 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary/0 group-hover:bg-accent-primary/40 transition-colors" />
                                
                                <div className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-center text-accent-primary font-mono font-bold group-hover:border-accent-primary/30 group-hover:scale-105 transition-all">
                                        {step.id}
                                    </div>
                                    <div className="grow">
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{step.text}</p>
                                    </div>
                                    <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-zinc-600 group-hover:text-accent-primary transition-colors">
                                        <ArrowDown className="w-4 h-4" />
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
