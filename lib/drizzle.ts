import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const slugs = pgTable("slugs", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const redirects = pgTable("redirects", {
  id: serial("id").primaryKey(),
  slugId: text("slug_id")
    .references(() => slugs.id)
    .notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  slugId: text("slug_id")
    .references(() => slugs.id)
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  url: text("url"),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Slug = typeof slugs.$inferSelect;
export type InsertSlug = typeof slugs.$inferInsert;

export type Redirect = typeof redirects.$inferSelect;
export type InsertRedirect = typeof redirects.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export const db = drizzle(sql);
