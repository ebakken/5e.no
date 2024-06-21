import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/drizzle.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: process.env.NODE_ENV === "development",
  strict: true,
});
