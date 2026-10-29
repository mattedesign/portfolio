import './styles.css';
import './samples.css';

// Front-end gate for /samples. The password is checked in the browser against this SHA-256 hash
// and the result is remembered in this browser for 30 days. It keeps casual visitors and crawlers
// out; it is not security, since anything under /samples is served to anyone who has a file's URL.
// To change the password, replace HASH with the output of:
//   node -e "console.log(require('node:crypto').createHash('sha256').update('new password').digest('hex'))"
const HASH = '49a00d1f2fe3c834c93d74eeef53518c44da10b6adaac27911fb9cf5ad4ef574';

const params = new URLSearchParams(location.search);
const safeNext = v => (typeof v === 'string' && /^\/samples(\/[^\s\\]*)?$/.test(v)) ? v : '/samples/';
const next = safeNext(params.get('next'));

const form = document.querySelector('.unlock-form');
const field = document.getElementById('unlock-password');
const err = document.querySelector('[data-unlock-error]');
if (field && !matchMedia('(pointer: coarse)').matches) field.focus();

const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
function remember() {
  const stamp = String(Date.now());
  try { localStorage.setItem('mb_samples', stamp); } catch {}
  try { sessionStorage.setItem('mb_samples', stamp); } catch {}
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const digest = hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(field.value.trim())));
  if (digest !== HASH) {
    err.textContent = 'That password did not match. Try again.';
    field.select();
    return;
  }
  remember();
  location.replace(next);
});
