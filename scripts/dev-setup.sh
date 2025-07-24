#!/bin/bash

echo "🚀 Setting up development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Copy development environment file if .env doesn't exist
if [ ! -f .env ]; then
  echo "📋 Creating .env file from .env.development..."
  cp .env.development .env
fi

# Start PostgreSQL with Docker Compose
echo "🐘 Starting PostgreSQL database..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Run database migrations
echo "🔄 Setting up database schema..."
npm run db:push

echo "✅ Development environment ready!"
echo ""
echo "📝 Next steps:"
echo "  1. Run 'npm run dev' to start the development server"
echo "  2. Visit http://localhost:5173"
echo ""
echo "🛠️  Useful commands:"
echo "  - npm run db:studio    # Open Drizzle Studio to view/edit data"
echo "  - docker-compose down  # Stop the database"
echo "  - docker-compose logs  # View database logs"