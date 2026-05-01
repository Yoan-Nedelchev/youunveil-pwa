import { pgTable, text } from "drizzle-orm/pg-core";

/** Replace with real tables once the schema is agreed. */
export const appMeta = pgTable("app_meta", {
  key: text("key").primaryKey(),
});
