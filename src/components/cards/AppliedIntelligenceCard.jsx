const PILLARS = [
  {
    title: "Strategic Leadership",
    color: "#8b5cf6",
    description: "10+ years leading teams, managing P&L, and driving organizational transformation at the Director level. Built and scaled teams of 40+ professionals."
  },
  {
    title: "Enterprise Scale",
    color: "#3b82f6",
    description: "Deep expertise in FinTech, ERP, and heavily regulated sectors (Triumph Financial, First American, Epicor). I understand compliance, legacy systems, and organizational change."
  },
  {
    title: "AI Architecture",
    color: "#10b981",
    description: "Architect of proprietary AI engines processing 100k+ documents/day with self-healing logic. From RAG pipelines to agentic workflows, I build systems that ship."
  }
];

export default function AppliedIntelligenceCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header section */}
      <div className="w-full">
        <div className="flex flex-row justify-between px-8 md:px-16 py-12 md:py-20">
          <div className="flex flex-col gap-6 md:gap-8">
            <p className="font-normal text-[#1a1c1e]/70 text-[clamp(18px,3vw,48px)] tracking-[0.01em] pl-2 italic">
              Implied &
            </p>
            <h2 className="font-extrabold leading-[1.1] text-[#1a1c1e] text-[clamp(50px,12vw,180px)] tracking-[-0.04em]">
              <span className="block">Applied</span>
              <span className="block">Intelligence</span>
            </h2>
          </div>

          {/* Page indicator */}
          <div className="flex items-start justify-end pt-4">
            <p className="font-normal text-xl md:text-2xl text-black text-right tracking-[-0.02em]">
              <span>02/</span>
              <span className="font-bold">06</span>
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-8 md:px-16 mb-8 md:mb-12">
        <p className="text-[clamp(16px,1.8vw,28px)] text-[#424437] leading-[1.6] max-w-[900px] border-l-4 border-[#1a1c1e]/20 pl-6">
          Principal Product Architect with 18+ years spanning Executive Creative Leadership, Enterprise Product Strategy, and Applied AI Architecture. I bridge "Vision" (boardroom) and "System" (engineering)—equally fluent presenting to a CFO about cash flow optimization or an engineering team about vector embeddings and RAG pipelines.
        </p>
      </div>

      {/* Three pillars */}
      <div className="flex-1 flex items-end justify-center p-8 md:p-16 w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
          {PILLARS.map((pillar, index) => (
            <div key={index} className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pillar.color }}
                />
                <p className="font-bold text-[clamp(16px,1.8vw,28px)] text-[#1a1c1e]">
                  {pillar.title}
                </p>
              </div>
              <p className="font-normal leading-[1.5] text-[clamp(13px,1.2vw,20px)] text-[#424437] tracking-[-0.01em]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
