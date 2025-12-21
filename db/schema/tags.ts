import { mysqlTable, varchar, index } from "drizzle-orm/mysql-core";
import { events } from "./event";

export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    eventId: varchar("event_id", { length: 36 })
      .notNull()
      .references(() => events.id),
  },
  (table) => ({
    eventIdx: index("idx_tags_event_id").on(table.eventId),
    nameIdx: index("idx_tags_name").on(table.name),
  })
);
