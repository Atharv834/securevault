import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import EncryptionChamber from './components/EncryptionChamber';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import ArchitecturePipeline from './components/ArchitecturePipeline';
import VaultStructure from './components/VaultStructure';
import FAQ from './components/FAQ';
import { Shield, Download, FileText, ChevronRight, Monitor, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4 px-6",
            isScrolled ? "bg-obsidian-950/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
        )}>
            <div className="container max-w-7xl mx-auto flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 group">
                    <img 
                        src="./logo.png" 
                        alt="SecureVault Logo" 
                        className="w-10 h-10 rounded-xl shadow-[0_0_20px_-5px_#00f2ff] group-hover:scale-105 transition-transform" 
                    />
                    <span className="text-xl font-bold text-white tracking-tight">SecureVault</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {['Architecture', 'Format', 'FAQ', 'Download'].map(item => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <a href="#" className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                        <Shield className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="py-20 px-6 border-t border-white/5 relative z-10 bg-obsidian-950">
            <div className="container max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <img 
                                src="./logo.png" 
                                alt="SecureVault Logo" 
                                className="w-8 h-8 rounded-lg" 
                            />
                            <span className="text-xl font-bold text-white tracking-tight">SecureVault</span>
                        </div>
                        <p className="text-zinc-500 max-w-sm leading-relaxed text-lg">
                            The next generation of desktop encryption. Zero trust, zero cloud, zero compromise. Built for cautious users, but shaped like a modern desktop product.
                        </p>
                        <div className="flex gap-4">
                            {[Shield, Monitor, Cpu].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Resources</h4>
                        <ul className="space-y-4">
                            {['Documentation', 'Security Whitepaper', 'API Reference', 'Open Audit'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-zinc-500 hover:text-accent-primary transition-colors text-sm">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Download</h4>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <span className="text-sm font-medium text-white">Windows .exe</span>
                                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 group cursor-not-allowed">
                                <div className="text-left">
                                    <span className="block text-sm font-medium text-sky-400">Linux .AppImage</span>
                                    <span className="text-[10px] uppercase font-bold text-sky-400/60 font-mono tracking-tighter">Coming Soon !!</span>
                                </div>
                                <Monitor className="w-4 h-4 text-sky-400/40" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:row items-center justify-between pt-12 border-t border-white/5 gap-8">
                    <p className="text-zinc-600 text-sm">© 2026 SecureVault Labs. Under MIT License.</p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <a key={item} href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SecurityBanner = () => {
    return (
        <section className="py-20 relative z-10 overflow-hidden border-y border-white/5 bg-obsidian-950/50 backdrop-blur-sm">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                            No Internet. <br />
                            <span className="text-accent-primary">No Cloud.</span>
                        </h2>
                        <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase italic">
                            Absolute network isolation by design.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-12">
                        {[
                            { label: "Fully Offline", sub: "Isolating network threats" },
                            { label: "Fully Secure", sub: "Local-only encryption" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="space-y-2 border-l-2 border-accent-primary/20 pl-6"
                            >
                                <div className="text-2xl font-bold text-white uppercase tracking-tight">{item.label}</div>
                                <div className="text-xs font-mono text-accent-primary/60 uppercase tracking-widest">{item.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Animated Background Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

const App = () => {
    const scrollResult = useScroll();
    const scrollYProgress = scrollResult.scrollYProgress;
    
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative min-h-screen bg-obsidian-950 font-sans selection:bg-accent-primary selection:text-obsidian-950 text-white overflow-x-hidden">
            {/* Cinematic Background Layer */}
            <EncryptionChamber />
            
            {/* Scroll Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-accent-primary z-[100] origin-left"
                style={{ scaleX }}
            />

            <Header />

            <main>
                <Hero />
                <SecurityBanner />
                <FeatureGrid />
                <ArchitecturePipeline />
                <VaultStructure />
                <FAQ />
                
                <section className="py-32 px-6 bg-accent-primary relative z-10" id="download">
                    <div className="container max-w-4xl mx-auto text-center space-y-12">
                        <div className="inline-flex p-4 rounded-full bg-obsidian-950 text-accent-primary shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                            <Download className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl lg:text-7xl font-black text-obsidian-950 tracking-tighter uppercase leading-[0.9]">
                                Take back <br /> data sovereignty.
                            </h2>
                            <p className="text-obsidian-950/70 text-xl font-medium max-w-2xl mx-auto italic">
                                "The only truly secure data is data that never leaves your machine. No cloud, no internet, no compromise."
                            </p>
                        </div>
                        <div className="flex flex-col md:row items-center justify-center gap-8">
                            <button className="px-12 py-6 rounded-2xl bg-obsidian-950 text-accent-primary font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
                                Download for Windows
                            </button>
                            <div className="relative">
                                <button className="px-12 py-6 rounded-2xl bg-black/5 text-obsidian-950/50 font-black text-xl cursor-not-allowed border-2 border-dashed border-obsidian-950/20" disabled>
                                    Linux .AppImage
                                </button>
                                <motion.div 
                                    className="absolute -top-3 -right-3 px-4 py-1.5 bg-obsidian-950 text-accent-primary font-black text-[10px] uppercase rounded-full shadow-2xl border border-white/10"
                                    animate={{ 
                                        y: [0, -4, 0],
                                        boxShadow: ["0 0 0px 0px rgba(0,0,0,0)", "0 0 20px 5px rgba(0,0,0,0.2)", "0 0 0px 0px rgba(0,0,0,0)"]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    COMING SOON !!
                                </motion.div>
                            </div>
                        </div>
                        <p className="text-obsidian-950 font-bold font-mono text-sm uppercase tracking-widest bg-obsidian-950/5 py-3 px-8 rounded-full border border-obsidian-950/10 inline-block">
                            Built for cautious users, but shaped like a modern desktop product.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default App;

