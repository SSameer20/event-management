"use client";
import React from "react";
import { Info, Calendar, MapPin, Link as LinkIcon, Video } from "lucide-react";
import Navigation from "@/components/navigation";
import { Input } from "@/components/ui/input";
import { CalendarComponent } from "@/components/Calendar";

export default function CreateEvent() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <div className="h-screen bg-[#0a0e14] text-gray-300 flex flex-col overflow-hidden font-sans">
      <Navigation />

      {/* Main Container: Split into Form and Preview */}
      <div className="grow overflow-hidden flex">
        {/* Left Side: Scrollable Form */}
        <div className="grow overflow-y-auto px-12 py-8 custom-scrollbar border-r border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-10">
              Create Event
            </h1>

            <form className="space-y-12 pb-20">
              {/* 1. Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      className="w-full bg-[#111827] border border-gray-700 rounded-lg p-3 focus:ring-1 focus:ring-blue-500 outline-none"
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
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-800" />

              {/* 2. Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Calendar size={18} />
                    <h2 className="text-lg font-medium text-white">
                      Date & Time
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    Set the schedule for global attendees.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                        Date
                      </label>
                      <div className="relative">
                        <CalendarComponent
                          date={date}
                          setDate={setDate}
                          className={"bg-[#111827]"}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                        Time
                      </label>
                      <div className="flex gap-10">
                        <Calendar
                          className="absolute left-3 top-3 text-gray-500"
                          size={16}
                        />
                        <Input
                          type="time"
                          id="time-picker"
                          step="1"
                          defaultValue="10:30"
                          className="appearance-none border border-gray-700 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full bg-[#111827]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-800" />

              {/* 3. Location & Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <MapPin size={18} />
                    <h2 className="text-lg font-medium text-white">Location</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                    Choose your venue format.
                  </p>
                </div>
                <div className="space-y-6 text-right">
                  <div className="inline-flex bg-[#111827] p-1 rounded-lg border border-gray-700">
                    <button
                      type="button"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                    >
                      Virtual
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 text-gray-400 text-sm"
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

        {/* Right Side: Static Preview Panel */}
        <div className="w-100 bg-[#0d1117] p-8 flex flex-col justify-between border-l border-gray-800">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Live Preview
              </h3>
              <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">
                PAID • PUBLIC
              </span>
            </div>

            {/* Preview Card */}
            <div className="bg-linear-to-b from-[#1a2233] to-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-32 bg-blue-600/10 flex items-center justify-center border-b border-gray-800">
                <Video size={40} className="text-blue-500/50" />
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-white leading-tight">
                    ICP 2025
                  </h4>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    Annual International Conference on Physics and technology
                    advancements.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Jan 15 - 17, 2025
                      </p>
                      <p className="text-[10px] text-gray-500">
                        09:00 AM - 06:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400">
                      <Video size={16} />
                    </div>
                    <p className="text-white font-medium">Virtual Event</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Ticket Price</span>
                  <span className="text-xl font-bold text-white">$99.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <footer className="px-12 py-6 border-t border-gray-800 bg-[#0d1117] flex justify-end gap-6 shrink-0 z-10">
        <button
          type="button"
          className="text-sm font-medium text-gray-400 hover:text-white transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-900/40"
        >
          Create Event
        </button>
      </footer>
    </div>
  );
}
