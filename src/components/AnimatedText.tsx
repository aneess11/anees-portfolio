import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/**
 * AnimatedText — Scroll-driven word-by-word opacity reveal.
 *
 * PERFORMANCE v2: Changed from per-CHARACTER (300+ motion.span elements)
 * to per-WORD approach (~55 elements). Each word is a single motion.span
 * with a scroll-linked opacity, dramatically reducing React reconciliation
 * and Framer Motion's internal observer/transform overhead.
 */

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Word = ({ word, index, total, progress }: WordProps) => {
  const start = index / total;
  const end = Math.min(start + 1.5 / total, 1); // slight overlap for smoother feel
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity, display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      {word}&nbsp;
    </motion.span>
  );
};

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};

export default AnimatedText;
