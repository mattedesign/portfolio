import './styles.css';
import './samples.css';

// The unlock API sends people back here with ?e=<code> when the password does not match.
const MESSAGES = {
  1: 'That password did not match. Try again.',
  2: 'Too many attempts from this connection. Wait ten minutes and try again.',
  3: 'The samples are not set up on the server yet. Email Matthew for a copy.'
};
const params = new URLSearchParams(location.search);
const err = document.querySelector('[data-unlock-error]');
const msg = MESSAGES[params.get('e')];
if (err && msg) err.textContent = msg;
const next = params.get('next');
const field = document.querySelector('[data-unlock-next]');
if (field && next && /^\/samples(\/[^\s\\]*)?$/.test(next)) field.value = next;
const pw = document.getElementById('unlock-password');
if (pw && !matchMedia('(pointer: coarse)').matches) pw.focus();
