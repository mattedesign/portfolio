import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function StackedCard({ children, index, totalCards }) {
  const cardRef = useRef(null);
  const isLastCard = index === totalCards - 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Scale effect - cards scale down as they get scrolled past
  const scale = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [1, 1, isLastCard ? 1 : 0.95]
  );

  // Opacity - fade slightly when stacked behind
  const opacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6],
    [1, 1, isLastCard ? 1 : 0.7]
  );

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        // Height includes space for the card plus peek area
        height: isLastCard ? 'auto' : 'calc(100vh - 100px)',
        marginBottom: isLastCard ? 0 : '20px',
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: "top center",
        }}
        className="sticky top-[20px] will-change-transform"
      >
        <div
          className="shadow-2xl overflow-hidden"
          style={{
            borderRadius: '32px',
            minHeight: isLastCard ? 'calc(100vh - 80px)' : 'calc(100vh - 120px)',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
