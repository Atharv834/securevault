import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ExternalLink, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const heroWords = ['End-to-end', 'AES-256', 'encryption', 'delivered', 'to', 'your', 'desktop.', 'No', 'cloud,', 'no', 'compromise.'];

const UnderlinedLine = ({ text, extend = 0 }: { text: string; extend?: number }) => (
    <span className="inline-flex flex-col items-start">
        <span>{text}</span>
        <span
            aria-hidden="true"
            className="mt-2 h-[6px] bg-[#9feff4] sm:mt-3 sm:h-[8px]"
            style={{ width: `calc(100% + ${extend}px)` }}
        />
    </span>
);

const Hero = () => {
    return (
        <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
            <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="flex flex-col gap-6 sm:gap-8"
                >
                    <div className="inline-flex self-start rounded-full border border-accent-primary/20 bg-accent-primary/10 px-3 py-1 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,242,255,0.55)]" />
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-accent-primary sm:text-xs">v2.0.4 - Secure Release</span>
                        </div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
                        className="max-w-4xl text-[2.1rem] font-bold leading-[1.03] tracking-[-0.04em] text-white sm:text-[2.9rem] lg:text-[4rem]"
                    >
                        <span className="block">Your data stays</span>
                        <span className="block">
                            <UnderlinedLine text="completely" extend={14} />
                            <span className="ml-1 inline-block">.</span>
                        </span>
                        <span className="block">
                            <UnderlinedLine text="offline" extend={24} />
                            <span className="ml-1 inline-block">.</span>
                        </span>
                    </motion.h1>

                    <p className="max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:text-2xl">
                        SecureVault is a high-performance offline encryption suite. No cloud, no internet, no compromise.
                    </p>

                    <p className="max-w-2xl text-xl font-semibold italic leading-relaxed text-white sm:text-2xl lg:text-[2rem]">
                        Built for cautious users, but shaped like a modern desktop product.
                    </p>

                    <div className="flex max-w-xl flex-wrap gap-x-2 gap-y-2 text-base leading-relaxed text-zinc-400 sm:text-xl">
                        {heroWords.map((word, i) => (
                            <motion.span
                                key={`${word}-${i}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.04, duration: 0.35 }}
                                className={cn(
                                    (word === 'AES-256' || word === 'No' || word === 'cloud,' || word === 'compromise.') &&
                                        'font-bold text-accent-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]'
                                )}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:flex-wrap sm:gap-4">
                        <a
                            href="./SecureVault-Setup-1.0.0.exe"
                            download
                            className="group relative flex items-center justify-center rounded-xl bg-accent-primary px-6 py-4 text-center font-bold text-obsidian-950 shadow-[0_0_20px_-5px_rgba(0,242,255,0.5)] transition-all hover:scale-105 active:scale-95 sm:px-8"
                        >
                            <span className="flex items-center gap-2">
                                <Download className="h-5 w-5" />
                                Get SecureVault
                            </span>
                        </a>
                        <button className="glass rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition-all hover:bg-white/10 sm:px-8">
                            <span className="flex items-center justify-center gap-2">
                                <ExternalLink className="h-4 w-4 text-zinc-400" />
                                Architecture
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 sm:pt-8">
                        {[
                            { label: '100% Offline', icon: Shield },
                            { label: 'No Cloud Required', icon: Lock },
                            { label: 'Zero Connectivity', icon: ExternalLink }
                        ].map((stat, i) => (
                            <div key={i} className="cursor-default flex items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-300">
                                <stat.icon className="h-4 w-4" />
                                <span className="text-sm font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.18 }}
                    className="relative hidden lg:block"
                >
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-20 blur-2xl transition-opacity duration-1000" />
                    <div className="glass relative flex flex-col gap-6 rounded-2xl border border-white/10 p-8">
                        <div className="flex items-start justify-between">
                            <div className="rounded-lg border border-accent-primary/20 bg-accent-primary/10 p-3">
                                <Shield className="h-8 w-8 text-accent-primary" />
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Integrity Tag</span>
                                <div className="text-2xl font-mono text-white">Verified</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-500">Encryption Load</span>
                                <span className="font-mono lowercase text-accent-primary">dual-pass</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                                <motion.div
                                    initial={{ scaleX: 0.3 }}
                                    animate={{ scaleX: [0.35, 0.82, 0.55] }}
                                    transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                                    className="h-full origin-left bg-gradient-to-r from-accent-primary via-cyan-300 to-accent-secondary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-white/5 bg-obsidian-900 p-4">
                                <div className="mb-1 text-xs text-zinc-500">AES-GCM</div>
                                <div className="font-mono text-white">256-bit</div>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-obsidian-900 p-4">
                                <div className="mb-1 text-xs text-zinc-500">Argon2id</div>
                                <div className="font-mono text-white">Costly</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;



