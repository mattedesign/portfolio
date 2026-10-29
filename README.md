# matthewbrown.design

Portfolio site for Matthew Brown: design strategy and applied AI. One long-scroll page with
pinned, scroll-scrubbed scenes (hero, method, four case studies), then experience, an
Analyze fit tool and contact.

## Stack

- Static page built with Vite: `index.html` holds all markup and copy, `src/main.js` holds the
  scroll motion engine and the Analyze fit form, `src/styles.css` the base and state styles.
- `api/fit.js`: Vercel Function for Analyze fit. Calls Claude (`claude-sonnet-5-5`) with the
  pasted job description and returns `{ verdict, summary, rows, gap }`. Validates length
  (40 to 12,000 characters) and rate-limits per IP.
- Deployed on Vercel from `main` (project `portfolio`, team Figmant).

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/, then the copy check
npm run preview   # serve dist/
```

`npm run build` fails if any built page this site authors contains an em dash (a content rule from the design handoff).
`/api/fit` only runs on Vercel (or `vercel dev`); locally the page shows the precomputed example.

## Work samples (private)

`/samples/` is a page of design work made with Claude Design and Claude Code, each piece with the
decision it served and how it ties to the method on the home page. It is built from
`samples/index.html` (styles in `src/samples.css`, behaviour in `src/samples.js`), with screenshots
under `public/samples/img/` and self-contained interactive examples under `public/samples/examples/`.
Both pages carry `noindex` and are disallowed in `robots.txt`.

The gate is front-end only. `/unlock/` (`unlock/index.html`, `src/unlock.js`) checks the password in
the browser against a SHA-256 hash and remembers a pass in that browser for 30 days; a script in the
head of `samples/index.html` sends visitors without it to `/unlock/`. This keeps casual visitors and
crawlers out. It is not security: anything under `/samples/` is served to anyone who has a file's URL.
To change the password, replace `HASH` in `src/unlock.js` with the output of

```bash
node -e "console.log(require('node:crypto').createHash('sha256').update('new password').digest('hex'))"
```

To add a Figma example, give a button `data-src` pointing at the file's embed URL
(`https://embed.figma.com/design/<key>/<name>?embed-host=matthewbrown`) and a `data-title`; the
shared dialog opens it. To add a screenshot, drop a WebP under `public/samples/img/` and add a
`<figure class="shot">` with width, height and alt.

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel project env, server side | Live Analyze fit. Without it the endpoint returns 503 and the page keeps the example result. |

Never prefix it with `VITE_`: Vite inlines `VITE_*` variables into the public JavaScript bundle.

## Design source

`design_handoff_portfolio/` is the Claude Design handoff this site was built from. The
readable source, `reference/source/Portfolio v2.dc.html`, is the source of truth for copy and
motion; `src/main.js` ports its animation timelines verbatim. Differences from the prototype:

- Pinned chapter layers hide with opacity only, not `visibility: hidden`, so screen readers get
  every chapter in reading order instead of only the one on screen.
- Case rails stay visible while a rail button has keyboard focus.
- The fit-to-viewport rule also applies to method steps (Step 04 overflowed at 924x540).
- The hero canvas is the direct canvas port rather than a Remotion Player.

## Migration notes (October 2026)

Replaced the previous React and Tailwind single-page site. It had no routes besides `/`, so no
redirects are needed. `/MattBrown.pdf` and `/matt-brown-resume.tex` stay at the same URLs. The
old site is in git history before the `redesign` merge.
