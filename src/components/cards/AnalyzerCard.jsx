import { useState } from 'react';
import { Zap, Loader, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const CANDIDATE_PROFILE = {
  email: "sparkingmatt@gmail.com",
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

SKILLS: Model Schema Definition, RAG, Context Injection, Vector Databases, Agentic Workflows, Prompt Engineering, Figma, React, Node.js, Next.js, Python, OpenAI API, Anthropic API, Tailwind CSS, Design Systems, SDLC, Agile.

PHILOSOPHY: "I speak the language of compliance/P&L (Boardroom) and Agents/React (Engineering). The medium changes, but I've always been solving problems."
`
};

export default function AnalyzerCard() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const envApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  const analyzeFit = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);

    if (!envApiKey) {
      setTimeout(() => {
        setAnalysis(generateMockAnalysis(jobDescription));
        setLoading(false);
      }, 2000);
      return;
    }

    const systemPrompt = `You are an expert Executive Talent Strategist. Analyze the fit between a candidate profile and a job description. Be honest but persuasive.`;

    const userPrompt = `CANDIDATE PROFILE:\n${CANDIDATE_PROFILE.profileText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nAnalyze fit. Return JSON: { "fit_score": <1-100>, "fit_summary": "<one sentence>", "strengths": ["<3-4 specific strengths>"], "hidden_value": ["<2-3 value-adds>"], "gaps": ["<1-3 honest gaps>"], "talking_points": ["<2-3 interview angles>"] }`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': envApiKey,
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

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const text = data.content[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setAnalysis(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error('Could not parse response');
      }
    } catch (err) {
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
        hasLeadership ? "Director-level organizational experience: Built and scaled teams of 40+, managed P&L" : "Principal-level technical depth with hands-on implementation capability",
        "Track record of quantifiable impact: 268% faster time-to-market, 65x portal utilization growth"
      ],
      hidden_value: [
        "Founder agility in corporate structure—can prototype and ship without waiting for engineering bandwidth",
        hasEnterprise ? "Regulatory compliance experience reduces risk in regulated industries" : "Enterprise-grade thinking applied to AI systems",
        "Design systems expertise enables consistent, scalable product experiences"
      ],
      gaps: [
        hasAI && jd.toLowerCase().includes('phd') ? "Applied AI architect, not academic researcher—focus is on shipping products" : "Primary experience is in product/UX roles—IC engineering work needs clear scope",
        "Most recent roles in design leadership; daily hands-on coding would be a shift"
      ],
      talking_points: [
        "Lead with Fr8 Document Engine—100k docs/day, self-healing logic, generalizable AI models",
        "Emphasize 'translator' value: can present to CFOs and engineering teams with equal credibility",
        "Highlight transformation: American First Finance 2% to 65% portal adoption"
      ]
    };
  };

  return (
    <div className="bg-[#1a1c1e] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-8 md:p-12">
        <p className="text-[#f6f8ed]/70 text-base md:text-lg font-normal">
          Role Fit Analyzer
        </p>
        <p className="text-[#f6f8ed]/50 text-base md:text-lg">
          05/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 pt-0">
        <div className="max-w-[800px] w-full">
          {!analysis ? (
            <div className="space-y-8">
              <div>
                <h2 className="font-extrabold text-[clamp(36px,6vw,72px)] text-[#f6f8ed] leading-[1.1] tracking-[-0.03em] mb-4">
                  Analyze My Fit
                </h2>
                <p className="text-base md:text-lg text-[#f6f8ed]/60 leading-[1.6]">
                  Paste any job description. AI analyzes my profile against your requirements.
                </p>
              </div>

              <textarea
                className="w-full h-40 bg-[#f6f8ed] border-0 rounded-2xl p-5 text-[#1a1c1e] text-base focus:outline-none focus:ring-2 focus:ring-[#f6f8ed]/50 resize-none"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              {error && (
                <div className="text-amber-400 text-sm flex items-center gap-2">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#f6f8ed]/40">
                  {!envApiKey && "Demo Mode"}
                </span>
                <button
                  onClick={analyzeFit}
                  disabled={loading || !jobDescription.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#f6f8ed] text-[#1a1c1e] rounded-xl font-medium text-base hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : <Zap size={18} />}
                  {loading ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Fit Score */}
              <div className="flex items-center gap-5 p-5 bg-emerald-500/10 rounded-xl">
                <div className="text-4xl font-bold text-emerald-400">
                  {analysis.fit_score}%
                </div>
                <div>
                  <div className="text-xs font-medium text-emerald-400 mb-1">Fit Score</div>
                  <div className="text-sm text-[#f6f8ed]/70">{analysis.fit_summary}</div>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-5 bg-white/5 rounded-xl">
                <h3 className="text-emerald-400 font-medium flex items-center gap-2 mb-3 text-sm">
                  <CheckCircle size={16} /> Core Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hidden Value */}
              <div className="p-5 bg-white/5 rounded-xl">
                <h3 className="text-blue-400 font-medium flex items-center gap-2 mb-3 text-sm">
                  <Search size={16} /> Hidden Delta
                </h3>
                <ul className="space-y-2">
                  {analysis.hidden_value.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="p-5 bg-white/5 rounded-xl">
                <h3 className="text-amber-400 font-medium flex items-center gap-2 mb-3 text-sm">
                  <AlertTriangle size={16} /> Honest Gaps
                </h3>
                <ul className="space-y-2">
                  {analysis.gaps.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-sm leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => { setAnalysis(null); setJobDescription(''); }}
                className="w-full py-3 text-[#f6f8ed]/60 hover:text-[#f6f8ed] font-medium transition-colors border border-[#f6f8ed]/20 rounded-xl hover:bg-white/5"
              >
                Analyze Another Role
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
