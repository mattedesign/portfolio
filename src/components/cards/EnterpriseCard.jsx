import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TIMELINE_NODES = [
  {
    year: "2016",
    company: "First American",
    role: "Senior UX Manager",
    theme: "Scale",
    detail: "Document workflows processing billions in transactions"
  },
  {
    year: "2019",
    company: "Epicor",
    role: "Director of UX",
    theme: "Unify",
    detail: "Design system architecture across 50+ enterprise products"
  },
  {
    year: "2022",
    company: "Triumph Financial",
    role: "Principal Product Architect",
    theme: "Intelligence",
    detail: "Compound AI systems processing 100k+ documents daily"
  }
];

export default function EnterpriseCard() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Timeline line progress (0 to 100%)
  const lineProgress = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  // Node reveal thresholds
  const node1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  const node1Scale = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const node2Scale = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const node3Scale = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  const nodeOpacities = [node1Opacity, node2Opacity, node3Opacity];
  const nodeScales = [node1Scale, node2Scale, node3Scale];

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

        {/* Timeline */}
        <div className="relative flex-1 flex flex-col justify-center">
          {/* Timeline line container */}
          <div className="relative h-[2px] bg-[#f6f8ed]/10 mb-8">
            {/* Animated fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#e07b5d]"
              style={{ width: useTransform(lineProgress, v => `${v}%`) }}
            />

            {/* Nodes */}
            {TIMELINE_NODES.map((node, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${index * 50}%`,
                  opacity: nodeOpacities[index],
                  scale: nodeScales[index]
                }}
              >
                {/* Node circle */}
                <div className="w-4 h-4 rounded-full bg-[#e07b5d] -ml-2 relative">
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#e07b5d]"
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>

                {/* Year label above */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#f6f8ed]/50 text-sm font-mono">
                  {node.year}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Content cards below timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {TIMELINE_NODES.map((node, index) => (
              <motion.div
                key={index}
                style={{ opacity: nodeOpacities[index] }}
                className="md:text-center"
              >
                <h3 className="text-[#f6f8ed] text-xl md:text-2xl font-bold mb-1">
                  {node.company}
                </h3>
                <p className="text-[#e07b5d] text-sm md:text-base font-medium mb-2">
                  {node.role}
                </p>
                <p className="text-[#f6f8ed]/90 text-base md:text-lg font-bold mb-1">
                  {node.theme}
                </p>
                <p className="text-[#f6f8ed]/40 text-sm leading-relaxed">
                  {node.detail}
                </p>
              </motion.div>
            ))}
          </div>
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
