const OPERATING_STEPS = [
  {
    number: "01",
    title: "Identify",
    description: "the real decision (not the proxy metric)"
  },
  {
    number: "02",
    title: "Map",
    description: "ambiguity into structured signal"
  },
  {
    number: "03",
    title: "Design",
    description: "the system, not just the model"
  },
  {
    number: "04",
    title: "Embed",
    description: "trust, explainability, and feedback loops"
  },
  {
    number: "05",
    title: "Ship",
    description: "observe, refine"
  }
];

export default function OperatingModelCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed] text-base md:text-lg font-normal">
          Operating Model
        </p>
        <p className="text-[#f6f8ed]/60 text-base md:text-lg">
          03/07
        </p>
      </div>

      {/* Main headline */}
      <div className="px-8 md:px-12 mb-12 md:mb-16">
        <h2 className="font-extrabold text-[clamp(32px,6vw,72px)] text-[#f6f8ed] leading-[1.15] tracking-[-0.03em] max-w-[900px]">
          This is how AI becomes infrastructure, not experiments.
        </h2>
      </div>

      {/* Operating steps grid */}
      <div className="p-8 md:p-12 pt-0 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {OPERATING_STEPS.map((step, index) => (
            <div key={index} className={index >= 3 ? "md:col-span-1" : ""}>
              <p className="text-[#f6f8ed]/30 text-[clamp(48px,8vw,80px)] font-extrabold leading-none tracking-[-0.03em] mb-2">
                {step.number}
              </p>
              <p className="text-[#f6f8ed] text-lg md:text-xl font-bold mb-1">
                {step.title}
              </p>
              <p className="text-[#f6f8ed]/70 text-sm md:text-base leading-[1.6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
