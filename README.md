# YouUnveil PWA

Next.js 15 (App Router), TypeScript (strict), Tailwind v4, shadcn/ui, Supabase Auth (`@supabase/ssr`), Drizzle + Postgres, TanStack Query, PWA via `@ducanh2912/next-pwa`, and **`next-intl`** for locales (`en`, `bg`).

## Routing

- Use the **App Router only** (`src/app`, `next/link`, `next/navigation`). Do **not** add `react-router-dom`.
- User-facing pages live under **`/[locale]/...`** (e.g. `/en`, `/bg`). `/` redirects to `/en`.
- Use **`Link`**, **`redirect`**, **`usePathname`**, and **`useRouter`** from [`src/i18n/navigation.ts`](src/i18n/navigation.ts) so locale prefixes stay correct.

## Translations

- Message files: [`messages/en/`](messages/en/) and [`messages/bg/`](messages/bg/) (`common.json`, `landing.json`). Add namespaces as new JSON files and merge them in [`src/i18n/request.ts`](src/i18n/request.ts).

## Setup

1. **Environment** — copy `.env.example` to `.env.local`. Minimum: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, and `POSTGRES_PRISMA_URL` (or `DATABASE_URL` / `POSTGRES_URL` — see `src/lib/env.ts`). `next.config.ts` maps `SUPABASE_URL` to `NEXT_PUBLIC_SUPABASE_URL` for the browser.

2. **Install** — `npm install`

3. **Database** — after a DB URL env var is set:
   - `npm run db:verify` — run `select 1` via the same Postgres client stack as the app
   - With `npm run dev`, open `GET /api/health/db` (JSON `{ "ok": true }` if the DB is reachable). In production this route returns 404 unless you set `ENABLE_DB_HEALTH=1` on Vercel.
   - `npm run db:generate` — create migrations from `src/lib/db/schema.ts`
   - `npm run db:push` — push schema (dev) or apply migrations per your workflow

   The included `app_meta` table is a placeholder; replace the schema once you agree on the data model.

4. **Develop** — `npm run dev` (Turbopack)

5. **Production build** — `npm run build` uses webpack so the PWA service worker is emitted correctly. Optional: `npm run build:turbo` for a Turbopack build (service worker integration may differ).

## Project layout

- `src/app` — App Router routes and layouts (`[locale]` segment for localized pages)
- `src/i18n` — `next-intl` routing, navigation helpers, request config
- `messages` — locale JSON (English, Bulgarian)
- `src/features` — feature modules (business logic lives here, not in page shells)
- `src/components` — shared UI (shadcn in `components/ui`)
- `src/lib` — Supabase clients, DB (`getDb`), GraphQL helper, utilities

## Tooling

- **Format** — `npm run format` / `npm run format:check`
- **Lint** — `npm run lint`
- **Git hooks** — Husky runs `lint-staged` on commit (Prettier + ESLint on staged files)
