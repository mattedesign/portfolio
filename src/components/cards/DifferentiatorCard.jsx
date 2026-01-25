const CAPABILITIES = [
  "Train domain-specific models",
  "Inject contextual intelligence",
  "Compound spatial + emotional signals",
  "Design human-AI feedback loops"
];

export default function DifferentiatorCard() {
  return (
    <div className="bg-[#2d4a3e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          What I Do
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          03/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(32px,7vw,80px)] text-[#f6f8ed] leading-[1.05] tracking-[-0.03em] mb-10 md:mb-14">
          I build<br />
          compounding intelligent systems.
        </h2>

        {/* Capabilities as a tight list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-14">
          {CAPABILITIES.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[#e07b5d] text-xl">→</span>
              <p className="text-[#f6f8ed] text-lg md:text-xl font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-auto">
          <p className="text-[#f6f8ed] text-xl md:text-2xl font-bold">
            Models succeed in notebooks. I build the systems that make them succeed in organizations.
          </p>
        </div>
      </div>
    </div>
  );
}
