import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { env } from '$env/dynamic/private';

// In development use Vite env, in production use Cloudflare env
const connectionString = dev ? DATABASE_URL : (env.DATABASE_URL || DATABASE_URL);

// Use Neon serverless driver for Cloudflare Pages
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });