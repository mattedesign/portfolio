export default function SkillsCard() {
  const skills = {
    "Architecture": ["System Design", "AI/ML Systems", "Microservices", "Cloud Infrastructure"],
    "Technology": ["React", "Node.js", "Python", "TypeScript"],
    "Leadership": ["Team Building", "Strategy", "Stakeholder Management", "Mentorship"],
    "Design": ["Design Systems", "UX Strategy", "Product Design", "Prototyping"]
  };

  return (
    <div className="bg-[#f6f8ed] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-[#1a1c1e] top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Core Capabilities
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          04/08
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-[64px] pt-[140px]">
        <div className="mb-[64px]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(60px,12vw,180px)] text-[#1a1c1e] leading-[1.1] tracking-[-0.04em]">
            Technical
            <br />
            Excellence
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] max-w-[1200px]">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="space-y-[16px]">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(24px,2.5vw,36px)] text-[#1a1c1e] leading-[1.2]">
                {category}
              </h3>
              <div className="space-y-[8px]">
                {items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-[12px]">
                    <div className="w-[8px] h-[8px] bg-[#1a1c1e] rounded-full"></div>
                    <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.5vw,24px)] text-[#424437] leading-[1.4]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
