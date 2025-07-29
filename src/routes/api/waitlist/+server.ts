import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import { eq, and } from 'drizzle-orm';

const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || '';

// Email validation regex - more strict than just checking for @
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per 15 minutes

// Clean old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || record.resetTime < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  // Set security headers
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  try {
    // Get IP for rate limiting
    const ipAddress = getClientAddress();
    
    // Check rate limit
    if (!checkRateLimit(ipAddress)) {
      return json(
        { error: 'Too many requests. Please try again later.' }, 
        { status: 429, headers }
      );
    }

    const { email, role, turnstileToken } = await request.json();

    // Validate and sanitize email
    const trimmedEmail = email?.trim().toLowerCase();
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return json({ error: 'Invalid email address' }, { status: 400, headers });
    }

    // Additional email validation
    if (trimmedEmail.length > 256) {
      return json({ error: 'Email address too long' }, { status: 400, headers });
    }

    // Validate role
    if (!role || !['client', 'developer'].includes(role)) {
      return json({ error: 'Invalid role' }, { status: 400, headers });
    }

    // Require Turnstile in production
    if (!turnstileToken && TURNSTILE_SECRET_KEY) {
      return json({ error: 'Captcha verification required' }, { status: 400, headers });
    }

    // Verify Turnstile token
    if (turnstileToken && TURNSTILE_SECRET_KEY) {
      const formData = new FormData();
      formData.append('secret', TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);
      formData.append('remoteip', ipAddress);

      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });

      const outcome = await result.json();
      if (!outcome.success) {
        return json({ error: 'Captcha verification failed' }, { status: 400, headers });
      }
    }

    // Check if email already exists with this role
    const existing = await db
      .select()
      .from(waitlist)
      .where(and(eq(waitlist.email, trimmedEmail), eq(waitlist.role, role)))
      .limit(1);

    if (existing.length > 0) {
      return json({ error: 'You have already joined the waitlist' }, { status: 409, headers });
    }

    // Check if email exists with different role
    const existingOtherRole = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, trimmedEmail))
      .limit(1);

    if (existingOtherRole.length > 0) {
      const existingRole = existingOtherRole[0].role;
      return json({ 
        error: `This email is already registered as a ${existingRole}. Each email can only sign up for one role.` 
      }, { status: 409, headers });
    }

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Insert into waitlist
    await db.insert(waitlist).values({
      email: trimmedEmail,
      role,
      ipAddress,
      userAgent: userAgent.substring(0, 500), // Limit length
      referrer: referrer.substring(0, 500) // Limit length
    });

    return json({ success: true }, { headers });
  } catch (error) {
    console.error('Waitlist error:', error);
    
    // Don't expose internal errors
    return json({ error: 'An error occurred. Please try again.' }, { status: 500, headers });
  }
};

// Prevent GET requests to this endpoint
export const GET: RequestHandler = async () => {
  return json({ error: 'Method not allowed' }, { status: 405 });
};