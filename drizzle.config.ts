import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: process.env.NODE_ENV === "development",
  strict: true,
});
