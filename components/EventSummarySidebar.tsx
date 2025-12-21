import React from "react";

export const EventSummarySidebar: React.FC = () => {
  return (
    <div className="w-80 rounded-2xl border border-[#21262d] bg-[#0d1117] p-6 shadow-xl">
      <h2 className="mb-6 text-lg font-semibold text-white">Event Summary</h2>

      <div className="space-y-4">
        <SummaryItem
          label="Total Tickets Sold"
          value="2,000"
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
          label="Total Revenue"
          value="$87,120"
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
          label="Unique Attendees"
          value="1,398"
          icon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                strokeWidth={2}
              />
            </svg>
          }
          iconColor="bg-cyan-600/80"
        />
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button className="text-[#8b949e] hover:text-white">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b949e]/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b949e]/30" />
        </div>
        <button className="text-[#8b949e] hover:text-white">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
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
