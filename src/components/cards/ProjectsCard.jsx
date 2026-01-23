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
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#1a1c1e] text-base md:text-lg font-normal">
          Selected Work
        </p>
        <p className="text-[#1a1c1e]/60 text-base md:text-lg">
          04/06
        </p>
      </div>

      {/* Main headline */}
      <div className="px-8 md:px-12 mb-8 md:mb-12">
        <h2 className="font-extrabold text-[clamp(48px,10vw,120px)] text-[#1a1c1e] leading-[1.05] tracking-[-0.03em]">
          Impact Stories
        </h2>
      </div>

      {/* Projects list */}
      <div className="flex-1 px-8 md:px-12 pb-8 md:pb-12 overflow-y-auto">
        <div className="space-y-0">
          {PROJECTS.map((project, index) => (
            <div key={index} className="border-t border-[#1a1c1e]/10 py-6 md:py-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
                <div className="flex-1">
                  <h3 className="font-bold text-[clamp(20px,2.5vw,32px)] text-[#1a1c1e] leading-[1.2] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[#1a1c1e]/50 text-sm mb-3">{project.role}</p>
                  <p className="text-[#1a1c1e]/70 text-sm md:text-base leading-[1.6] max-w-[600px]">
                    {project.solution}
                  </p>
                </div>
                <div className="md:text-right md:min-w-[200px]">
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: project.type === 'ai' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: project.type === 'ai' ? '#059669' : '#2563eb'
                    }}
                  >
                    {project.type === 'ai' ? 'AI/ML' : 'Enterprise'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
