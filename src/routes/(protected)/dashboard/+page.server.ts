import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect developers to their dashboard
  if (locals.user?.role === 'developer') {
    throw redirect(303, '/dashboard/developer');
  }
  
  // Only clients and admins can access this dashboard
  if (locals.user?.role !== 'client' && locals.user?.role !== 'admin') {
    throw redirect(303, '/');
  }
  
  return {
    user: locals.user
  };
};