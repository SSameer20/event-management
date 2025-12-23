import { z } from "zod";

export const createEventSchema = z
  .object({
    title: z.string().min(3).optional(),

    description: z.string().min(10).optional(),

    image: z.string().url().optional(),

    startTime: z.string().datetime().optional(),

    endTime: z.string().datetime().optional(),

    timezone: z.string().min(1).optional(),

    locationType: z.enum(["PHYSICAL", "VIRTUAL"]).optional(),

    location: z.string().min(1).optional(),

    isPublic: z.boolean().optional(),

    eventType: z.enum(["FREE", "PAID"]).optional(),

    price: z.number().positive().max(99999999.99).nullable().optional(),
  })
  .refine(
    (data) =>
      !(
        data.eventType === "PAID" &&
        (data.price === null || data.price === undefined)
      ),
    {
      message: "Price is required when eventType is PAID",
      path: ["price"],
    }
  )
  .refine(
    (data) =>
      !(
        data.startTime &&
        data.endTime &&
        new Date(data.startTime) >= new Date(data.endTime)
      ),
    {
      message: "endTime must be after startTime",
      path: ["endTime"],
    }
  );

export const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().url().optional(),

  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),

  timezone: z.string().min(1).optional(),

  locationType: z.enum(["PHYSICAL", "VIRTUAL"]).optional(),
  location: z.string().min(1).optional(),

  isPublic: z.boolean().optional(),

  // status is for the main event status (UPCOMING, COMPLETED, CANCELLED)
  status: z.enum(["UPCOMING", "COMPLETED", "CANCELLED"]).optional(),
  // eventStatus is for the draft/published/cancelled state
  eventStatus: z.enum(["DRAFT", "PUBLISHED", "CANCELLED"]).optional(),

  eventType: z.enum(["FREE", "PAID"]).optional(),
  price: z.number().positive().max(99999999.99).nullable().optional(),
});

export const deleteEventSchema = z
  .string()
  .uuid({ message: "Invalid UUID format" });
