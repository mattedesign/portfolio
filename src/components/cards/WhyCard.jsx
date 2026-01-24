export default function WhyCard() {
  return (
    <div className="bg-[#e07b5d] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e]/70 text-base md:text-lg font-normal">
          Why This Work
        </p>
        <p className="text-[#1a1c1e]/50 text-base md:text-lg">
          08/10
        </p>
      </div>

      {/* Main content - centered, minimal */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(36px,8vw,96px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em] mb-8">
          Not a pivot.
          <br />
          A convergence.
        </h2>

        <p className="text-[#1a1c1e]/70 text-xl md:text-2xl max-w-[600px]">
          20 years of intuition about how humans decide—now formalized into systems that solve.
        </p>
      </div>
    </div>
  );
}
