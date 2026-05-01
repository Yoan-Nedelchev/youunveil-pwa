import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

/**
 * GET /api/health/db — checks Drizzle + DATABASE_URL.
 * Enabled in development, or in production when ENABLE_DB_HEALTH=1.
 */
export async function GET() {
  const allowed =
    process.env.NODE_ENV !== "production" ||
    process.env.ENABLE_DB_HEALTH === "1";
  if (!allowed) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  try {
    const db = getDb();
    await db.execute(sql`select 1`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
