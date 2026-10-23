import Anthropic from "@anthropic-ai/sdk";

// POST { jd } -> { verdict, summary, rows: [{ req, ev, level }], gap }
// Needs ANTHROPIC_API_KEY in the Vercel project env (server side only). Without it the
// page keeps showing the precomputed example.

const PROFILE = "Matthew Brown. 18+ years. Design strategy and applied AI leader. Co-Founder and Principal Product Architect, Foresera LLC (2025 to present): AI document accessibility for public sector; reframed category from compliance to usability; risk-scoring model for executives; municipal proof of concept with five-question decision path; government procurement incl. TX-RAMP; built remediation engine verified against PDF/UA; human-in-the-loop corrections; ten provisional patents as sole inventor, one pending. Same method in security services (discovery with leadership, three booking problems, 14-platform weighted gating scorecard, coordination layer, architecture brief and phased roadmap), carbon management (source-linked obligation register, four entry points), education publisher (AI store management app), AI-to-CMS publishing layer with human approval. UX Design Lead, Triumph Financial (2024 to 2026): explainable credit decisions, risk tooling strategy. Senior Principal UX Designer, Epicor (2022 to 2025): ERP modernization for Fortune 100 retail, design system, handoff redesign +40% release cadence. Lead UX, First American (2020 to 2022). UX Consultant, Rosetree (2020): global UX practice. Director of UX, American First Finance (2018 to 2020): portal utilization 2% to 65%, waterfall to Agile. UX Manager, ACE Cash Express. Founder, Aloha Travel (acquired by FareHarbor). Group Creative Director, WorldVentures: team 6 to 40+. Skills: discovery, workshops, synthesis, journey maps, service blueprints, roadmaps, design systems, WCAG 2.2 AA, Anthropic API, MCP, agentic workflows, RAG, React, TypeScript, Python.";

const SYSTEM = "You assess candidate fit honestly. Candidate profile:\n" + PROFILE;

const INSTRUCTIONS = "Assess this candidate against the job description above. Return a verdict (one short sentence), a summary (two sentences), 6 to 8 rows (req: a key requirement from the job; ev: specific evidence from the profile in under 25 words; level: strong or partial) and gap (one honest gap worth probing). Plain language. No em dashes. Do not name any company from the job description.";

const SCHEMA = {
  type: "object",
  properties: {
    verdict: { type: "string" },
    summary: { type: "string" },
    rows: {
      type: "array",
      items: {
        type: "object",
        properties: {
          req: { type: "string" },
          ev: { type: "string" },
          level: { type: "string", enum: ["strong", "partial"] }
        },
        required: ["req", "ev", "level"],
        additionalProperties: false
      }
    },
    gap: { type: "string" }
  },
  required: ["verdict", "summary", "rows", "gap"],
  additionalProperties: false
};

const FAIL = "The analysis could not be completed. Try again.";

// Best effort per instance: 6 analyses per IP per 10 minutes
const WINDOW = 10 * 60 * 1000, LIMIT = 6, hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const noDash = s => String(s).replace(/\s*\u2014\s*/g, ", ").trim();

let client;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const jd = typeof req.body?.jd === "string" ? req.body.jd.trim() : "";
  if (jd.length < 40 || jd.length > 12000) {
    return res.status(400).json({ error: "Paste a job description between 40 and 12,000 characters." });
  }
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return res.status(429).json({ error: "Too many analyses from this connection. Try again in a few minutes." });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "Live analysis is not available right now, so the example is shown." });
  }

  client ??= new Anthropic({ timeout: 25000, maxRetries: 1 });
  try {
    const msg = await client.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 1200,
      thinking: { type: "between_tools" },
      output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
      system: SYSTEM,
      messages: [{ role: "user", content: "Job description:\n" + jd + "\n\n" + INSTRUCTIONS }]
    });
    if (msg.stop_reason === "refusal") return res.status(502).json({ error: FAIL });
    const text = msg.content.filter(b => b.type === "text").map(b => b.text).join("");
    const out = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    if (!out || !Array.isArray(out.rows) || !out.rows.length) throw new Error("bad shape");
    return res.status(200).json({
      verdict: noDash(out.verdict),
      summary: noDash(out.summary),
      rows: out.rows.slice(0, 8).map(r => ({ req: noDash(r.req), ev: noDash(r.ev), level: r.level === "strong" ? "strong" : "partial" })),
      gap: noDash(out.gap)
    });
  } catch (e) {
    console.error("fit analysis failed:", e?.status || "", e?.message || e);
    return res.status(502).json({ error: FAIL });
  }
}
