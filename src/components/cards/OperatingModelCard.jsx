const OPERATING_STEPS = [
  {
    number: "01",
    text: "Identify the real decision (not the proxy metric)"
  },
  {
    number: "02",
    text: "Map ambiguity into structured signal"
  },
  {
    number: "03",
    text: "Design the system, not just the model"
  },
  {
    number: "04",
    text: "Embed trust, explainability, and feedback loops"
  },
  {
    number: "05",
    text: "Ship, observe, refine"
  }
];

export default function OperatingModelCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          How I Work
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          07/10
        </p>
      </div>

      {/* Main headline */}
      <div className="px-8 md:px-12 mb-10 md:mb-14">
        <h2 className="font-extrabold text-[clamp(40px,8vw,96px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em]">
          My operating model
        </h2>
      </div>

      {/* Operating steps - horizontal scroll on mobile, grid on desktop */}
      <div className="flex-1 flex flex-col">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex md:grid md:grid-cols-5 gap-6 md:gap-8 px-8 md:px-12 pb-8 md:pb-12 min-w-max md:min-w-0">
            {OPERATING_STEPS.map((step, index) => (
              <div key={index} className="w-[200px] md:w-auto shrink-0 md:shrink">
                <p className="text-[#1a1c1e]/20 text-[64px] md:text-[72px] font-extrabold leading-none tracking-[-0.03em] mb-3">
                  {step.number}
                </p>
                <p className="text-[#1a1c1e] text-base md:text-lg leading-[1.5]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="px-8 md:px-12 pb-8 md:pb-12 mt-auto">
          <p className="text-[#1a1c1e]/50 text-base md:text-lg">
            AI as infrastructure, not experiments.
          </p>
        </div>
      </div>
    </div>
  );
}
