import './styles.css';
import { DEFAULT_JD, DEFAULT_RES } from './fit-data.js';

// Motion engine ported from the Claude Design source (design_handoff_portfolio/reference/source).
// Frame windows and easing are kept verbatim; only the React shell around them was removed.
// Foresera coral marks everything that moves (and highlights on dark surfaces); static highlights on the
// light surfaces use the --hl colour from styles.css.
const CORAL = '#FF6F61', INK = '#0F1712', BG = '#EEF2EF';
// The hero stage starts transparent (no dark card on first load) and darkens to ink as it expands
// over frames 6-46. Objects shift with it from coral (on the light page) to the original light grey
// (on the dark stage); highlights stay coral.
const RGB = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') + ')';
const CORAL_RGB = RGB(CORAL), LIGHT_RGB = RGB('#E6EDE8');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Remotion-style interpolate(frame, [in, out]) clamped to 0..1
const I = (f, r) => clamp((f - r[0]) / (r[1] - r[0]));
const HERO_F = 400, STAGES = [30, 90, 150, 210, 270, 330];
const PATTERN = [3, 8, 14, 17, 22, 27, 31, 38, 41, 46, 50, 57];
const CASE_LABELS = ['Case 01', '01 The problem as stated', '02 The real problem', '03 Who was in the room', '04 The artifact that aligned them', '05 What got built', '06 What got smarter'];
const CASE_AT = [0, 95, 220, 355, 485, 705, 865];
const CASE_GO = [110, 240, 372, 505, 760, 890];
const SEG = [[95, 225], [220, 360], [355, 490], [485, 720], [705, 855], [865, 985]];

class Portfolio {
  props = { ambientMotion: true, heroScroll: 600 };

  constructor(root) {
    this.root = root;
    root.querySelectorAll('[data-go-case]').forEach(b => b.addEventListener('click', () => this.goCase(CASE_GO[+b.dataset.goCase])));
    root.querySelectorAll('[data-go-g]').forEach(b => {
      const [ci, i] = b.dataset.goG.split(',').map(Number);
      b.addEventListener('click', () => this.goG(ci, i));
    });
  }

  start() {
    this.mq = matchMedia('(prefers-reduced-motion: reduce)');
    this.sf = { hero: 0, method: 0, case: 0 }; this.seed = 11;
    this.initParticles();
    this.ready = false;
    this.onResize = () => { this.ready = false; };
    addEventListener('resize', this.onResize);
    this.ro = new ResizeObserver(() => { this.ready = false; });
    this.ro.observe(this.root);
    this.last = { hero: -1, method: -1, case: -1 }; this.prevT = 0;
    const loop = t => {
      this.raf = requestAnimationFrame(loop);
      try {
        if (!this.ready || (this.canvas && this.canvas.clientWidth !== this.cw)) this.ready = this.layout();
        if (this.ready && (!this.hero.isConnected || !this.stage.isConnected)) this.ready = this.layout();
        if (this.ready) this.tick(t);
      } catch (e) { console.error(e); }
    };
    this.raf = requestAnimationFrame(loop);
  }

  get still() { return (this.mq && this.mq.matches) || this.props.ambientMotion === false; }
  rand() { this.seed = (this.seed * 16807) % 2147483647; return (this.seed - 1) / 2147483646; }

  // Hidden layers keep visibility so screen readers can read every chapter in order;
  // they only drop pointer events. None of the layers contain focusable elements.
  layer(el, f, a, b, c, d, dist = 56) {
    const i = a < 0 ? 1 : ease(I(f, [a, b])), o = c == null ? 0 : ease(I(f, [c, d]));
    const v = i * (1 - o);
    el.style.opacity = v;
    el.style.pointerEvents = v < 0.01 ? 'none' : '';
    if (v < 0.01) return;
    el.style.transform = `translate3d(0,${((1 - i) * dist - o * dist).toFixed(1)}px,0) scale(${(1 - (1 - i) * 0.08 + o * 0.1).toFixed(4)})`;
  }
  rise(el, t, dist = 30, sc = 0) {
    const e = this.still ? (t > 0 ? 1 : 0) : ease(t);
    el.style.opacity = e;
    el.style.transform = `translate3d(0,${(1 - e) * dist}px,0) scale(${1 - (1 - e) * sc})`;
  }

