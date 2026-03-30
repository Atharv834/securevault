import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ExternalLink, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            <div className="container relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Hero Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-primary/20 bg-accent-primary/10 backdrop-blur-sm self-start">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                        </span>
                        <span className="text-xs font-mono text-accent-primary tracking-wider uppercase">v2.0.4 - Secure Release</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold font-sans tracking-tight leading-[1.1] text-gradient">
                        Your data stays <br />
                        <span className="text-accent-primary underline decoration-accent-primary/30 decoration-thickness-2 underline-offset-8">
                            completely offline.
                        </span>
                    </h1>

                    <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                        SecureVault is a high-performance offline encryption suite. No cloud, no internet, no compromise. <br />
                        <span className="text-white font-semibold mt-4 block italic">
                            Built for cautious users, but shaped like a modern desktop product.
                        </span>
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <button className="group relative px-8 py-4 rounded-xl bg-accent-primary text-obsidian-950 font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(0,242,255,0.5)]">
                            <span className="flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                Get SecureVault
                            </span>
                        </button>
                        <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all hover:bg-white/10 glass">
                            <span className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                                Architecture
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-8 pt-8">
                        {[
                            { label: "100% Offline", icon: Shield },
                            { label: "No Cloud Required", icon: Lock },
                            { label: "Zero Connectivity", icon: ExternalLink }
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
                                <stat.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Visual Card (Cinematic Info) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative group hidden lg:block"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                    <div className="relative glass border border-white/10 rounded-2xl p-8 flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
                                <Shield className="w-8 h-8 text-accent-primary" />
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-widest">Encryption Load</span>
                                <div className="text-2xl font-mono text-white">Dual-Pass</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500">Integrity Tag</span>
                                <span className="text-accent-primary font-mono lowercase">verified</span>
                            </div>
                            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-obsidian-900 border border-white/5">
                                <div className="text-zinc-500 text-xs mb-1">AES-GCM</div>
                                <div className="text-white font-mono">256-bit</div>
                            </div>
                            <div className="p-4 rounded-xl bg-obsidian-900 border border-white/5">
                                <div className="text-zinc-500 text-xs mb-1">Argon2id</div>
                                <div className="text-white font-mono">Costly</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
