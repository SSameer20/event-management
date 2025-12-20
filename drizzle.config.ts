import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./db";

export default defineConfig({
  dialect: "mysql",
  schema: "./db/schema",
  out: "./db/migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
