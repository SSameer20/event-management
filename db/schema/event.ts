import {
  mysqlTable,
  varchar,
  text,
  datetime,
  boolean,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  title: varchar("title", { length: 255 }).notNull(),
  image: text("image"),

  description: text("description").notNull(),

  startTime: datetime("start_time").notNull(),
  endTime: datetime("end_time").notNull(),

  timezone: varchar("timezone", { length: 50 }).notNull(),

  locationType: mysqlEnum("location_type", ["PHYSICAL", "VIRTUAL"]).notNull(),

  location: varchar("location", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["UPCOMING", "COMPLETED", "CANCELLED"])
    .notNull()
    .default("UPCOMING"),

  eventStatus: mysqlEnum("event_status", ["DRAFT", "PUBLISHED", "CANCELLED"])
    .notNull()
    .default("DRAFT"),

  isPublic: boolean("is_public").notNull().default(false),

  createdAt: datetime("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  eventType: mysqlEnum("event_type", ["FREE", "PAID"])
    .notNull()
    .default("FREE"),
  price: decimal("price", { precision: 10, scale: 2 }),

  updatedAt: datetime("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  isActive: boolean("is_active").notNull().default(true),
});
