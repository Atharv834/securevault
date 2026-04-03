import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, Lock, ShieldCheck } from 'lucide-react';

const DownloadSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const coverRotateY = useSpring(useTransform(scrollYProgress, [0.08, 0.3], [0, -162]), {
        stiffness: 110,
        damping: 24,
        mass: 0.9
    });
    const shellScale = useSpring(useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0.88, 1, 1, 0.92]), {
        stiffness: 130,
        damping: 26
    });
    const sectionOpacity = useSpring(useTransform(scrollYProgress, [0, 0.04, 0.94, 1], [0, 1, 1, 0]), {
        stiffness: 120,
        damping: 24
    });
    const spreadOpacity = useSpring(useTransform(scrollYProgress, [0.16, 0.34], [0.2, 1]), {
        stiffness: 130,
        damping: 24
    });
    const spreadY = useSpring(useTransform(scrollYProgress, [0.16, 0.34], [24, 0]), {
        stiffness: 140,
        damping: 24
    });
    const frontGlow = useSpring(useTransform(scrollYProgress, [0.02, 0.18], [0.65, 1]), {
        stiffness: 120,
        damping: 22
    });

    const handleDownload = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const centerX = e.clientX - rect.left;
        const centerY = e.clientY - rect.top;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            alpha: number;
        }> = [];

        for (let i = 0; i < 28; i++) {
            particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 1) * 8,
                size: Math.random() * 4 + 2,
                color: Math.random() > 0.5 ? '#00E5FF' : '#7B5CFA',
                alpha: 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.24;
                particle.alpha -= 0.022;

                if (particle.alpha > 0) {
                    active = true;
                    ctx.globalAlpha = particle.alpha;
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
                }
            });

            ctx.globalAlpha = 1;
            if (active) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const width = canvas.clientWidth || 420;
            const height = canvas.clientHeight || 220;
            canvas.width = Math.floor(width * ratio);
            canvas.height = Math.floor(height * ratio);

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex h-[200vh] flex-col items-center justify-start overflow-hidden bg-obsidian-950"
            id="download"
        >
            <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 py-10">
                <motion.div
                    style={{ scale: shellScale, opacity: sectionOpacity }}
                    className="relative flex aspect-[16/10] w-full max-w-5xl items-center justify-center"
                >
                    <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_55%)] blur-3xl" />

                    <motion.div
                        style={{ opacity: spreadOpacity, y: spreadY }}
                        className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,#0f0a1f_0%,#171032_45%,#0d0918_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,92,250,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,229,255,0.08),transparent_30%)]" />
                        <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-white/8" />
                        <div className="absolute left-[calc(50%-10px)] top-0 h-full w-5 bg-gradient-to-r from-black/35 via-white/6 to-black/25 blur-[1px]" />

                        <div className="relative z-10 grid h-full gap-0 md:grid-cols-[1.08fr_0.92fr]">
                            <div className="flex h-full flex-col justify-between border-b border-white/6 p-8 md:border-b-0 md:border-r md:border-white/6 md:p-12">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-accent-primary/8 px-4 py-2">
                                        <Lock className="h-4 w-4 text-accent-primary" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-accent-primary">Inner Spread</span>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm uppercase tracking-[0.45em] text-zinc-500">Decrypt The Cover</p>
                                        <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white lg:text-6xl">
                                            Open the secret.
                                            <br />
                                            <span className="text-accent-primary">Download the vault.</span>
                                        </h2>
                                        <p className="max-w-xl text-base leading-7 text-zinc-400 lg:text-lg">
                                            A local-first installer wrapped like a classified manual. Crack open the cover and take the offline build with you.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 text-left sm:grid-cols-3">
                                    {[
                                        { label: 'Offline only', value: 'Zero cloud' },
                                        { label: 'AES-256', value: 'Desktop sealed' },
                                        { label: 'Release', value: 'v2.0.4' }
                                    ].map((item) => (
                                        <div key={item.label} className="rounded-2xl border border-white/8 bg-black/18 p-4 backdrop-blur-sm">
                                            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">{item.label}</p>
                                            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                                <canvas
                                    ref={canvasRef}
                                    className="pointer-events-none absolute inset-x-0 top-[28%] mx-auto h-[220px] w-[420px] max-w-full"
                                />

                                <div className="space-y-5">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                        <ShieldCheck className="h-4 w-4 text-accent-primary" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300">Verified package</span>
                                    </div>

                                    <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                                        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Installer</p>
                                        <p className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-white">SecureVault.exe</p>
                                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                                            Built for guarded files, portable archives, and people who do not want their secrets touching a server.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="./SecureVault.exe"
                                        download
                                        onClick={handleDownload}
                                        className="group relative flex items-center justify-between rounded-[1.35rem] border border-accent-primary/25 bg-accent-primary px-7 py-5 text-lg font-black uppercase tracking-[0.08em] text-obsidian-950 shadow-[0_24px_45px_-18px_rgba(0,242,255,0.65)] transition-all hover:translate-y-[-2px]"
                                    >
                                        <span className="flex items-center gap-3">
                                            <Download className="h-5 w-5" />
                                            Download For Windows
                                        </span>
                                        <span className="text-sm opacity-70 transition-transform group-hover:translate-x-1">01</span>
                                    </a>

                                    <div className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-white/4 px-5 py-4 text-sm text-zinc-400">
                                        <span className="font-mono uppercase tracking-[0.28em]">SHA256</span>
                                        <span className="font-mono text-xs text-zinc-500">8f3c...b2a1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ rotateY: coverRotateY, transformOrigin: 'left center', opacity: frontGlow }}
                        className="pointer-events-none absolute inset-0 z-20 [transform-style:preserve-3d]"
                    >
                        <div className="absolute left-0 top-0 h-full w-[4.8%] rounded-l-[2rem] border border-accent-primary/20 bg-[linear-gradient(180deg,#090611_0%,#120a21_100%)] shadow-[inset_1px_0_0_rgba(255,255,255,0.08),inset_-10px_0_18px_rgba(0,0,0,0.45)]" />

                        <div className="absolute inset-y-0 left-[4.5%] right-0 overflow-hidden rounded-r-[2rem] border border-accent-primary/35 bg-[linear-gradient(145deg,#140d28_0%,#1c1235_38%,#0f0a1d_100%)] shadow-[0_35px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05),inset_-40px_0_80px_rgba(0,0,0,0.28)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_76%_66%,rgba(0,229,255,0.14),transparent_18%),linear-gradient(180deg,transparent,rgba(0,0,0,0.16))]" />
                            <div className="absolute inset-x-10 top-10 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
                            <div className="absolute inset-x-10 bottom-10 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />

                            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                                        <span className="h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_14px_rgba(0,242,255,0.9)]" />
                                        <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-zinc-300">Front Cover</span>
                                    </div>
                                    <p className="text-right text-[10px] font-mono uppercase tracking-[0.38em] text-zinc-500">
                                        Classified Installer<br />
                                        Local Access Only
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-xs uppercase tracking-[0.55em] text-accent-primary/85">SecureVault</p>
                                    <h3 className="max-w-2xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-7xl">
                                        Secret To
                                        <br />
                                        Download
                                    </h3>
                                    <p className="max-w-lg text-base leading-7 text-zinc-400 md:text-lg">
                                        Pull the cover open like a private dossier. Inside is the offline installer, sealed for your machine and yours alone.
                                    </p>
                                </div>

                                <div className="flex items-end justify-between gap-6">
                                    <div className="rounded-[1.5rem] border border-white/10 bg-black/18 px-5 py-4 backdrop-blur-sm">
                                        <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-500">Edition</p>
                                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white">Vault Release 2.0.4</p>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-primary/35 bg-accent-primary/12 shadow-[0_0_30px_rgba(0,242,255,0.16)]">
                                        <div className="h-8 w-8 rounded-full bg-accent-primary shadow-[0_0_28px_rgba(0,242,255,0.8)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-16 flex flex-col items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-accent-primary shadow-[0_0_20px_rgba(0,242,255,1)]" />
                    <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500">Open The Cover</p>
                </motion.div>
            </div>
        </section>
    );
};

export default DownloadSection;
