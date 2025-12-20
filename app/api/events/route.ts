import { NextResponse } from "next/server";
import { db } from "@/db";
import { randomUUID } from "crypto";
import { events } from "@/db/schema/event";
import { createEventSchema } from "@/lib/validators/event";
import redis, { redis_key, IDEMPOTENCY_TTL } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const idempotencyKey = req.headers.get("Idempotency-Key");

    if (!idempotencyKey) {
      return NextResponse.json(
        { error: "Missing Idempotency-Key header" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const key = redis_key("event", "create", idempotencyKey);
    const parsed = createEventSchema.safeParse(body);
    const exists = await redis.get(key);

    if (exists) {
      return NextResponse.json(JSON.parse(exists), { status: 200 });
    }
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const eventId = randomUUID();

    await db.insert(events).values({
      id: eventId,
      title: data.title,
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      timezone: data.timezone,
      locationType: data.locationType,
      location: data.location,
      isPublic: data.isPublic ?? false,
    });
    await redis.set(
      key,
      JSON.stringify({ id: eventId }),
      "EX",
      IDEMPOTENCY_TTL
    );

    return NextResponse.json(
      { id: eventId, message: "Event created" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
