const EVOLUTION_ERAS = [
  {
    era: "Creative",
    years: "2003–2014",
    focus: "Understanding people",
    proof: "Webbys, Awwwards, agency leadership"
  },
  {
    era: "Enterprise",
    years: "2014–2022",
    focus: "Understanding constraints",
    proof: "$600M+ companies, regulated workflows"
  },
  {
    era: "Intelligent",
    years: "2022–Now",
    focus: "Understanding decisions",
    proof: "100k+ docs/day, compound AI systems"
  }
];

export default function EvolutionCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          The Arc
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          04/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(36px,8vw,90px)] text-[#f6f8ed] leading-[1.05] tracking-[-0.03em] mb-10 md:mb-16">
          Three eras.{' '}
          <span className="text-[#f6f8ed]/40">One thread.</span>
        </h2>

        {/* Evolution eras - horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {EVOLUTION_ERAS.map((item, index) => (
            <div key={index} className="border-t-2 border-[#f6f8ed] pt-4">
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-[#f6f8ed] text-2xl md:text-3xl font-bold">
                  {item.era}
                </h3>
                <span className="text-[#f6f8ed]/30 text-sm">{item.years}</span>
              </div>
              <p className="text-[#e07b5d] text-base md:text-lg font-medium mb-1">
                {item.focus}
              </p>
              <p className="text-[#f6f8ed]/50 text-sm">
                {item.proof}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-auto">
          <p className="text-[#f6f8ed] text-xl md:text-2xl font-bold">
            Each phase built the intuition for the next.
          </p>
        </div>
      </div>
    </div>
  );
}
