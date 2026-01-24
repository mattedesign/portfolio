import { useState } from 'react';
import { Zap } from 'lucide-react';
import ParticleScanner from '../scanner/ParticleScanner';
import TransformationStream from '../scanner/TransformationStream';

export default function IntroCard() {
  const [isScanning, setIsScanning] = useState(false);

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

      {/* Main content - text left, scanner right */}
      <div className="flex-1 flex flex-col lg:flex-row relative min-h-0">
        {/* Text content - left side */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 py-8 lg:py-0 lg:max-w-[50%]">
          <h1 className="font-extrabold leading-[1.05] text-[#f6f8ed] text-[clamp(32px,5vw,64px)] tracking-[-0.03em] mb-4">
            Turning ambiguity into{' '}
            <span className="text-[#e07b5d]">operational intelligence.</span>
          </h1>

          <p className="text-[#f6f8ed]/50 text-base md:text-lg max-w-[400px]">
            Compound AI systems that reason at scale.
          </p>
        </div>

        {/* Scanner visualization - right side */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-0">
          {/* Particle scanner beam - full height */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <ParticleScanner isScanning={isScanning} height={500} />
          </div>

          {/* Transformation stream */}
          <div className="absolute inset-0 flex items-center">
            <TransformationStream
              onScanningChange={setIsScanning}
              height={160}
            />
          </div>
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
