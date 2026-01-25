import { useState } from 'react';

const TIMELINE_NODES = [
  {
    year: "2024–Present",
    title: "UX Design Lead",
    domain: "FinTech / Cash Flow",
    company: "TriumphPay",
    detail: "Translating complex financial goals into centralized dashboards. Solving the 'Black Box' problem in factoring.",
    tags: ["AI Systems", "Financial UX"]
  },
  {
    year: "2022–2025",
    title: "Sr. Principal UX Designer",
    domain: "Enterprise ERP",
    company: "Epicor",
    detail: "Modernizing massive ERP modules without breaking critical business logic. Scalable design systems.",
    tags: ["Enterprise", "Design Systems"]
  },
  {
    year: "2020–2022",
    title: "Lead UX Designer",
    domain: "Title Insurance",
    company: "First American",
    detail: "Enterprise document and workflow systems in heavily regulated environments.",
    tags: ["Compliance", "Workflow"]
  },
  {
    year: "2018–2020",
    title: "Director of UX",
    domain: "Consumer FinTech",
    company: "American First Finance",
    detail: "Reduced time-to-market 268%. Grew portal utilization from 2% to 65%.",
    tags: ["SDLC", "Agile"]
  },
  {
    year: "2014–2017",
    title: "Director & Founder",
    domain: "Travel Tech",
    company: "Aloha Travel",
    companyNote: "acquired by FareHarbor",
    detail: "800% sales increase. Built $20.1M revenue channel via Expedia apps.",
    tags: ["Mobile Apps", "Growth"]
  },
  {
    year: "2012–2014",
    title: "Group Creative Director",
    domain: "Global Travel",
    company: "WorldVentures",
    detail: "Built 6-person team into 40+ designers. Led B2B and B2C digital products.",
    tags: ["Leadership", "Scale"]
  }
];

export default function EnterpriseCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#4998AE] overflow-hidden rounded-[32px] relative w-full h-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-white/80 text-base md:text-lg font-normal">
          Experience & Leadership
        </p>
        <p className="text-white/60 text-base md:text-lg">
          06/10
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8 md:px-12 pb-8 md:pb-12">
        <h2 className="font-extrabold text-[clamp(32px,7vw,72px)] text-white leading-[1.05] tracking-[-0.03em] mb-6 md:mb-10">
          Career Timeline
        </h2>

        {/* Timeline and Cards Container */}
        <div className="flex-1 flex flex-col">
          {/* Horizontal Timeline Line */}
          <div className="relative mb-6 md:mb-8">
            {/* Main line */}
            <div className="absolute top-[6px] left-4 right-4 h-[2px] bg-white/30" />

            {/* Nodes with year labels - scrollable */}
            <div className="overflow-x-auto scrollbar-hide -mx-8 px-8 md:mx-0 md:px-0">
              <div className="relative flex gap-8 md:gap-0 md:justify-between min-w-max md:min-w-0 px-4 md:px-0">
                {TIMELINE_NODES.map((node, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div
                      className={`w-3 h-3 rounded-full relative z-10 transition-all duration-300 ${
                        activeIndex === index
                          ? 'bg-white scale-125'
                          : 'bg-white/60 group-hover:bg-white group-hover:scale-110'
                      }`}
                    />
                    <div
                      className={`mt-3 px-3 py-1 rounded-full border transition-all duration-300 ${
                        activeIndex === index
                          ? 'bg-white/20 border-white/40'
                          : 'bg-white/10 border-white/20 group-hover:bg-white/15 group-hover:border-white/30'
                      }`}
                    >
                      <span className="text-white text-xs font-mono whitespace-nowrap">
                        {node.year}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards - Horizontal scroll */}
          <div className="overflow-x-auto scrollbar-hide -mx-8 px-8 md:-mx-12 md:px-12 flex-1">
            <div className="flex gap-4 md:gap-5 min-w-max pb-4">
              {TIMELINE_NODES.map((node, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-[280px] md:w-[300px] rounded-2xl p-6 flex flex-col cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-[#3a7a8a] scale-[1.02] shadow-lg shadow-black/20'
                      : 'bg-white/10 hover:bg-white/15 hover:scale-[1.01]'
                  }`}
                >
                  {/* Year label */}
                  <div className="mb-3">
                    <span className={`text-xs font-mono transition-colors duration-300 ${
                      activeIndex === index ? 'text-white/80' : 'text-white/50'
                    }`}>
                      {node.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-bold mb-1">
                    {node.title}
                  </h3>

                  {/* Domain */}
                  <p className={`text-sm mb-1 transition-colors duration-300 ${
                    activeIndex === index ? 'text-white/70' : 'text-white/50'
                  }`}>
                    {node.domain}
                  </p>

                  {/* Company */}
                  <p className="text-white text-sm font-medium mb-4">
                    {node.company}
                    {node.companyNote && (
                      <span className="text-white/50 font-normal text-xs ml-1">
                        ({node.companyNote})
                      </span>
                    )}
                  </p>

                  {/* Detail */}
                  <p className={`text-sm leading-relaxed mb-5 flex-1 transition-colors duration-300 ${
                    activeIndex === index ? 'text-white/80' : 'text-white/60'
                  }`}>
                    {node.detail}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {node.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-300 ${
                          activeIndex === index
                            ? 'border-white/40 text-white/90 bg-white/10'
                            : 'border-white/20 text-white/70 hover:border-white/30'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resume download links */}
        <div className="flex items-center gap-4 pt-6 mt-auto">
          <span className="text-white/50 text-sm">Download resume:</span>
          <a
            href="/MattBrown.pdf"
            download="Matt-Brown-Resume.pdf"
            className="text-[#1a2e35] text-sm font-medium hover:text-white transition-colors"
          >
            PDF
          </a>
          <span className="text-white/30">|</span>
          <a
            href="/matt-brown-resume.tex"
            download="Matt-Brown-Resume.tex"
            className="text-white/70 text-sm font-mono hover:text-white transition-colors"
          >
            .tex
          </a>
        </div>
      </div>
    </div>
  );
}
