import { createHash, timingSafeEqual } from 'node:crypto';
import { COOKIE, MAX_AGE, makeToken, safeNext, secretFromEnv } from '../lib/gate.js';

// POST (form-encoded) { password, next } from /unlock. On a match, sets the cookie the
// middleware checks and sends the visitor on to `next` (always inside /samples).
// On a miss, sends them back to /unlock with an error code: 1 wrong password, 2 too many
// attempts, 3 SAMPLES_PASSWORD is not set on the server.

// Best effort per instance: 10 attempts per IP per 10 minutes
const WINDOW = 10 * 60 * 1000, LIMIT = 10, hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const digest = s => createHash('sha256').update(String(s), 'utf8').digest();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed.');
  }
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const nextPath = safeNext(body.next);
  const back = code => {
    res.setHeader('Cache-Control', 'no-store');
    res.statusCode = 303;
    res.setHeader('Location', '/unlock/?e=' + code + '&next=' + encodeURIComponent(nextPath));
    return res.end();
  };
  const expected = (process.env.SAMPLES_PASSWORD || '').trim();
  if (!expected) return back(3);
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return back(2);
  const given = typeof body.password === 'string' ? body.password.trim() : '';
  if (!timingSafeEqual(digest(given), digest(expected))) return back(1);

  const token = await makeToken(secretFromEnv());
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`);
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = 303;
  res.setHeader('Location', nextPath);
  return res.end();
}
