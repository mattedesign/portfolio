import { Zap } from 'lucide-react';

export default function IntroCard() {
  const scrollToAnalyzer = () => {
    document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#1a1c1e] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-6 sm:p-8 md:p-12">
        <p className="text-[#f6f8ed]/50 text-sm sm:text-base md:text-lg font-normal">
          Principal Product Architect
        </p>
        <p className="text-[#f6f8ed] text-sm sm:text-base md:text-lg font-medium">
          Matt Brown
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 sm:px-8 md:px-12 relative">
        {/* Vertical dotted line - right side accent */}
        <div
          className="absolute right-[30%] top-0 bottom-0 w-px hidden md:block"
          style={{
            backgroundImage: 'linear-gradient(to bottom, transparent 0%, #f6f8ed20 10%, #f6f8ed20 90%, transparent 100%)',
            maskImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, black 4px, black 8px)',
            WebkitMaskImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, black 4px, black 8px)',
          }}
        />

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center max-w-[700px]">
          <h1 className="font-extrabold leading-[1] text-[#f6f8ed] text-[clamp(48px,10vw,120px)] tracking-[-0.03em] mb-6">
            Turning ambiguity into{' '}
            <span className="text-[#e07b5d]">operational intelligence.</span>
          </h1>

          <p className="text-[#f6f8ed]/60 text-base md:text-lg lg:text-xl max-w-[550px]">
            20+ years from creative leadership → enterprise systems → compound AI that reasons at scale.
          </p>
        </div>
      </div>

      {/* CTA Button - bottom center */}
      <div className="flex justify-center pb-8 md:pb-12">
        <button
          onClick={scrollToAnalyzer}
          className="group flex items-center gap-3 bg-[#f6f8ed] text-[#1a1c1e] px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
          style={{
            boxShadow: '0 4px 20px rgba(246, 248, 237, 0.2)'
          }}
        >
          <Zap size={20} className="text-[#e07b5d]" />
          <span>Analyze My Fit</span>
        </button>
      </div>
    </div>
  );
}
