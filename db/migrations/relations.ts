import { relations } from "drizzle-orm/relations";
import { events, eventTickets, users, tags } from "./schema";

export const eventTicketsRelations = relations(eventTickets, ({one}) => ({
	event: one(events, {
		fields: [eventTickets.eventId],
		references: [events.id]
	}),
	user: one(users, {
		fields: [eventTickets.userId],
		references: [users.id]
	}),
}));

export const eventsRelations = relations(events, ({many}) => ({
	eventTickets: many(eventTickets),
	tags: many(tags),
}));

export const usersRelations = relations(users, ({many}) => ({
	eventTickets: many(eventTickets),
}));

export const tagsRelations = relations(tags, ({one}) => ({
	event: one(events, {
		fields: [tags.eventId],
		references: [events.id]
	}),
}));