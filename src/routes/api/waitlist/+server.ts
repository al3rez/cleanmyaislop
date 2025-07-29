import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import { eq, and } from 'drizzle-orm';

const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || '';

// Email validation regex - more strict than just checking for @
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Sliding window rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour sliding window
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per hour

// Clean old rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of rateLimitMap.entries()) {
    // Remove timestamps older than the window
    const validTimestamps = timestamps.filter(ts => ts > now - RATE_LIMIT_WINDOW);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, validTimestamps);
    }
  }
}, 10 * 60 * 1000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Remove old timestamps outside the sliding window
  const validTimestamps = timestamps.filter(ts => ts > now - RATE_LIMIT_WINDOW);
  
  // Check if under the limit
  if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    // Update the map with cleaned timestamps
    rateLimitMap.set(ip, validTimestamps);
    return false;
  }
  
  // Add current timestamp and update
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
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