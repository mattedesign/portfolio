const CAREER_TIMELINE = [
  {
    era: "ai",
    eraLabel: "AI ARCHITECTURE ERA",
    color: "#10b981",
    roles: [
      {
        role: "Co-Founder / Lead Architect",
        company: "Fr8 Document Engine",
        companyNote: "Proprietary IP",
        dates: "2023 — Present",
        highlights: [
          "Architected a document processing engine handling 100,000+ logistics documents daily across multiple carrier formats.",
          "Defined compounding templates and 'bucket' taxonomies allowing AI to orient without client-specific retraining.",
          "Designed Human-in-the-Loop workflows where the system learns from exceptions automatically."
        ],
        tags: ["Generative AI", "System Architecture", "Python", "React", "Vector DB", "RAG"]
      },
      {
        role: "Founder",
        company: "Foresera (Figmant)",
        companyNote: "Autonomous Research Platform",
        dates: "2023 — Present",
        highlights: [
          "Engineered an agentic system that acts as an autonomous user researcher, synthesizing findings across multiple data sources.",
          "Built a 'Chat-to-Component' engine where AI generates visual dashboards on-the-fly based on data findings."
        ],
        tags: ["Agentic Workflows", "Prompt Engineering", "RAG", "React", "Figma"]
      }
    ]
  },
  {
    era: "enterprise",
    eraLabel: "ENTERPRISE ERA",
    color: "#3b82f6",
    roles: [
      {
        role: "User Experience Design Lead",
        company: "TriumphPay (Triumph Financial)",
        dates: "Dec 2024 — Present",
        highlights: [
          "Translating complex financial goals (cash flow visibility) into centralized Broker Dashboards.",
          "Solving the 'Black Box' problem in factoring by visualizing the why behind approval decisions."
        ],
        tags: ["FinTech", "Cash Flow Management", "Strategic Product Design"]
      },
      {
        role: "Sr. Principal, UX Designer",
        company: "Epicor Software",
        dates: "Oct 2022 — Jan 2025",
        highlights: [
          "Led strategy for modernizing massive ERP modules without breaking critical business logic.",
          "Architected scalable design system for data-dense enterprise environments."
        ],
        tags: ["ERP", "SaaS", "Design Systems", "System Migration"]
      },
      {
        role: "Director of User Experience",
        company: "American First Finance",
        dates: "Apr 2018 — Feb 2020",
        highlights: [
          "Founded technology and frontend leadership roles as a customer champion.",
          "Reduced time-to-market by 268% implementing SDLC; empowered transition from waterfall to Agile.",
          "Grew customer portal utilization from 2% to 65% by overhauling experience and reducing load times by 800%."
        ],
        tags: ["FinTech", "SDLC", "Agile Transformation", "Team Leadership"]
      }
    ]
  },
  {
    era: "leadership",
    eraLabel: "LEADERSHIP ERA",
    color: "#8b5cf6",
    roles: [
      {
        role: "Group Creative Director",
        company: "WorldVentures Holdings",
        dates: "Jan 2012 — Dec 2014",
        highlights: [
          "Led conception, development and launch of B2B and B2C digital products for $600M global company.",
          "Built and developed a six-member team into an organization of 40+ designers, art directors, media and UX professionals.",
          "Won two HOW Awards, one Webby Award, and four Awwwards Awards."
        ],
        tags: ["Team Leadership", "Digital Products", "Brand Strategy", "P&L"]
      }
    ]
  }
];

export default function ExperienceCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative rounded-[20px] w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="absolute flex items-center justify-between left-0 p-8 md:p-12 text-base md:text-xl text-white top-0 w-full z-10">
        <p className="font-medium tracking-[-0.02em]">
          Career Timeline
        </p>
        <p className="font-normal text-right tracking-[-0.02em]">
          03/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-start p-8 md:p-16 pt-28 md:pt-32 overflow-y-auto">
        <div className="space-y-12 md:space-y-16">
          {CAREER_TIMELINE.map((era, eraIndex) => (
            <div key={eraIndex}>
              {/* Era Label */}
              <p
                className="text-sm md:text-base font-bold uppercase tracking-wider mb-6"
                style={{ color: era.color }}
              >
                {era.eraLabel}
              </p>

              {/* Roles in this era */}
              <div className="space-y-8 md:space-y-10">
                {era.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="border-l-4 pl-6 md:pl-8"
                    style={{ borderColor: era.color }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-2">
                      <h3 className="font-bold text-[clamp(20px,3vw,36px)] text-[#f6f8ed] leading-[1.2]">
                        {role.role}
                      </h3>
                      <span className="text-[#f6f8ed]/50 text-sm font-mono">
                        {role.dates}
                      </span>
                    </div>
                    <p className="text-[clamp(14px,1.5vw,22px)] text-[#f6f8ed]/70 mb-3">
                      {role.company}
                      {role.companyNote && <span className="text-[#f6f8ed]/40 ml-2">({role.companyNote})</span>}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {role.highlights.map((highlight, i) => (
                        <li key={i} className="text-[clamp(13px,1.2vw,18px)] text-[#f6f8ed]/80 leading-[1.5] flex gap-2">
                          <span className="text-[#f6f8ed]/40 mt-1">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-[#f6f8ed]/50 font-mono px-2 py-1 bg-white/5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
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
