import {
  mysqlTable,
  varchar,
  datetime,
  int,
  decimal,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { events } from "./event";
import { users } from "./user";

export const eventTickets = mysqlTable(
  "event_tickets",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    eventId: varchar("event_id", { length: 36 }).references(() => events.id),
    userId: varchar("user_id", { length: 36 }).references(() => users.id),
    quantity: int("quantity").notNull().default(1),
    status: mysqlEnum("status", ["PENDING", "CONFIRMED", "CANCELLED"])
      .notNull()
      .default("CONFIRMED"),
    txHash: varchar("tx_hash", { length: 100 }),
    purchasedAt: datetime("purchased_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    eventIdx: index("event_tickets_event_idx").on(table.eventId),
    userIdx: index("event_tickets_user_idx").on(table.userId),
  })
);
