# Deployment Guide

## Prerequisites
- Cloudflare account
- GitHub repository
- External PostgreSQL database (Cloudflare doesn't provide databases)

## Database Options for Cloudflare
Since Cloudflare doesn't provide PostgreSQL, use:
1. **Neon** (Recommended - Great free tier): [neon.tech](https://neon.tech)
2. **Supabase**: [supabase.com](https://supabase.com)
3. **Aiven**: [aiven.io](https://aiven.io)
4. **Railway**: [railway.app](https://railway.app)

## Deployment Steps

### 1. Set Up Database
1. Create account at [neon.tech](https://neon.tech)
2. Create new database
3. Copy connection string (ensure it has `?sslmode=require`)

### 2. Prepare Your Code
```bash
# Build locally to test
npm run build
```

### 3. Deploy via Cloudflare Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to Workers & Pages → Create → Pages
3. Connect to Git → Select your GitHub repo
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Node version**: 18 or higher

### 4. Set Environment Variables
In Cloudflare dashboard → Your project → Settings → Environment Variables:
```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
AUTH_SECRET=your-generated-secret-here
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

### 5. Initialize Database
After deployment, run locally with production DATABASE_URL:
```bash
export DATABASE_URL="your-production-url"
npm run db:push
```

## Cloudflare-Specific Considerations

### Workers Limitations
- 10ms CPU time limit per request (50ms for paid plans)
- 128MB memory limit
- No native Node.js modules

### Database Connections
- Use connection pooling services if available
- Consider using Cloudflare D1 for SQLite (requires schema changes)
- External databases must be accessible from Cloudflare's network

### Environment Variables
- Set via dashboard or `wrangler.toml`
- Available as `platform.env` in production
- Our code handles both dev and production environments

## Using Wrangler CLI (Alternative)

1. Install Wrangler:
```bash
npm install -g wrangler
```

2. Login:
```bash
wrangler login
```

3. Create `wrangler.toml`:
```toml
name = "cleanupmyaislop"
compatibility_date = "2024-01-01"

[vars]
AUTH_SECRET = "your-secret-here"

# Database URL should be set as a secret
# wrangler secret put DATABASE_URL
```

4. Deploy:
```bash
wrangler pages deploy .svelte-kit/cloudflare
```

## Troubleshooting

### Build Failures
- Ensure Node.js 18+ is selected
- Check build output directory is `.svelte-kit/cloudflare`
- Verify all dependencies are compatible with Workers

### Database Connection Issues
- Must use external database (not localhost)
- Ensure SSL is enabled
- Check if database allows Cloudflare's IP ranges

### Runtime Errors
- Check Workers logs in Cloudflare dashboard
- Verify environment variables are set
- Ensure no Node.js-specific APIs are used

## Performance Tips
- Cloudflare Pages is globally distributed by default
- Static assets are cached at edge
- Dynamic routes run as Workers
- Consider caching database queries with Cloudflare KV