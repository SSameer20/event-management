import crypto from "crypto";

export function hashPayload(payload: unknown) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
}
export function formatEventDate(input: string | Date): string {
  const date =
    input instanceof Date
      ? input
      : new Date(input.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function toUTC(date: Date): string {
  return date.toISOString();
}
export function toFormatDateTime(date: string, time: string): string | null {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const parts = [year, month, day, hour, minute];

  // Guard: return null if any part is NaN
  if (parts.some((v) => Number.isNaN(v))) {
    return null;
  }

  const localDate = new Date(year, month - 1, day, hour, minute, 0);
  console.log(localDate);

  // Guard: invalid Date object
  if (Number.isNaN(localDate.getTime())) {
    return null;
  }

  return localDate.toISOString();
}