  initParticles() {
    const ps = [];
    for (let i = 0; i < 144; i++) ps.push({ i, kind: i % 4, w: Math.pow(this.rand(), 1.5), sx: this.rand(), sy: this.rand(), ph: this.rand() * 6.28, st: this.rand(), s0: 4 + this.rand() * 6, fx: this.rand(), fy: this.rand() });
    const base = ps.slice(0, 96);
    [...base].sort((a, b) => b.w - a.w).forEach((p, r) => { p.rank = r; });
    const flagged = base.filter(p => p.i % 11 === 4 && p.rank >= 10);
    const pos = p => [p.rank % 12, Math.floor(p.rank / 12)];
    const origin = flagged.reduce((best, p) => { const [c, r] = pos(p); const d = Math.hypot(c - 6, r - 4); return d < best.d ? { p, d } : best; }, { p: flagged[0], d: 1e9 }).p;
    const [oc, or] = pos(origin);
    const maxd = Math.max(...flagged.map(p => { const [c, r] = pos(p); return Math.hypot(c - oc, r - or); })) || 1;
    flagged.forEach(p => { p.flag = true; const [c, r] = pos(p); p.res = p === origin ? 280 : 290 + (Math.hypot(c - oc, r - or) / maxd) * 32; p.origin = p === origin; });
    this.ps = ps;
    const oCell = 27, ocC = oCell % 12, ocR = Math.floor(oCell / 12);
    const md = Math.max(...PATTERN.map(k => Math.hypot(k % 12 - ocC, Math.floor(k / 12) - ocR)));
    this.cellRes = {};
    PATTERN.forEach(k => { this.cellRes[k] = k === oCell ? 0.1 : 0.28 + Math.hypot(k % 12 - ocC, Math.floor(k / 12) - ocR) / md * 0.55; });
  }

  layout() {
    const root = this.root;
    if (!root.querySelector('[data-cell]') || !root.querySelector('[data-hero-canvas]') || !root.querySelector('[data-hero-canvas]').clientWidth) return false;
    const W = innerWidth, H = innerHeight;
    this.W = W; this.H = H; this.narrow = W < 1000;
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];

    this.hero = q('[data-scene="hero"]');
    this.hero.style.height = (this.props.heroScroll ?? 600) + 'vh';
    this.canvas = q('[data-hero-canvas]');
    this.ctx = this.canvas.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    this.cw = this.canvas.clientWidth; this.ch = this.canvas.clientHeight;
    this.canvas.width = this.cw * dpr; this.canvas.height = this.ch * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.stage = q('[data-stage]');
    this.heroCopy = q('[data-hero-copy]');
    this.caps = qa('[data-cap]'); this.capLabels = qa('[data-cap-label]'); this.hsegs = qa('[data-hseg]');
    this.cue = q('[data-cue]');
    const caps = q('[data-hero-caps]');
    if (this.narrow) {
      Object.assign(this.heroCopy.style, { right: '6%', bottom: 'auto', top: '88px' });
      const kids = [...this.heroCopy.children], gap = parseFloat(getComputedStyle(this.heroCopy).rowGap) || 16;
      const copyH = kids.reduce((s, el) => s + el.offsetHeight, 0) + gap * (kids.length - 1);
      const cardT = Math.min(H - 106, Math.max(H * 0.73, 88 + copyH + 24));
      this.heroCopy.style.bottom = (H - cardT + 20) + 'px';
      Object.assign(caps.style, { top: Math.max(88, Math.min(H * 0.45, H - caps.offsetHeight - 16)) + 'px', bottom: 'auto' });
      this.cue.style.display = 'none';
      this.card = { t: cardT, r: 16, b: 16, l: 16, rad: 24 };
      this.scatter = { y0: (cardT + 20) / H, y1: (H - 30) / H };
    } else {
      Object.assign(this.heroCopy.style, { right: '52%', bottom: '12%', top: '88px' });
      this.scatter = null;
      Object.assign(caps.style, { top: 'auto', bottom: '9%' });
      this.cue.style.display = 'block';
      this.card = { t: 96, r: W * 0.04, b: H * 0.05, l: W * 0.5, rad: 32 };
    }

