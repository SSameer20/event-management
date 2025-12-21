import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema/event";
import { deleteEventSchema, updateEventSchema } from "@/lib/validators/event";
import type { UpdateEvent } from "@/db/types";
import { and, eq } from "drizzle-orm";
import redis, { redis_key, IDEMPOTENCY_TTL } from "@/lib/redis";
import { error } from "console";
type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};
export async function GET(req: Request, context: RouteContext) {
  try {
    const { id: eventId } = await context.params;
    const key = redis_key("event", "get", eventId);
    const redisExists = await redis.get(key);
    if (redisExists) {
      console.log("cache hit");
      return NextResponse.json(
        {
          success: true,
          error: false,
          data: JSON.parse(redisExists),
          message: "Event fetched",
        },
        { status: 200 }
      );
    }

    const [event] = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        startTime: events.startTime,
        endTime: events.endTime,
        timezone: events.timezone,
        locationType: events.locationType,
        location: events.location,
        status: events.status,
        isPublic: events.isPublic,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      })
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.isActive, true)))
      .limit(1);

    if (!event) {
      return NextResponse.json(
        { success: true, error: false, message: "No Event found", data: null },
        { status: 200 }
      );
    }
    await redis.set(key, JSON.stringify(event), "EX", IDEMPOTENCY_TTL);

    return NextResponse.json(
      { success: true, error: false, message: "Event fetched", data: event },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request, context: RouteContext) {
  try {
    const { id: eventId } = await context.params;
    const key = redis_key("event", "update", eventId);
    const redisExists = await redis.get(key);
    if (redisExists) {
      return NextResponse.json(
        { id: eventId, message: "Event updated" },
        { status: 200 }
      );
    }

    const json = await req.json();

    const parsed = updateEventSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const exists = await db
      .select({ id: events.id })
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.isActive, true)))
      .limit(1);

    if (exists.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const updateData: UpdateEvent = {};

    if (parsed.data.title) updateData.title = parsed.data.title;
    if (parsed.data.description)
      updateData.description = parsed.data.description;
    if (parsed.data.timezone) updateData.timezone = parsed.data.timezone;
    if (parsed.data.locationType)
      updateData.locationType = parsed.data.locationType;
    if (parsed.data.location) updateData.location = parsed.data.location;
    if (parsed.data.status) updateData.status = parsed.data.status;
    if (parsed.data.isPublic !== undefined)
      updateData.isPublic = parsed.data.isPublic;

    if (parsed.data.startTime)
      updateData.startTime = new Date(parsed.data.startTime);

    if (parsed.data.endTime) updateData.endTime = new Date(parsed.data.endTime);

    await db
      .update(events)
      .set(updateData)
      .where(and(eq(events.id, eventId), eq(events.isActive, true)));
    await redis.set(
      key,
      JSON.stringify({ id: eventId }),
      "EX",
      IDEMPOTENCY_TTL
    );

    return NextResponse.json(
      { id: eventId, message: "Event updated" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { id: eventId } = await context.params;
    if (!eventId) {
      return NextResponse.json(
        { message: "event id required" },
        { status: 404 }
      );
    }
    const key = redis_key("event", "delete", eventId);
    const redisExists = await redis.get(key);
    if (redisExists) {
      return NextResponse.json(
        { id: eventId, message: "Event Deleted" },
        { status: 200 }
      );
    }

    const parsed = deleteEventSchema.safeParse(eventId);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const exists = await db
      .select({ id: events.id })
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.isActive, true)))
      .limit(1);

    if (exists.length === 0) {
      return NextResponse.json(
        { error: "Event ID not found" },
        { status: 404 }
      );
    }
    // updating isActive sttaus instead of deleting for auditing
    await db
      .update(events)
      .set({ isActive: false })
      .where(and(eq(events.id, eventId), eq(events.isActive, true)));
    await redis.set(
      key,
      JSON.stringify({ id: eventId }),
      "EX",
      IDEMPOTENCY_TTL
    );

    return NextResponse.json(
      { id: eventId, message: "Event Deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
