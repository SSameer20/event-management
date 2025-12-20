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

export const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),

  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),

  timezone: z.string().min(1).optional(),

  locationType: z.enum(["PHYSICAL", "VIRTUAL"]).optional(),
  location: z.string().min(1).optional(),

  isPublic: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]).optional(),
});
