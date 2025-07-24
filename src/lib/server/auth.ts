import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase, encodeBase64 } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { sessions, users } from './db/schema';

const SESSION_COOKIE_NAME = 'auth_session';

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: 'client' | 'developer' | 'admin';
};

function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(userId: number): Promise<string> {
  const token = generateSessionToken();
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  
  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
  });
  
  return token;
}

export async function validateSessionToken(token: string): Promise<{ session: { id: string; expiresAt: Date }, user: SessionUser } | null> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  
  const result = await db
    .select({
      session: {
        id: sessions.id,
        expiresAt: sessions.expiresAt
      },
      user: {
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role
      }
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));
  
  if (result.length === 0) {
    return null;
  }
  
  const { session, user } = result[0];
  
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return null;
  }
  
  // Extend session if it expires in less than 15 days
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    await db
      .update(sessions)
      .set({ expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })
      .where(eq(sessions.id, session.id));
  }
  
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

// Simple PBKDF2-based password hashing for Cloudflare Workers compatibility
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  return new Uint8Array(derivedBits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await deriveKey(password, salt);
  
  // Combine salt and hash
  const combined = new Uint8Array(salt.length + hash.length);
  combined.set(salt);
  combined.set(hash, salt.length);
  
  return encodeBase64(combined);
}

export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
  try {
    const combined = new Uint8Array(atob(hashedPassword).split('').map(c => c.charCodeAt(0)));
    const salt = combined.slice(0, 16);
    const hash = combined.slice(16);
    
    const testHash = await deriveKey(password, salt);
    
    // Constant-time comparison
    if (hash.length !== testHash.length) return false;
    let result = 0;
    for (let i = 0; i < hash.length; i++) {
      result |= hash[i] ^ testHash[i];
    }
    return result === 0;
  } catch {
    return false;
  }
}

export function createSessionCookie(token: string): string {
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}

export function deleteSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getSessionTokenFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith(`${SESSION_COOKIE_NAME}=`));
  
  if (!sessionCookie) return null;
  
  return sessionCookie.split('=')[1];
}