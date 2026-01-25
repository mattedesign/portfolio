const SYSTEMS = [
  {
    problem: "Unstructured chaos",
    solution: "Automated extraction",
    product: "Fr8 Document Engine",
    metric: "100k+ documents/day",
    tech: "Self-healing extraction, human feedback loops, adaptive model architectures"
  },
  {
    problem: "Manual audits",
    solution: "Quantified decisions",
    product: "Figmant",
    metric: "250+ endpoints in production",
    tech: "Spatial analysis, behavioral heuristics, quantified UX impact"
  },
  {
    problem: "Gut-feel operations",
    solution: "Evidence-based guidance",
    product: "Operational Intelligence",
    metric: "ROI on 30/60/90-day cycles",
    tech: "Pattern detection, impact modeling, automated decision guidance"
  }
];

export default function SystemsCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          What I Build
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          05/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(36px,8vw,90px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-10 md:mb-14">
          Systems that compound.
        </h2>

        {/* Systems list */}
        <div className="space-y-0 mb-8">
          {SYSTEMS.map((system, index) => (
            <div key={index} className="border-t border-[#1a1c1e]/10 py-5 md:py-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#1a1c1e] text-xl md:text-2xl font-bold">
                    {system.problem} → {system.solution}
                  </h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[#1a1c1e]/60 text-sm md:text-base">
                      {system.product}
                    </span>
                    <span className="text-[#e07b5d] text-sm md:text-base font-medium">
                      {system.metric}
                    </span>
                  </div>
                </div>
                <p className="text-[#1a1c1e]/50 text-sm md:text-base md:text-right max-w-[400px]">
                  {system.tech}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-auto">
          <p className="text-[#1a1c1e]/60 text-base md:text-lg">
            They don't just ship. They evolve.
          </p>
        </div>
      </div>
    </div>
  );
}
