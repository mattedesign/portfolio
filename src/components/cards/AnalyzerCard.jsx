import { useState } from 'react';
import { Sparkles, Zap, Loader, AlertTriangle, CheckCircle, Search, FileText } from 'lucide-react';

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
    <div className="bg-[#f6f8ed] overflow-clip relative w-full h-full flex flex-col">
      {/* Header */}
      <div className="absolute flex items-center justify-between left-0 p-8 md:p-12 text-base md:text-xl text-[#1a1c1e] top-0 w-full z-10">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-emerald-600" />
          <p className="font-medium tracking-[-0.02em]">
            Role Fit Analyzer
          </p>
        </div>
        <p className="font-normal text-right tracking-[-0.02em]">
          05/06
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 pt-32 md:pt-36">
        <div className="max-w-[900px] mx-auto w-full">
          {!analysis ? (
            <div className="space-y-8">
              <div>
                <h2 className="font-extrabold text-[clamp(40px,8vw,100px)] text-[#1a1c1e] leading-[1.1] tracking-[-0.04em] mb-6">
                  Analyze
                  <br />
                  My Fit
                </h2>
                <p className="text-[clamp(16px,1.5vw,24px)] text-[#424437] leading-[1.6]">
                  Paste any job description below. AI will analyze my profile against your requirements.
                </p>
              </div>

              <textarea
                className="w-full h-48 bg-white border-2 border-[#1a1c1e]/10 rounded-2xl p-6 text-[#1a1c1e] text-lg focus:outline-none focus:border-emerald-500 resize-none"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              {error && (
                <div className="text-amber-600 text-sm flex items-center gap-2">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#424437]/60">
                  {!envApiKey && "Demo Mode (intelligent mock analysis)"}
                </span>
                <button
                  onClick={analyzeFit}
                  disabled={loading || !jobDescription.trim()}
                  className="flex items-center gap-2 px-8 py-4 bg-[#1a1c1e] text-[#f6f8ed] rounded-xl font-medium text-lg hover:bg-[#2a2c2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader className="animate-spin" size={20} /> : <Zap size={20} />}
                  {loading ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Fit Score */}
              <div className="flex items-center gap-6 p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <div className="text-5xl font-bold text-emerald-600">
                  {analysis.fit_score}%
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-700">Fit Score</div>
                  <div className="text-sm text-emerald-600">{analysis.fit_summary}</div>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <h3 className="text-emerald-700 font-bold flex items-center gap-2 mb-4">
                  <CheckCircle size={20} /> Core Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((point, i) => (
                    <li key={i} className="text-[#424437] text-sm flex gap-2">
                      <span className="text-emerald-500 mt-0.5">›</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hidden Value */}
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                <h3 className="text-blue-700 font-bold flex items-center gap-2 mb-4">
                  <Search size={20} /> Hidden Delta
                </h3>
                <ul className="space-y-2">
                  {analysis.hidden_value.map((point, i) => (
                    <li key={i} className="text-[#424437] text-sm flex gap-2">
                      <span className="text-blue-500 mt-0.5">›</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                <h3 className="text-amber-700 font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle size={20} /> Honest Gaps
                </h3>
                <ul className="space-y-2">
                  {analysis.gaps.map((point, i) => (
                    <li key={i} className="text-[#424437] text-sm flex gap-2">
                      <span className="text-amber-500 mt-0.5">›</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Talking Points */}
              {analysis.talking_points && (
                <div className="p-6 bg-purple-50 border border-purple-200 rounded-2xl">
                  <h3 className="text-purple-700 font-bold flex items-center gap-2 mb-4">
                    <FileText size={20} /> Interview Talking Points
                  </h3>
                  <ul className="space-y-2">
                    {analysis.talking_points.map((point, i) => (
                      <li key={i} className="text-[#424437] text-sm flex gap-2">
                        <span className="text-purple-500 mt-0.5">›</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => { setAnalysis(null); setJobDescription(''); }}
                className="w-full py-4 text-[#424437] hover:text-[#1a1c1e] font-medium transition-colors border-2 border-[#1a1c1e]/10 rounded-xl hover:bg-white"
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
