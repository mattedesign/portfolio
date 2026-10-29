// Vercel Routing Middleware. Everything under /samples needs the cookie that /api/unlock sets
// after the right password; otherwise the request is redirected to the unlock page.
// Static files under /samples (the page, its images, the embedded examples) pass through here too.
import { next } from '@vercel/functions';
import { COOKIE, readCookie, secretFromEnv, verifyToken } from './lib/gate.js';

export const config = { matcher: ['/samples', '/samples/:path*'] };

export default async function middleware(request) {
  const url = new URL(request.url);
  const secret = secretFromEnv();
  const ok = secret && await verifyToken(secret, readCookie(request.headers.get('cookie'), COOKIE));
  if (ok) return next({ headers: { 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'private, no-store' } });
  const to = new URL('/unlock/', url.origin);
  to.searchParams.set('next', url.pathname + url.search);
  if (!secret) to.searchParams.set('e', '3');
  return Response.redirect(to.toString(), 302);
}
