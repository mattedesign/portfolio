// Local check of the /samples gate: middleware.js and api/unlock.js, no server needed.
// Run: node scripts/test-gate.mjs
import assert from 'node:assert/strict';

process.env.SAMPLES_PASSWORD = 'correct horse battery';
delete process.env.SAMPLES_SECRET;

const { default: middleware } = await import('../middleware.js');
const { default: unlock } = await import('../api/unlock.js');
const { makeToken, verifyToken, secretFromEnv, safeNext } = await import('../lib/gate.js');

const ORIGIN = 'https://www.matthewbrown.design';
const fakeRes = () => ({
  headers: {}, statusCode: 200, ended: false,
  setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
  status(c) { this.statusCode = c; return this; },
  end(b) { this.body = b; this.ended = true; return this; },
  json(o) { this.body = JSON.stringify(o); this.ended = true; return this; }
});
const post = (body, ip = '203.0.113.9') => ({ method: 'POST', headers: { 'x-forwarded-for': ip }, body });

// 1. No cookie: redirected to the unlock page with the original path preserved.
let r = await middleware(new Request(ORIGIN + '/samples/img/a.webp?x=1'));
assert.equal(r.status, 302);
assert.equal(r.headers.get('location'), ORIGIN + '/unlock/?next=%2Fsamples%2Fimg%2Fa.webp%3Fx%3D1');

// 2. Wrong password: back to unlock with e=1, no cookie.
let res = fakeRes();
await unlock(post({ password: 'nope', next: '/samples/' }), res);
assert.equal(res.statusCode, 303);
assert.equal(res.headers.location, '/unlock/?e=1&next=%2Fsamples%2F');
assert.equal(res.headers['set-cookie'], undefined);

// 3. Right password (with stray whitespace): cookie set, sent on to next.
res = fakeRes();
await unlock(post({ password: ' correct horse battery ', next: '/samples/#s-03' }), res);
assert.equal(res.statusCode, 303);
assert.equal(res.headers.location, '/samples/#s-03');
const cookie = res.headers['set-cookie'];
assert.match(cookie, /^mb_samples=\d+\.[0-9a-f]{64}; Path=\/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax$/);

// 4. That cookie opens the gate; the response is a pass-through with noindex.
const token = cookie.split(';')[0].split('=')[1];
r = await middleware(new Request(ORIGIN + '/samples/', { headers: { cookie: 'other=1; mb_samples=' + token } }));
assert.equal(r.headers.get('x-middleware-next'), '1');
assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow');

// 5. A tampered or expired cookie does not.
r = await middleware(new Request(ORIGIN + '/samples/', { headers: { cookie: 'mb_samples=' + token.slice(0, -1) + 'f' } }));
assert.equal(r.status, 302);
const secret = secretFromEnv();
const old = await makeToken(secret, Date.now() - 31 * 24 * 3600 * 1000);
assert.equal(await verifyToken(secret, old), false);
assert.equal(await verifyToken(secret + 'x', token), false);

// 6. next is confined to /samples.
for (const bad of ['https://evil.example/', '//evil.example', '/experience', '/samplesx', 42, undefined]) assert.equal(safeNext(bad), '/samples/');
assert.equal(safeNext('/samples/img/x.webp'), '/samples/img/x.webp');

// 7. Rate limit: the 11th try inside ten minutes bounces with e=2.
for (let i = 0; i < 10; i++) await unlock(post({ password: 'nope' }, '198.51.100.7'), fakeRes());
res = fakeRes();
await unlock(post({ password: 'correct horse battery' }, '198.51.100.7'), res);
assert.equal(res.headers.location, '/unlock/?e=2&next=%2Fsamples%2F');

// 8. No password configured: fail closed on both sides.
delete process.env.SAMPLES_PASSWORD;
r = await middleware(new Request(ORIGIN + '/samples/', { headers: { cookie: 'mb_samples=' + token } }));
assert.equal(r.status, 302);
assert.match(r.headers.get('location'), /e=3/);
res = fakeRes();
await unlock(post({ password: 'correct horse battery' }), res);
assert.equal(res.headers.location, '/unlock/?e=3&next=%2Fsamples%2F');

console.log('gate check: 8 scenarios passed');
