import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Only developers can access this dashboard
  if (locals.user?.role !== 'developer') {
    throw redirect(303, '/dashboard');
  }
  
  return {
    user: locals.user
  };
};