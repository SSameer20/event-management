import React, { useState } from "react";

export const TabbedContent: React.FC = () => {
  const tabs = [
    "Ticket Collections",
    "Ticket Categories",
    "Attendee List",
    "Promotions / Discounts",
    "Seat chart",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="mt-6 rounded-2xl border border-[#21262d] bg-[#0d1117] overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-[#21262d] bg-[#161b22]/30 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-xs font-medium transition-colors relative ${
              activeTab === tab
                ? "text-white"
                : "text-[#8b949e] hover:text-[#c9d1d9]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">
            Ticket Collection
          </h4>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:text-white">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#1d4ed8] px-4 py-2 text-xs font-medium text-white hover:bg-[#2563eb]">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Attach Collection
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#161b22] text-[#30363d]">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h5 className="text-sm font-semibold text-white">
            No Ticket Collection Attached
          </h5>
          <p className="mt-1 text-xs text-[#8b949e]">
            Attach a ticket collection to enable publishing and sales.
          </p>
        </div>
      </div>
    </div>
  );
};
