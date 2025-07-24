import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/cleanupmyaislop',
  },
} satisfies Config;