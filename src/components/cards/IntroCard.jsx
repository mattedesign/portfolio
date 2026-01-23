export default function IntroCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-6 sm:p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-sm sm:text-base md:text-lg font-normal">
          Bridging Data Science & Product Strategy
        </p>
        <p className="text-[#f6f8ed] text-sm sm:text-base md:text-lg font-medium">
          Matt Brown
        </p>
      </div>

      {/* Main content - fills remaining space */}
      <div className="flex-1 flex flex-col justify-end p-6 sm:p-8 md:p-12 pt-0">
        {/* Large name */}
        <h1 className="font-extrabold leading-[0.9] text-[#f6f8ed] text-[clamp(80px,20vw,280px)] tracking-[-0.04em] mb-6 md:mb-8">
          <span className="block">Matt</span>
          <span className="block">Brown</span>
        </h1>

        {/* Tagline */}
        <p className="font-normal leading-[1.3] text-[#f6f8ed]/80 text-[clamp(18px,3vw,42px)] tracking-[-0.01em]">
          Elevator Pitch. Resume. Portfolio-<span className="italic">ish</span>
        </p>
      </div>
    </div>
  );
}
