import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import EncryptionChamber from './components/EncryptionChamber';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ArchitecturePipeline from './components/ArchitecturePipeline';
import VaultStructure from './components/VaultStructure';
import FAQ from './components/FAQ';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import EncryptionDemo from './components/EncryptionDemo';
import DownloadSection from './components/DownloadSection';
import { Shield, Monitor, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 inset-x-0 z-50 px-6 py-4 transition-all duration-500',
                isScrolled ? 'border-b border-white/5 bg-obsidian-950/80 py-3 backdrop-blur-xl' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex max-w-7xl items-center justify-between">
                <a href="#" className="group flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-primary shadow-[0_0_20px_-5px_#00f2ff] transition-transform group-hover:scale-105">
                        <Shield className="h-6 w-6 text-obsidian-950" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">SecureVault</span>
                </a>

                <nav className="hidden items-center gap-8 md:flex">
                    {['Architecture', 'Features', 'Anatomy', 'Download'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button className="rounded-lg border border-accent-primary/20 bg-accent-primary/10 px-5 py-2 text-xs font-bold text-accent-primary transition-all hover:bg-accent-primary/20">
                        OS DASHBOARD
                    </button>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-obsidian-950 px-6 py-20">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-16 grid gap-12 md:grid-cols-4">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold tracking-tighter text-white">SecureVault</span>
                        </div>
                        <p className="max-w-sm text-lg leading-relaxed text-zinc-500">
                            The next generation of desktop encryption. Zero trust, zero cloud, zero compromise. Built for cautious users, but shaped like a modern desktop product.
                        </p>
                        <div className="flex gap-4">
                            {[Shield, Monitor, Cpu].map((Icon, i) => (
                                <a key={i} href="#" className="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors hover:text-white">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h4>
                        <ul className="space-y-4">
                            {['Documentation', 'Security Whitepaper', 'API Reference', 'Open Audit'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-zinc-500 transition-colors hover:text-accent-primary">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white">Security</h4>
                        <ul className="space-y-4">
                            {['AES-256-GCM', 'ChaCha20-Poly1305', 'Argon2id', 'Local-Only'].map((item) => (
                                <li key={item} className="font-mono text-xs text-zinc-600">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
                    <p className="text-sm text-zinc-600">© 2026 SecureVault Labs. Under MIT License.</p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a key={item} href="#" className="text-xs text-zinc-600 transition-colors hover:text-zinc-400">{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SecurityBanner = () => {
    return (
        <section className="relative z-10 overflow-hidden border-y border-white/5 bg-obsidian-950/50 py-20 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-center justify-between gap-12 text-center md:flex-row md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-white lg:text-5xl">
                            No Internet. <br />
                            <span className="text-accent-primary">No Cloud.</span>
                        </h2>
                        <p className="font-mono text-sm uppercase tracking-widest text-zinc-500 italic">
                            Absolute network isolation by design.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6 md:justify-end md:gap-12">
                        {[
                            { label: 'Fully Offline', sub: 'Isolating network threats' },
                            { label: 'Fully Secure', sub: 'Local-only encryption' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="space-y-2 border-l-2 border-accent-primary/20 pl-6"
                            >
                                <div className="text-2xl font-bold uppercase tracking-tight text-white">{item.label}</div>
                                <div className="font-mono text-xs uppercase tracking-widest text-accent-primary/60">{item.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative min-h-screen overflow-x-hidden font-sans text-white selection:bg-accent-primary selection:text-obsidian-950">
            <AnimatePresence>
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {!isLoading && <CustomCursor />}

            <EncryptionChamber />

            <motion.div
                className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-accent-primary"
                style={{ scaleX }}
            />

            {!isLoading && (
                <>
                    <Header />
                    <main>
                        <Hero />
                        <SecurityBanner />
                        <ArchitecturePipeline />
                        <FeatureGrid />
                        <EncryptionDemo />
                        <VaultStructure />
                        <DownloadSection />
                        <FAQ />
                    </main>
                    <Footer />
                </>
            )}
        </div>
    );
};

export default App;
