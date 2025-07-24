import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // If user is logged in, redirect to their dashboard
  if (locals.user) {
    if (locals.user.role === 'developer') {
      throw redirect(303, '/dashboard/developer');
    } else {
      throw redirect(303, '/dashboard');
    }
  }
  
  return {};
};