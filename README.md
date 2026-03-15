# OrrenteJobs

A modern job board demo built to showcase frontend architecture and engineering skills.

## Live Demo
[https://orrentejobs.vercel.app](https://orrentejobs.vercel.app)

## Repository
[https://github.com/markorrente01/orrentejobs](https://github.com/markorrente01/orrentejobs)

## Tech Stack

- **React** + **TypeScript** — component-driven UI
- **TailwindCSS v4** — utility-first styling with custom design tokens
- **Framer Motion** — page transitions and micro-interactions
- **Lucide React** — icons
- **TanStack React Query** — async state management with simulated API layer
- **React Router v6** — client-side routing

## Architecture

Feature-based architecture with strict separation of concerns:
```
src/
├── features/jobs/     # Self-contained jobs feature module
│   ├── mock.ts        # Mock data
│   ├── service.ts     # Mock API layer
│   ├── actions.ts     # Business logic
│   ├── hooks/         # React Query hooks
│   └── components/    # Feature-specific UI
├── components/
│   ├── ui/            # Reusable primitive components
│   └── layout/        # Layout components
├── pages/             # Route-level page components
├── context/           # Global state (theme)
└── layouts/           # Route layouts
```

## Getting Started
```bash
npm install
npm run dev
```

## Features

- Job listing with real-time search and filtering by department, type, level and remote
- Job detail page with apply and save interactions
- Light and dark theme with system preference detection and persistence
- Skeleton loading states
- Mobile-responsive with slide-out filter drawer
- Animated page transitions
- 404 page