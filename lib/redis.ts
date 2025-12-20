import Redis from "ioredis";

declare global {
  // Prevent multiple instances in dev (hot reload)
  // eslint-disable-next-line no-var
  var redis: Redis | undefined;
}

const redis =
  global.redis ??
  new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });

if (process.env.NODE_ENV !== "production") {
  global.redis = redis;
}

export default redis;
export const redis_key = (service: string, name: string, id?: string) =>
  [service, name, id].filter(Boolean).join(":");
export const IDEMPOTENCY_TTL = 60; // seconds
