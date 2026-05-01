import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getDatabaseUrl } from "@/lib/env";

import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

let client: ReturnType<typeof postgres> | undefined;
let db: Database | undefined;

export function getDb(): Database {
  const url = getDatabaseUrl();
  if (!db) {
    client = postgres(url, { prepare: false, max: 1 });
    db = drizzle(client, { schema });
  }
  return db;
}
