import './styles.css';
import './samples.css';

// Reveal on enter, the same curve and distance as the Experience rows on the home page.
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('[data-reveal]');
if (!still && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.style.opacity = '1';
    en.target.style.transform = 'none';
    io.unobserve(en.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0,40px,0)';
    el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)';
    io.observe(el);
  });
}

// Interactive examples open in one shared dialog. A button carries data-src (a page under
// /samples/examples, or any embeddable URL such as a Figma embed link) and data-title.
const dlg = document.querySelector('[data-embed]');
if (dlg && typeof dlg.showModal === 'function') {
  const frame = dlg.querySelector('iframe');
  const title = dlg.querySelector('[data-embed-title]');
  const open = dlg.querySelector('[data-embed-open]');
  document.querySelectorAll('button[data-src]').forEach(b => b.addEventListener('click', () => {
    frame.title = b.dataset.title;
    frame.src = b.dataset.src;
    title.textContent = b.dataset.title;
    open.href = b.dataset.src;
    dlg.showModal();
  }));
  dlg.querySelector('[data-embed-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => frame.removeAttribute('src'));
} else {
  // No dialog support: the buttons become plain links to the example.
  document.querySelectorAll('button[data-src]').forEach(b => {
    const a = document.createElement('a');
    a.className = b.className; a.href = b.dataset.src; a.target = '_blank'; a.rel = 'noopener'; a.textContent = b.textContent;
    b.replaceWith(a);
  });
}
