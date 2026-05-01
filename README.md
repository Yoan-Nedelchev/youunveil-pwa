# YouUnveil PWA

Next.js 15 (App Router), TypeScript (strict), Tailwind v4, shadcn/ui, Supabase Auth (`@supabase/ssr`), Drizzle + Postgres, TanStack Query, and PWA via `@ducanh2912/next-pwa`.

## Setup

1. **Environment** — copy `.env.example` to `.env.local` and fill in values from your Supabase project (API keys, database URL, GraphQL endpoint if used).

2. **Install** — `npm install`

3. **Database** — after `DATABASE_URL` is set:
   - `npm run db:generate` — create migrations from `src/lib/db/schema.ts`
   - `npm run db:push` — push schema (dev) or apply migrations per your workflow

   The included `app_meta` table is a placeholder; replace the schema once you agree on the data model.

4. **Develop** — `npm run dev` (Turbopack)

5. **Production build** — `npm run build` uses webpack so the PWA service worker is emitted correctly. Optional: `npm run build:turbo` for a Turbopack build (service worker integration may differ).

## Project layout

- `src/app` — App Router routes and layouts
- `src/features` — feature modules (business logic lives here, not in page shells)
- `src/components` — shared UI (shadcn in `components/ui`)
- `src/lib` — Supabase clients, DB (`getDb`), GraphQL helper, utilities

## Tooling

- **Format** — `npm run format` / `npm run format:check`
- **Lint** — `npm run lint`
- **Git hooks** — Husky runs `lint-staged` on commit (Prettier + ESLint on staged files)
