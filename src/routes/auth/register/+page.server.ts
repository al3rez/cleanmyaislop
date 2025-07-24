import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { createSession, createSessionCookie, hashPassword } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const name = data.get('name') as string;
    const password = data.get('password') as string;
    const role = data.get('role') as 'client' | 'developer';
    
    // Validation
    if (!email || !name || !password || !role) {
      return fail(400, { 
        error: 'All fields are required',
        email,
        name,
        role
      });
    }
    
    if (password.length < 8) {
      return fail(400, { 
        error: 'Password must be at least 8 characters',
        email,
        name,
        role
      });
    }
    
    if (!['client', 'developer'].includes(role)) {
      return fail(400, { 
        error: 'Invalid role',
        email,
        name
      });
    }
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    if (existingUser.length > 0) {
      return fail(400, { 
        error: 'Email already registered',
        email,
        name,
        role
      });
    }
    
    try {
      // Create user
      const hashedPassword = await hashPassword(password);
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          name,
          password: hashedPassword,
          role
        })
        .returning({ id: users.id });
      
      // Create session
      const sessionToken = await createSession(newUser.id);
      cookies.set('auth_session', sessionToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
      
      // Redirect based on role
      if (role === 'developer') {
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