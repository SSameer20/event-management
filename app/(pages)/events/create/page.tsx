"use client";

import React, { useEffect, useState } from "react";
import {
  Info,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Video,
  Eye,
  Map,
} from "lucide-react";
import Navigation from "@/components/navigation";
import DateTimeRange from "@/components/DateTime";
import { cn } from "@/lib/utils";
import { createEvent } from "@/services/eventServices";

/* -------------------- Types -------------------- */

type EventFormData = {
  title: string;
  description: string;
  startTime?: Date;
  endTime?: Date;
  timezone: string;
  locationType: "VIRTUAL" | "PHYSICAL";
  location: string;
  isPublic: boolean;
  eventType: "FREE" | "PAID";
  price: number | null;
};

/* -------------------- Component -------------------- */

export default function CreateEvent() {
  /* UI date/time inputs */
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState("");

  /* UI toggles */
  const [eventMode, setEventMode] = useState<"VIRTUAL" | "PHYSICAL">("VIRTUAL");
  const [eventType, setEventType] = useState<"FREE" | "PAID">("FREE");

  /* Form state (single source of truth) */
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    startTime: undefined,
    endTime: undefined,
    timezone: "UTC",
    locationType: "VIRTUAL",
    location: "",
    isPublic: true,
    eventType: eventType,
    price: null,
  });

  /* -------------------- Sync date inputs → formData -------------------- */

  useEffect(() => {
    if (!startDate || !endDate || !startTime || !endTime) return;

    const start = new Date(
      `${startDate.toISOString().split("T")[0]}T${startTime}:00`
    );
    const end = new Date(
      `${endDate.toISOString().split("T")[0]}T${endTime}:00`
    );

    setFormData((prev) => ({
      ...prev,
      startTime: start,
      endTime: end,
    }));
  }, [startDate, startTime, endDate, endTime]);

  async function handleSubmit() {
    if (!formData.startTime || !formData.endTime) {
      alert("Please select start and end time");
      return;
    }

    if (!formData.title || !formData.description) {
      alert("Please add title and description");
      return;
    }

    const payload = {
      ...formData,
      startTime: formData.startTime.toISOString(),
      endTime: formData.endTime.toISOString(),
    };

    const response = await createEvent(payload);
    if (response.success) {
      window.location.href = "/events";
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-300 flex flex-col">
      <Navigation />

      <div className="flex flex-col md:flex-row grow overflow-hidden">
        {/* ---------------- Left: Form ---------------- */}
        <div className="grow overflow-y-auto px-6 md:px-12 py-8 border-r border-gray-800">
          <div className="max-w-4xl mx-auto space-y-10">
            <h1 className="text-2xl font-semibold text-white">Create Event</h1>

            {/* Basic Info */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Info size={18} />
                  <h2 className="text-lg font-medium text-white">
                    Basic Information
                  </h2>
                </div>
                <p className="text-sm text-gray-500">
                  Core details about your event.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3"
                  placeholder="Event title"
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      title: e.target.value,
                    }))
                  }
                />

                <textarea
                  rows={3}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3"
                  placeholder="Event description"
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </section>

            <DateTimeRange
              startDate={startDate}
              setStartDate={setStartDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endDate={endDate}
              setEndDate={setEndDate}
              endTime={endTime}
              setEndTime={setEndTime}
            />

            {/* Location */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 text-blue-400">
                  <MapPin size={18} />
                  <h2 className="text-lg font-medium text-white">Location</h2>
                </div>
                <p className="text-sm text-gray-500">
                  Choose how attendees join.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex bg-[#111827] border border-gray-700 rounded-lg p-1">
                  {["VIRTUAL", "PHYSICAL"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={cn(
                        "flex-1 px-6 py-2 rounded-md text-sm",
                        eventMode === mode
                          ? "bg-blue-500 text-white"
                          : "text-gray-400"
                      )}
                      onClick={() => {
                        setEventMode(mode as "VIRTUAL" | "PHYSICAL");
                        setFormData((p) => ({
                          ...p,
                          locationType: mode as any,
                        }));
                      }}
                    >
                      {mode === "VIRTUAL" ? "Virtual" : "In-person"}
                    </button>
                  ))}
                </div>

                <input
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3"
                  placeholder={
                    eventMode === "VIRTUAL" ? "Meeting link" : "Venue address"
                  }
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      location: e.target.value,
                    }))
                  }
                />
              </div>
            </section>
          </div>
        </div>

        {/* ---------------- Right: Preview ---------------- */}
        <div className="w-full md:w-[420px] bg-[#0d1117] p-8 border-l border-gray-800">
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-6 flex items-center gap-2">
            <Eye size={16} /> Live Preview
          </h3>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 space-y-4">
            <h4 className="text-xl font-bold text-white">
              {formData.title || "Untitled Event"}
            </h4>
            <p className="text-sm text-gray-400">
              {formData.description || "No description yet"}
            </p>

            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} />
              <span>
                {formData.startTime?.toLocaleString()} —{" "}
                {formData.endTime?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Video size={16} />
              <div className="flex flex-col">
                <span>{formData.locationType}</span>
                <span>{formData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-800 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Create Event
        </button>
      </footer>
    </div>
  );
}