    this.method = q('[data-scene="method"]');
    this.mIntro = q('[data-m-intro]'); this.mBody = q('[data-m-body]');
    this.mSteps = qa('[data-mstep]'); this.mLoop = q('[data-mloop]');
    this.arc = q('[data-ring-arc]'); this.dot = q('[data-ring-dot]');
    this.nodes = qa('[data-node]'); this.ringNum = q('[data-ring-num]'); this.ringName = q('[data-ring-name]');
    const rw = q('[data-ring-wrap]');
    this.mBody.style.flexDirection = this.narrow ? 'column-reverse' : 'row';
    this.mSteps.forEach(li => [...li.children].forEach(k => { k.style.zoom = ''; }));
    if (this.narrow) {
      const stepH = Math.max(...this.mSteps.map(li => { const k = [...li.children]; const g = parseFloat(getComputedStyle(li).rowGap) || 12; return k.reduce((s, e) => s + e.offsetHeight, 0) + g * (k.length - 1); }));
      const avail = H - 132 - H * 0.05 - stepH - 20;
      const ringW = Math.min(W * 0.64, H * 0.34, avail * 540 / 440);
      rw.style.width = ringW + 'px';
      rw.style.display = ringW < 90 ? 'none' : 'block';
    } else { rw.style.width = 'min(46vw, 76svh)'; rw.style.display = 'block'; }
    q('[data-ring-labels]').style.display = this.narrow ? 'none' : 'inline';

