export const baseURL = "http://localhost:3000";

export const api = {
  EVENTS: "/api/events",
  CREATE_EVENT: "/api/events",
  EVENTS_DETAILS: "/api/events/details",
} as const;

export type API_TYPE = keyof typeof api;

export const getURL = (key: API_TYPE) => {
  return `${baseURL}${api[key]}`;
};
