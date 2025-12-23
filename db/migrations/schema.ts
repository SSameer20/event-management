import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, primaryKey, varchar, int, mysqlEnum, datetime, text, decimal, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const eventTickets = mysqlTable("event_tickets", {
	id: varchar({ length: 36 }).notNull(),
	eventId: varchar("event_id", { length: 36 }).references(() => events.id),
	userId: varchar("user_id", { length: 36 }).references(() => users.id),
	quantity: int().default(1).notNull(),
	status: mysqlEnum(['PENDING','CONFIRMED','CANCELLED']).default('CONFIRMED').notNull(),
	txHash: varchar("tx_hash", { length: 100 }),
	purchasedAt: datetime("purchased_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => [
	index("event_tickets_event_idx").on(table.eventId),
	index("event_tickets_user_idx").on(table.userId),
	primaryKey({ columns: [table.id], name: "event_tickets_id"}),
]);

export const events = mysqlTable("events", {
	id: varchar({ length: 36 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	startTime: datetime("start_time", { mode: 'string'}).notNull(),
	endTime: datetime("end_time", { mode: 'string'}).notNull(),
	timezone: varchar({ length: 50 }).notNull(),
	locationType: mysqlEnum("location_type", ['PHYSICAL','VIRTUAL']).notNull(),
	location: varchar({ length: 255 }).notNull(),
	status: mysqlEnum(['UPCOMING','CANCELLED']).default('UPCOMING').notNull(),
	isPublic: tinyint("is_public").default(0).notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	isActive: tinyint("is_active").default(1).notNull(),
	eventType: mysqlEnum("event_type", ['FREE','PAID']).default('FREE').notNull(),
	price: decimal({ precision: 10, scale: 2 }),
	image: text(),
	eventStatus: mysqlEnum("event_status", ['DRAFT','PUBLISHED','CANCELLED']).default('DRAFT').notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "events_id"}),
]);

export const tags = mysqlTable("tags", {
	id: varchar({ length: 36 }).notNull(),
	name: varchar({ length: 50 }).notNull(),
	eventId: varchar("event_id", { length: 36 }).notNull().references(() => events.id),
},
(table) => [
	index("idx_tags_event_id").on(table.eventId),
	index("idx_tags_name").on(table.name),
	primaryKey({ columns: [table.id], name: "tags_id"}),
]);

export const users = mysqlTable("users", {
	id: varchar({ length: 36 }).notNull(),
	walletAddress: varchar("wallet_address", { length: 64 }).notNull(),
	isActive: tinyint("is_active").default(1).notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	updatedAt: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_id"}),
	unique("users_wallet_address_idx").on(table.walletAddress),
]);
