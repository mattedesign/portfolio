export default function PhilosophyCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-[#1a1c1e] top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Design Philosophy
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          07/08
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-[64px] pt-[140px]">
        <div className="max-w-[1000px]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(48px,8vw,120px)] text-[#1a1c1e] leading-[1.2] tracking-[-0.03em] mb-[48px]">
            "Technology should amplify human capability, not replace human judgment."
          </h2>
          
          <p className="font-['Instrument_Sans',sans-serif] text-[clamp(18px,2vw,32px)] text-[#424437] leading-[1.6] mb-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            This principle guides every architectural decision I make. Whether building AI systems or designing user interfaces, the goal is always to create technology that enhances human potential.
          </p>
          
          <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.6vw,26px)] text-[#424437]/80 leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
            In banking systems, this means creating AI that helps analysts make better decisions faster. In design systems, it means empowering designers to focus on creativity while automating the mundane. The best technology disappears into the background, making difficult tasks feel effortless.
          </p>
        </div>
      </div>
    </div>
  );
}
