import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: [string, string];
}

export function useParallax(options: UseParallaxOptions = {}): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const { speed = 0.2, direction = 'up', offset } = options;
  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (offset as any) || ['start end', 'end start'],
  });

  const range = direction === 'up' ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return { ref, y };
}

export default useParallax;
