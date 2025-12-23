export type MainStatus = "UPCOMING" | "COMPLETED" | "CANCELLED";

export type Event = {
  id: string;
  image: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  timezone: string;
  locationType: "PHYSICAL" | "VIRTUAL";
  location: string;
  status: MainStatus;
  eventStatus: "UPCOMING" | "COMPLETED" | "CANCELLED" | "ONGOING";
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  eventType: "FREE" | "PAID";
  price: number | null;
  isActive: boolean;
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
export type EventResponse = {
  success: boolean;
  error: boolean;
  data: Event;
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

export type CreatePostData = {
  title?: string;
  description?: string;
  image?: string;
  startTime?: string; // ISO string
  endTime?: string; // ISO string
  timezone?: string;
  locationType?: "PHYSICAL" | "VIRTUAL";
  location?: string;
  isPublic?: boolean;
  eventType?: "FREE" | "PAID";
  price?: number | null;
};
