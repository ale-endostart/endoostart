import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';

const PREMIUM_EASING = [0.34, 1.56, 0.64, 1] as const;
const SMOOTH_EASING = [0.25, 0.46, 0.45, 0.94] as const;

export const variants = {
  fadeSlideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: SMOOTH_EASING },
    },
  } as Variants,

  fadeSlideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: SMOOTH_EASING },
    },
  } as Variants,

  fadeSlideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: SMOOTH_EASING },
    },
  } as Variants,

  scaleReveal: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: PREMIUM_EASING },
    },
  } as Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: SMOOTH_EASING },
    },
  } as Variants,
};

interface UseScrollRevealOptions {
  once?: boolean;
  margin?: any;
  amount?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { once = true, margin = '-80px', amount = 0.2 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin, amount });

  return { ref, isInView };
}

export default useScrollReveal;
