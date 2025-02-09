import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_4pMbAwd1GOJX@ep-gentle-recipe-a8kcm6xw.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
  introspect: {
    casing: "camel",
  },
  migrations: {
    table: "__drizzle_migrations__",
    schema: "public",
    prefix: "timestamp",
  },
  breakpoints: true,
  strict: true,
  verbose: true,
});