export default function ProcessCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-white top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Methodology
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          06/08
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-[64px] pt-[140px]">
        <div className="mb-[64px]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(60px,12vw,180px)] text-[#f6f8ed] leading-[1.1] tracking-[-0.04em]">
            How I
            <br />
            Work
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[48px] max-w-[1400px]">
          <div className="space-y-[16px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(48px,8vw,120px)] text-[#f6f8ed]/20 leading-[1]">
              01
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(24px,2.5vw,36px)] text-[#f6f8ed] leading-[1.2]">
              Discovery
            </h3>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.4vw,22px)] text-[#f6f8ed]/80 leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Deep dive into business context, technical constraints, and user needs to understand the full problem space.
            </p>
          </div>
          
          <div className="space-y-[16px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(48px,8vw,120px)] text-[#f6f8ed]/20 leading-[1]">
              02
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(24px,2.5vw,36px)] text-[#f6f8ed] leading-[1.2]">
              Architecture
            </h3>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.4vw,22px)] text-[#f6f8ed]/80 leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Design scalable systems that balance technical excellence with business pragmatism and user experience.
            </p>
          </div>
          
          <div className="space-y-[16px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(48px,8vw,120px)] text-[#f6f8ed]/20 leading-[1]">
              03
            </div>
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(24px,2.5vw,36px)] text-[#f6f8ed] leading-[1.2]">
              Execution
            </h3>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.4vw,22px)] text-[#f6f8ed]/80 leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Lead teams through implementation with clear communication, technical guidance, and continuous iteration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
