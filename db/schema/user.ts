import {
  mysqlTable,
  varchar,
  datetime,
  boolean,
  uniqueIndex,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    address: varchar("wallet_address", { length: 64 }).notNull(),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: datetime("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),

    updatedAt: datetime("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  },
  (table) => ({
    walletAddressIdx: uniqueIndex("users_wallet_address_idx").on(table.address),
  })
);
