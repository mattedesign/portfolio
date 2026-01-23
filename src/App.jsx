import React, { useState, useEffect } from 'react';
import {
  Cpu, Layers, Users, Briefcase, TrendingUp, ShieldCheck, Database,
  BrainCircuit, Terminal, Sparkles, AlertTriangle, CheckCircle, Search,
  Zap, Loader, Sun, Moon, Mail, Linkedin, Github, ChevronDown, ExternalLink,
  FileText, Code, Box, Workflow, ArrowRight
} from 'lucide-react';

// ============================================================================
// CANDIDATE DATA - Your career information
// ============================================================================

const CANDIDATE_PROFILE = {
  name: "Matthew Sparks",
  title: "Principal Product Architect",
  email: "sparkingmatt@gmail.com",
  tagline: "Bridging Executive Strategy & AI Architecture",
  yearsExperience: "18+",
  summary: `Principal Product Architect with 18+ years spanning Executive Creative Leadership,
Enterprise Product Strategy, and Applied AI Architecture. I bridge "Vision" (boardroom) and
"System" (engineering) - equally fluent presenting to a CFO about cash flow optimization
or an engineering team about vector embeddings and RAG pipelines.`,

  pillars: [
    {
      icon: Users,
      title: "Strategic Leadership",
      color: "purple",
      description: "10+ years leading teams, managing P&L, and driving organizational transformation at the Director level."
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Scale",
      color: "blue",
      description: "Deep expertise in FinTech, ERP, and heavily regulated sectors (Triumph, First American, Epicor)."
    },
    {
      icon: BrainCircuit,
      title: "AI Architecture",
      color: "emerald",
      description: "Architect of proprietary AI engines processing 100k+ documents/day with self-healing logic."
    }
  ],

  profileText: `
NAME: Matthew Sparks - Principal Product Architect
SUMMARY: Principal Product Architect with 18+ years spanning Executive Creative Leadership, Enterprise Product Strategy, and Applied AI Architecture. Unique ability to bridge "Vision" and "System". Led creative teams (Group Creative Director), modernized legacy ERPs (Epicor), and currently architect proprietary AI engines processing 100k+ docs/day (Fr8).

KEY VENTURES (IP):
1. Fr8 Document Engine: Co-Founder/Architect. Built doc engine handling 100k+ daily logistics documents. Defined generalizable model definitions (compounding templates) to avoid client-specific retraining. Self-healing logic with Human-in-the-Loop workflows.
2. Foresera/Figmant: Founder. Autonomous AI agent for user research. Compound intelligence prompts. Chat-to-UI React engine that generates visual dashboards on-the-fly.

ENTERPRISE EXPERIENCE:
1. Triumph Financial (Principal Product Designer): Broker Dashboards, Cash Flow Management. Strategic translation of financial goals to UX. Trust design for factoring - solved the "Black Box" problem.
2. Epicor Software (Sr. Principal UX Designer): ERP Systems, Legacy Modernization, Complex Systems Architecture. Led strategy for modernizing massive ERP modules.
3. First American (Lead UX Designer): Title Insurance, Regulatory Compliance, Process Optimization. Streamlined tools in heavily regulated environment.
4. American First Finance (Director of UX): Founded technology and frontend leadership roles. Reduced time-to-market by 268% implementing SDLC. Grew customer portal utilization from 2% to 65%.

LEADERSHIP FOUNDATION:
1. WorldVentures Holdings (Group Creative Director): Led conception and launch of B2B/B2C digital products for $600M company. Built 40+ person organization.
2. Vitamin Research Products (Creative Director): Expanded digital footprint, managed $1.5M budget, grew revenue 20% through multi-channel campaigns.
3. Launch Agency (Associate Creative Director): High-stakes pitching, team mentorship.

SKILLS: Model Schema Definition, RAG, Context Injection, Vector Databases, Agentic Workflows, Prompt Engineering, Figma, React, Node.js, Next.js, Python, OpenAI API, Anthropic API, Tailwind CSS, Design Systems, SDLC, Agile.

PHILOSOPHY: "I speak the language of compliance/P&L (Boardroom) and Agents/React (Engineering). The medium changes, but I've always been solving problems."
`
};

