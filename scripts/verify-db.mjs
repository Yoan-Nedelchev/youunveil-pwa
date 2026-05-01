import { config } from "dotenv";
import postgres from "postgres";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(dir, "../.env") });
config({ path: resolve(dir, "../.env.local"), override: true });

const url = (
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL
)?.trim();
if (!url) {
  console.error(
    "No database URL found. Set DATABASE_URL, POSTGRES_URL, or POSTGRES_PRISMA_URL in .env.local",
  );
  process.exit(1);
}

const sql = postgres(url, { max: 1, prepare: false });
try {
  const rows = await sql`select 1 as ok`;
  console.log("Database connection OK:", rows[0]);
} catch (err) {
  console.error(
    "Database connection failed:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
} finally {
  await sql.end({ timeout: 5 });
}
