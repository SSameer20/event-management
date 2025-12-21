"use client";

import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CalendarComponent } from "./Calendar";

interface DateTimeRangeProps {
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;

  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function DateTimeRange({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
}: DateTimeRangeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
      {/* Left description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-400 mb-1">
          <Calendar size={18} />
          <h2 className="text-lg font-medium text-white">Date & Time</h2>
        </div>
        <p className="text-sm text-gray-500">
          Set the start and end schedule for your event.
        </p>
      </div>

      {/* Right inputs */}
      <div className="space-y-6">
        {/* START */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Start Date
            </label>
            <CalendarComponent
              date={startDate}
              setDate={setStartDate}
              className="bg-[#111827] w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-[#111827] border-gray-700 w-full"
            />
          </div>
        </div>

        {/* END */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              End Date
            </label>
            <CalendarComponent
              date={endDate}
              setDate={setEndDate}
              className="bg-[#111827] w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              End Time
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-[#111827] border-gray-700 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
