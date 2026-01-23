export default function IntroCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] size-full min-h-screen">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-white top-0 w-full">
        <p className="css-ew64yg relative shrink-0 text-right" style={{ fontVariationSettings: "'wdth' 100" }}>{`Principal Product Architect & AI Systems Designer`}</p>
        <p className="css-ew64yg relative shrink-0 tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Matthew Brown
        </p>
      </div>
      
      <div className="absolute bottom-0 content-stretch flex items-end left-0 p-[64px] w-full">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] items-start justify-center min-h-px min-w-px relative">
          <div className="css-g0mm18 font-['Plus_Jakarta_Sans',sans-serif] font-extrabold leading-[1.25] relative shrink-0 text-[#f6f8ed] text-[clamp(80px,16vw,320px)] tracking-[-0.05em]">
            <p className="css-ew64yg mb-0">Matt</p>
            <p className="css-ew64yg">Brown</p>
          </div>
          <div className="content-stretch flex items-center justify-center pl-[16px] relative shrink-0">
            <p className="css-ew64yg font-['Instrument_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#f6f8ed] text-[clamp(24px,4vw,64px)] tracking-[0.01em]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <span className="leading-[normal]">Elevator Pitch. Resume. Portfolio-</span>
              <span className="font-bold italic leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
                ish
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
