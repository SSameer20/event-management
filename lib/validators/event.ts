import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),

  startTime: z.string(),
  endTime: z.string(),

  timezone: z.string().min(1),

  locationType: z.enum(["PHYSICAL", "VIRTUAL"]),
  location: z.string().min(1),

  isPublic: z.boolean().optional(),
  eventType: z.enum(["FREE", "PAID"]).optional(),
  price: z
    .string()
    .regex(/^\d{1,8}(\.\d{1,2})?$/, "Invalid price format")
    .nullable()
    .optional(),
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

export const deleteEventSchema = z
  .string()
  .uuid({ message: "Invalid UUID format" });
