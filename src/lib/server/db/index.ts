import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { env } from '$env/dynamic/private';

// In development use Vite env, in production use Cloudflare env
const connectionString = dev ? DATABASE_URL : (env.DATABASE_URL || DATABASE_URL);

// Configure connection pooling for production
const connectionConfig = {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  prepare: false,
  // Connection pool configuration
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // seconds
  connect_timeout: 10, // seconds
  // SSL configuration for production
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false
};

export const client = postgres(connectionString, connectionConfig);
export const db = drizzle(client, { schema });