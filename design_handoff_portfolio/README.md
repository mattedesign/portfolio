# Handoff: matthewbrown.design redesign

## Overview
A full replacement of matthewbrown.design. A single long-scroll portfolio built around one thesis: *I help organizations decide from evidence, not opinion, then build systems that get smarter with use.* Immersive, pinned, scroll-scrubbed scenes (Scout Motors-style storytelling) with a light sage palette and one cobalt accent.

Sections, in order:
1. Hero / Thesis (pinned, canvas particle animation, 600vh)
2. How I work (pinned, five-step ring diagram, 620vh)
3. Selected work: four case studies, each a pinned scroll story (Case 01 1100vh; Cases 02 to 04 700vh each)
4. Experience (normal flow, reveal on enter)
5. Analyze fit (interactive, calls Claude through a server route)
6. Contact

## About the design files
Files in `reference/` are **design references built in HTML**: a working prototype that shows the intended look, copy and motion. They are not production code. Recreate the design in a real codebase (recommended stack below), porting the animation math faithfully.

- `reference/portfolio-reference.html`: self-contained, open in any browser. This is the source of truth for look and motion.
- `reference/source/Portfolio v2.dc.html`: readable source. The template holds all markup, copy and inline styles; the `class Component` block at the bottom holds every animation timeline. Port values from here.

## Fidelity
**High fidelity.** Final colors, type, copy, spacing and motion. Match them exactly.

## Recommended stack
- Next.js 15 (App Router) + TypeScript, deployed on Vercel (static pages + one serverless route)
- Fonts: `next/font/google` with Geist and Geist Mono
- Styling: Tailwind CSS v4 or CSS Modules (the prototype uses inline styles only because of its tooling)
- Motion: one shared `requestAnimationFrame` loop + a `useScrollFrame` hook (see Interactions). Optional: `remotion` + `@remotion/player` for the hero (see "Remotion" below). Optional: `lenis` for smooth wheel scrolling.
- AI: `@anthropic-ai/sdk` in `app/api/fit/route.ts`
- QA: `@axe-core/playwright` + Playwright for WCAG 2.2 AA checks at 375, 924x540 and 1440x900

## Design tokens
| Token | Hex | Use |
|---|---|---|
| bg | #EEF2EF | Page background |
| bg-2 | #E2E9E4 | Analyze fit section |
| surface | #FFFFFF | Cards, pills |
| ink | #0F1712 | Primary text, dark stages |
| ink-2 | #3D4A42 | Body copy on light |
| muted | #56645B | Mono labels on light |
| line | #C9D4CD | Borders, tracks |
| cell | #D6DFD9 | Inactive grid cells, bar tracks |
| watermark | #E0E7E2 | Giant case numerals |
| dark-surface | #1A261F | Cards on dark |
| dark-line | #2E3F35 | Borders and tracks on dark |
| dark-text | #E6EDE8 | Text on dark |
| dark-text-2 | #A9B8AE | Body on dark |
| accent | #2E5BC9 | Accent on light (CTAs, labels, resolved state) |
| accent-light | #7FB0FF | Accent on dark |

All text pairs were chosen for 4.5:1 or better.

**Type**: Geist 400/500/600 (headlines 600, letter-spacing -0.045em to -0.05em, line-height 0.9 to 0.95); Geist Mono 400/500 for eyebrows and labels (13px, uppercase, +0.06em).
Key fluid sizes (CSS):
- Hero H1: `min(clamp(32px,6vw,104px), 7.6svh)`, max-width 15ch
- Section H2: `clamp(44px,8vw,152px)`
- Method step H3: `min(clamp(46px,6.4vw,150px), 13svh)`
- Case title H3: `min(clamp(40px,7vw,136px), 12svh)`
- Case big statement: `min(clamp(36px,6vw,112px), 10.5svh)`
- Case mid statement: `min(clamp(30px,4.6vw,84px), 8.6svh)`
- Body: `clamp(16px,1.4vw,20px)` to `clamp(17px,1.5vw,22px)`

