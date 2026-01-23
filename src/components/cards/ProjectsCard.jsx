const PROJECTS = [
  {
    name: "Fr8 Document Engine",
    type: "ai",
    role: "Co-Founder / Lead Architect",
    problem: "Logistics companies process 100,000+ documents daily across hundreds of carrier formats. Traditional OCR fails on unstructured documents, requiring expensive manual data entry.",
    solution: "Built a generalizable AI document engine using compounding templates and taxonomies. Instead of training per-client models, defined 'bucket' patterns that allow the system to orient itself to new document types automatically.",
    impact: [
      "100,000+ documents processed daily",
      "Self-healing workflows reduce manual intervention by 80%",
      "Zero client-specific retraining required"
    ],
    techStack: ["Python", "React", "Vector DB", "RAG", "OpenAI API"],
    insight: "The key insight was that documents share structural DNA across carriers. By defining generalizable taxonomies rather than rigid templates, the system compounds its understanding over time."
  },
  {
    name: "Foresera (Figmant)",
    type: "ai",
    role: "Founder",
    problem: "User research is expensive, slow, and often biased. Companies need continuous insight into user behavior but can't afford ongoing research teams.",
    solution: "Engineered an autonomous AI research agent that synthesizes data from multiple sources, identifies patterns, and generates visual dashboards on-the-fly.",
    impact: [
      "Research cycles reduced from weeks to hours",
      "Dynamic UI generation from natural language queries",
      "Agentic workflow orchestration"
    ],
    techStack: ["React", "Figma API", "Prompt Engineering", "Agentic Workflows"],
    insight: "The breakthrough was treating research as a conversation, not a report. The AI doesn't just find answers—it asks better questions and visualizes findings in real-time."
  },
  {
    name: "Triumph Financial Dashboard",
    type: "enterprise",
    role: "User Experience Design Lead",
    problem: "Freight brokers struggled with cash flow visibility. The factoring approval process was a 'black box'—brokers couldn't understand why invoices were approved or denied.",
    solution: "Designed a centralized Broker Dashboard that translates complex financial metrics into actionable insights. Created 'Trust Design' patterns that visualize the reasoning behind approval decisions.",
    impact: [
      "Broker confidence increased significantly",
      "Support tickets reduced by showing 'why' not just 'what'",
      "Strategic translation of C-suite goals to UX"
    ],
    techStack: ["Figma", "Design Systems", "FinTech Domain"],
    insight: "Trust isn't about showing more data—it's about explaining decisions. When users understand the 'why', they trust the system even when the answer is 'no'."
  },
  {
    name: "Epicor ERP Modernization",
    type: "enterprise",
    role: "Sr. Principal, UX Designer",
    problem: "Legacy ERP systems with decades of accumulated business logic needed modernization without breaking critical workflows that thousands of businesses depend on.",
    solution: "Led a careful, incremental modernization strategy. Built a scalable design system that could wrap legacy components while progressively enhancing the user experience.",
    impact: [
      "Modernized modules without breaking critical business logic",
      "Design system adopted across multiple product lines",
      "Reduced cognitive load in data-dense environments"
    ],
    techStack: ["Design Systems", "ERP", "SaaS", "Complex Systems"],
    insight: "The biggest risk in enterprise modernization isn't technical—it's political. Success required building trust with stakeholders who'd been burned by 'rip and replace' projects before."
  }
];

export default function ProjectsCard() {
  return (
    <div className="bg-[#1a1c1e] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="absolute flex items-center justify-between left-0 p-8 md:p-12 text-base md:text-xl text-white top-0 w-full z-10">
        <p className="font-medium tracking-[-0.02em]">
          Selected Work
        </p>
        <p className="font-normal text-right tracking-[-0.02em]">
          04/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-start p-8 md:p-16 pt-28 md:pt-32 overflow-y-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="font-extrabold text-[clamp(40px,10vw,140px)] text-[#f6f8ed] leading-[1.1] tracking-[-0.04em]">
            Impact
            <br />
            Stories
          </h2>
        </div>

        <div className="space-y-10 md:space-y-14 max-w-[1200px]">
          {PROJECTS.map((project, index) => (
            <div key={index} className="border-t-2 border-[#f6f8ed]/20 pt-6 md:pt-8">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 mb-3">
                <h3 className="font-bold text-[clamp(22px,3vw,42px)] text-[#f6f8ed] leading-[1.2]">
                  {project.name}
                </h3>
                <span
                  className="text-sm font-medium px-3 py-1 rounded-full w-fit"
                  style={{
                    backgroundColor: project.type === 'ai' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                    color: project.type === 'ai' ? '#10b981' : '#3b82f6'
                  }}
                >
                  {project.type === 'ai' ? 'AI/ML' : 'Enterprise'}
                </span>
              </div>

              <p className="text-[#f6f8ed]/50 text-sm mb-4">{project.role}</p>

              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-[#f6f8ed]/40 text-xs uppercase tracking-wider mb-1">The Problem</p>
                  <p className="text-[clamp(13px,1.3vw,20px)] text-[#f6f8ed]/80 leading-[1.5]">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="text-[#f6f8ed]/40 text-xs uppercase tracking-wider mb-1">The Solution</p>
                  <p className="text-[clamp(13px,1.3vw,20px)] text-[#f6f8ed]/80 leading-[1.5]">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.impact.map((item, i) => (
                  <span key={i} className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <span className="text-emerald-500">✓</span> {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-xs text-[#f6f8ed]/50 font-mono px-2 py-1 bg-white/5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
