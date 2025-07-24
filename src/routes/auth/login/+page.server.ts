import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { createSession, verifyPassword } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const actions = {
  default: async ({ request, cookies, url }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    
    // Validation
    if (!email || !password) {
      return fail(400, { 
        error: 'Email and password are required',
        email
      });
    }
    
    // Find user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (!user) {
      return fail(400, { 
        error: 'Invalid email or password',
        email
      });
    }
    
    // Verify password
    const validPassword = await verifyPassword(user.password, password);
    if (!validPassword) {
      return fail(400, { 
        error: 'Invalid email or password',
        email
      });
    }
    
    try {
      // Create session
      const sessionToken = await createSession(user.id);
      cookies.set('auth_session', sessionToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
      
      // Redirect to return URL or dashboard based on role
      const returnTo = url.searchParams.get('returnTo');
      if (returnTo && returnTo.startsWith('/')) {
        throw redirect(303, returnTo);
      }
      
      if (user.role === 'developer') {
        throw redirect(303, '/dashboard/developer');
      } else {
        throw redirect(303, '/dashboard');
      }
    } catch (error) {
      // Re-throw redirects (they're not errors)
      throw error;
    }
  }
} satisfies Actions;