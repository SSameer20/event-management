import React from "react";

export type EventStatus = "Upcoming" | "Cancelled" | "Completed";

interface BadgeProps {
  status: EventStatus;
}

export const StatusBadge = ({ status }: BadgeProps) => {
  const styles: Record<EventStatus, string> = {
    Upcoming: "bg-[#1a2f26] text-[#4ade80] border-[#22543d]",
    Cancelled: "bg-[#2d1a1a] text-[#f87171] border-[#5a2727]",
    Completed: "bg-[#24292e] text-[#8b949e] border-[#30363d]",
  };

  const dots: Record<EventStatus, string> = {
    Upcoming: "bg-[#4ade80]",
    Cancelled: "bg-[#f87171]",
    Completed: "bg-[#8b949e]",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${styles[status]}`}
    >
      <span className={`mr-2 h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </div>
  );
};
