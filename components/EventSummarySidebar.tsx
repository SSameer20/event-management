import { Event } from "@/types/events";
import React from "react";

type EventDetails = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  timezone: string;
  locationType: string;
  location: string;
  status: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  eventType: string;
  price: string | null;
};

interface EventSummarySidebarProps {
  eventDetails?: Event | null;
}

export const EventSummarySidebar: React.FC<EventSummarySidebarProps> = ({
  eventDetails,
}) => {
  if (!eventDetails) {
    return (
      <div className="w-80 rounded-2xl border border-[#21262d] bg-[#0d1117] p-6 shadow-xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-80 rounded-2xl border border-[#21262d] bg-[#0d1117] p-6 shadow-xl">
      {/* <h2 className="mb-6 text-lg font-semibold text-white">Event Summary</h2> */}

      <div className="space-y-4">
        <SummaryItem
          label="Event Type"
          value={eventDetails.eventType || "General"}
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeWidth={2}
              />
            </svg>
          }
          iconColor="bg-green-600/80"
        />
        <SummaryItem
          label="Status"
          value={eventDetails.status.toLowerCase()}
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                strokeWidth={2}
              />
            </svg>
          }
          iconColor="bg-blue-600/80"
        />
        <SummaryItem
          label="Location"
          value={
            eventDetails.locationType === "PHYSICAL"
              ? eventDetails.location.split(" ")[0]
              : "VIRTUAL"
          }
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                strokeWidth={2}
              />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} />
            </svg>
          }
          iconColor="bg-cyan-600/80"
        />
        <SummaryItem
          label="Price"
          value={eventDetails.price ? `$${eventDetails.price}` : "Free"}
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeWidth={2}
              />
            </svg>
          }
          iconColor="bg-yellow-600/80"
        />
      </div>
    </div>
  );
};

const SummaryItem: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
  iconColor: string;
}> = ({ label, value, icon, iconColor }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-[#21262d] bg-[#161b22]/50 p-6 text-center transition-all hover:bg-[#161b22]">
    <div
      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconColor} text-white shadow-lg`}
    >
      {icon}
    </div>
    <span className="text-[11px] font-medium text-[#8b949e] uppercase tracking-wider">
      {label}
    </span>
    <span className="mt-1 text-2xl font-bold text-white tracking-tight">
      {value}
    </span>
  </div>
);