const CAREER_TIMELINE = [
  // ERA 3: AI ARCHITECT
  {
    era: "ai",
    eraLabel: "AI ARCHITECTURE ERA",
    roles: [
      {
        type: "ai",
        role: "Co-Founder / Lead Architect",
        company: "Fr8 Document Engine",
        companyNote: "Proprietary IP",
        dates: "2023 — Present",
        icon: Cpu,
        highlights: [
          { label: "The 100k Scale", text: "Architected a document processing engine handling 100,000+ logistics documents daily across multiple carrier formats." },
          { label: "Generalizable Models", text: "Defined compounding templates and 'bucket' taxonomies allowing AI to orient without client-specific retraining." },
          { label: "Self-Healing Logic", text: "Designed Human-in-the-Loop workflows where the system learns from exceptions automatically." }
        ],
        tags: ["Generative AI", "System Architecture", "Python", "React", "Vector DB", "RAG"]
      },
      {
        type: "ai",
        role: "Founder",
        company: "Foresera (Figmant)",
        companyNote: "Autonomous Research Platform",
        dates: "2023 — Present",
        icon: Terminal,
        highlights: [
          { label: "Compound Intelligence", text: "Engineered an agentic system that acts as an autonomous user researcher, synthesizing findings across multiple data sources." },
          { label: "Dynamic UI Generation", text: "Built a 'Chat-to-Component' engine where AI generates visual dashboards on-the-fly based on data findings." }
        ],
        tags: ["Agentic Workflows", "Prompt Engineering", "RAG", "React", "Figma"]
      }
    ]
  },
  // ERA 2: ENTERPRISE
  {
    era: "enterprise",
    eraLabel: "ENTERPRISE ERA",
    roles: [
      {
        type: "enterprise",
        role: "User Experience Design Lead",
        company: "TriumphPay (Triumph Financial)",
        dates: "Dec 2024 — Present",
        icon: Briefcase,
        highlights: [
          { label: "Strategic Translation", text: "Translating complex financial goals (cash flow visibility) into centralized Broker Dashboards." },
          { label: "Trust Design", text: "Solving the 'Black Box' problem in factoring by visualizing the why behind approval decisions." }
        ],
        tags: ["FinTech", "Cash Flow Management", "Strategic Product Design"]
      },
      {
        type: "enterprise",
        role: "Sr. Principal, UX Designer",
        company: "Epicor Software",
        dates: "Oct 2022 — Jan 2025",
        icon: Database,
        highlights: [
          { label: "Legacy Modernization", text: "Led strategy for modernizing massive ERP modules without breaking critical business logic." },
          { label: "Design Systems", text: "Architected scalable design system for data-dense enterprise environments." }
        ],
        tags: ["ERP", "SaaS", "Design Systems", "System Migration"]
      },
      {
        type: "enterprise",
        role: "Lead UX Designer",
        company: "First American",
        dates: "Dec 2021 — Dec 2022",
        icon: ShieldCheck,
        highlights: [
          { label: "Regulatory Compliance", text: "Streamlined internal tools for title agents in a heavily regulated environment." },
          { label: "Process Optimization", text: "Reduced processing time and error rates for high-volume title documents." }
        ],
        tags: ["Title Insurance", "Compliance", "Enterprise Software"]
      },
      {
        type: "enterprise",
        role: "Director of User Experience",
        company: "American First Finance",
        dates: "Apr 2018 — Feb 2020",
        icon: TrendingUp,
        highlights: [
          { label: "Transformation Leader", text: "Founded technology and frontend leadership roles as a customer champion, transforming intangible UX into feasible, quantifiable processes." },
          { label: "268% Faster", text: "Implemented SDLC and reduced time-to-market by 268%; empowered transition from waterfall to Agile." },
          { label: "65x Growth", text: "Grew customer portal utilization from 2% to 65% by overhauling experience and reducing load times by 800%." }
        ],
        tags: ["FinTech", "SDLC", "Agile Transformation", "Team Leadership"]
      }
    ]
  },
  // ERA 1: LEADERSHIP
  {
    era: "leadership",
    eraLabel: "LEADERSHIP ERA",
    roles: [
      {
        type: "leadership",
        role: "Group Creative Director",
        company: "WorldVentures Holdings",
        dates: "Jan 2012 — Dec 2014",
        icon: Users,
        highlights: [
          { label: "Scale & Impact", text: "Led conception, development and launch of B2B and B2C digital products for $600M global company." },
          { label: "Team Building", text: "Built and developed a six-member team into an organization of 40+ designers, art directors, media and UX professionals." },
          { label: "Award-Winning", text: "Won two HOW Awards, one Webby Award, and four Awwwards Awards." }
        ],
        tags: ["Team Leadership", "Digital Products", "Brand Strategy", "P&L"]
      },
      {
        type: "leadership",
        role: "Creative Director",
        company: "Vitamin Research Products",
        dates: "Jan 2010 — Dec 2012",
        icon: Layers,
        highlights: [
          { label: "Digital Expansion", text: "Expanded company's digital footprint by spearheading products from concept to launch." },
          { label: "Revenue Growth", text: "Grew revenue 20% through multi-channel web and direct marketing campaigns." },
          { label: "Process Innovation", text: "Increased conversions by 160% and improved UX as the designer of the site visitor funnel." }
        ],
        tags: ["Creative Direction", "Digital Marketing", "Revenue Growth"]
      }
    ]
  }
];

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
    solution: "Engineered an autonomous AI research agent that synthesizes data from multiple sources, identifies patterns, and generates visual dashboards on-the-fly. The system acts as a compound intelligence layer.",
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

