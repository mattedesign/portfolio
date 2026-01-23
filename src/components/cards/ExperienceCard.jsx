const CAREER_TIMELINE = [
  {
    era: "ai",
    eraLabel: "AI ARCHITECTURE ERA",
    color: "#f6f8ed",
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
        company: "Figmant",
        companyNote: "AI-Powered Website Optimization",
        dates: "2023 — Present",
        highlights: [
          "Engineered compound AI audit system analyzing accessibility (WCAG 2.1 AA), conversion optimization, and design quality through multi-modal input with 251+ API endpoints.",
          "Built enterprise analytics integration connecting GA4, Clarity, Hotjar, Mixpanel with 37 research-backed conversion patterns and ROI impact calculations."
        ],
        tags: ["Compound AI", "WCAG", "Node.js", "React", "BullMQ", "OAuth"]
      }
    ]
  },
  {
    era: "enterprise",
    eraLabel: "ENTERPRISE ERA",
    color: "rgba(246, 248, 237, 0.6)",
    roles: [
      {
        role: "User Experience Design Lead",
        company: "TriumphPay",
        dates: "Dec 2024 — Present",
        highlights: [
          "Translating complex financial goals (cash flow visibility) into centralized Broker Dashboards.",
          "Solving the 'Black Box' problem in factoring by visualizing the why behind approval decisions."
        ],
        tags: ["FinTech", "Cash Flow Management", "Strategic Product Design"]
      },
      {
        role: "Sr. Principal, UX Designer",
        company: "Epicor",
        dates: "Oct 2022 — Jan 2025",
        highlights: [
          "Led strategy for modernizing massive ERP modules without breaking critical business logic.",
          "Architected scalable design system for data-dense enterprise environments."
        ],
        tags: ["SaaS", "Design Systems", "User Experience Design", "Enterprise Design Patterns"]
      },
      {
        role: "Senior UX Designer → Lead UX Designer",
        company: "First American",
        dates: "Jul 2020 — Dec 2022",
        highlights: [
          "Enterprise Software UX Design for title insurance industry.",
          "Streamlined internal tools in heavily regulated environment."
        ],
        tags: ["SaaS", "Design Systems", "Point of Sale Systems", "Enterprise Design Patterns"]
      },
      {
        role: "Director of User Experience",
        company: "American First Finance",
        dates: "Apr 2018 — Feb 2020",
        highlights: [
          "Founded technology and frontend leadership roles, transforming intangible UX into feasible, quantifiable processes.",
          "Implemented SDLC and reduced time-to-market by 268%; empowered transition from waterfall to Agile.",
          "Grew customer portal utilization from 2% to 65% by overhauling UX and reducing load times by 800%.",
          "Architected web services saving close to $1.2M in hardware/vendor purchases.",
          "Developed and shipped four new-to-market products and 25 product features across WordPress, Magento, Shopify, VUE, Angular, React."
        ],
        tags: ["FinTech", "SDLC", "Agile Transformation", "Team Leadership", "SaaS"]
      },
      {
        role: "User Experience Manager",
        company: "ACE Cash Express",
        dates: "Feb 2017 — Apr 2018",
        highlights: [
          "Transformed ecommerce channels to be an agile shop developing innovative and releasable products.",
          "Created common standards and formats for release playbooks.",
          "Leveraged psychology and user behavior insights to develop conditional and contextual ecommerce experiences."
        ],
        tags: ["SaaS", "Design Systems", "Ecommerce", "Agile"]
      }
    ]
  },
  {
    era: "leadership",
    eraLabel: "LEADERSHIP ERA",
    color: "rgba(246, 248, 237, 0.4)",
    roles: [
      {
        role: "Director & Founder",
        company: "Aloha Travel Ltd.",
        dates: "Dec 2014 — Jan 2017",
        highlights: [
          "Built FareHarbor into the travel and tourism industry's top booking software, leading to acquisition by FareHarbor.",
          "Delivered 800% sales increase across client portfolio by streamlining UX with mobile-first design.",
          "Built a $20.1M revenue channel by designing and launching three mobile apps for partnership with Expedia and other OTAs.",
          "Won a Webby Award, HOW Award, and two Awwwards.com Awards."
        ],
        tags: ["Startup", "Product Design", "Mobile Apps", "Travel Tech", "Acquisition"]
      },
      {
        role: "Group Creative Director",
        company: "WorldVentures Holdings",
        dates: "Jan 2012 — Dec 2014",
        highlights: [
          "Led conception, development and launch of B2B and B2C digital products for $600M global company.",
          "Built and developed a six-member team into an organization of 40+ designers, art directors, media and UX professionals.",
          "Won two HOW Awards, one Webby Award, and four Awwwards.com Awards."
        ],
        tags: ["Team Leadership", "Digital Products", "Brand Strategy", "P&L"]
      },
      {
        role: "Creative Director",
        company: "Vitamin Research Products, LLC",
        dates: "Jan 2010 — Dec 2012",
        highlights: [
          "Expanded company's digital footprint by spearheading products from concept to launch.",
          "Managed eight-member team and $1.5M budget to deliver three organic campaigns, six sites, five micro-sites and 35 landing pages.",
          "Grew revenue 20% through multi-channel web and direct marketing campaigns.",
          "Increased conversions by 160% as the designer of the site visitor funnel."
        ],
        tags: ["Creative Direction", "Digital Marketing", "Budget Management", "Revenue Growth"]
      },
      {
        role: "Senior Creative Director",
        company: "Sparking Creativity Ltd.",
        dates: "Jan 2003 — Dec 2010",
        highlights: [
          "Advancing through progressively senior roles, rose to Senior Creative Director leading a 15-member creative and marketing team.",
          "Led pitches and negotiations to close accounts valued at $100k to $1.5M.",
          "Defined customer KPIs to meet performance goals, driving customer satisfaction and retention."
        ],
        tags: ["Creative Direction", "Team Leadership", "Client Management", "Sales"]
      }
    ]
  }
];

export default function ExperienceCard() {
  return (
    <div className="bg-[#1a1c1e] rounded-[32px] relative w-full min-h-full flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          Career Timeline
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          03/06
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 md:p-12 pt-0 pb-12">
        <div className="space-y-10 md:space-y-12">
          {CAREER_TIMELINE.map((era, eraIndex) => (
            <div key={eraIndex}>
              {/* Era Label */}
              <p
                className="text-xs md:text-sm font-medium uppercase tracking-wider mb-4 md:mb-6"
                style={{ color: era.color }}
              >
                {era.eraLabel}
              </p>

              {/* Roles in this era */}
              <div className="space-y-6 md:space-y-8">
                {era.roles.map((role, roleIndex) => (
                  <div
                    key={roleIndex}
                    className="border-l-2 pl-5 md:pl-6"
                    style={{ borderColor: era.color }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-1">
                      <h3 className="font-bold text-lg md:text-xl text-[#f6f8ed] leading-[1.3]">
                        {role.role}
                      </h3>
                      <span className="text-[#f6f8ed]/40 text-xs md:text-sm shrink-0">
                        {role.dates}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-[#f6f8ed]/60 mb-2">
                      {role.company}
                      {role.companyNote && <span className="text-[#f6f8ed]/30 ml-1">({role.companyNote})</span>}
                    </p>
                    <ul className="space-y-1">
                      {role.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="text-xs md:text-sm text-[#f6f8ed]/70 leading-[1.5]">
                          {highlight}
                        </li>
                      ))}
                    </ul>
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
