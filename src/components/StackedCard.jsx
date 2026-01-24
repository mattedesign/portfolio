import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PeekTab from './PeekTab';

export default function StackedCard({
  children,
  index,
  totalCards,
  showPeekTab = false,
  peekTabVariant = 'dark',
  onPeekTabClick
}) {
  const cardRef = useRef(null);
  const isLastCard = index === totalCards - 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    // Start tracking earlier - when card is 20% into viewport from bottom
    offset: ["start end", "end start"]
  });

  // Scale down slightly as the next card covers this one
  // Start scaling sooner (at 0.3 instead of 0.5)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [1, 1, isLastCard ? 1 : 0.95, isLastCard ? 1 : 0.92]
  );

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        // Each card needs scroll height - use minHeight so taller cards can expand
        // Reduced height creates overlap, making next card appear sooner
        minHeight: isLastCard ? undefined : '85vh',
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
          className="shadow-2xl flex flex-col relative"
          style={{
            borderRadius: '32px',
            minHeight: isLastCard ? undefined : 'calc(100vh - 40px)',
            marginTop: '20px',
            marginBottom: isLastCard ? '20px' : undefined,
          }}
        >
          {children}

          {/* Peek Tab - integrated with card bottom edge */}
          {showPeekTab && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] z-10">
              <PeekTab onClick={onPeekTabClick} variant={peekTabVariant} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
