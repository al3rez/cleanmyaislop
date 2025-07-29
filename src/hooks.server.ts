import type { Handle } from '@sveltejs/kit';
import { getSessionTokenFromCookies, validateSessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  // Auth handling
  const token = getSessionTokenFromCookies(event.request.headers.get('cookie'));
  
  if (token) {
    const sessionData = await validateSessionToken(token);
    if (sessionData) {
      event.locals.user = sessionData.user;
      event.locals.session = sessionData.session;
    }
  }
  
  // Process request
  const response = await resolve(event);

  // Add security headers to all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  
  // CSP header to prevent XSS
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: http:; " +
    "connect-src 'self' https://challenges.cloudflare.com; " +
    "frame-src https://challenges.cloudflare.com; " +
    "object-src 'none'; " +
    "base-uri 'self';"
  );

  return response;
};