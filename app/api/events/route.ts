import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema/event";
import { createEventSchema } from "@/lib/validators/event";
import redis, { redis_key, IDEMPOTENCY_TTL } from "@/lib/redis";
import { count, desc, eq } from "drizzle-orm";

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
      data.eventType === "FREE"
        ? null
        : data.price != null
        ? Math.round(Number(data.price) * 100) / 100
        : null;

    await db.transaction(async (tx) => {
      const [event] = await db
        .insert(events)
        .values({
          title: data.title ?? "Untitled Event",
          image:
            data.image ??
            "https://images.pexels.com/photos/3874719/pexels-photo-3874719.jpeg",
          description: data.description ?? "",
          startTime: new Date(data.startTime!),
          endTime: new Date(data.endTime!),
          timezone: data.timezone ?? "UTC",
          locationType: data.locationType ?? "VIRTUAL",
          location: data.location ?? "",
          isPublic: data.isPublic ?? false,
          eventType: data.eventType ?? "FREE",
          price:
            data.eventType === "FREE"
              ? null
              : data.price != null
              ? data.price.toFixed(2) // ✅ STRING
              : null,
        })
        .$returningId();
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
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    const data = await db
      .select({
        id: events.id,
        image: events.image,
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
        eventType: events.eventType,
        price: events.price,
      })
      .from(events)
      .where(eq(events.isActive, true))
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

    const response = {
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
    };
    await redis.set(key, JSON.stringify(response), "EX", IDEMPOTENCY_TTL);
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
