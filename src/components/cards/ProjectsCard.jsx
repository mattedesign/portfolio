const WORK = [
  {
    type: "ai",
    summary: "Architected a document engine processing 100k+ logistics documents daily—runs primarily on hardware with tiered cloud fallback. Already saving tens of thousands daily with high accuracy, and as it matures, it becomes increasingly self-reliant through operator feedback loops."
  },
  {
    type: "ai",
    summary: "Built an operational coaching platform that analyzes freight broker data and surfaces actionable intelligence with quantified cost impact. Pattern detection identifies anomalies and tracks implementation outcomes for measurable 30/60/90-day ROI."
  },
  {
    type: "ai",
    summary: "Designed a trading system detecting price dislocations between prediction markets and sportsbooks. Priority-cascade rule engine prevents conflicting trades while lot-based position tracking manages multi-tier profit targets."
  },
  {
    type: "ai",
    summary: "Exploring the deeper potential of AI—compounding intelligence, predictive awareness, and spatial reasoning. Multi-modal audit system analyzing accessibility, conversion patterns, and design quality through 251+ endpoints with enterprise analytics integration."
  }
];

export default function ProjectsCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e] text-base md:text-lg font-normal">
          Selected Work
        </p>
        <p className="text-[#1a1c1e]/60 text-base md:text-lg">
          04/06
        </p>
      </div>

      {/* Main headline */}
      <div className="px-8 md:px-12 mb-8 md:mb-12">
        <h2 className="font-extrabold text-[clamp(48px,10vw,120px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em]">
          Impact Stories
        </h2>
      </div>

      {/* Work list */}
      <div className="flex-1 px-8 md:px-12 pb-8 md:pb-12">
        <div className="space-y-0">
          {WORK.map((item, index) => (
            <div key={index} className="border-t border-[#1a1c1e]/10 py-6 md:py-8 flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
              <p className="text-[#1a1c1e]/80 text-base md:text-lg leading-[1.6] max-w-[700px]">
                {item.summary}
              </p>
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full shrink-0 h-fit"
                style={{
                  backgroundColor: item.type === 'ai' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  color: item.type === 'ai' ? '#059669' : '#2563eb'
                }}
              >
                {item.type === 'ai' ? 'AI/ML' : 'Enterprise'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