**Radii**: pills 999px; cards 24px; large cards 28px; tiles and cells 28% of size; hero stage card 32px (24px on narrow).
**Shadows**: cards `0 20px 50px rgba(15,23,18,0.08)`; pills `0 10px 30px rgba(15,23,18,0.07)`; header `0 8px 30px rgba(15,23,18,0.08)`.
**Layout**: page gutters 6%; max content width 1440px; pinned layers sit at top 140px (128px under 1000px wide), bottom 6%.

## Screens and components
Copy is final and lives in the source file. Constraints that apply to all copy: no em dashes, no speed or throughput numbers about the systems, no internal product or framework names, no client-confidential details, and no freight or factoring specifics. Don't name the target employer anywhere.

### Header
Fixed floating pill, top 12px, height 56px, bg rgba(238,242,239,0.97), 1px border rgba(15,23,18,0.08). Name at left; links Method, Work, Experience, Fit (44px tall pills) and Contact (outlined pill). The active section's link gets bg #DCE4DE and weight 600; Contact fills ink when active. Set `aria-current="true"`. Skip link first in DOM.

### 1. Hero (600vh, sticky 100svh)
- Light layer: eyebrow, H1 "I help organizations decide from evidence, not opinion.", supporting sentence, CTA pill "See how I work" (#2E5BC9, white, 52px tall) linking to #method.
- Dark stage (ink) with a full-size `<canvas>`, clipped with `clip-path: inset(... round r)`. It starts as a card (desktop: top 96px, right 4%, bottom 5%, left 50%; narrow: a bottom strip placed just below the measured copy height) and expands to full-bleed over frames 6 to 46, then contracts to a 24px-inset rounded card over frames 370 to 398.
- As the stage expands, the copy fades out and scales to 0.92.
- Six captions (h3 + p) on the dark stage, starting at frames 30, 90, 150, 210, 270, 330, with a 6-segment progress bar.
- Canvas: 144 particles (seeded RNG, seed 11). 96 start scattered as mixed shapes inside the card, then normalize into a 12-column grid (frames 88 to 148), then reorder by weight with the top 10 turning accent (150 to 208). A "SOURCE OF TRUTH" sweep line moves across (212 to 262), outlining flagged cells. A correction ring at the origin ripples, resolving flagged cells by distance (280 to 322). Then 48 new particles fly in from the right and the grid grows from 8 to 12 rows (330 to 382). Port `initParticles()` and `drawHero()` verbatim.

### 2. How I work (620vh)
Intro H2 "One practice, from the first question to the system that keeps answering it." fades out (frames 70 to 130 of 1000). Then five stacked steps (Discover, Frame, Make it visible, Build, Learn and compound), each a 152-frame window starting at frame 120, with artifact pills. A loop layer follows: "Back to Discover, with better evidence than the last pass."
The ring SVG (viewBox -270 -220 540 440, r=150) has a progress arc (dasharray 942.48) tied to step progress, a traveling dot, and five nodes (active node r=19 accent, visited nodes ink). The center shows the step number and name. On narrow screens the ring goes on top (column-reverse), its size is computed from the remaining height, and its labels are hidden.

### 3. Case studies
Every case has the same six chapters: problem as stated, real problem, who was in the room, artifact that aligned them, what got built (dark full-bleed stage expanding from a centered card), and what got smarter. A rail at top-right has six 44px buttons that scroll to each chapter, with a mono label "Case 0N · chapter". A giant watermark numeral drifts with parallax.
- **Case 01, municipal accessibility** (1100vh, custom timeline in `caseDom`): decision-path tiles, A to F grades (D and F turn accent), dark "built" cards, then a 12x5 cell grid where 12 pattern cells resolve outward from one correction.
- **Cases 02 to 04** (700vh, generic engine `gDom`): seven layers at 1000/7 frames each. Generic behaviors are declared in markup:
  - `data-gr="j"`: staggered rise inside its layer
  - `data-gbar="v" data-gj="j"`: bar scales to v
  - `data-gon="t" data-oncss="..."`: style toggles when the layer's local progress passes t
  - `data-gdark`: the dark stage opens for that layer
  Case 02 uses a 14-row gated scorecard and a coordination-layer diagram with a swappable tool. Case 03 uses an obligation register with source links that light up, plus four entry-point cards. Case 04 uses a module map with rule checks and a +40% result.
- **Fit to viewport**: if a layer's scrollHeight is larger than its clientHeight, apply `zoom` (minimum 0.55) to its children.

### 4. Experience
Nine roles. Titles, companies and dates match the resume exactly. Each row: mono dates in a 200px column, h3 title, accent company line, one-sentence summary. Three credential cards follow (patents card on ink). Rows reveal on enter (opacity plus 40px rise, 0.9s, cubic-bezier(.2,.7,.2,1)) via IntersectionObserver.

### 5. Analyze fit
A form with a labeled textarea, pre-filled with the default "Director, Design Strategy" role (no company named), plus "Analyze fit" and "Use the example" buttons. Results sit in an `aria-live="polite"` region: a dark verdict card, rows of requirement, evidence and a Strong/Partial pill, and a dashed "Worth probing" gap note. The default result is precomputed (`DEFAULT_RES`) so the section is never empty. The live call goes to `/api/fit` (see the prompt file); show errors as plain-text `role="status"`.

### 6. Contact
H2 "Have a decision that deserves better evidence?", a mailto pill (sparkingmatt@gmail.com) and a LinkedIn pill.

## Interactions and motion engine
- Each pinned scene maps scroll progress to frames: `p = clamp(-rect.top / (height - innerHeight))`, giving 400 frames for the hero and 1000 for the others. Cache section offsets on layout; don't call getBoundingClientRect every frame.
- Smoothing: `f += (target - f) * (1 - exp(-dt/45))`, snapping when within 0.3 frames. Skip DOM writes when f hasn't changed. The canvas only redraws while f changes or particles are still drifting (f < 150).
- Layer transition helper: opacity, translateY by ±56px, and scale 0.92 to 1.1. No CSS blur (it was the main source of lag).
- `prefers-reduced-motion`: no smoothing, no drift, reveals shown immediately, and smooth scroll disabled.
- Re-run layout on resize, on ResizeObserver changes, and if the elements it measured have been replaced. A rerender replacing nodes caused a real bug in the prototype.

## Remotion
The brief asked for Remotion or its effect. The prototype reproduces the effect: a frame clock plus an `interpolate()`-style `I(frame, [in, out])`. To use Remotion literally:
1. Make the hero a Remotion `<Composition>` (400 frames, 30fps) using `useCurrentFrame()` and `interpolate()`.
2. Mount it with `@remotion/player`.
3. Scrub it from scroll with `playerRef.current.seekTo(frame)`.

Check Remotion's license terms (free for individuals and small teams).

## Accessibility (WCAG 2.2 AA)
- Heading order: h1 hero; h2 per section; h3 steps and case titles; h4 case chapters.
- All chapter copy stays in the DOM. Decorative canvases, numerals and diagrams are `aria-hidden`, or use `role="img"` with an aria-label.
- All targets are at least 44px. Every interactive element has a 3px #2E5BC9 focus ring. Rail buttons have aria-labels.
- Test at 375x667, 924x540 and 1440x900 with axe.

## Assets
None. No images; everything is type, CSS and canvas.

## Files
- `CLAUDE_CODE_PROMPT.md`: paste into Claude Code inside the existing site repo.
- `reference/portfolio-reference.html`: standalone prototype.
- `reference/source/Portfolio v2.dc.html` and `support.js`: readable source (open the .dc.html next to support.js).
