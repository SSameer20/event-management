import {
  mysqlTable,
  varchar,
  text,
  datetime,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  startTime: datetime("start_time").notNull(),
  endTime: datetime("end_time").notNull(),

  timezone: varchar("timezone", { length: 50 }).notNull(),

  locationType: mysqlEnum("location_type", ["PHYSICAL", "VIRTUAL"]).notNull(),

  location: varchar("location", { length: 255 }).notNull(),

  status: mysqlEnum("status", ["DRAFT", "PUBLISHED", "CANCELLED"])
    .notNull()
    .default("DRAFT"),

  isPublic: boolean("is_public").notNull().default(false),

  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});
