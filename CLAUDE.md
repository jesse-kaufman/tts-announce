# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

Construction Loan Analysis app - extends Loan Analysis to track construction loan projects including
projected/actual costs and draw amounts for construction project items.

Database: SQL Server (via TypeORM) Tech stack: Vue 3 (frontend), Express (backend), TypeScript (all
packages), Vitest (testing)

## Monorepo Structure

NPM workspaces-based monorepo with 4 packages:

- **packages/backend** - Express API server with TypeORM
- **packages/frontend** - Vue 3 SPA with Pinia state management
- **packages/shared** - Shared utilities, validation, field definitions, types
- **packages/config** - Schema definitions, routes, hooks (imported by backend)

## Key Commands

### Development

```bash
npm run dev              # Run both frontend and backend concurrently
npm run dev:frontend     # Frontend only (Vite dev server)
npm run dev:backend      # Backend only (tsx watch mode)
```

### Testing

```bash
npm test                        # Run all tests across workspaces
npm run test:frontend           # Frontend tests in watch mode
npm run test:backend            # Backend tests in watch mode
npm run test:shared             # Shared package tests in watch mode
npm run test:coverage           # All tests with coverage
npm run test:frontend:coverage  # Frontend coverage in watch mode
```

### Type Checking

```bash
npm run type                 # Type check all workspaces
npm run type:frontend        # Frontend type check
npm run type:frontend:watch  # Frontend type check (watch)
npm run type:backend:watch   # Backend type check (watch)
```

### Linting

```bash
npm run lint           # Lint all packages
npm run lint:fix       # Lint and auto-fix all packages
npm run lint:frontend  # Lint frontend only
npm run lint:backend   # Lint backend only
```

### Database Migrations

```bash
npm run migration:generate:dev   # Generate migration from entity changes (dev)
npm run migration:generate:prod  # Generate migration from entity changes (prod)
npm run migration:run:dev        # Run pending migrations (dev)
npm run migration:run:prod       # Run pending migrations (prod)
```

### Build & Deploy

```bash
npm run build            # Build frontend for production
npm run deploy           # Build and deploy to local + staging
npm run deploy:local     # Deploy to local Windows environment
npm run deploy:staging   # Deploy to staging server
```

## Architecture

### Backend: Schema-Driven Design

The backend uses a **schema-driven architecture** where schemas are the single source of truth:

1. **Schema Definitions** (`packages/config/src/schemas/`) - Define entity structure with:
   - TypeORM column definitions (with field types from `shared/fields`)
   - TypeScript type interfaces
   - Relations, indices, hooks
   - Custom properties like `calculated`, `filterable`, `searchable`

2. **Registry System** (`packages/backend/src/registry.ts`) - Bootstrap order:

   _Schemas → Models (TypeORM EntitySchema) → DataSource Init → Repositories → Services →
   Controllers_

   Each layer is auto-registered via registry functions that import from corresponding directories.

3. **Route Generation** (`packages/backend/src/utils/schema/addSchemaRoutes.ts`):
   - Routes defined in `packages/config/src/routes/` (e.g., `projectRoutes.ts`)
   - Routes are automatically registered to Express based on schema `endpoint` property
   - Handlers reference controller methods (default controller or cross-schema  
     via `{controller, fn}`)

4. **Base Classes** - All schemas use base classes:
   - `BaseRepository` - Generic CRUD operations with TypeORM
   - `BaseService` - Business logic layer, calls repository methods, runs hooks
   - `BaseController` - HTTP request handling, validation, response formatting

### Frontend: Component-Based Vue 3

- **Vue Router** for navigation ([router.ts](packages/frontend/src/router.ts))
- **Pinia stores** for state management ([stores/](packages/frontend/src/stores/))
- **Composables** for shared logic ([composables/](packages/frontend/src/composables/))
- Components organized by domain:
  - `Projects/` - Project-related components
  - `Templates/` - Template-related components
  - `UI/` - Reusable UI components
  - `Base/` - Base components with common patterns

### Shared Package

Provides reusable code across frontend/backend:

- **Fields** (`shared/src/fields/`) - Field definitions with validation (date, amount, text, etc.)
- **Validation** (`shared/src/validation/`) - Shared validation logic
- **Errors** (`shared/src/errors/`) - Custom error types
- **Utils** (`shared/src/utils/`) - Helper functions
- **Types** (`shared/src/types/`) - Shared TypeScript types

### Import Aliases

Backend uses Node.js subpath imports (defined in `packages/backend/package.json`):

```bash
#config/*       → ./src/config/*
#controllers/*  → ./src/controllers/*
#middlewares/*  → ./src/middlewares/*
#models/*       → ./src/models/*
#repositories/* → ./src/repositories/*
#routes/*       → ./src/routes/*
#services/*     → ./src/services/*
#utils/*        → ./src/utils/*
#types          → ./src/types
```

Frontend uses TypeScript path aliases (via `vite-tsconfig-paths`).

Shared/config packages use package exports for importing across workspaces.

## Adding a New Schema

1. Create schema definition in `packages/config/src/schemas/[domain]/[Schema]Schema.ts`
2. Export from `packages/config/src/schemas/index.ts`
3. Create routes file in `packages/config/src/routes/[domain]/[schema]Routes.ts`
4. Export from `packages/config/src/routes/index.ts`
5. Generate migration: `npm run migration:generate:dev`
6. Run migration: `npm run migration:run:dev`

The registry system automatically creates Model, Repository, Service, and Controller for the schema.

## Environment Variables

Configuration via `.env.development` (root directory). Key variables:

- `BACKEND_PORT` - Backend API port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `ENABLE_CSRF_SYNC` - Enable CSRF protection

Frontend proxies API requests to backend (configured in
[vite.config.js](packages/frontend/vite.config.js)).

## Testing Philosophy

- Tests use Vitest with coverage tracking (vitest + @vitest/coverage-v8)
- Frontend tests use @vue/test-utils and @pinia/testing
- All packages have watch mode for TDD workflow
- Type checking runs separately from tests (allows type errors during development)

## Database Schema

Core entities: Projects, LineItems, Draws, LineItemProgress, Templates, TemplateLineItems

See [README.md](README.md) for full DBML schema definition and diagram.