// ============================================================================
// THEME CONTEXT
// ============================================================================

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return React.useContext(ThemeContext);
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

function Badge({ children, color = "emerald", className = "" }) {
  const colors = {
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    slate: "bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600",
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-full border ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    secondary: "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };
  return (
    <button
      className={`font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "", glow = false, glowColor = "emerald" }) {
  const glowClasses = glow ? {
    emerald: "shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]",
    blue: "shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]",
    purple: "shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
  }[glowColor] : "";

  return (
    <div className={`bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl backdrop-blur-sm ${glowClasses} ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle, icon: Icon, badge }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        {Icon && <Icon className="w-7 h-7 text-emerald-600 dark:text-emerald-500" />}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
        {badge && <Badge color="emerald">{badge}</Badge>}
      </div>
      <div className="h-1 w-20 bg-emerald-500 rounded-full mb-4"></div>
      {subtitle && <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}

// ============================================================================
// NAVIGATION
// ============================================================================

function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
            <Cpu size={20} strokeWidth={2.5} />
          </div>
          <span>MATTHEW<span className="text-slate-400 dark:text-slate-500 font-normal">.SPARKS</span></span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-slate-600" />}
          </button>
          <a
            href={`mailto:${CANDIDATE_PROFILE.email}`}
            className="hidden sm:flex px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors items-center gap-2"
          >
            <Mail size={16} />
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        <Badge color="emerald" className="mb-6">AVAILABLE FOR LEADERSHIP ROLES</Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
          Bridging the gap between{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            Executive Strategy
          </span>
          {' '}&{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
            AI Architecture
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl border-l-4 border-slate-300 dark:border-slate-700 pl-6">
          I combine the organizational maturity of a <strong className="text-slate-900 dark:text-white">Group Creative Director</strong>,
          the system depth of a <strong className="text-slate-900 dark:text-white">FinTech Principal</strong>,
          and the technical agility of an <strong className="text-slate-900 dark:text-white">AI Founder</strong>.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Button size="lg" onClick={() => document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' })}>
            <Zap size={20} />
            Analyze My Fit For Your Role
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}>
            View Career Evolution
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {CANDIDATE_PROFILE.pillars.map((pillar, i) => (
          <Card key={i} className="p-6 hover:scale-[1.02] transition-transform" glow glowColor={pillar.color}>
            <div className={`flex items-center gap-3 mb-3 ${
              pillar.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
              pillar.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              'text-emerald-600 dark:text-emerald-400'
            }`}>
              <pillar.icon size={24} />
              <span className="font-bold">{pillar.title}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {pillar.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CAREER TIMELINE
// ============================================================================

function TimelineRole({ role }) {
  const typeColors = {
    leadership: { border: "border-purple-500/30", badge: "purple", icon: "text-purple-500" },
    enterprise: { border: "border-blue-500/30", badge: "blue", icon: "text-blue-500" },
    ai: { border: "border-emerald-500/30", badge: "emerald", icon: "text-emerald-500" }
  };

  const typeLabels = {
    leadership: "Strategic Leadership",
    enterprise: "Enterprise Systems",
    ai: "Applied AI Architecture"
  };

  const colors = typeColors[role.type];
  const Icon = role.icon;

  return (
    <Card className={`p-6 border-l-4 ${colors.border} hover:scale-[1.01] transition-transform`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge color={colors.badge}>{typeLabels[role.type]}</Badge>
            <span className="text-slate-500 dark:text-slate-500 text-xs font-mono">{role.dates}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role.role}</h3>
          <div className="text-lg text-slate-700 dark:text-slate-300 font-medium">
            {role.company}
            {role.companyNote && <span className="text-slate-500 dark:text-slate-500 text-sm ml-2">({role.companyNote})</span>}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 ${colors.icon}`}>
            <Icon size={24} />
          </div>
        )}
      </div>

      <div className="space-y-3 mb-5">
        {role.highlights.map((item, i) => (
          <div key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0"></span>
            <span><strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-slate-200 dark:border-slate-800 pt-4">
        {role.tags.map((tag, i) => (
          <span key={i} className="text-xs text-slate-500 dark:text-slate-500 font-mono px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}

function CareerTimeline() {
  const eraColors = {
    ai: "text-emerald-500",
    enterprise: "text-blue-500",
    leadership: "text-purple-500"
  };

  return (
    <section id="timeline" className="py-20 px-6 max-w-5xl mx-auto">
      <SectionHeader
        title="The Evolution"
        subtitle="A career built on progressively complex problem solving—from creative teams to banking systems to AI architectures. The medium changes, but I've always been solving problems."
        icon={TrendingUp}
      />

      <div className="space-y-16">
        {CAREER_TIMELINE.map((era, eraIndex) => (
          <div key={eraIndex} className="relative">
            <div className={`hidden md:block absolute -left-20 top-0 ${eraColors[era.era]} font-mono text-sm font-bold rotate-[-90deg] origin-center translate-y-16 w-36 text-center uppercase tracking-wider`}>
              {era.eraLabel}
            </div>
            <div className={`md:hidden mb-4 ${eraColors[era.era]} font-mono text-sm font-bold uppercase tracking-wider`}>
              {era.eraLabel}
            </div>
            <div className="space-y-6">
              {era.roles.map((role, roleIndex) => (
                <TimelineRole key={roleIndex} role={role} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PROJECTS SECTION
// ============================================================================

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  const typeColors = {
    ai: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400" },
    enterprise: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400" }
  };

  const colors = typeColors[project.type];

  return (
    <Card className={`overflow-hidden border-t-4 ${colors.border}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge color={project.type === 'ai' ? 'emerald' : 'blue'}>
                {project.type === 'ai' ? 'AI/ML' : 'Enterprise'}
              </Badge>
              <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">{project.role}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.name}</h3>
          </div>
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
            {project.type === 'ai' ? <BrainCircuit size={20} /> : <Briefcase size={20} />}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">The Problem</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">The Solution</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{project.solution}</p>
          </div>

          {expanded && (
            <div className="animate-fade-in space-y-4 pt-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Impact</h4>
                <ul className="space-y-1">
                  {project.impact.map((item, i) => (
                    <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}>
                <h4 className={`text-sm font-semibold ${colors.text} mb-1`}>Key Insight</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm italic">"{project.insight}"</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          {project.techStack.map((tech, i) => (
            <span key={i} className="text-xs text-slate-500 font-mono px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Show Less' : 'Read More'}
          <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </Card>
  );
}

function Projects() {
  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Selected Work"
          subtitle="From AI document engines processing 100k+ docs/day to enterprise dashboards solving trust problems—here's how I approach complex challenges."
          icon={Code}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ROLE FIT ANALYZER (Claude-Powered)
// ============================================================================

function RoleAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  const analyzeFit = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    // If no API key, use mock analysis
    if (!apiKey) {
      setTimeout(() => {
        setAnalysis(generateMockAnalysis(jobDescription));
        setLoading(false);
      }, 2000);
      return;
    }

    const systemPrompt = `You are an expert Executive Talent Strategist with deep knowledge of tech hiring.
Analyze the fit between a candidate profile and a job description. Be honest but persuasive.
Focus on genuine alignment, unique differentiators, and transparent gaps.`;

    const userPrompt = `CANDIDATE PROFILE:
${CANDIDATE_PROFILE.profileText}

JOB DESCRIPTION:
${jobDescription}

Analyze how this candidate fits the role. Return a JSON object with:
{
  "fit_score": <number 1-100>,
  "fit_summary": "<one sentence summary of overall fit>",
  "strengths": ["<3-4 specific strengths with evidence from profile>"],
  "hidden_value": ["<2-3 value-adds the JD didn't explicitly ask for but would benefit from>"],
  "gaps": ["<1-3 honest gaps or areas where candidate may need growth>"],
  "talking_points": ["<2-3 specific angles candidate should emphasize in interviews>"]
}

Be specific and reference actual experience from the profile. Do not use generic statements.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.content[0].text;

      // Parse JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setAnalysis(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error('Could not parse response');
      }
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Using demo mode.");
      setTimeout(() => {
        setAnalysis(generateMockAnalysis(jobDescription));
        setLoading(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const generateMockAnalysis = (jd) => {
    const hasAI = /ai|machine learning|ml|data|model/i.test(jd);
    const hasLeadership = /lead|director|principal|senior|manager/i.test(jd);
    const hasEnterprise = /enterprise|fintech|banking|erp|saas/i.test(jd);

    return {
      fit_score: hasAI ? 88 : hasEnterprise ? 85 : 78,
      fit_summary: hasAI
        ? "Strong alignment with AI architecture requirements, with unique enterprise experience as a differentiator."
        : "Excellent enterprise product experience with emerging AI capabilities that add strategic value.",
      strengths: [
        "Proven ability to bridge Strategy & Engineering—rare 'unicorn' skill combining Group Creative Director experience with hands-on AI architecture",
        hasAI ? "Active AI practitioner: Fr8 Document Engine processes 100k+ docs/day with self-healing logic" : "Deep enterprise product experience across FinTech (Triumph), ERP (Epicor), and compliance (First American)",
        hasLeadership ? "Director-level organizational experience: Built and scaled teams of 40+, managed P&L, drove digital transformation" : "Principal-level technical depth with hands-on implementation capability",
        "Track record of quantifiable impact: 268% faster time-to-market, 65x portal utilization growth, 800% load time improvement"
      ],
      hidden_value: [
        "Founder agility in corporate structure—can prototype and ship without waiting for engineering bandwidth",
        hasEnterprise ? "Regulatory compliance experience (Title Insurance, FinTech) reduces risk in regulated industries" : "Enterprise-grade thinking applied to AI systems—understands scale, compliance, and organizational change",
        "Design systems expertise enables consistent, scalable product experiences across teams"
      ],
      gaps: [
        hasAI && jd.toLowerCase().includes('phd') ? "Applied AI architect, not academic researcher—focus is on shipping products, not publishing papers" : "Primary experience is in product/UX roles—if role requires pure engineering IC work, would need clear scope definition",
        "Most recent enterprise roles have been in design leadership; if role requires hands-on coding daily, that's a shift (though founder work demonstrates capability)"
      ],
      talking_points: [
        "Lead with the Fr8 Document Engine story—100k docs/day, self-healing logic, generalizable AI models",
        "Emphasize the 'translator' value: can present to CFOs and engineering teams with equal credibility",
        "Highlight transformation experience: American First Finance went from 2% to 65% portal adoption under my UX leadership"
      ]
    };
  };

  return (
    <section id="analyzer" className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-20 opacity-5">
        <BrainCircuit size={400} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
            <Sparkles size={16} /> CLAUDE-POWERED
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Role Fit Analyzer</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Paste any job description below. AI will analyze my profile against your requirements to identify strengths, hidden value, and honest gaps.
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono ml-2 flex items-center gap-2">
                <Terminal size={12} /> fit_analyzer.exe
              </div>
            </div>
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-mono"
            >
              {showApiInput ? 'Hide' : 'Add'} API Key
            </button>
          </div>

          <div className="p-6">
            {showApiInput && (
              <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="block text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  Anthropic API Key (optional - enables live analysis)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            )}

            {!analysis ? (
              <div className="space-y-4">
                <textarea
                  className="w-full h-48 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg p-4 text-slate-700 dark:text-slate-300 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  placeholder="Paste job description here...

Example: We're looking for a Senior Product Manager with experience in AI/ML products, enterprise SaaS, and cross-functional leadership..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>

                {error && (
                  <div className="text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {error}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-mono">
                    {!apiKey && "* Demo Mode (intelligent mock analysis)"}
                  </span>
                  <Button
                    onClick={analyzeFit}
                    disabled={loading || !jobDescription.trim()}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader className="animate-spin" size={18} /> : <Zap size={18} />}
                    {loading ? 'Analyzing...' : 'Run Analysis'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                {/* Fit Score */}
                <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {analysis.fit_score}%
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Fit Score</div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400">{analysis.fit_summary}</div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                  <h3 className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2 mb-3">
                    <CheckCircle size={20} /> Core Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysis.strengths.map((point, i) => (
                      <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex gap-2">
                        <span className="text-emerald-500 mt-0.5">›</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hidden Value */}
                <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                  <h3 className="text-blue-700 dark:text-blue-400 font-bold flex items-center gap-2 mb-3">
                    <Search size={20} /> The "Hidden Delta" (Unasked Value)
                  </h3>
                  <ul className="space-y-2">
                    {analysis.hidden_value.map((point, i) => (
                      <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex gap-2">
                        <span className="text-blue-500 mt-0.5">›</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps */}
                <div className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                  <h3 className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2 mb-3">
                    <AlertTriangle size={20} /> Honest Gaps / Considerations
                  </h3>
                  <ul className="space-y-2">
                    {analysis.gaps.map((point, i) => (
                      <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex gap-2">
                        <span className="text-amber-500 mt-0.5">›</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Talking Points */}
                {analysis.talking_points && (
                  <div className="p-5 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-500/20 rounded-lg">
                    <h3 className="text-purple-700 dark:text-purple-400 font-bold flex items-center gap-2 mb-3">
                      <FileText size={20} /> Interview Talking Points
                    </h3>
                    <ul className="space-y-2">
                      {analysis.talking_points.map((point, i) => (
                        <li key={i} className="text-slate-700 dark:text-slate-300 text-sm flex gap-2">
                          <span className="text-purple-500 mt-0.5">›</span> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => { setAnalysis(null); setJobDescription(''); }}
                  className="w-full py-3 text-slate-500 hover:text-slate-700 dark:hover:text-white text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Analyze Another Role
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

// ============================================================================
// VALUE PROPOSITION / FOOTER
// ============================================================================

function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
          The "Unicorn" Value Proposition
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
          <Card className="p-6 border-l-4 border-purple-500/50" glow glowColor="purple">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Briefcase className="text-purple-500" size={20} />
              For The Boardroom
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I speak the language of compliance, P&L, and risk. I have the "Director" background to navigate politics and the "Principal" background to understand complex legacy systems.
            </p>
          </Card>

          <Card className="p-6 border-l-4 border-emerald-500/50" glow glowColor="emerald">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Terminal className="text-emerald-500" size={20} />
              For The Engineering Team
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I speak the language of Agents, RAG, and React. I don't just "manage"—I build. I can prototype the future while the team is still discussing the present.
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => window.location.href = `mailto:${CANDIDATE_PROFILE.email}`}>
            <Mail size={20} />
            Let's Talk
          </Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' })}>
            <Zap size={20} />
            Analyze Role Fit
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Matthew Sparks. Built with React + Claude.
        </div>
        <div className="flex items-center gap-4">
          <a href={`mailto:${CANDIDATE_PROFILE.email}`} className="text-slate-500 hover:text-emerald-500 transition-colors">
            <Mail size={20} />
          </a>
          <a href="https://linkedin.com/in/matthewsparks" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/sparkingmatt" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
        <Navigation />
        <Hero />
        <CareerTimeline />
        <Projects />
        <RoleAnalyzer />
        <ValueProposition />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
