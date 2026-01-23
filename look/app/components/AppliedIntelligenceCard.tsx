export default function AppliedIntelligenceCard() {
  return (
    <div className="bg-[#f6f8ed] content-stretch flex flex-col items-center overflow-clip relative rounded-[20px] size-full min-h-screen">
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row justify-center size-full">
          <div className="content-stretch flex gap-[16px] items-start justify-center px-[64px] py-[80px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
              <div className="content-stretch flex flex-col gap-[32px] items-start justify-center relative shrink-0 w-full">
                <div className="content-stretch flex items-center pl-[8px] relative shrink-0">
                  <p className="css-ew64yg font-['Instrument_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1a1c1e] text-[clamp(24px,3.5vw,58px)] tracking-[0.01em]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Models that think with...
                  </p>
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold leading-[1.1] min-w-full relative shrink-0 text-[#1a1c1e] text-[clamp(60px,12vw,220px)] tracking-[-0.04em] w-[min-content]">
                  <p className="css-4hzbpn mb-0">Applied</p>
                  <p className="css-4hzbpn">Intelligence</p>
                </div>
              </div>
            </div>
            
            <div className="content-stretch flex h-[248px] items-center justify-end relative shrink-0">
              <p className="css-4hzbpn font-['Instrument_Sans',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[24px] text-black text-right tracking-[-0.02em] w-[69px]">
                <span className="leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  02/
                </span>
                <span className="font-bold leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  08
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-stretch flex flex-[1_0_0] items-end justify-center min-h-px min-w-px p-[64px] relative w-full">
        <div className="content-stretch flex flex-[1_0_0] gap-[64px] items-center min-h-px min-w-px relative text-[#424437]">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
            <p className="css-4hzbpn font-['Plus_Jakarta_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[clamp(20px,2vw,32px)] w-full">The Evolution</p>
            <p className="css-4hzbpn font-['Instrument_Sans',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[clamp(14px,1.3vw,22px)] tracking-[-0.02em] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`A career built on progressively complex problem solving—from creative teams to banking systems to AI architectures. The medium changes, but I've always been solving problems.`}</p>
          </div>
          
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
            <p className="css-4hzbpn font-['Plus_Jakarta_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[clamp(20px,2vw,32px)] w-full">The Full Spectrum</p>
            <p className="css-4hzbpn font-['Instrument_Sans',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[clamp(14px,1.3vw,22px)] tracking-[-0.02em] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              I fluently communicate in the realms of compliance, profit and loss, and risk management. My journey began in design, evolved through management, and now thrives in technology. This diverse background equips me to adeptly navigate organizational politics as a Director while leveraging my Principal experience to tackle intricate legacy systems.
            </p>
          </div>
          
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
            <p className="css-4hzbpn font-['Plus_Jakarta_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[clamp(20px,2vw,32px)] w-full">Point 1</p>
            <p className="css-4hzbpn font-['Instrument_Sans',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[clamp(14px,1.3vw,22px)] tracking-[-0.02em] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
              AI models need human-level intelligence to truly excel. This involves understanding nuances, context, and emotions, enabling them to make informed decisions, solve complex problems, and interact naturally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
