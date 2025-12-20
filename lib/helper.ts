import crypto from "crypto";

export function hashPayload(payload: unknown) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
}
