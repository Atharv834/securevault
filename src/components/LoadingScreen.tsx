import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TextScrambleLoader = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '!<>-_\\/[]{}—=+*^?#░▒▓01';

    useEffect(() => {
        let frame = 0;
        const length = text.length;
        const queue: { from: string; to: string; start: number; end: number }[] = [];

        for (let i = 0; i < length; i++) {
            const from = '';
            const to = text[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            queue.push({ from, to, start, end });
        }

        let animationFrame = 0;
        const update = () => {
            let output = '';
            let complete = 0;

            for (let i = 0; i < queue.length; i++) {
                const { to, start, end } = queue[i];
                if (frame >= end) {
                    complete++;
                    output += to;
                } else if (frame >= start) {
                    output += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    output += ' ';
                }
            }

            setDisplayText(output);
            if (complete < queue.length) {
                frame++;
                animationFrame = requestAnimationFrame(update);
            }
        };

        update();
        return () => cancelAnimationFrame(animationFrame);
    }, [text]);

    return <span className="font-mono text-xl tracking-[0.2em] text-white/80">{displayText}</span>;
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const hasCompletedRef = useRef(false);

    useEffect(() => {
        let completionTimeout: number | undefined;

        const timer = window.setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    window.clearInterval(timer);

                    if (!hasCompletedRef.current) {
                        hasCompletedRef.current = true;
                        completionTimeout = window.setTimeout(onComplete, 500);
                    }

                    return 100;
                }

                return prev + 1;
            });
        }, 20);

        return () => {
            window.clearInterval(timer);
            if (completionTimeout !== undefined) {
                window.clearTimeout(completionTimeout);
            }
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian-950 overflow-hidden"
        >
            <motion.div
                className="absolute top-0 left-0 h-1/2 w-full border-b border-white/5 bg-obsidian-950 loader-top"
                initial={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
                className="absolute bottom-0 left-0 h-1/2 w-full border-t border-white/5 bg-obsidian-950 loader-bottom"
                initial={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />

            <div className="relative z-10 flex flex-col items-center gap-8">
                <motion.svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent-primary"
                >
                    <motion.rect
                        x="5"
                        y="11"
                        width="14"
                        height="10"
                        rx="2"
                        ry="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                    <motion.path
                        d="M7 11V7a5 5 0 0 1 10 0v4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                    />
                </motion.svg>

                <div className="flex flex-col items-center gap-4">
                    <TextScrambleLoader text="SECUREVAULT" />
                    <div className="relative h-1 w-[300px] overflow-hidden rounded-full bg-white/5">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-accent-primary shadow-[0_0_15px_rgba(0,242,255,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        System Initialization: {progress}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
