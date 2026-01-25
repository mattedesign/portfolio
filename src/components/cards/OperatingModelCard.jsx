const OPERATING_STEPS = [
  {
    number: "01",
    title: "Decision",
    text: "Identify the decision that actually drives outcomes."
  },
  {
    number: "02",
    title: "Signal",
    text: "Convert messy data and behavior into structured signals."
  },
  {
    number: "03",
    title: "System",
    text: "Embed intelligence into workflows, constraints, and architecture."
  },
  {
    number: "04",
    title: "Trust",
    text: "Design explainability and feedback into the system."
  },
  {
    number: "05",
    title: "Compounding",
    text: "Let the system learn from real decisions in production."
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

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12">
        {/* Title */}
        <h2 className="font-extrabold text-[clamp(36px,7vw,80px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-4">
          My operating model
        </h2>

        {/* Subtitle flow */}
        <p className="text-[#2d4a3e] text-lg md:text-xl font-medium mb-6 md:mb-8">
          From decision → signal → system → trust → compounding intelligence.
        </p>

        {/* Intro paragraph */}
        <p className="text-[#1a1c1e]/70 text-base md:text-lg leading-relaxed max-w-[800px] mb-8 md:mb-12">
          I identify the real decision, translate ambiguity into signal, and architect systems that embed intelligence directly into workflows. By designing for explainability and feedback, trust emerges through use—designing AI as infrastructure, not experiments.
        </p>

        {/* Operating steps - centered vertically */}
        <div className="flex-1 flex items-center">
          <div className="overflow-x-auto scrollbar-hide -mx-8 md:mx-0 px-8 md:px-0 w-full">
            <div className="flex md:grid md:grid-cols-5 gap-6 md:gap-6 min-w-max md:min-w-0 pb-4 md:pb-0">
              {OPERATING_STEPS.map((step, index) => (
                <div key={index} className="w-[180px] md:w-auto shrink-0 md:shrink">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[#1a1c1e]/30 text-sm font-mono">
                      {step.number}
                    </span>
                    <span className="text-[#1a1c1e] text-base md:text-lg font-bold">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[#1a1c1e]/60 text-sm md:text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <div className="px-8 md:px-12 pb-8 md:pb-12 mt-auto pt-8">
        <p className="text-[#1a1c1e] text-xl md:text-2xl font-bold">
          I design intelligence as a system, not a feature—so it can scale, explain itself, and improve over time.
        </p>
      </div>
    </div>
  );
}
