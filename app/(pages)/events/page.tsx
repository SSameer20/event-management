"use client";

import Navigation from "@/components/navigation";
import OverviewCard from "@/components/overview-card";
import { Pagination } from "@/components/pagination";
import { StatusBadge, EventStatus } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllEvents, getAllEventsDetails } from "@/services/eventServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Event, EventDetailsResponse } from "@/events";
import { formatEventDate } from "@/lib/helper";

const STATUS_MAP: Record<string, EventStatus> = {
  DRAFT: "Upcoming",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
  PUBLISHED: "Upcoming",
};

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventDetails, setEventDetails] = useState<
    EventDetailsResponse["data"] | null
  >(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["events", page, limit],
    queryFn: () => getAllEvents(page, limit),
  });

  const {
    data: details,
    isLoading: detailsLoading,
    isError: detailsError,
    refetch: detailsRefetch,
  } = useQuery({
    queryKey: ["event_details"],
    queryFn: getAllEventsDetails,
    refetchInterval: 10 * 1000,
  });

  useEffect(() => {
    if (details) {
      setEventDetails(details);
    }
  }, [details]);

  const events: Event[] = data?.events ?? [];
  const filteredEvents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
    );
  }, [events, searchTerm]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading events…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 rounded"
        >
          Failed to load events. Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-5">
      <Navigation />

      <div className="w-full px-10">
        {/* Header */}
        <h1 className="text-xl font-semibold text-white">
          Events Overview{" "}
          <span className="ml-1 text-[#8b949e] font-normal">0</span>
        </h1>

        <OverviewCard data={eventDetails} />

        {/* Table Section */}
        <div className="rounded-xl border-0 bg-linear-to-br from-[#11151c] via-[#151b26] to-[#181e29] overflow-hidden p-10 my-10">
          {/* Toolbar */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-semibold text-white">
              Events{" "}
              <span className="ml-1 text-[#8b949e] font-normal">
                ({filteredEvents.length})
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative min-w-[320px]">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#8b949e]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full h-10 pl-10 pr-4 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-[#c9d1d9] focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-[#8b949e]"
                  placeholder="Search by event or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Create */}
              <button className="flex items-center gap-2 h-10 px-4 bg-[#1d4ed8] rounded-lg text-sm font-medium text-white hover:bg-[#2563eb] transition-colors">
                + Create Event
              </button>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="bg-[#161b22]/50">
                <TableHead className="w-[40%]">Event Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Tickets Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="border-b border-white/5 hover:bg-white/4 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[#c9d1d9]">
                        {event.title}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-[#8b949e]">
                    {formatEventDate(
                      new Date(event.startTime).toLocaleString()
                    )}
                  </TableCell>

                  <TableCell className="text-[#8b949e]">
                    {event.location}
                  </TableCell>

                  <TableCell className="text-left text-[#c9d1d9]">0</TableCell>

                  <TableCell>
                    <StatusBadge
                      status={STATUS_MAP[event.status] ?? "Upcoming"}
                    />
                  </TableCell>

                  <TableCell>
                    <button className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors p-1">
                      ⋮
                    </button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredEvents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-[#8b949e] py-10"
                  >
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Pagination pageFn={setPage} pages={data?.meta?.totalPages || 1} />
        </div>
      </div>
    </div>
  );
}
