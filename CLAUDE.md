# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit developer directory for "CleanupMyAISlop" - a marketplace connecting people with AI-generated code issues to developers who can fix them. Built with Svelte 5, TypeScript, and Tailwind CSS 4.

## Tech Stack

- **Framework**: SvelteKit 2.16.0 with Svelte 5.20.3
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4.0.20 (via Vite plugin)
- **Build Tool**: Vite 6.2.6
- **Package Manager**: npm
- **Node Version**: Latest (managed via mise)

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   └── DeveloperCard.svelte  # Developer profile card component
│   ├── mockData.ts               # Sample developer data
│   └── types.ts                  # TypeScript interfaces
├── routes/
│   ├── developers/
│   │   └── +page.svelte          # Developer directory listing page
│   ├── +layout.svelte            # Root layout
│   ├── +page.svelte              # Index page wrapper
│   └── App.svelte                # Main homepage component
├── app.css                       # Global styles with Tailwind directives
├── app.d.ts                      # TypeScript app declarations
└── app.html                      # HTML template
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check the codebase
npm run check

# Type check with watch mode
npm run check:watch

# Format code with Prettier
npm run format
```

## Configuration Details

### TypeScript Configuration

- Strict mode enabled
- Target: ES2022
- Module resolution: Bundler
- Includes SvelteKit path aliases ($lib/\*)

### Vite Configuration

- Tailwind CSS 4 integration via @tailwindcss/vite
- SvelteKit plugin for development

### Environment Configuration

- Public environment variables should be prefixed with `PUBLIC_`
- Types defined in `app.d.ts` for platform-specific features

## Development Guidelines

### Code Style

- Prettier is configured with Svelte and Tailwind plugins
- Run `npm run format` before committing
- TypeScript strict mode enforces type safety

### Component Architecture

- Main UI logic is currently in App.svelte
- Uses Svelte 5's new features (runes, snippets)
- State management uses Svelte 5 runes ($state, $effect)

### Styling

- Tailwind CSS 4 with new features
- Global styles in app.css
- Component-specific styles use Tailwind classes

### Type Checking

- Always run `npm run check` before committing
- svelte-check validates both TypeScript and Svelte components

## Important Notes

- The project is not yet initialized as a Git repository
- No testing framework is currently set up
- The main App.svelte component (580+ lines) could benefit from componentization
- Uses adapter-auto for flexible deployment options
