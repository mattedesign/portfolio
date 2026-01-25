import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TIMELINE_NODES = [
  {
    year: "2020",
    company: "First American",
    role: "Lead UX Designer",
    theme: "Scale",
    detail: "Document workflows processing billions in transactions"
  },
  {
    year: "2022",
    company: "Epicor",
    role: "Sr. Principal, UX Designer",
    theme: "Unify",
    detail: "Design system architecture across 50+ enterprise products"
  },
  {
    year: "2024",
    company: "TriumphPay",
    role: "User Experience Design Lead",
    theme: "Intelligence",
    detail: "Compound AI systems processing 100k+ documents daily"
  }
];

export default function EnterpriseCard() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when card is 70% into viewport, end when it exits
    offset: ["start 0.7", "end start"]
  });

  // Horizontal scroll: 0% = first item, 100% = last item centered
  // Delayed start so timeline only scrolls when card is fully visible
  const horizontalScroll = useTransform(scrollYProgress, [0.2, 0.8], [0, -200]);

  // Active index based on scroll (0, 1, or 2)
  const activeIndex = useTransform(scrollYProgress, [0.2, 0.45, 0.65, 0.8], [0, 0.5, 1.5, 2]);

  return (
    <div
      ref={containerRef}
      className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          Track Record
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          06/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(40px,9vw,110px)] text-[#f6f8ed] leading-[1] tracking-[-0.03em] mb-10 md:mb-16">
          Shipped at scale.
        </h2>

        {/* Timeline horizontal scroll container */}
        <div className="relative flex-1 flex flex-col justify-center overflow-hidden">
          <motion.div
            className="flex"
            style={{ x: useTransform(horizontalScroll, v => `${v}%`) }}
          >
            {TIMELINE_NODES.map((node, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[50%] pr-8 md:pr-16"
              >
                {/* Timeline segment */}
                <div className="relative flex items-center mb-8">
                  {/* Year label */}
                  <span className="text-[#f6f8ed]/50 text-sm font-mono mr-4 w-12">
                    {node.year}
                  </span>

                  {/* Dot - centered on line */}
                  <motion.div
                    className="relative z-10"
                    style={{
                      scale: useTransform(activeIndex, v => v >= index ? 1 : 0.5),
                      opacity: useTransform(activeIndex, v => v >= index ? 1 : 0.3)
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: '#e07b5d'
                      }}
                    >
                      {/* Pulse ring for active */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#e07b5d]"
                        animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>
                  </motion.div>

                  {/* Line segment after dot */}
                  <motion.div
                    className="flex-1 h-[2px] ml-2"
                    style={{
                      backgroundColor: useTransform(activeIndex, v =>
                        v > index ? '#e07b5d' : '#f6f8ed1a'
                      )
                    }}
                  />
                </div>

                {/* Content */}
                <motion.div
                  style={{
                    opacity: useTransform(activeIndex, v => {
                      const diff = Math.abs(v - index);
                      return diff < 0.5 ? 1 : diff < 1 ? 0.6 : 0.3;
                    })
                  }}
                >
                  <h3 className="text-[#f6f8ed] text-2xl md:text-3xl font-bold mb-1">
                    {node.company}
                  </h3>
                  <p className="text-[#e07b5d] text-base md:text-lg font-medium mb-3">
                    {node.role}
                  </p>
                  <p className="text-[#f6f8ed]/90 text-xl md:text-2xl font-bold mb-2">
                    {node.theme}
                  </p>
                  <p className="text-[#f6f8ed]/40 text-sm md:text-base leading-relaxed max-w-[300px]">
                    {node.detail}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Closing */}
        <div className="mt-auto pt-8">
          <p className="text-[#f6f8ed]/50 text-base md:text-lg">
            $600M+ companies. Regulated industries. Systems that can't fail.
          </p>
        </div>
      </div>
    </div>
  );
}
