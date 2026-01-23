const PROCESS_STEPS = [
  {
    number: "1.",
    title: "Analyse",
    description: "I examine business problems, user needs, and technical constraints to identify the highest-leverage opportunities."
  },
  {
    number: "2.",
    title: "Architect",
    description: "I design systems that scale—from data models to user flows—balancing innovation with enterprise realities."
  },
  {
    number: "3.",
    title: "Build",
    description: "I ship working products, not just specs. From React frontends to AI pipelines, I prototype and iterate rapidly."
  },
  {
    number: "4.",
    title: "Evolve",
    description: "I create self-improving systems with human-in-the-loop workflows that compound learning over time."
  }
];

export default function AppliedIntelligenceCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e] text-base md:text-lg font-normal">
          Design Process
        </p>
        <p className="text-[#1a1c1e]/60 text-base md:text-lg">
          02/06
        </p>
      </div>

      {/* Main statement */}
      <div className="px-8 md:px-12 flex-1">
        <h2 className="font-extrabold text-[clamp(32px,6vw,72px)] text-[#1a1c1e] leading-[1.15] tracking-[-0.03em] max-w-[1100px]">
          I specialize in the gap between Data Science and Product Strategy—where AI models meet business reality.
        </h2>
      </div>

      {/* Process grid */}
      <div className="p-8 md:p-12 pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[900px]">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index}>
              <p className="text-[#1a1c1e]/40 text-sm md:text-base mb-2">
                {step.number} {step.title}
              </p>
              <p className="text-[#1a1c1e] text-sm md:text-base leading-[1.6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
