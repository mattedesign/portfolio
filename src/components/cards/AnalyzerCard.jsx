import { useState, useRef } from 'react';
import { Zap, Loader, Upload, FileText, X } from 'lucide-react';
import mammoth from 'mammoth';

const CANDIDATE_PROFILE = {
  email: "sparkingmatt@gmail.com",
  profileText: `
NAME: Matthew Sparks - Principal Product Architect
SUMMARY: Principal Product Architect with 18+ years spanning Executive Creative Leadership, Enterprise Product Strategy, and Applied AI Architecture. Unique ability to bridge "Vision" and "System". Led creative teams (Group Creative Director), modernized legacy ERPs (Epicor), and currently architect proprietary AI engines processing 100k+ docs/day (Fr8).

KEY VENTURES (IP):
1. Fr8 Document Engine: Co-Founder/Architect. Built doc engine handling 100k+ daily logistics documents. Defined generalizable model definitions (compounding templates) to avoid client-specific retraining. Self-healing logic with Human-in-the-Loop workflows.
2. Figmant: Founder. AI-powered website optimization platform. Compound AI audit system analyzing accessibility (WCAG 2.1 AA), conversion optimization, and design quality through multi-modal input. 251+ API endpoints with real-time SSE streaming. Enterprise analytics integration (GA4, Clarity, Hotjar, Mixpanel). 37 research-backed conversion patterns with ROI impact calculations.

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
  const [fileName, setFileName] = useState(null);
  const [fileData, setFileData] = useState(null); // Store base64 file data for PDFs
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const envApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleFileRead = async (file) => {
    setError(null);
    setFileData(null);

    // Handle text files directly
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      setFileName(file.name);
      const text = await file.text();
      setJobDescription(text);
      return;
    }

    // Handle PDFs - use Claude's document understanding
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        setFileName(file.name);
        const base64 = await fileToBase64(file);
        setFileData({ type: 'pdf', base64, mediaType: 'application/pdf' });
        setJobDescription(''); // Clear text since we're using the PDF
        return;
      } catch {
        setError("Could not read PDF. Please try copy/paste instead.");
        setFileName(null);
        return;
      }
    }

    // Handle Word docs - extract text using mammoth.js
    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      try {
        setFileName(file.name);
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        if (result.value && result.value.trim().length > 50) {
          setJobDescription(result.value);
          return;
        } else {
          setError("Could not extract text from Word doc. Please try copy/paste instead.");
          setFileName(null);
          return;
        }
      } catch (err) {
        console.error('Mammoth error:', err);
        setError("Could not read Word doc. Please try saving as PDF or copy/paste.");
        setFileName(null);
        return;
      }
    }

    // Handle images - use Claude's vision
    if (file.type.startsWith('image/')) {
      try {
        setFileName(file.name);
        const base64 = await fileToBase64(file);
        setFileData({ type: 'image', base64, mediaType: file.type });
        setJobDescription('');
        return;
      } catch {
        setError("Could not read image. Please try again.");
        setFileName(null);
        return;
      }
    }

    // Try to read other files as text
    try {
      const text = await file.text();
      if (text && !text.includes('\x00') && text.length > 50) {
        setFileName(file.name);
        setJobDescription(text);
      } else {
        setError("Could not read this file format. Please paste the job description below.");
        setFileName(null);
      }
    } catch {
      setError("Could not read file. Please paste the job description below.");
      setFileName(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileRead(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFileRead(file);
  };

  const clearFile = () => {
    setFileName(null);
    setFileData(null);
    setJobDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const analyzeFit = async () => {
    // Need either text or file data
    if (!jobDescription.trim() && !fileData) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    if (!envApiKey) {
      setTimeout(() => {
        setAnalysis(generateMockAnalysis(jobDescription || 'document upload'));
        setLoading(false);
      }, 2000);
      return;
    }

    const systemPrompt = `You are an expert Executive Talent Strategist. Analyze the fit between a candidate profile and a job description. Be honest but persuasive.`;

    try {
      let userContent;

      if (fileData) {
        // Use Claude's vision/document capabilities
        if (fileData.type === 'pdf') {
          userContent = [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: fileData.mediaType,
                data: fileData.base64
              }
            },
            {
              type: 'text',
              text: `CANDIDATE PROFILE:\n${CANDIDATE_PROFILE.profileText}\n\nThe document above contains a job description. Extract the key requirements and analyze the fit between this candidate and the role.\n\nReturn JSON: { "fit_score": <1-100>, "fit_summary": "<one sentence>", "strengths": ["<3-4 specific strengths>"], "hidden_value": ["<2-3 value-adds>"], "gaps": ["<1-3 honest gaps>"], "talking_points": ["<2-3 interview angles>"] }`
            }
          ];
        } else if (fileData.type === 'image') {
          userContent = [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: fileData.mediaType,
                data: fileData.base64
              }
            },
            {
              type: 'text',
              text: `CANDIDATE PROFILE:\n${CANDIDATE_PROFILE.profileText}\n\nThe image above contains a job description. Extract the key requirements and analyze the fit between this candidate and the role.\n\nReturn JSON: { "fit_score": <1-100>, "fit_summary": "<one sentence>", "strengths": ["<3-4 specific strengths>"], "hidden_value": ["<2-3 value-adds>"], "gaps": ["<1-3 honest gaps>"], "talking_points": ["<2-3 interview angles>"] }`
            }
          ];
        }
      } else {
        // Plain text job description
        userContent = `CANDIDATE PROFILE:\n${CANDIDATE_PROFILE.profileText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nAnalyze fit. Return JSON: { "fit_score": <1-100>, "fit_summary": "<one sentence>", "strengths": ["<3-4 specific strengths>"], "hidden_value": ["<2-3 value-adds>"], "gaps": ["<1-3 honest gaps>"], "talking_points": ["<2-3 interview angles>"] }`;
      }

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
          messages: [{ role: 'user', content: userContent }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.content[0].text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setAnalysis(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error('Could not parse response');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError("Analysis failed. Using demo mode.");
      setTimeout(() => {
        setAnalysis(generateMockAnalysis(jobDescription || 'document'));
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

  const hasInput = jobDescription.trim() || fileData;

  return (
    <div id="analyzer" className="bg-[#1a1c1e] overflow-clip relative w-full h-full flex flex-col">
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
      <div className="flex-1 flex flex-col p-8 md:p-12 pt-0">
        {!analysis ? (
          <div className="flex-1 flex flex-col">
            <div className="mb-8">
              <h2 className="font-extrabold text-[clamp(36px,8vw,96px)] text-[#f6f8ed] leading-[1.05] tracking-[-0.03em] mb-4">
                Analyze My Fit
              </h2>
              <p className="text-base md:text-xl text-[#f6f8ed]/60 leading-[1.6] max-w-[600px]">
                Upload a job description (PDF, image, or text) and AI analyzes my profile against your requirements.
              </p>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left: File upload area */}
              <div className="flex-1 flex flex-col">
                <div
                  className={`flex-1 min-h-[200px] lg:min-h-0 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-colors cursor-pointer ${
                    isDragging
                      ? 'border-[#f6f8ed] bg-[#f6f8ed]/10'
                      : fileData
                        ? 'border-[#f6f8ed]/40 bg-[#f6f8ed]/5'
                        : 'border-[#f6f8ed]/20 hover:border-[#f6f8ed]/40'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {fileName ? (
                    <div className="text-center">
                      <FileText size={48} className="text-[#f6f8ed]/60 mx-auto mb-4" />
                      <p className="text-[#f6f8ed] font-medium mb-2">{fileName}</p>
                      {fileData && (
                        <p className="text-[#f6f8ed]/40 text-xs mb-3">
                          {fileData.type === 'pdf' ? 'PDF ready for Claude Vision' : 'Image ready for analysis'}
                        </p>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); clearFile(); }}
                        className="text-[#f6f8ed]/40 hover:text-[#f6f8ed] text-sm flex items-center gap-1 mx-auto"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload size={48} className="text-[#f6f8ed]/40 mx-auto mb-4" />
                      <p className="text-[#f6f8ed]/70 font-medium mb-2">
                        Drop file or click to upload
                      </p>
                      <p className="text-[#f6f8ed]/40 text-sm">
                        PDF, images, or text files
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Text area and button */}
              <div className="flex-1 flex flex-col">
                <textarea
                  className="flex-1 min-h-[200px] lg:min-h-0 w-full bg-[#f6f8ed] border-0 rounded-2xl p-6 text-[#1a1c1e] text-base focus:outline-none focus:ring-2 focus:ring-[#f6f8ed]/50 resize-none"
                  placeholder="Or paste job description here..."
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    // Clear file data if user starts typing
                    if (e.target.value && fileData) {
                      setFileData(null);
                      setFileName(null);
                    }
                  }}
                />
              </div>
            </div>

            {error && (
              <p className="text-[#f6f8ed]/60 text-sm mt-4">{error}</p>
            )}

            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-[#f6f8ed]/40">
                {!envApiKey && "Demo Mode"}
                {envApiKey && fileData && "Using Claude Vision"}
              </span>
              <button
                onClick={analyzeFit}
                disabled={loading || !hasInput}
                className="flex items-center gap-2 px-8 py-4 bg-[#f6f8ed] text-[#1a1c1e] rounded-xl font-medium text-base hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader className="animate-spin" size={20} /> : <Zap size={20} />}
                {loading ? 'Analyzing...' : 'Run Analysis'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row gap-8">
            {/* Left column: Score and summary */}
            <div className="lg:w-1/3">
              <div className="p-8 bg-[#f6f8ed]/5 rounded-2xl mb-6">
                <div className="text-[clamp(48px,10vw,80px)] font-extrabold text-[#f6f8ed] leading-none mb-2">
                  {analysis.fit_score}%
                </div>
                <p className="text-[#f6f8ed]/40 text-sm uppercase tracking-wider mb-4">Fit Score</p>
                <p className="text-[#f6f8ed]/80 text-base leading-relaxed">{analysis.fit_summary}</p>
              </div>

              <button
                onClick={() => { setAnalysis(null); setJobDescription(''); setFileName(null); setFileData(null); }}
                className="w-full py-4 text-[#f6f8ed]/60 hover:text-[#f6f8ed] font-medium transition-colors border border-[#f6f8ed]/20 rounded-xl hover:bg-white/5"
              >
                Analyze Another Role
              </button>
            </div>

            {/* Right column: Details */}
            <div className="lg:w-2/3 space-y-6">
              {/* Strengths */}
              <div className="p-6 bg-[#f6f8ed]/5 rounded-2xl">
                <h3 className="text-[#f6f8ed] font-semibold text-lg mb-4">Core Strengths</h3>
                <ul className="space-y-3">
                  {analysis.strengths.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-base leading-relaxed pl-4 border-l-2 border-[#f6f8ed]/20">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hidden Value */}
              <div className="p-6 bg-[#f6f8ed]/5 rounded-2xl">
                <h3 className="text-[#f6f8ed] font-semibold text-lg mb-4">Hidden Value</h3>
                <ul className="space-y-3">
                  {analysis.hidden_value.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-base leading-relaxed pl-4 border-l-2 border-[#f6f8ed]/20">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="p-6 bg-[#f6f8ed]/5 rounded-2xl">
                <h3 className="text-[#f6f8ed] font-semibold text-lg mb-4">Honest Gaps</h3>
                <ul className="space-y-3">
                  {analysis.gaps.map((point, i) => (
                    <li key={i} className="text-[#f6f8ed]/70 text-base leading-relaxed pl-4 border-l-2 border-[#f6f8ed]/20">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
