import { Event } from "@/events";
import { formatEventDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface EventDetailCardProps {
  eventDetails?: Event | null;
}

export const EventDetailCard: React.FC<EventDetailCardProps> = ({
  eventDetails,
}) => {
  if (!eventDetails) {
    return (
      <div className="rounded-2xl border border-[#21262d] bg-[#0d1117] p-4 shadow-xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-[#21262d] bg-[#0d1117] p-4 shadow-xl">
      {/* Cover Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-800">
        <Image
          src={
            eventDetails.image ||
            "https://images.pexels.com/photos/831079/pexels-photo-831079.jpeg"
          }
          alt={eventDetails.title}
          className="h-full w-full object-cover opacity-80"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile & Header Info */}
      <div className="relative mt-[-40px] px-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-5">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#0d1117] bg-[#161b22] shadow-2xl">
              <Image
                src={
                  eventDetails.image ||
                  "https://picsum.photos/seed/pepper/200/200"
                }
                alt="Event Logo"
                className="h-full w-full object-cover"
                width={200}
                height={200}
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {eventDetails.title}
                </h1>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full  px-2.5 py-0.5 text-[10px] font-medium  border border-[#30363d]",
                    eventDetails.status == "UPCOMING"
                      ? "bg-green-100 text-black"
                      : "bg-[#8b949e]"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full bg-black")} />{" "}
                  {eventDetails.status}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#24292e] px-2.5 py-0.5 text-[10px] font-medium text-[#8b949e] border border-[#30363d] ml-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b949e]" />{" "}
                  {"General"}
                </span>
                <div className="flex items-center gap-2 ml-4">
                  {/* Action buttons can remain as is or be customized */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#8b949e] max-w-4xl leading-relaxed">
          {eventDetails.description}
        </p>

        {/* Detailed Info Grid */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4 rounded-xl border border-[#21262d] bg-[#161b22]/40 p-5">
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d4ed8]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <span>
                {formatEventDate(
                  new Date(eventDetails.startTime).toLocaleString()
                )}{" "}
                -{" "}
                {formatEventDate(
                  new Date(eventDetails.endTime).toLocaleString()
                )}{" "}
                <span className="text-[#8b949e]">
                  ({eventDetails.timezone})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <span>General</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
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
              </div>
              <span>{eventDetails.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[300px]">
            <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
              <span className="text-[10px] uppercase font-bold text-[#8b949e]">
                Policy
              </span>
              <p className="mt-1 text-sm font-medium text-[#c9d1d9]">
                {eventDetails.isPublic ? "Public Event" : "Private Event"}
              </p>
            </div>
            <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
              <span className="text-[10px] uppercase font-bold text-[#8b949e]">
                Price
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-[#c9d1d9]">
                  {eventDetails.price ? `$${eventDetails.price}` : "Free"}
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
              <span className="text-[10px] uppercase font-bold text-[#8b949e]">
                Active
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-[#c9d1d9]">
                  {eventDetails.isActive ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
