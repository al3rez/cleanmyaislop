# CleanupMyAISlop

A marketplace connecting people with AI-generated code issues to developers who can fix them.

## Prerequisites

- Node.js 18+ (managed via mise or nvm)
- Docker and Docker Compose
- npm

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cleanupmyaislop
   ```

2. **Set up the development environment**
   ```bash
   npm run dev:setup
   ```
   This will:
   - Start PostgreSQL in Docker
   - Install dependencies
   - Create database tables
   - Set up environment variables

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Visit the application**
   - Main site: http://localhost:5173
   - Database UI: `npm run db:studio` (opens Drizzle Studio)

## Development Commands

### Database
- `npm run dev:db:start` - Start PostgreSQL container
- `npm run dev:db:stop` - Stop PostgreSQL container
- `npm run dev:db:reset` - Reset database (deletes all data!)
- `npm run db:studio` - Open Drizzle Studio to view/edit data
- `npm run db:push` - Apply schema changes to database
- `npm run db:generate` - Generate migration files

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check the codebase
- `npm run format` - Format code with Prettier

## Tech Stack

- **Framework**: SvelteKit with Svelte 5
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS 4
- **Authentication**: Custom session-based auth
- **Deployment**: Cloudflare Pages & Workers

## Environment Variables

Copy `.env.development` to `.env` for local development:

```bash
cp .env.development .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Secret for session encryption

## Database Schema

The application includes:
- **Users**: Clients and developers with role-based access
- **Projects**: Job postings from clients
- **Proposals**: Bids from developers
- **Reviews**: Feedback system
- **Developer Profiles**: Extended developer information

## Deployment

1. Set up a PostgreSQL database (Neon, Supabase, or Railway)
2. Set environment variables in Cloudflare Pages dashboard
3. Deploy via Wrangler CLI or GitHub integration

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running
- Check ports: `lsof -i :5432` (PostgreSQL should not be in use)
- View logs: `docker-compose logs postgres`

### Database Issues
- Reset database: `npm run dev:db:reset`
- Check connection: `docker-compose exec postgres psql -U postgres -d cleanupmyaislop`
