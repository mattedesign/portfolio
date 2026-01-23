export default function IntroCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] w-full min-h-screen">
      {/* Top bar */}
      <div className="absolute flex items-center justify-between left-0 p-8 md:p-12 text-base md:text-xl text-white top-0 w-full">
        <p className="font-light tracking-wide">
          Principal Product Architect & AI Systems Designer
        </p>
        <p className="font-medium">
          Matt Brown
        </p>
      </div>

      {/* Main content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Large name */}
          <h1 className="font-extrabold leading-[0.9] text-[#f6f8ed] text-[clamp(80px,18vw,320px)] tracking-[-0.05em]">
            <span className="block">Matt</span>
            <span className="block">Brown</span>
          </h1>

          {/* Tagline */}
          <p className="pl-2 md:pl-4 font-normal leading-[1.2] text-[#f6f8ed] text-[clamp(20px,4vw,64px)] tracking-[0.01em]">
            <span>Elevator Pitch. Resume. Portfolio-</span>
            <span className="font-bold italic">ish</span>
          </p>
        </div>
      </div>
    </div>
  );
}
