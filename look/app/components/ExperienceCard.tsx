export default function ExperienceCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-white top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Experience & Leadership
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          03/08
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-[64px] pt-[140px]">
        <div className="space-y-[80px]">
          <div className="border-l-[4px] border-[#f6f8ed] pl-[40px]">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(32px,5vw,72px)] text-[#f6f8ed] leading-[1.2] mb-[16px]">
              Principal Architect
            </h3>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(18px,1.8vw,28px)] text-[#f6f8ed]/70 mb-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Banking & Financial Systems
            </p>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(14px,1.3vw,22px)] text-[#f6f8ed]/90 leading-[1.6] max-w-[800px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Led the architectural transformation of critical banking infrastructure. Designed and implemented AI-powered decision systems that process millions of transactions daily while maintaining regulatory compliance and zero downtime.
            </p>
          </div>
          
          <div className="border-l-[4px] border-[#f6f8ed]/60 pl-[40px]">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(32px,5vw,72px)] text-[#f6f8ed] leading-[1.2] mb-[16px]">
              Director of Design
            </h3>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(18px,1.8vw,28px)] text-[#f6f8ed]/70 mb-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Product & Systems
            </p>
            <p className="font-['Instrument_Sans',sans-serif] text-[clamp(14px,1.3vw,22px)] text-[#f6f8ed]/90 leading-[1.6] max-w-[800px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Built and managed cross-functional teams delivering enterprise-scale design systems. Bridged the gap between business objectives, technical constraints, and user needs through strategic design leadership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
