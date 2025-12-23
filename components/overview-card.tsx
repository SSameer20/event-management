import { Card, CardContent } from "./ui/card";
import { EventDetailsResponse } from "@/events";

type OverviewItem = {
  title: string;
  type: keyof EventDetailsResponse["data"];
  value: string;
  change: number;
  iconBg: string;
  icon: React.ReactNode;
};

const MOCK_DATA: OverviewItem[] = [
  {
    title: "Total events",
    type: "total",
    value: "1,205",
    change: 10,
    iconBg: "bg-yellow-500",
    icon: (
      <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2">
        <rect x="3" y="4" width="12" height="10" rx="2" />
        <path d="M3 8h12" />
      </svg>
    ),
  },
  {
    title: "Upcoming events",
    type: "upcoming",
    value: "112",
    change: 12,
    iconBg: "bg-blue-500",
    icon: (
      <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2">
        <circle cx="9" cy="9" r="7" />
        <path d="M9 5v4l3 2" />
      </svg>
    ),
  },
  {
    title: "Ongoing events",
    type: "ongoing",
    value: "5",
    change: -12,
    iconBg: "bg-green-500",
    icon: (
      <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2">
        <circle cx="4" cy="9" r="1" />
        <circle cx="9" cy="9" r="1" />
        <circle cx="14" cy="9" r="1" />
      </svg>
    ),
  },
  {
    title: "Cancelled events",
    type: "cancelled",
    value: "105",
    change: +12,
    iconBg: "bg-red-500",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
];
type cardProps = {
  data: EventDetailsResponse["data"] | null;
};
export default function OverviewCard({ data }: cardProps) {
  if (!data) {
    <div className="w-full flex justify-center items-center">
      <span>Please try again</span>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
      {MOCK_DATA.map((item) => {
        const isPositive = item.change >= 0;
        const value = data?.[item.type];
        return (
          <Card
            key={item.title}
            className="
              relative overflow-hidden
              bg-linear-to-br from-[#0b0f17] to-[#0e1625]
              border border-white/10
              text-white
            "
          >
            {/* subtle noise / glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%)]" />

            <CardContent className="relative p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center ${item.iconBg}`}
                >
                  {item.icon}
                </div>
                <span className="text-sm text-gray-400">{item.title}</span>
              </div>

              {/* Value */}
              <div className="text-3xl font-semibold mb-4">{value}</div>

              {/* Footer */}
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`flex items-center gap-1 ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "↑" : "↓"} {Math.abs(item.change)}%
                </span>
                <span className="text-gray-400">From last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
