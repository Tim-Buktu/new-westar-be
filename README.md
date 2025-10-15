# WesternStar Backend

Foundational Express server for the WesternStar CMS API.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and adjust values as needed:
   ```bash
   cp .env.example .env
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` – Start the server with hot reload via nodemon + ts-node.
- `npm run build` – Compile TypeScript to `dist`.
- `npm start` – Run the compiled server from `dist`.

## Verifying the Health Check

Once the server is running, visit [http://localhost:4000/api/health](http://localhost:4000/api/health). A JSON response of `{ "status": "ok" }` confirms the application is ready.

## Domain Overview

- CMS entities (newsletters, articles, tags, testimonials, trending topics) mirror the frontend contract found in `app/utils/cms.ts`.
- Shared sub-types include structured authors, image references (either `https` URL strings or `{ url; alt? }` objects), and resource entries with constrained type enums.
- Validation is centralized in `src/domain/schemas.ts` via Zod with helper middleware for Express usage.

## Database & Prisma

1. Configure PostgreSQL and `DATABASE_URL` as described in [docs/persistence.md](docs/persistence.md).
2. Apply migrations and generate the Prisma client:
   ```bash
   npm run prisma:migrate -- --name init
   npm run prisma:generate
   npm run prisma:seed
   ```
3. Repositories live in `src/repositories/prisma` and expose a domain-friendly interface through `src/repositories/index.ts`.

## Testing

- Jest is configured through `jest.config.ts` with `ts-jest` for TypeScript + ESM support.
- `npm test` exercises Zod schema expectations and repository utilities; integration suites run when a real Postgres instance is available (skipped otherwise).
- `npm run test:watch` and `npm run test:coverage` are available for iterative workflows.
