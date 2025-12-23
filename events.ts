export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";
export type EventType = "FREE" | "PAID";
export type LocationType = "PHYSICAL" | "ONLINE";

export type Event = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  timezone: string;
  locationType: LocationType;
  location: string;
  status: EventStatus;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  eventType: EventType;
  price: string | null;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type EventsResponse = {
  success: boolean;
  error: boolean;
  data: Event[];
  message: string;
  meta: PaginationMeta;
};

export type EventDetailsResponse = {
  success: boolean;
  error: boolean;
  data: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
    ongoing: number;
  };
  message: string;
};
