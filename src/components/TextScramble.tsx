import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TextScrambleProps {
    text: string;
    autostart?: boolean;
    onComplete?: () => void;
    className?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({ text, autostart = true, onComplete, className }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = '!<>-_\\/[]{}—=+*^?#░▒▓01';
    const frameRef = useRef(0);
    const queueRef = useRef<{ from: string; to: string; start: number; end: number }[]>([]);
    const reqRef = useRef<number>();

    const update = useCallback(() => {
        let output = '';
        let complete = 0;
        for (let i = 0; i < queueRef.current.length; i++) {
            let { to, start, end } = queueRef.current[i];
            if (frameRef.current >= end) {
                complete++;
                output += to;
            } else if (frameRef.current >= start) {
                output += chars[Math.floor(Math.random() * chars.length)];
            } else {
                output += ' ';
            }
        }
        setDisplayText(output);
        if (complete < queueRef.current.length) {
            frameRef.current++;
            reqRef.current = requestAnimationFrame(update);
        } else if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    const startScramble = useCallback((newText: string) => {
        const length = Math.max(displayText.length, newText.length);
        queueRef.current = [];
        for (let i = 0; i < length; i++) {
            const from = displayText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 25);
            queueRef.current.push({ from, to, start, end });
        }
        cancelAnimationFrame(reqRef.current!);
        frameRef.current = 0;
        update();
    }, [displayText, update]);

    useEffect(() => {
        if (autostart) {
            startScramble(text);
        }
        return () => cancelAnimationFrame(reqRef.current!);
    }, [text, autostart, startScramble]);

    return (
        <span className={className}>
            {displayText.split('').map((char, i) => {
                const isFinal = queueRef.current[i] && frameRef.current >= queueRef.current[i].end;
                return (
                    <span 
                        key={i} 
                        style={{ 
                            color: isFinal ? 'inherit' : '#7B5CFA',
                            opacity: isFinal ? 1 : 0.8 
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
};

export default TextScramble;
