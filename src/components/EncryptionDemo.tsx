import React, { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Copy, CheckCircle } from 'lucide-react';
import TextScramble from './TextScramble';

const EncryptionDemo = () => {
    const [inputText, setInputText] = useState('My secret message');
    const [password, setPassword] = useState('p@ssw0rd123');
    const [isCopied, setIsCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [encryptedHex, setEncryptedHex] = useState('');

    // Simulated Encryption Logic
    useEffect(() => {
        let hex = '';
        const seed = inputText + password;
        for (let i = 0; i < inputText.length; i++) {
            const charCode = (inputText.charCodeAt(i) ^ password.charCodeAt(i % password.length)).toString(16);
            hex += charCode.padStart(2, '0').repeat(2);
        }
        setEncryptedHex(hex.toUpperCase().slice(0, 48) + (hex.length > 48 ? '...' : ''));
    }, [inputText, password]);

    // Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        const particles: any[] = [];
        const chars = inputText.split('');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background glow
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, 200
            );
            gradient.addColorStop(0, 'rgba(123, 92, 250, 0.05)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Animate particles (simulating text to block flow)
            if (Math.random() > 0.8) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: 50,
                    char: chars[Math.floor(Math.random() * chars.length)] || '*',
                    speed: 2 + Math.random() * 3,
                    opacity: 1
                });
            }

            particles.forEach((p, i) => {
                p.y += p.speed;
                p.opacity -= 0.01;
                
                ctx.font = '12px monospace';
                ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
                ctx.fillText(p.opacity < 0.5 ? (Math.random() > 0.5 ? '0' : '1') : p.char, p.x, p.y);

                if (p.opacity <= 0) particles.splice(i, 1);
            });

            // Central Vault Block
            const pulse = 0.5 + Math.sin(Date.now() / 200) * 0.1;
            ctx.shadowBlur = 20 * pulse;
            ctx.shadowColor = '#7B5CFA';
            ctx.strokeStyle = '#7B5CFA';
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 40, canvas.height / 2 - 30, 80, 60);
            
            ctx.fillStyle = 'rgba(123, 92, 250, 0.1)';
            ctx.fillRect(canvas.width / 2 - 40, canvas.height / 2 - 30, 80, 60);
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00E5FF';
            ctx.fillStyle = '#00E5FF';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('ENCRYPTING', canvas.width / 2, canvas.height / 2 + 5);

            animationFrame = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationFrame);
    }, [inputText]);

    const handleCopy = () => {
        navigator.clipboard.writeText(encryptedHex);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <section className="py-32 px-6 relative overflow-hidden bg-obsidian-950">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                        Watch it encrypt. <span className="text-accent-primary">Right now.</span>
                    </h2>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        Real-time visualization of local cryptographic workflows
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {/* Column 1: Input */}
                    <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
                        <div className="space-y-4">
                            <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> INPUT DATA
                            </label>
                            <textarea 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="w-full h-32 bg-obsidian-900/50 border border-white/5 rounded-xl p-4 text-white font-mono text-sm focus:border-accent-primary/50 outline-none transition-colors"
                                placeholder="Type something to encrypt..."
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-mono text-zinc-400 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> PASSPHRASE
                            </label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-obsidian-900/50 border border-white/5 rounded-xl p-4 text-white font-mono text-sm focus:border-accent-primary/50 outline-none transition-colors"
                            />
                            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className={`h-full transition-all duration-500 ${password.length > 8 ? 'w-full bg-accent-primary' : 'w-1/2 bg-yellow-500'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Visualization */}
                    <div className="relative flex flex-col items-center justify-center bg-obsidian-900/30 rounded-2xl border border-white/5 overflow-hidden min-h-[400px]">
                        <canvas 
                            ref={canvasRef} 
                            width={400} 
                            height={300} 
                            className="w-full h-full"
                        />
                        <div className="absolute bottom-6 w-full px-8 text-center">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                                </span>
                                <span className="text-[10px] font-mono text-accent-primary uppercase tracking-widest">
                                    AES-256-GCM ACTIVE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Output */}
                    <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-mono text-zinc-400">CIPHERTEXT OUTPUT</label>
                                <span className="text-[10px] font-mono text-accent-primary">HEX_STREAM</span>
                            </div>
                            <div className="p-6 bg-obsidian-900/80 border border-white/5 rounded-xl font-mono text-accent-primary text-sm break-all min-h-[120px] leading-relaxed">
                                {encryptedHex}
                            </div>
                            <button 
                                onClick={handleCopy}
                                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                            >
                                {isCopied ? <CheckCircle className="w-4 h-4 text-accent-primary" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'COPIED' : 'COPY HEX OUTPUT'}
                            </button>
                        </div>
                        
                        <div className="pt-8 border-t border-white/10">
                            <div className="p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/20">
                                <p className="text-[10px] text-zinc-400 uppercase leading-relaxed tracking-wider">
                                    <span className="text-accent-primary font-bold">INFO:</span> THIS IS A VISUAL DEMO. REAL ENCRYPTION HAPPENS COMPLETELY LOCALLY IN THE SECUREVAULT DESKTOP APPLICATION. NO DATA LEAVES YOUR SESSION.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FileText = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
);

export default EncryptionDemo;
