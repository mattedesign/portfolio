import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';
import ShinyButton from './ui/ShinyButton';

export default function CTAFooter({ onAnalyzeClick }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Button scales up and fades in as you approach
  const buttonScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-[60vh] flex flex-col items-center justify-center px-8 py-20"
    >
      <motion.div
        style={{ scale: buttonScale, opacity: buttonOpacity }}
        className="flex flex-col items-center gap-8"
      >
        <p className="text-[#f6f8ed]/50 text-lg md:text-xl text-center max-w-md">
          See how your role aligns with what I build.
        </p>

        <ShinyButton onClick={onAnalyzeClick}>
          <Zap size={18} />
          Analyze My Fit
        </ShinyButton>

        <p className="text-[#f6f8ed]/30 text-sm">
          Takes 30 seconds
        </p>
      </motion.div>
    </div>
  );
}
