import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovered element is clickable (a, button, or has custom data attribute)
            const isClickable = target.closest('a') !== null || target.closest('button') !== null || target.closest('[data-clickable="true"]') !== null;

            if (isClickable) {
                setIsHovering(true);
                // Try to get specific text for the cursor, default to 'Clique'
                const specificText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
                setHoverText(specificText || 'Clique');
            } else {
                setIsHovering(false);
                setHoverText('');
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Only show on desktop (fine pointer)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-brand-gold mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center -ml-2 -mt-2"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: isHovering ? 0 : 1,
                    opacity: 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-16 h-16 rounded-full border border-brand-gold/50 pointer-events-none z-[9999] flex items-center justify-center -ml-8 -mt-8 backdrop-blur-sm bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest uppercase"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    scale: isHovering ? 1.2 : 0,
                    opacity: isHovering ? 1 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    mass: 0.5
                }}
            >
                <div className="absolute text-[9px] w-full text-center scale-90 opacity-90">{hoverText}</div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
