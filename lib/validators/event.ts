import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),

  startTime: z.string().datetime(),
  endTime: z.string().datetime(),

  timezone: z.string().min(1),

  locationType: z.enum(["PHYSICAL", "VIRTUAL"]),
  location: z.string().min(1),

  isPublic: z.boolean().optional(),
});
