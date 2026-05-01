/**
 * Central place for env fallbacks (e.g. Vercel Supabase integration names).
 * Never put secrets in client-only code paths without NEXT_PUBLIC_ prefix.
 */

export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;
  const trimmed = url?.trim();
  if (!trimmed) {
    throw new Error(
      "Missing database URL: set DATABASE_URL, POSTGRES_URL, or POSTGRES_PRISMA_URL",
    );
  }
  return trimmed;
}

/** Server / middleware: reads public Supabase project URL. */
export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const trimmed = url?.trim();
  if (!trimmed) {
    throw new Error(
      "Missing Supabase URL: set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL",
    );
  }
  return trimmed;
}

export function getSupabasePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  return key;
}
