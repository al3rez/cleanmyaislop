import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { invalidateSession } from '$lib/server/auth';

export const actions = {
  default: async ({ locals, cookies }) => {
    if (locals.session) {
      await invalidateSession(locals.session.id);
    }
    
    cookies.delete('auth_session', { path: '/' });
    
    throw redirect(303, '/');
  }
} satisfies Actions;