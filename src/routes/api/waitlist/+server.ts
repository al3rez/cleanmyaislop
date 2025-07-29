import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';

const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || '';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    const { email, role, turnstileToken } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate role
    if (!role || !['client', 'developer'].includes(role)) {
      return json({ error: 'Invalid role' }, { status: 400 });
    }

    // Verify Turnstile token if provided
    if (turnstileToken && TURNSTILE_SECRET_KEY) {
      const formData = new FormData();
      formData.append('secret', TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);
      formData.append('remoteip', getClientAddress());

      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const outcome = await result.json();
      if (!outcome.success) {
        return json({ error: 'Captcha verification failed' }, { status: 400 });
      }
    }

    // Get request metadata
    const ipAddress = getClientAddress();
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Insert into waitlist
    await db.insert(waitlist).values({
      email,
      role,
      ipAddress,
      userAgent,
      referrer
    });

    return json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    
    // Check for duplicate email
    if (error instanceof Error && error.message.includes('duplicate')) {
      return json({ error: 'Email already registered' }, { status: 409 });
    }
    
    return json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
};