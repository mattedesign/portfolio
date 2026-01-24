import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function PeekInCTA({ onClick, totalCards = 10 }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Only show after 60% scroll, fully visible at 80%
  const isVisible = scrollProgress > 0.5;
  const isFullyRevealed = scrollProgress > 0.75;

  // Calculate which card we're on (approximate)
  const currentCard = Math.min(totalCards, Math.ceil(scrollProgress * totalCards * 1.2));

  return (
    <motion.button
      onClick={onClick}
      initial={{ x: 100, opacity: 0 }}
      animate={{
        x: isFullyRevealed ? 0 : isVisible ? 60 : 100,
        opacity: isVisible ? 1 : 0
      }}
      whileHover={{ x: 0, scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center gap-3 bg-[#1a1c1e] border border-[#e07b5d]/30 text-[#f6f8ed] pl-4 pr-6 py-4 rounded-l-2xl shadow-2xl hover:border-[#e07b5d]/60 transition-colors group"
      style={{
        boxShadow: '0 0 40px rgba(224, 123, 93, 0.15), 0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at right, rgba(224, 123, 93, 0.1) 0%, transparent 70%)'
        }}
      />

      {/* Icon with pulse */}
      <motion.div
        animate={{
          scale: isFullyRevealed ? [1, 1.2, 1] : 1
        }}
        transition={{
          duration: 0.6,
          repeat: isFullyRevealed ? 2 : 0,
          repeatDelay: 1
        }}
        className="relative z-10"
      >
        <Zap size={18} className="text-[#e07b5d]" />
      </motion.div>

      {/* Text - vertical when peeking, horizontal when revealed */}
      <span
        className="relative z-10 font-medium text-sm whitespace-nowrap transition-all duration-300"
        style={{
          writingMode: isFullyRevealed ? 'horizontal-tb' : 'vertical-rl',
          textOrientation: 'mixed',
          transform: isFullyRevealed ? 'none' : 'rotate(180deg)'
        }}
      >
        Analyze Fit
      </span>

      {/* Progress indicator */}
      {!isFullyRevealed && isVisible && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#f6f8ed]/10 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-[#e07b5d]"
            style={{
              height: `${((scrollProgress - 0.5) / 0.25) * 100}%`
            }}
          />
        </div>
      )}
    </motion.button>
  );
}
