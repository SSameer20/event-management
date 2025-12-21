"use client";
import Navigation from "@/components/navigation";
import OverviewCard from "@/components/overview-card";
import { Pagination } from "@/components/pagination";
import { EventStatus, StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
export const MOCK_EVENTS = [
  {
    id: "1",
    name: "Seattle Sand Dogs Vs Nashville Sounds",
    dateTime: "Jun 22, 6:00 PM",
    location: "Dehler Park",
    ticketsSold: 4200,
    status: "Upcoming",
    logoUrl: "https://picsum.photos/seed/sanddogs/40/40",
  },
  {
    id: "2",
    name: "Gastonia Ghost Peppers Vs Charleston Dirty Birds",
    dateTime: "May 18, 10:00 AM",
    location: "CaroMont Health Park",
    ticketsSold: 0,
    status: "Cancelled",
    logoUrl: "https://picsum.photos/seed/ghostpeppers/40/40",
  },
  {
    id: "3",
    name: "Charleston Dirty Birds Vs Savannah Bananas",
    dateTime: "May 11, 7:00 PM",
    location: "GoMart Ballpark",
    ticketsSold: 2750,
    status: "Completed",
    logoUrl: "https://picsum.photos/seed/dirtybirds/40/40",
  },
  {
    id: "4",
    name: "Nashville Sounds Vs Charleston Dirty Birds",
    dateTime: "Jun 22, 6:00 PM",
    location: "Dehler Park",
    ticketsSold: 4200,
    status: "Upcoming",
    logoUrl: "https://picsum.photos/seed/sounds/40/40",
  },
  {
    id: "5",
    name: "Fresno State Vs Gastonia Ghost Peppers",
    dateTime: "May 18, 10:00 AM",
    location: "East Bulldog Lane",
    ticketsSold: 1200,
    status: "Upcoming",
    logoUrl: "https://picsum.photos/seed/fresno/40/40",
  },
  {
    id: "6",
    name: "United Shore Professional Baseball Vs Detroit Tiger",
    dateTime: "May 11, 7:00 PM",
    location: "Jimmy John's Field",
    ticketsSold: 2750,
    status: "Upcoming",
    logoUrl: "https://picsum.photos/seed/detroit/40/40",
  },
  {
    id: "7",
    name: "Seattle Sand Dogs Vs Nashville Sounds",
    dateTime: "Jun 22, 6:00 PM",
    location: "Dehler Park",
    ticketsSold: 4200,
    status: "Upcoming",
    logoUrl: "https://picsum.photos/seed/sanddogs2/40/40",
  },
  {
    id: "8",
    name: "Gastonia Ghost Peppers Vs Charleston Dirty Birds",
    dateTime: "May 18, 10:00 AM",
    location: "CaroMont Health Park",
    ticketsSold: 0,
    status: "Cancelled",
    logoUrl: "https://picsum.photos/seed/ghostpeppers2/40/40",
  },
  {
    id: "9",
    name: "Charleston Dirty Birds Vs Savannah Bananas",
    dateTime: "May 11, 7:00 PM",
    location: "GoMart Ballpark",
    ticketsSold: 2750,
    status: "Completed",
    logoUrl: "https://picsum.photos/seed/dirtybirds2/40/40",
  },
];

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(
      (event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  return (
    <div className="w-full h-screen flex flex-col gap-5">
      <Navigation />
      <div className="w-full px-10">
        <h1 className="text-xl font-semibold text-white">
          Events Overview{" "}
          <span className="ml-1 text-[#8b949e] font-normal">(1,205)</span>
        </h1>
        <div>
          <OverviewCard />
        </div>
        {/* Table Section */}
        <div className="rounded-xl border-0 bg-linear-to-br from-[#11151c] via-[#151b26] to-[#181e29] overflow-hidden p-10 my-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-xl font-semibold text-white">
              Events{" "}
              <span className="ml-1 text-[#8b949e] font-normal">(1,205)</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative min-w-[320px]">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#8b949e]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full h-10 pl-10 pr-4 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-[#c9d1d9] focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-[#8b949e]"
                  placeholder="Search by event, location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Dropdown */}
              <button className="flex items-center gap-2 h-10 px-4 bg-[#161b22] border border-[#30363d] rounded-lg text-sm text-[#c9d1d9] hover:bg-[#21262d] transition-colors">
                Filter
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Export Button */}
              <button className="flex items-center justify-center w-10 h-10 bg-[#161b22] border border-[#30363d] rounded-lg text-[#c9d1d9] hover:bg-[#21262d] transition-colors">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </button>

              {/* Create Event Button */}
              <button className="flex items-center gap-2 h-10 px-4 bg-[#1d4ed8] rounded-lg text-sm font-medium text-white hover:bg-[#2563eb] transition-colors">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Create Event
              </button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#161b22]/50">
                <TableHead className="w-[40%]">Event Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Tickets Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12.5"></TableHead>
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
                      <img
                        src={event.logoUrl}
                        alt={event.name}
                        className="h-10 w-10 rounded-full border border-[#30363d] object-cover"
                      />
                      <span className="font-medium text-[#c9d1d9]">
                        {event.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-[#8b949e]">
                    {event.dateTime}
                  </TableCell>

                  <TableCell className="text-[#8b949e]">
                    {event.location}
                  </TableCell>

                  <TableCell className="text-right text-[#c9d1d9]">
                    {event.ticketsSold.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={event.status as EventStatus} />
                  </TableCell>

                  <TableCell>
                    <button className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <Pagination />
        </div>
      </div>
    </div>
  );
}
