import type { Handle } from '@sveltejs/kit';
import { getSessionTokenFromCookies, validateSessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const token = getSessionTokenFromCookies(event.request.headers.get('cookie'));
  
  if (token) {
    const sessionData = await validateSessionToken(token);
    if (sessionData) {
      event.locals.user = sessionData.user;
      event.locals.session = sessionData.session;
    }
  }
  
  return resolve(event);
};