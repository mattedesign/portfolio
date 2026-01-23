export default function ContactCard() {
  return (
    <div className="bg-[#f6f8ed] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-[#1a1c1e] top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Let's Connect
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          08/08
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-[64px] text-center">
        <div className="max-w-[900px]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(60px,12vw,180px)] text-[#1a1c1e] leading-[1.1] tracking-[-0.04em] mb-[48px]">
            Get in
            <br />
            Touch
          </h2>
          
          <p className="font-['Instrument_Sans',sans-serif] text-[clamp(18px,2vw,32px)] text-[#424437] leading-[1.6] mb-[64px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Open to discussing complex technical challenges, architecture consulting, or leadership opportunities in AI and product development.
          </p>
          
          <div className="flex flex-col gap-[24px] items-center">
            <a 
              href="mailto:matt@example.com" 
              className="font-['Instrument_Sans',sans-serif] font-medium text-[clamp(20px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              matt@example.com
            </a>
            <a 
              href="https://linkedin.com/in/mattbrown" 
              className="font-['Instrument_Sans',sans-serif] font-medium text-[clamp(20px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/mattbrown" 
              className="font-['Instrument_Sans',sans-serif] font-medium text-[clamp(20px,2.2vw,36px)] text-[#1a1c1e] hover:opacity-70 transition-opacity"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
