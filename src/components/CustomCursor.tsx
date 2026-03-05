import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a');

      setIsHovering(!!interactiveEl);

      if (interactiveEl) {
        const customLabel = (interactiveEl as HTMLElement).dataset.cursorLabel;
        if (customLabel) {
          setCursorLabel(customLabel);
        } else if (!target.closest('header')) {
          setCursorLabel('Clique');
        } else {
          setCursorLabel('');
        }
      } else {
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, prefersReduced]);

  if (prefersReduced) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-gold/60 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 150,
          damping: 15,
        }}
      >
        {/* Label inside cursor */}
        <motion.span
          className="text-[7px] font-sans font-bold uppercase tracking-wider text-brand-gold"
          animate={{ opacity: cursorLabel ? 1 : 0, scale: cursorLabel ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
        transition={{
          type: 'tween',
          ease: 'linear',
          duration: 0,
        }}
      />

      {/* Trailing ring (third circle) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-brand-gold/20 pointer-events-none z-[99] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.3,
          stiffness: 80,
          damping: 20,
        }}
      />
    </>
  );
};

export default CustomCursor;
