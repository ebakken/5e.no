import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const SlugTable = pgTable("slugs", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const RedirectTable = pgTable("redirects", {
  id: serial("id").primaryKey(),
  slugId: text("slug_id")
    .references(() => SlugTable.id)
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Slug = typeof SlugTable.$inferSelect;
export type InsertSlug = typeof SlugTable.$inferInsert;

export type Redirect = typeof RedirectTable.$inferSelect;
export type InsertRedirect = typeof RedirectTable.$inferInsert;

export const db = drizzle(sql);