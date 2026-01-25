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
          Turning Not Possible Into Deliverable.
        </h2>

        {/* Systems list - cleaner layout */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-8 md:space-y-10">
            {SYSTEMS.map((system, index) => (
              <div key={index}>
                <h3 className="text-[#1a1c1e] text-lg md:text-xl font-semibold mb-2">
                  {system.transformation}
                </h3>
                <p className="text-[#1a1c1e]/50 text-sm md:text-base">
                  {system.context} <span className="text-[#e07b5d] font-medium">· {system.metric}</span>
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
