const SYSTEMS = [
  {
    transformation: "Unstructured chaos → Automated extraction",
    context: "Fr8 Document Engine",
    metric: "100k+ documents/day"
  },
  {
    transformation: "Manual audits → Quantified decisions",
    context: "Figmant",
    metric: "250+ endpoints in production"
  },
  {
    transformation: "Gut-feel operations → Evidence-based guidance",
    context: "Operational Intelligence",
    metric: "ROI on 30/60/90-day cycles"
  }
];

export default function SystemsCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          My Recent Work
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          05/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12">
        <h2 className="font-extrabold text-[clamp(36px,8vw,90px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-12 md:mb-16">
          Implied &<br />
          Applied Intelligence.
        </h2>

        {/* Systems list - horizontal layout */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {SYSTEMS.map((system, index) => (
              <div key={index}>
                <p className="text-[#1a1c1e]/40 text-sm font-mono mb-2">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-[#1a1c1e] text-lg md:text-xl font-bold mb-2">
                  {system.context}
                </h3>
                <p className="text-[#1a1c1e]/50 text-sm md:text-base leading-relaxed">
                  {system.transformation}
                </p>
                <p className="text-[#e07b5d] text-sm font-medium mt-2">
                  {system.metric}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <div className="pt-8 pb-8 md:pb-12">
          <p className="text-[#1a1c1e] text-xl md:text-2xl font-bold">
            They don't just ship. They evolve.
          </p>
        </div>
      </div>
    </div>
  );
}
