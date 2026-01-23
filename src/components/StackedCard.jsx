import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StackedCard({ children, index, totalCards }) {
  const cardRef = useRef(null);
  const isLastCard = index === totalCards - 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Scale down slightly as the next card covers this one
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, isLastCard ? 1 : 0.92]
  );

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        // Each card needs scroll height except the last
        height: isLastCard ? 'auto' : '100vh',
        // z-index ensures cards stack properly - higher index = on top
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className={isLastCard ? "" : "sticky top-0 will-change-transform"}
      >
        <div
          className="shadow-2xl"
          style={{
            borderRadius: '32px',
            minHeight: isLastCard ? undefined : 'calc(100vh - 40px)',
            marginTop: '20px',
            marginBottom: isLastCard ? '20px' : undefined,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
