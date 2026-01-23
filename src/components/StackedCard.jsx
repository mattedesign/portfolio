import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StackedCard({ children, index, totalCards }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate when this card should start stacking
  const stackProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [0, 0, 1, 1]
  );

  // Scale effect - cards scale down slightly as they stack
  const scale = useTransform(
    stackProgress,
    [0, 1],
    [1, 0.95 - (index * 0.02)]
  );

  // Y position - cards stack with slight offset
  const y = useTransform(
    stackProgress,
    [0, 1],
    [0, -index * 60]
  );

  // Opacity for cards behind
  const opacity = useTransform(
    stackProgress,
    [0, 0.8, 1],
    [1, 1, index === totalCards - 1 ? 1 : 0.6]
  );

  return (
    <div ref={cardRef} className="relative">
      <motion.div
        style={{
          scale,
          y,
          opacity,
          transformOrigin: "top center",
        }}
        className="sticky top-[40px] will-change-transform"
      >
        <div className="shadow-2xl rounded-[20px] overflow-hidden">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
