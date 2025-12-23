import { api, getURL } from "@/config/api";
import { EventDetailsResponse, EventsResponse } from "@/events";

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
