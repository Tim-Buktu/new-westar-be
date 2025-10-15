# Persistence Setup

This project uses PostgreSQL with Prisma as the ORM layer. Follow the steps below to provision a local database and keep it synced with the Prisma schema.

## 1. Start PostgreSQL Locally

If you do not already have a PostgreSQL instance, the easiest way to spin one up is via Docker Compose:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: westar
      POSTGRES_PASSWORD: westar
      POSTGRES_DB: westar
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Run `docker compose up -d` to launch the database.

## 2. Configure Environment Variables

Copy `.env.example` to `.env` and set the `DATABASE_URL` with your credentials:

```
DATABASE_URL=postgresql://westar:westar@localhost:5432/westar?schema=public
```

Ensure the same variable is available when executing tests or scripts.

## 3. Prisma Workflow

- `npm run prisma:migrate` – Apply migrations to your database (creates the database if missing).
- `npm run prisma:generate` – Regenerate the Prisma client after schema updates.
- `npm run prisma:seed` – Populate baseline CMS data (runs `prisma/seed.ts`).

Each command reads from the current `DATABASE_URL`. Re-run migrations and generate after modifying `prisma/schema.prisma`.
