# Claude Code prompt

Copy everything below the line into Claude Code, run from the root of the repo that currently serves matthewbrown.design. Put this `design_handoff_portfolio/` folder in the repo root first.

---

You are replacing the current matthewbrown.design site with a new design. The full spec is in `design_handoff_portfolio/README.md`. The visual and motion source of truth is `design_handoff_portfolio/reference/portfolio-reference.html`, and its readable source, with every animation timeline, is `design_handoff_portfolio/reference/source/Portfolio v2.dc.html`. Read all three before writing code.

## 1. Audit what exists (do not delete anything yet)
- Identify the current framework, hosting and deploy config (Vercel, Netlify, GitHub Pages and so on), the domain setup, analytics, favicon and OG images, and any existing routes or blog posts.
- Write a short `MIGRATION_NOTES.md` listing what you found, what will be removed, and the redirects needed so no old URL 404s.
- Ask me before removing anything that is not clearly part of the old site UI.

## 2. Set up the stack
If the repo is not already Next.js, create the new app in place on a new branch `redesign`:
```
npx create-next-app@latest . --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
npm i @anthropic-ai/sdk
npm i remotion @remotion/player        # hero composition, see step 4
npm i lenis                            # optional smooth wheel scroll, behind a flag
npm i -D @playwright/test @axe-core/playwright
```
- Fonts: Geist and Geist Mono via `next/font/google`.
- Put the design tokens from the README in `globals.css` as CSS variables and wire them into Tailwind.
- Keep the existing domain, deploy target and analytics. Add the redirects from step 1 in `next.config.ts`.

## 3. Structure
```
src/app/page.tsx                 one page composing the sections
src/app/api/fit/route.ts         Analyze fit endpoint
src/components/Header.tsx        floating pill nav with active section
src/components/Hero.tsx          sticky stage + captions + canvas or Remotion player
src/components/hero/particles.ts port of initParticles() + drawHero()
src/components/Method.tsx        steps + ring SVG
src/components/case/CaseStory.tsx    generic pinned case engine (gDom port)
src/components/case/Case01.tsx       custom timeline (caseDom port)
src/content/cases.ts             copy for cases 02 to 04 (layers, artifacts)
src/components/Experience.tsx
src/components/AnalyzeFit.tsx
src/components/Contact.tsx
src/motion/useScrollFrame.ts     shared rAF loop, cached geometry, exp smoothing
src/motion/interpolate.ts        I(), ease(), lerp(), layer(), rise()
```
- One shared requestAnimationFrame loop. Scenes register their geometry and a frame callback.
- Write styles imperatively to refs inside the loop. Do not put per-frame values in React state.
- Cache section offsets on layout and re-measure on resize and with ResizeObserver.
- Skip writes when the frame is unchanged. Never animate CSS `filter: blur`.
- Respect `prefers-reduced-motion` everywhere.

## 4. Port the motion exactly
- Hero: port `initParticles()` and `drawHero()` verbatim into `particles.ts` (seeded RNG, 144 particles, same frame windows). Port `heroDom()` for the stage clip-path card-to-full-bleed, copy fade and captions.
- Remotion requirement: build the hero canvas as a Remotion composition (400 frames) using `useCurrentFrame()` and `interpolate()` with the same windows. Mount it with `@remotion/player` (controls off, `clickToPlay={false}`) and drive it from scroll with `playerRef.seekTo(frame)`. If the Player adds visible jank, fall back to the direct-canvas port and keep the composition for video export. Tell me which you shipped.
- Method: port `methodDom()` (152-frame steps starting at frame 120, ring arc, dot and nodes).
- Case 01: port `caseDom()` frame windows exactly.
- Cases 02 to 04: port `gDom()` and drive it from the `data-gr`, `data-gbar`, `data-gon` and `data-gdark` declarations, expressed as typed props in `cases.ts`.
- Port the fit-to-viewport rule: when a layer overflows, zoom its children, minimum 0.55.
- Experience reveal: IntersectionObserver, 0.9s, cubic-bezier(.2,.7,.2,1), 40px rise.

## 5. Analyze fit endpoint
`src/app/api/fit/route.ts`:
- POST `{ jd: string }`. Validate the length (40 to 12,000 characters). Rate-limit per IP (simple in-memory or Upstash).
- Call `@anthropic-ai/sdk` `messages.create` with model `claude-sonnet-4-5` (or the current Sonnet), max_tokens 1200, and the server-side `ANTHROPIC_API_KEY` env var.
- The system prompt holds the `PROFILE` string from the source file. The user message contains the JD and asks for JSON only: `{verdict, summary, rows:[{req, ev, level:"strong"|"partial"}], gap}`, no em dashes, never naming the hiring company.
- Parse defensively, from the first `{` to the last `}`. On failure, return 502 with a friendly message.
- The client shows `DEFAULT_RES` until a live result arrives. Put the results in an `aria-live="polite"` region and set `aria-busy` while loading.
- Add `ANTHROPIC_API_KEY` to the hosting env. Never expose it to the client.

## 6. Content rules (enforce in code review)
- No em dashes anywhere. Add a test that greps the built HTML for "—" and fails if it finds one.
- No speed, throughput or capacity numbers about the systems. Outcome metrics from past roles are fine.
- No internal product or framework names. Patents appear only as "Ten provisional patents filed as sole inventor, one pending."
- Don't name the target employer. No freight or factoring specifics.
- Experience must match the resume exactly: titles, companies and dates as listed in the README and source.

## 7. SEO and meta
- Title "Matthew Brown | Design strategy and applied AI", plus the meta description from the source.
- OG image: 1200x630, ink background with the hero H1 in Geist 600 and the accent square. Generate it with `next/og`.
- Add `sitemap.ts`, `robots.ts` and Person JSON-LD (name, jobTitle "Design Strategy and Applied AI Leader", url, sameAs LinkedIn).

## 8. QA before merging
- Playwright plus axe at 375x667, 924x540 and 1440x900: no violations at AA, no horizontal overflow, and no pinned layer content outside the viewport at any scroll step. Sample every 2% of each scene.
- Keyboard: skip link, nav, hero CTA, case rail buttons, fit form, contact. All focus rings visible.
- Performance: Lighthouse at 90 or above for Performance and Accessibility on mobile. Check scroll in the Chrome Performance panel: no long tasks during scroll, and no layout thrash from getBoundingClientRect in the loop.
- Compare against `reference/portfolio-reference.html` side by side at each breakpoint.

## 9. Ship
Open a PR from `redesign` with screenshots at the three sizes, `MIGRATION_NOTES.md`, and the Vercel preview URL. Do not merge to production until I approve the preview.
