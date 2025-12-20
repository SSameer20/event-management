import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { events } from "./schema/event";
import { users } from "./schema/user";
import { eventTickets } from "./schema/event_ticket";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type UpdateEvent = Partial<
  Omit<Event, "id" | "createdAt" | "updatedAt">
>;

/* ---------- Users ---------- */

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UpdateUser = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;

/* ---------- Event Tickets ---------- */

export type EventTicket = InferSelectModel<typeof eventTickets>;
export type NewEventTicket = InferInsertModel<typeof eventTickets>;
export type UpdateEventTicket = Partial<
  Omit<EventTicket, "id" | "purchasedAt">
>;
