import { useRef, useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(300);
  const x = useMotionValue(0);

  // Measure container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const totalSlides = TIMELINE_NODES.length;
  const maxDrag = -(slideWidth * (totalSlides - 1));

  const handleDragEnd = (event, info) => {
    const currentX = x.get();
    const velocity = info.velocity.x;

    // Factor in velocity for more natural feel
    let targetIndex = Math.round(-currentX / slideWidth);

    // If swiping fast, go to next/prev regardless of position
    if (Math.abs(velocity) > 500) {
      targetIndex = velocity > 0 ? activeIndex - 1 : activeIndex + 1;
    }

    // Clamp to valid range
    targetIndex = Math.max(0, Math.min(targetIndex, totalSlides - 1));

    goToSlide(targetIndex);
  };

  const goToSlide = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    animate(x, -clampedIndex * slideWidth, {
      type: "spring",
      stiffness: 300,
      damping: 30
    });
    setActiveIndex(clampedIndex);
  };

  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
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

        {/* Timeline draggable carousel */}
        <div
          ref={containerRef}
          className="relative flex-1 flex flex-col justify-center overflow-hidden"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ x }}
          >
            {TIMELINE_NODES.map((node, index) => (
              <div
                key={index}
                className="flex-shrink-0 pr-8"
                style={{ width: slideWidth }}
              >
                {/* Timeline segment */}
                <div className="relative flex items-center mb-6">
                  {/* Year label */}
                  <span className="text-[#f6f8ed]/50 text-sm font-mono mr-4 w-12">
                    {node.year}
                  </span>

                  {/* Dot */}
                  <div className="relative z-10">
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index <= activeIndex ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
                      }`}
                      style={{ backgroundColor: '#e07b5d' }}
                    >
                      {index === activeIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#e07b5d]"
                          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Line segment after dot */}
                  <div
                    className={`flex-1 h-[2px] ml-2 transition-colors duration-300 ${
                      index < activeIndex ? 'bg-[#e07b5d]' : 'bg-[#f6f8ed]/10'
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`transition-opacity duration-300 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-40'
                  }`}
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
                  <p className="text-[#f6f8ed]/40 text-sm md:text-base leading-relaxed">
                    {node.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-6">
            {TIMELINE_NODES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#e07b5d] w-6'
                    : 'bg-[#f6f8ed]/20 hover:bg-[#f6f8ed]/40 w-2'
                }`}
                aria-label={`Go to ${TIMELINE_NODES[index].company}`}
              />
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-auto pt-6">
          <p className="text-[#f6f8ed]/50 text-base md:text-lg">
            $600M+ companies. Regulated industries. Systems that can't fail.
          </p>
        </div>
      </div>
    </div>
  );
}
