export default function ProjectsCard() {
  const projects = [
    {
      title: "AI Banking Platform",
      description: "Architected a real-time AI decision engine processing 10M+ daily transactions with 99.99% uptime.",
      impact: "40% reduction in fraud",
    },
    {
      title: "Enterprise Design System",
      description: "Built a comprehensive design system serving 200+ developers across 15 product teams.",
      impact: "60% faster development",
    },
    {
      title: "Legacy Migration",
      description: "Led the modernization of a 15-year-old banking core, migrating to cloud-native architecture.",
      impact: "Zero downtime migration",
    },
  ];

  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] size-full min-h-screen flex flex-col">
      <div className="absolute content-stretch flex font-['Instrument_Sans',sans-serif] font-medium items-center justify-between leading-[normal] left-0 p-[48px] text-[24px] text-white top-0 w-full z-10">
        <p className="css-ew64yg relative shrink-0 tracking-[-0.02em]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Featured Work
        </p>
        <p className="css-ew64yg relative shrink-0 text-right tracking-[-0.48px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          05/08
        </p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-[64px] pt-[140px]">
        <div className="mb-[64px]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[clamp(60px,12vw,180px)] text-[#f6f8ed] leading-[1.1] tracking-[-0.04em]">
            Impact
            <br />
            Stories
          </h2>
        </div>
        
        <div className="space-y-[48px] max-w-[1200px]">
          {projects.map((project, index) => (
            <div key={index} className="border-t-[2px] border-[#f6f8ed]/20 pt-[32px]">
              <div className="flex items-start justify-between gap-[32px] mb-[16px]">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[clamp(28px,3.5vw,48px)] text-[#f6f8ed] leading-[1.2]">
                  {project.title}
                </h3>
                <span className="font-['Instrument_Sans',sans-serif] font-bold text-[clamp(14px,1.2vw,18px)] text-[#f6f8ed]/60 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {project.impact}
                </span>
              </div>
              <p className="font-['Instrument_Sans',sans-serif] text-[clamp(16px,1.5vw,24px)] text-[#f6f8ed]/80 leading-[1.6] max-w-[900px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
