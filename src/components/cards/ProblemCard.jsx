const STAKEHOLDERS = [
  { label: "Business", creates: "intent" },
  { label: "Data", creates: "evidence" },
  { label: "Engineering", creates: "systems" },
  { label: "Humans", creates: "belief" }
];

export default function ProblemCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          The Gap
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          02/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(36px,8vw,90px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-10 md:mb-16">
          AI doesn't fail. Translation does.
        </h2>

        {/* 4-column stakeholder grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          {STAKEHOLDERS.map((item, index) => (
            <div key={index} className="border-t-2 border-[#1a1c1e] pt-4">
              <p className="text-[#1a1c1e] text-lg md:text-xl font-bold mb-1">
                {item.label}
              </p>
              <p className="text-[#1a1c1e]/50 text-sm md:text-base">
                creates {item.creates}
              </p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-auto">
          <p className="text-[#1a1c1e] text-xl md:text-2xl font-bold">
            I translate between them.
          </p>
        </div>
      </div>
    </div>
  );
}
