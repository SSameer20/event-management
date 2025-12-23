import { db } from "@/db";
import { events } from "@/db/schema/event";
import redis, { redis_key, IDEMPOTENCY_TTL } from "@/lib/redis";
import { count } from "console";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const key = redis_key("event", "get", `details`);
    const cached = await redis.get(key);

    if (cached) {
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    const rows = await db
      .select({
        status: events.status,
        count: sql<number>`count(*)`,
      })
      .from(events)
      .groupBy(events.status);

    const meta = {
      total: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
      ongoing: 0,
    };
    const [{ count: ongoing }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(
        and(
          eq(events.status, "UPCOMING"),
          lte(events.startTime, sql`NOW()`),
          gte(events.endTime, sql`NOW()`)
        )
      );

    for (const row of rows) {
      meta.total += row.count;

      if (row.status === "UPCOMING") meta.upcoming += 1;
      if (row.status === "COMPLETED") meta.completed = row.count;
      if (row.status === "CANCELLED") meta.cancelled = row.count;
    }

    meta.ongoing = ongoing;

    const response = {
      success: true,
      error: false,
      data: meta,
      message: "Details fetched",
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
