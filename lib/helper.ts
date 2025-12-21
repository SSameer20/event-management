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
