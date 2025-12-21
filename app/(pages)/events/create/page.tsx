"use client";
import React, { useEffect, useState } from "react";
import {
  Info,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Video,
  Eye,
} from "lucide-react";
import Navigation from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { CalendarComponent } from "@/components/Calendar";
import { toFormatDateTime, toUTC } from "@/lib/helper";
import DateTimeRange from "@/components/DateTime";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState("");

  const [finalDateTime, setFinalDateTime] = useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });
  function formatTime() {
    setFinalDateTime({
      start: `${startDate?.toISOString().split("T")[0]}${startTime}+05:30`,
      end: `${endDate?.toISOString().split("T")[0]}${endTime}+05:30`,
    });
  }
  useEffect(() => {
    if (!startDate || !endDate || !startTime || !endTime) return;

    formatTime();
  }, [startDate, endDate, startTime, endTime]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    timezone: "",
    locationType: "",
    location: "",
    isPublic: true,
    eventType: "",
    price: "",
  });

  return (
    // Changed h-screen to min-h-screen for better mobile scrolling flexibility
    <div className="min-h-screen md:h-screen bg-[#0a0e14] text-gray-300 flex flex-col overflow-x-hidden font-sans">
      <Navigation />

      {/* Main Container: Stacked on mobile, Split on Desktop */}
      <div className="flex flex-col md:flex-row grow overflow-hidden">
        {/* Left Side: Scrollable Form */}
        <div className="grow overflow-y-auto px-6 md:px-12 py-8 custom-scrollbar border-r border-gray-800 order-2 md:order-1">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-10">
              Create Event
            </h1>

            <form className="space-y-10 md:space-y-12 pb-20">
              {/* 1. Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Info size={18} />
                    <h2 className="text-lg font-medium text-white">
                      Basic Information
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    Provide the fundamental details about your conference.
                  </p>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 focus:ring-1 focus:ring-blue-500 outline-none"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Event Description"
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <hr className="border-gray-800" />
              {/* 2. Date & Time */}
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

              <hr className="border-gray-800" />
              {/* 3. Location & Format */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <MapPin size={18} />
                    <h2 className="text-lg font-medium text-white">Location</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    Choose your venue format.
                  </p>
                </div>
                <div className="space-y-4 lg:text-right">
                  <div className="inline-flex bg-[#111827] p-1 rounded-lg border border-gray-700 w-full sm:w-auto">
                    <button
                      type="button"
                      className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                    >
                      Virtual
                    </button>
                    <button
                      type="button"
                      className="flex-1 sm:flex-none px-6 py-2 text-gray-400 text-sm"
                    >
                      In-person
                    </button>
                  </div>
                  <div className="relative text-left">
                    <LinkIcon
                      className="absolute left-3 top-3 text-gray-500"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="https://zoom.us/j/..."
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 pl-10 text-sm"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Preview Panel - Sticky on Desktop, Section on Mobile */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-[#0d1117] p-6 md:p-8 border-l border-gray-800 order-1 md:order-2 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Eye size={16} /> Live Preview
            </h3>
            <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
              PAID • PUBLIC
            </span>
          </div>

          <div className="bg-gradient-to-b from-[#1a2233] to-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl sticky top-0">
            <div className="h-24 md:h-32 bg-blue-600/10 flex items-center justify-center border-b border-gray-800">
              <Video size={40} className="text-blue-500/50" />
            </div>
            <div className="p-5 md:p-6 space-y-4 md:space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-white truncate">
                  {formData.title || "Untitled Event"}
                </h4>
                <p className="text-xs md:text-sm text-gray-400 mt-2 line-clamp-2">
                  {formData.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {startDate &&
                        startDate
                          .toDateString()
                          .split(" ")
                          .slice(1, 4)
                          .join(" ")}
                      {" - "}
                      {endDate &&
                        endDate.toDateString().split(" ").slice(1, 4).join(" ")}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">
                      {startTime} - {endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Video size={16} />
                  </div>
                  <p className="text-white font-medium">Virtual Event</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                  Ticket Price
                </span>
                <span className="text-xl font-bold text-white">$99.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions: Sticky at bottom */}
      <footer className="px-6 md:px-12 py-4 md:py-6 border-t border-gray-800 bg-[#0d1117] flex justify-between md:justify-end gap-4 shrink-0 z-10">
        <button
          type="button"
          className="text-sm font-medium text-gray-400 hover:text-white transition px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 md:flex-none px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/40"
        >
          Create Event
        </button>
      </footer>
    </div>
  );
}
