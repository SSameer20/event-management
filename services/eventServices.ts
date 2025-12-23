import { api, getURL } from "@/config/api";
import {
  CreatePostData,
  EventDetailsResponse,
  EventResponse,
  EventsResponse,
} from "@/types/events";

export const getAllEvents = async (
  page = 1,
  limit = 10
): Promise<{
  events: EventsResponse["data"];
  meta: EventsResponse["meta"];
}> => {
  const response = await fetch(
    `${getURL("EVENTS")}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventsResponse = await response.json();
  return {
    events: data.data,
    meta: data.meta,
  };
};

export const getEventDetails = async (
  id: string
): Promise<{
  events: EventResponse["data"];
  meta: EventsResponse["meta"];
}> => {
  if (!id) throw new Error("No id provided");
  const response = await fetch(`${getURL("EVENTS")}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventResponse = await response.json();
  return {
    events: data.data,
    meta: data.meta,
  };
};

export const getAllEventsDetails = async (): Promise<
  EventDetailsResponse["data"]
> => {
  const response = await fetch(`${getURL("EVENTS_DETAILS")}`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data: EventDetailsResponse = await response.json();
  return data.data;
};

export const createEvent = async (
  meta: CreatePostData
): Promise<{
  message?: string;
  error?: string;
  success: boolean;
}> => {
  try {
    console.log(meta);
    // const IdKey = localStorage.getItem("IdompotentKey");
    const response = await fetch(getURL("CREATE_EVENT"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(meta),
    });
    console.log("create event");
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to create events");
    }

    const res = await response.json();
    return {
      success: true,
      message: res.message || "created",
    };
  } catch (err) {
    return { success: false, error: "failed to create" };
  }
};
