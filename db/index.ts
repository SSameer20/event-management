import { drizzle } from "drizzle-orm/mysql2";

export const DATABASE_URL =
  `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}` +
  `@localhost:3306/${process.env.DATABASE}`;

// You can specify any property from the mysql2 connection options
export const db = drizzle({ connection: { uri: DATABASE_URL } });
