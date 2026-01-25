import { useRef, useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

const TIMELINE_NODES = [
  {
    year: "2024–Present",
    company: "TriumphPay",
    theme: "Intelligence",
    detail: "Architected AI-driven financial systems that translate opaque decision logic into explainable, operational workflows—processing high-volume document and cash-flow signals at scale."
  },
  {
    year: "2022–2025",
    company: "Epicor",
    theme: "Architecture",
    detail: "Modernized legacy ERP platforms by designing scalable system and design architectures that preserved critical business logic while enabling enterprise-wide transformation."
  },
  {
    year: "2020–2022",
    company: "First American",
    theme: "Scale",
    detail: "Designed enterprise document and workflow systems operating inside heavily regulated environments and high-volume transaction pipelines."
  },
  {
    year: "2018–2020",
    company: "American First Finance",
    theme: "Acceleration",
    detail: "Re-architected product and delivery systems to reduce time-to-market, increase platform adoption, and modernize customer-facing financial experiences across multiple channels."
  },
  {
    year: "2014–2017",
    company: "Aloha Travel",
    companyNote: "acquired by FareHarbor",
    theme: "Growth",
    detail: "Built and scaled digital product ecosystems that drove exponential revenue growth, mobile adoption, and acquisition-ready platform maturity."
  },
  {
    year: "2012–2014",
    company: "WorldVentures",
    theme: "Expansion",
    detail: "Led the design and evolution of global digital platforms while scaling creative and UX systems across a rapidly growing enterprise organization."
  }
];

export default function EnterpriseCard() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(300);
  const x = useMotionValue(0);

  // Measure container width on mount and resize
  // Mobile: 90% width (small peek), Desktop: 70% width (more peek)
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const isMobile = window.innerWidth < 768;
        const peekRatio = isMobile ? 0.92 : 0.65;
        setSlideWidth(containerRef.current.offsetWidth * peekRatio);
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

    let targetIndex = Math.round(-currentX / slideWidth);

    // If swiping fast, go to next/prev regardless of position
    if (Math.abs(velocity) > 500) {
      targetIndex = velocity > 0 ? activeIndex - 1 : activeIndex + 1;
    }

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
    <div className="bg-[#4998AE] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-white/80 text-base md:text-lg font-normal">
          My Experience
        </p>
        <p className="text-white/60 text-base md:text-lg">
          06/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(32px,7vw,80px)] text-white leading-[1.05] tracking-[-0.03em] mb-8 md:mb-12">
          Where & What I've Learned.
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
                className="flex-shrink-0 pr-6 md:pr-8"
                style={{ width: slideWidth }}
              >
                {/* Timeline segment */}
                <div className="relative flex items-center mb-4">
                  {/* Year label */}
                  <span className="text-white/70 text-xs md:text-sm font-mono mr-3 whitespace-nowrap">
                    {node.year}
                  </span>

                  {/* Dot */}
                  <div className="relative z-10">
                    <div
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                        index <= activeIndex ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
                      }`}
                      style={{ backgroundColor: '#1a2e35' }}
                    >
                      {index === activeIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#1a2e35]"
                          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Line segment after dot */}
                  <div
                    className={`flex-1 h-[2px] ml-2 transition-colors duration-300 ${
                      index < activeIndex ? 'bg-[#1a2e35]' : 'bg-white/20'
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`transition-opacity duration-300 ${
                    index === activeIndex ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                    {node.company}
                  </h3>
                  {node.companyNote && (
                    <p className="text-white/50 text-xs md:text-sm mb-2">
                      ({node.companyNote})
                    </p>
                  )}
                  <p className="text-[#1a2e35] text-lg md:text-xl font-bold mb-2">
                    {node.theme}
                  </p>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {node.detail}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-6">
            {TIMELINE_NODES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#1a2e35] w-4'
                    : 'bg-white/30 hover:bg-white/50 w-1.5'
                }`}
                aria-label={`Go to ${TIMELINE_NODES[index].company}`}
              />
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="mt-auto pt-6">
          <p className="text-white text-xl md:text-2xl font-bold mb-6">
            Designed across regulated finance, enterprise platforms, and AI-driven infrastructure.
          </p>

          {/* Resume download links */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-white/50 text-sm">Download resume:</span>
            <a
              href="/MattBrown.pdf"
              download="Matt-Brown-Resume.pdf"
              className="text-[#1a2e35] text-sm font-medium hover:text-white transition-colors"
            >
              PDF
            </a>
            <span className="text-white/30">|</span>
            <a
              href="/matt-brown-resume.tex"
              download="Matt-Brown-Resume.tex"
              className="text-white/70 text-sm font-mono hover:text-white transition-colors"
            >
              .tex
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