    this.caseEl = q('[data-scene="case"]');
    this.cLayers = qa('[data-clayer]'); this.cStage = q('[data-c-stage]');
    this.cRail = q('[data-c-rail]'); this.cLabel = q('[data-c-label]');
    this.cSegs = qa('[data-cseg]'); this.cTracks = qa('[data-ctrack]');
    this.cSubs = qa('[data-c-sub]'); this.cPills = qa('[data-c-pill]'); this.cTiles = qa('[data-c-tile]');
    this.cGrades = qa('[data-c-grade]'); this.cCards = qa('[data-c-card]'); this.cNum = q('[data-c-num]');
    this.cellEls = qa('[data-cell]');
    const top = this.narrow ? '128px' : '140px';
    this.cLayers.forEach(l => { l.style.top = top; l.style.willChange = 'transform, opacity'; });
    [this.mIntro, this.mBody, this.mLoop, ...this.mSteps, this.heroCopy].forEach(l => { l.style.willChange = 'transform, opacity'; });
    this.stage.style.willChange = 'clip-path';
    this.sfG = this.sfG || [0, 0, 0];
    this.gcases = qa('[data-gcase]').map(el => {
      const layers = [...el.querySelectorAll('[data-glayer]')], N = layers.length, w = 1000 / N;
      const kOf = e => +e.closest('[data-glayer]').dataset.glayer;
      layers.forEach(l => { l.style.top = top; l.style.willChange = 'transform, opacity'; });
      return {
        el, n: +el.dataset.gcase, g: this.geo(el), layers, N, w, last: -1,
        items: [...el.querySelectorAll('[data-gr]')].map(e => ({ e, k: kOf(e), j: +e.dataset.gr })),
        bars: [...el.querySelectorAll('[data-gbar]')].map(e => ({ e, k: kOf(e), j: +(e.dataset.gj || 0), v: +e.dataset.gbar })),
        ons: [...el.querySelectorAll('[data-gon]')].map(e => { if (e.dataset.offcss == null) e.dataset.offcss = e.style.cssText; return { e, k: kOf(e), thr: +e.dataset.gon, off: e.dataset.offcss, on: e.dataset.oncss || '', state: null }; }),
        stage: el.querySelector('[data-gstage]'), rail: el.querySelector('[data-grail]'), label: el.querySelector('[data-glabel]'),
        segs: [...el.querySelectorAll('[data-gseg]')], tracks: [...el.querySelectorAll('[data-gtrack]')], num: el.querySelector('[data-gnum]'),
        dk: layers.findIndex(l => l.dataset.gdark)
      };
    });
    // Fit-to-viewport rule from the design, also applied to method steps (Step 04 overflowed at 924x540)
    [...this.cLayers, ...this.gcases.flatMap(c => c.layers), ...this.mSteps].forEach(l => {
      const kids = [...l.children];
      kids.forEach(k => { k.style.zoom = ''; });
      const avail = l.clientHeight, need = l.scrollHeight;
      if (need > avail + 1) { const z = Math.max(0.55, (avail / need) * 0.97); kids.forEach(k => { k.style.zoom = z.toFixed(3); }); }
    });
    if (this.io) this.io.disconnect();
    this.io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; en.target.dataset.rv = '2'; this.io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    qa('[data-reveal]').forEach(el => {
      if (el.dataset.rv === '2' || this.still) return;
      if (!el.dataset.rv) { el.dataset.rv = '1'; el.style.opacity = '0'; el.style.transform = 'translate3d(0,40px,0)'; el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)'; }
      this.io.observe(el);
    });
    this.navLinks = qa('[data-nav]');
    this.navSecs = ['method', 'work', 'experience', 'fit', 'contact'].map(id => { const el = q('#' + id); return { id, top: el ? el.getBoundingClientRect().top + scrollY : 1e9 }; });
    this.navActive = undefined;
    this.gHero = this.geo(this.hero); this.gMethod = this.geo(this.method); this.gCase = this.geo(this.caseEl);
    this.last = { hero: -1, method: -1, case: -1 };
    return true;
  }

  navDom() {
    if (!this.navLinks) return;
    const y = scrollY + this.H * 0.4;
    let act = null;
    this.navSecs.forEach(sc => { if (y >= sc.top) act = sc.id; });
    if (scrollY + this.H >= document.documentElement.scrollHeight - 4) act = 'contact';
    if (act === this.navActive) return;
    this.navActive = act;
    this.navLinks.forEach(a => {
      const on = a.dataset.nav === act;
      if (a.dataset.nav === 'contact') { a.style.background = on ? '#0F1712' : 'transparent'; a.style.color = on ? '#EEF2EF' : '#0F1712'; }
      else { a.style.background = on ? '#DCE4DE' : 'transparent'; a.style.fontWeight = on ? '600' : '400'; }
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  geo(el) { return { top: el.getBoundingClientRect().top + scrollY, h: el.offsetHeight }; }
  prog(g) { const y = scrollY, H = this.H, range = g.h - H, top = g.top - y; return { p: range <= 0 ? 0 : clamp(-top / range), on: top + g.h > -40 && top < H + 40 }; }
  smooth(key, target) {
    let f = this.sf[key];
    const k = 1 - Math.exp(-this.dt / 45);
    f = this.still ? target : f + (target - f) * k;
    if (Math.abs(target - f) < 0.3) f = target;
    return (this.sf[key] = f);
  }

  tick(time) {
    if (!this.hero) return;
    this.navDom();
    this.dt = Math.min(64, this.prevT ? time - this.prevT : 16); this.prevT = time;
    const h = this.prog(this.gHero);
    if (h.on) {
      const f = this.smooth('hero', h.p * HERO_F);
      const drifting = !this.still && f < 150;
      if (f !== this.last.hero || drifting) this.drawHero(f, time);
      if (f !== this.last.hero) this.heroDom(f);
      this.last.hero = f;
    }
    const m = this.prog(this.gMethod);
    if (m.on) { const f = this.smooth('method', m.p * 1000); if (f !== this.last.method) this.methodDom(f); this.last.method = f; }
    const c = this.prog(this.gCase);
    if (c.on) { const f = this.smooth('case', c.p * 1000); if (f !== this.last.case) this.caseDom(f); this.last.case = f; }
    (this.gcases || []).forEach((gc, i) => {
      const pr = this.prog(gc.g); if (!pr.on) return;
      const t = pr.p * 1000, k = 1 - Math.exp(-this.dt / 45);
      let f = this.still ? t : this.sfG[i] + (t - this.sfG[i]) * k;
      if (Math.abs(t - f) < 0.3) f = t;
      this.sfG[i] = f;
      if (f !== gc.last) { this.gDom(gc, f); gc.last = f; }
    });
  }

  goCase(frame) {
    const r = this.caseEl.getBoundingClientRect();
    const top = r.top + scrollY + (this.caseEl.offsetHeight - innerHeight) * frame / 1000;
    scrollTo({ top, behavior: this.still ? 'auto' : 'smooth' });
  }

  goG(ci, i) {
    const c = this.gcases && this.gcases[ci]; if (!c) return;
    const r = c.el.getBoundingClientRect();
    scrollTo({ top: r.top + scrollY + (c.el.offsetHeight - innerHeight) * ((i + 1) * c.w + 24) / 1000, behavior: this.still ? 'auto' : 'smooth' });
  }

  gDom(c, f) {
    const { w, N } = c;
    c.layers.forEach((el, k) => { const a = k * w; this.layer(el, f, k === 0 ? -1 : a - 18, a + 14, k === N - 1 ? null : a + w - 26, a + w - 2); });
    c.ons.forEach(o => { const on = f >= o.k * w + o.thr * w; if (on !== o.state) { o.state = on; o.e.style.cssText = on ? o.off + ';' + o.on : o.off; } });
    c.bars.forEach(b => { b.e.style.transform = 'scaleX(' + (b.v * ease(I(f, [b.k * w + 18 + b.j * 3, b.k * w + 56 + b.j * 3])).toFixed(4)) + ')'; });
    c.items.forEach(it => this.rise(it.e, I(f, [it.k * w + 4 + it.j * 9, it.k * w + 30 + it.j * 9]), 36, 0.06));
    if (c.dk >= 0) {
      const a = c.dk * w, open = ease(I(f, [a - 34, a + 4])) * (1 - ease(I(f, [a + w - 30, a + w + 4])));
      const k = 1 - open, W = this.W, H = this.H;
      c.stage.style.visibility = open < 0.002 ? 'hidden' : 'visible';
      c.stage.style.opacity = clamp(open * 5);
      c.stage.style.clipPath = 'inset(' + H * 0.32 * k + 'px ' + W * 0.3 * k + 'px ' + H * 0.32 * k + 'px ' + W * 0.3 * k + 'px round ' + (40 * k + 0.001) + 'px)';
      c.num.style.opacity = 1 - I(f, [a - 34, a]) + I(f, [a + w - 20, a + w + 10]);
    }
    c.num.style.transform = 'translate3d(0,' + lerp(6, -10, f / 1000) * this.H / 100 + 'px,0)';
    c.rail.style.opacity = I(f, [w - 40, w - 10]);
    const dark = c.dk >= 0 && f > c.dk * w - 10 && f < (c.dk + 1) * w - 14;
    const idx = clamp(Math.floor((f + 18) / w), 0, N - 1);
    const lbl = idx === 0 ? 'Case 0' + c.n : 'Case 0' + c.n + ' · ' + CASE_LABELS[idx];
    if (c.label.textContent !== lbl) c.label.textContent = lbl;
    c.label.style.color = dark ? '#A9B8AE' : '#56645B';
    c.segs.forEach((sg, i) => { sg.style.transform = 'scaleX(' + I(f, [(i + 1) * w - 18, (i + 2) * w - 2]) + ')'; sg.style.background = CORAL; });
    c.tracks.forEach(t => { t.style.background = dark ? '#2E3F35' : '#C9D4CD'; });
  }

  heroDom(f) {
    const c = this.card, e = ease(I(f, [6, 46])), x = ease(I(f, [370, 398]));
    const end = this.narrow ? 12 : 24;
    const v = k => lerp(lerp(c[k], 0, e), end, x);
    const rad = lerp(lerp(c.rad, 0, e), this.narrow ? 24 : 36, x);
    this.stage.style.clipPath = `inset(${v('t')}px ${v('r')}px ${v('b')}px ${v('l')}px round ${rad}px)`;
    this.stage.style.backgroundColor = `rgba(15,23,18,${e.toFixed(3)})`;
    const hc = this.heroCopy;
    hc.style.opacity = 1 - e;
    hc.style.transform = `scale(${1 - 0.08 * e})`;
    hc.style.visibility = e > 0.98 ? 'hidden' : 'visible';
    this.cue.style.opacity = 1 - I(f, [0, 10]);
    this.capLabels.forEach(el => { el.style.opacity = I(f, [26, 42]) * (1 - x); });
    this.caps.forEach((el, k) => {
      const st = STAGES[k], en = STAGES[k + 1];
      const i = I(f, [st, st + 14]), out = en ? I(f, [en - 12, en]) : x;
      el.style.opacity = i * (1 - out);
      el.style.transform = `translateY(${(1 - i) * 24 - out * 24}px)`;
    });
    this.hsegs.forEach((el, k) => { el.style.transform = `scaleX(${I(f, [STAGES[k], STAGES[k + 1] || HERO_F - 30])})`; });
  }

  shape(kind, x, y, s, a, color, hollow) {
    const ctx = this.ctx; if (a <= 0.001) return;
    ctx.globalAlpha = a; ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    const r = Math.min(s * 0.28, 6);
    if (kind === 0) { ctx.beginPath(); hollow ? ctx.roundRect(x - s / 2 + 0.75, y - s / 2 + 0.75, s - 1.5, s - 1.5, r) : ctx.roundRect(x - s / 2, y - s / 2, s, s, r); hollow ? ctx.stroke() : ctx.fill(); }
    else if (kind === 1) { ctx.beginPath(); ctx.arc(x, y, s / 2, 0, 6.283); ctx.fill(); }
    else if (kind === 2) { ctx.beginPath(); ctx.arc(x, y, s / 2, 0, 6.283); ctx.stroke(); }
    else { ctx.beginPath(); ctx.roundRect(x - s * 0.8, y - s * 0.22, s * 1.6, s * 0.44, s * 0.22); ctx.fill(); }
  }
  ring(x, y, r, a) { const ctx = this.ctx; ctx.globalAlpha = a; ctx.strokeStyle = this.hi; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke(); }

  drawHero(f, time) {
    const ctx = this.ctx, W = this.cw, H = this.ch, N = this.narrow;
    ctx.clearRect(0, 0, W, H);
    const A = N ? { x0: W * 0.06, x1: W * 0.94, y0: H * 0.12, y1: H * 0.41 } : { x0: Math.max(W * 0.5, W * 0.06 + 620), x1: W * 0.95, y0: H * 0.16, y1: H * 0.84 };
    const sc = this.scatter || { y0: 0.77, y1: 0.94 };
    const S = N ? { x0: W * 0.1, x1: W * 0.9, y0: H * sc.y0, y1: H * sc.y1 } : { x0: W * 0.54, x1: W * 0.93, y0: H * 0.2, y1: H * 0.9 };
    const g = ease(I(f, [330, 366]));
    const cols = 12, rows = 8 + 4 * g;
    const cell = Math.min((A.x1 - A.x0) / cols, (A.y1 - A.y0) / rows);
    const gw = cell * cols, gh = cell * rows;
    const ox = N ? A.x0 + (A.x1 - A.x0 - gw) / 2 : A.x1 - gw;
    const oy = A.y0 + (A.y1 - A.y0 - gh) / 2;
    const slot = k => [ox + (k % cols + 0.5) * cell, oy + (Math.floor(k / cols) + 0.5) * cell];
    const t3 = I(f, [212, 262]);
    const sweep = ox - 14 + (gw + 28) * t3;
    const sz = w => cell * (0.24 + 0.6 * w);
    const still = this.still;
    const kc = clamp((ease(I(f, [6, 46])) - 0.4) / 0.2);
    const base = mix(CORAL_RGB, LIGHT_RGB, kc), hi = CORAL;
    this.hi = hi;

    for (const p of this.ps) {
      let x, y, s, morph, alpha, color = base, hollow = false;
      if (p.i < 96) {
        const t1 = ease(I(f, [88 + p.st * 26, 122 + p.st * 26]));
        const t2 = ease(I(f, [150 + p.st * 22, 186 + p.st * 22]));
        const dr = still ? 0 : 1 - t1;
        const sx = S.x0 + p.sx * (S.x1 - S.x0) + Math.sin(time * 0.0005 + p.ph) * 12 * dr;
        const sy = S.y0 + p.sy * (S.y1 - S.y0) + Math.cos(time * 0.0004 + p.ph) * 12 * dr;
        const [ax, ay] = slot(p.i), [bx, by] = slot(p.rank);
        x = lerp(lerp(sx, ax, t1), bx, t2); y = lerp(lerp(sy, ay, t1), by, t2);
        s = lerp(lerp(p.s0, cell * 0.56, t1), sz(p.w), t2);
        morph = t1; alpha = lerp(0.55, 0.62, t1);
        if (p.rank < 10 && t2 > 0.5) color = hi;
        if (f > 205 && x < sweep) { alpha = 1; if (p.flag && f < p.res) hollow = true; }
        if (p.flag) {
          if (p.origin && f > 266 && f < p.res + 4) this.ring(x, y, cell * (0.55 + 0.15 * Math.sin(time * 0.012)), 0.9);
          if (f >= p.res && f < p.res + 18) { const k = (f - p.res) / 18; this.ring(x, y, cell * (0.4 + 0.8 * k), 1 - k); }
          if (f >= p.res) color = base;
        }
      } else {
        const a = 334 + (p.i - 96) * 0.6, t = ease(I(f, [a, a + 18]));
        if (t <= 0) continue;
        const [bx, by] = slot(p.i);
        x = lerp(W + 20 + p.fx * 140, bx, t); y = lerp(S.y0 + p.fy * (S.y1 - S.y0), by, t);
        s = lerp(p.s0, sz(p.w), t); morph = t; alpha = lerp(0.6, 1, t);
      }
      if (morph < 1) this.shape(p.kind, x, y, s, alpha * (1 - morph), color, false);
      if (morph > 0) this.shape(0, x, y, s, alpha * morph, color, hollow);
    }
    const la = I(f, [205, 212]) * (1 - I(f, [262, 272]));
    if (la > 0) {
      ctx.globalAlpha = la; ctx.strokeStyle = hi; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sweep, oy - 28); ctx.lineTo(sweep, oy + gh + 16); ctx.stroke();
      ctx.fillStyle = hi; ctx.font = '500 11px "Geist Mono", monospace';
      ctx.fillText('SOURCE OF TRUTH', Math.min(sweep + 8, W - 130), oy - 18);
    }
    ctx.globalAlpha = 1;
  }

  methodDom(f) {
    this.layer(this.mIntro, f, -1, 0, 70, 130);
    this.layer(this.mBody, f, 90, 140, 960, 1000, 40);
    const w = 152, names = ['DISCOVER', 'FRAME', 'MAKE IT VISIBLE', 'BUILD', 'LEARN'];
    this.mSteps.forEach((el, k) => {
      const a = 120 + k * w;
      const inA = k === 0 ? 100 : a - 12;
      this.layer(el, f, inA, inA + 32, a + w - 30, a + w);
    });
    this.layer(this.mLoop, f, 872, 900);
    const u = clamp((f - 120) / (5 * w)) * 5, frac = u / 5;
    const C = 942.48;
    this.arc.setAttribute('stroke-dashoffset', (C * (1 - frac)).toFixed(1));
    const ang = -Math.PI / 2 + frac * Math.PI * 2;
    this.dot.setAttribute('cx', (150 * Math.cos(ang)).toFixed(1));
    this.dot.setAttribute('cy', (150 * Math.sin(ang)).toFixed(1));
    const loop = f >= 880, active = loop ? 0 : Math.min(4, Math.floor(u));
    this.nodes.forEach((n, k) => {
      const reached = u >= k || loop;
      const on = k === active;
      n.setAttribute('fill', reached ? (on ? CORAL : INK) : BG);
      n.setAttribute('stroke', on ? CORAL : INK);
      n.setAttribute('r', on ? 19 : 13);
    });
    const num = loop ? '↺' : String(active + 1).padStart(2, '0');
    if (this.ringNum.textContent !== num) this.ringNum.textContent = num;
    const nm = loop ? 'AGAIN' : names[active];
    if (this.ringName.textContent !== nm) this.ringName.textContent = nm;
  }

  caseDom(f) {
    const L = this.cLayers;
    this.layer(L[0], f, -1, 0, 70, 100);
    this.layer(L[1], f, 95, 125, 200, 225);
    this.layer(L[2], f, 220, 250, 335, 360);
    this.layer(L[3], f, 355, 385, 465, 490);
    this.layer(L[4], f, 485, 510, 600, 625);
    this.layer(L[5], f, 620, 645, 700, 720);
    this.layer(L[6], f, 738, 762, 832, 852);
    this.layer(L[7], f, 866, 892);
    this.rise(this.cSubs[0], I(f, [135, 165]));
    this.rise(this.cSubs[1], I(f, [255, 285]));
    this.rise(this.cSubs[2], I(f, [280, 310]));
    this.cPills.forEach((el, k) => this.rise(el, I(f, [372 + k * 12, 402 + k * 12]), 40, 0.15));
    this.cTiles.forEach((el, k) => this.rise(el, I(f, [498 + k * 12, 530 + k * 12]), 60, 0.08));
    this.cCards.forEach((el, k) => this.rise(el, I(f, [748 + k * 10, 778 + k * 10]), 50, 0.06));
    const gd = I(f, [655, 680]) > 0.5;
    if (gd !== this._gd) { this._gd = gd; this.cGrades.forEach(el => { el.style.background = gd ? CORAL : '#FFFFFF'; el.style.color = INK; el.style.borderColor = gd ? CORAL : '#C9D4CD'; el.style.transform = `scale(${gd ? 1.06 : 1})`; el.style.transition = 'all .35s ease'; }); }

    const open = ease(I(f, [700, 745])) * (1 - ease(I(f, [838, 872])));
    const W = this.W, H = this.H, k = 1 - open;
    this.cStage.style.visibility = open < 0.002 ? 'hidden' : 'visible';
    this.cStage.style.opacity = clamp(open * 5);
    this.cStage.style.clipPath = `inset(${H * 0.32 * k}px ${W * 0.3 * k}px ${H * 0.32 * k}px ${W * 0.3 * k}px round ${40 * k + 0.001}px)`;
    this.cNum.style.transform = `translate3d(0,${lerp(6, -10, f / 1000) * H / 100}px,0)`;
    this.cNum.style.opacity = 1 - I(f, [690, 720]) + I(f, [850, 880]);

    this.cRail.style.opacity = I(f, [80, 110]);
    const dark = f > 718 && f < 846;
    let idx = 0; CASE_AT.forEach((a, i) => { if (f >= a) idx = i; });
    const lbl = idx === 0 ? 'Case 01' : 'Case 01 · ' + CASE_LABELS[idx];
    if (this.cLabel.textContent !== lbl) this.cLabel.textContent = lbl;
    this.cLabel.style.color = dark ? '#A9B8AE' : '#56645B';
    this.cSegs.forEach((s, i) => { s.style.transform = `scaleX(${I(f, SEG[i])})`; s.style.background = CORAL; });
    this.cTracks.forEach(t => { t.style.background = dark ? '#2E3F35' : '#C9D4CD'; });

    const cq = I(f, [895, 975]);
    this.cellEls.forEach(el => {
      if (el.dataset.pattern !== '1') return;
      const at = this.cellRes[+el.dataset.cell], done = cq >= at;
      el.style.background = done ? CORAL : 'transparent';
      el.style.borderColor = done ? CORAL : INK;
      el.style.boxShadow = done && cq < at + 0.1 ? '0 0 0 6px rgba(255,111,97,0.3)' : 'none';
    });
  }
}

// Analyze fit: the precomputed example is in the HTML; a live result replaces it.
class FitForm {
  constructor(root, onChange) {
    const q = s => root.querySelector(s);
    this.onChange = onChange;
    this.form = q('[data-fit-form]'); this.jd = q('#jd'); this.submit = q('[data-fit-submit]');
    this.err = q('[data-fit-err]'); this.out = q('[data-fit-out]'); this.label = q('[data-fit-label]');
    this.verdict = q('[data-fit-verdict]'); this.summary = q('[data-fit-summary]');
    this.rows = q('[data-fit-rows]'); this.gap = q('[data-fit-gap]');
    this.loading = false;
    this.form.addEventListener('submit', e => { e.preventDefault(); this.analyze(); });
    q('[data-fit-reset]').addEventListener('click', () => {
      this.jd.value = DEFAULT_JD;
      this.setErr('');
      this.render(DEFAULT_RES, false);
    });
  }

  setErr(msg) { this.err.textContent = msg; }

  setLoading(on) {
    this.loading = on;
    this.submit.textContent = on ? 'Analyzing…' : 'Analyze fit';
    this.submit.setAttribute('aria-disabled', on ? 'true' : 'false');
    this.out.setAttribute('aria-busy', on ? 'true' : 'false');
  }

  async analyze() {
    if (this.loading) return;
    const jd = (this.jd.value || '').trim();
    if (jd.length < 40) { this.setErr('Paste a fuller job description to analyze.'); return; }
    this.setErr('');
    this.setLoading(true);
    try {
      const r = await fetch('/api/fit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jd }) });
      const data = await r.json().catch(() => null);
      if (!r.ok || !data || !Array.isArray(data.rows)) { this.setErr((data && data.error) || 'The analysis could not be completed. Try again.'); return; }
      this.render(data, true);
    } catch (e) {
      this.setErr('The analysis could not be completed. Try again.');
    } finally {
      this.setLoading(false);
    }
  }

  render(res, live) {
    this.label.textContent = live ? 'Fit summary' : 'Fit summary, example role';
    this.verdict.textContent = res.verdict;
    this.summary.textContent = res.summary;
    this.gap.textContent = res.gap;
    this.rows.replaceChildren(...res.rows.map(r => {
      const li = document.createElement('li');
      li.style.cssText = 'background:#FFFFFF;border-radius:20px;padding:16px 20px;display:flex;flex-wrap:wrap;gap:6px 16px;align-items:baseline';
      const req = document.createElement('strong');
      req.style.cssText = 'flex:1 1 260px;min-width:0;font-size:17px;font-weight:600;letter-spacing:-0.01em';
      req.textContent = r.req;
      const pill = document.createElement('span');
      if (r.level === 'strong') {
        pill.style.cssText = 'flex:none;padding:4px 12px;border-radius:999px;background:var(--hl);color:#FFFFFF;font-size:13px;font-weight:500';
        pill.textContent = 'Strong evidence';
      } else {
        pill.style.cssText = 'flex:none;padding:4px 12px;border-radius:999px;border:1px solid #0F1712;font-size:13px;font-weight:500';
        pill.textContent = 'Partial';
      }
      const ev = document.createElement('span');
      ev.style.cssText = 'flex:1 1 100%;font-size:15px;line-height:1.45;color:#3D4A42';
      ev.textContent = r.ev;
      li.append(req, pill, ev);
      return li;
    }));
    this.onChange();
  }
}

const root = document.getElementById('app');
const portfolio = new Portfolio(root);
new FitForm(root, () => { portfolio.ready = false; });
portfolio.start();
