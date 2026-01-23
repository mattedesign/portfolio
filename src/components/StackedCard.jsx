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

  // Not the last card - show peek of next card
  const isLastCard = index === totalCards - 1;

  return (
    <div ref={cardRef} className="relative" style={{ marginBottom: isLastCard ? 0 : '-120px' }}>
      <motion.div
        style={{
          scale,
          y,
          opacity,
          transformOrigin: "top center",
        }}
        className="sticky top-[40px] will-change-transform"
      >
        <div
          className="shadow-2xl overflow-hidden"
          style={{
            borderRadius: '32px',
            // Leave space at bottom for next card to peek
            minHeight: isLastCard ? 'calc(100vh - 80px)' : 'calc(100vh - 160px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
