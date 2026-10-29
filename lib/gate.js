// Shared by middleware.js (Routing Middleware) and api/unlock.js (Node function).
// Web Crypto only, so the same code runs in both runtimes.
//
// The cookie holds "<expiry seconds>.<hmac-sha256 hex>". The HMAC key is SAMPLES_SECRET, or,
// when that is not set, a value derived from SAMPLES_PASSWORD. Knowing the password already
// lets someone mint a cookie by signing in, so the derived key gives nothing extra away.

const enc = new TextEncoder();
export const COOKIE = 'mb_samples';
export const MAX_AGE = 30 * 24 * 60 * 60; // seconds; 30 days

export function secretFromEnv(env = process.env) {
  if (env.SAMPLES_SECRET) return env.SAMPLES_SECRET;
  if (env.SAMPLES_PASSWORD) return 'mb-samples|' + env.SAMPLES_PASSWORD;
  return null;
}

const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const unhex = s => new Uint8Array(s.match(/../g).map(h => parseInt(h, 16)));
const key = secret => crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

export async function makeToken(secret, now = Date.now()) {
  const exp = Math.floor(now / 1000) + MAX_AGE;
  const sig = await crypto.subtle.sign('HMAC', await key(secret), enc.encode('mb-samples:' + exp));
  return exp + '.' + hex(sig);
}

export async function verifyToken(secret, token, now = Date.now()) {
  if (!secret || typeof token !== 'string') return false;
  const m = /^(\d{1,12})\.([0-9a-f]{64})$/.exec(token);
  if (!m || Number(m[1]) <= Math.floor(now / 1000)) return false;
  return crypto.subtle.verify('HMAC', await key(secret), unhex(m[2]), enc.encode('mb-samples:' + m[1]));
}

export function readCookie(header, name) {
  for (const part of String(header || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) {
      try { return decodeURIComponent(part.slice(i + 1).trim()); } catch { return null; }
    }
  }
  return null;
}

// Only ever send people back inside /samples on this origin.
export function safeNext(v) {
  return typeof v === 'string' && /^\/samples(\/[^\s\\]*)?$/.test(v) ? v : '/samples/';
}
