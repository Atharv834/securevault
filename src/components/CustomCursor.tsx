import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isThreeCanvas, setIsThreeCanvas] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            
            // Dot: Snaps instantly
            if (dotRef.current) {
                gsap.set(dotRef.current, { x, y });
            }
            
            // Ring: Follows with lerp (handled by gsap.to with short duration)
            if (ringRef.current) {
                gsap.to(ringRef.current, { 
                    x, y, 
                    duration: 0.15,
                    ease: "power2.out"
                });
            }
        };

        const handleMouseDown = () => {
            gsap.to([dotRef.current, ringRef.current], { 
                scale: 0.6, 
                duration: 0.1, 
                ease: "power2.inOut" 
            });
        };

        const handleMouseUp = () => {
            gsap.to([dotRef.current, ringRef.current], { 
                scale: isHovering ? 2.5 : 1, 
                duration: 0.4, 
                ease: "elastic.out(1, 0.5)" 
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], .feature-card');
            const isCanvas = target.closest('canvas');

            setIsHovering(!!isClickable);
            setIsThreeCanvas(!!isCanvas);

            if (isClickable) {
                gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.2 });
                gsap.to(ringRef.current, { 
                    scale: 2.5, 
                    backgroundColor: 'rgba(123, 92, 250, 0.15)',
                    borderColor: 'rgba(0, 229, 255, 0.4)',
                    duration: 0.3 
                });
            } else {
                gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.2 });
                gsap.to(ringRef.current, { 
                    scale: 1, 
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(123, 92, 250, 0.6)',
                    duration: 0.3 
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isHovering]);

    return (
        <>
            <style>{`
                * { cursor: none !important; }
                @media (max-width: 768px) {
                    * { cursor: auto !important; }
                    #cursor-dot, #cursor-ring { display: none; }
                }
            `}</style>
            <div 
                ref={dotRef}
                id="cursor-dot"
                className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    isThreeCanvas ? 'bg-accent-primary' : 'bg-cyan-400'
                }`}
            />
            <div 
                ref={ringRef}
                id="cursor-ring"
                className={`fixed top-0 left-0 w-9 h-9 border-[1.5px] rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-exclusion transition-colors duration-200 ${
                    isThreeCanvas ? 'border-accent-primary' : 'border-purple-500/60'
                }`}
            >
                {isThreeCanvas && (
                    <div className="relative w-full h-full">
                        <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-accent-primary/40 -translate-y-1/2" />
                        <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-accent-primary/40 -translate-x-1/2" />
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomCursor;
