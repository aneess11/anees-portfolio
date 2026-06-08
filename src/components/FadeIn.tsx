import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

/**
 * FadeIn — Scroll-triggered fade + translate animation wrapper.
 *
 * PERFORMANCE v2:
 *  1. Memoised with React.memo to prevent unnecessary re-renders.
 *  2. motion.create() result is cached via useMemo (was called every render).
 *  3. viewport.once: true ensures the animation only fires once, then detaches
 *     the IntersectionObserver — no lingering scroll listeners.
 */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

const FadeIn = memo(({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) => {
  // Cache the motion component — motion.create() is expensive to call per render
  const MotionComponent = useMemo(() => motion.create(as), [as]);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
});

FadeIn.displayName = 'FadeIn';

export default FadeIn;
