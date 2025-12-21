import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema/event";
import { createEventSchema } from "@/lib/validators/event";
import redis, { redis_key, IDEMPOTENCY_TTL } from "@/lib/redis";
import { count, desc } from "drizzle-orm";
type RouteParams = {
  params: {
    id: string;
  };
};

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
      return NextResponse.json(JSON.parse(exists), { status: 201 });
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
    // normalizing price
    data.price =
      data.eventType == "FREE"
        ? null
        : data.price
        ? Number(data.price).toPrecision(2)
        : null;

    await db.insert(events).values({
      title: data.title,
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      timezone: data.timezone,
      locationType: data.locationType,
      location: data.location,
      isPublic: data.isPublic ?? false,
      price: data.price,
      eventType: data.eventType ?? "FREE",
    });
    await redis.set(
      key,
      JSON.stringify({ message: "event created" }),
      "EX",
      IDEMPOTENCY_TTL
    );

    return NextResponse.json({ message: "Event created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = (page - 1) * limit;

    const key = redis_key("event", "get", `${page}-${limit}-${offset}`);
    const cached = await redis.get(key);

    if (cached) {
      return NextResponse.json(
        {
          success: true,
          error: false,
          data: JSON.parse(cached),
          message: "Event fetched",
        },
        { status: 200 }
      );
    }

    const data = await db
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
      .orderBy(desc(events.createdAt))
      .limit(limit)
      .offset(offset);
    const [{ total }] = await db.select({ total: count() }).from(events);

    if (!data) {
      return NextResponse.json(
        { success: true, error: false, data: null, message: "No event found" },
        { status: 200 }
      );
    }

    await redis.set(key, JSON.stringify(data), "EX", IDEMPOTENCY_TTL);

    return NextResponse.json(
      {
        success: true,
        error: false,
        data,
        message: "Event fetched",
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
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
