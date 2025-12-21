"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Navigation() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="w-full bg-linear-to-r from-[#0b0f17] via-[#111827] to-[#0b0f17] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {/* Root */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Event Management</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="capitalize text-white">
                        {segment.replace(/-/g, " ")}
                      </span>
                    ) : (
                      <BreadcrumbLink href={href} className="capitalize">
                        {segment.replace(/-/g, " ")}
                      </BreadcrumbLink>
                    )}
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-64 rounded-lg bg-white/10 px-10 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-white/20"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>

          {/* Notification */}
          <div className="relative">
            <button className="rounded-full bg-white/10 p-2 ring-1 ring-white/10 hover:bg-white/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
                <path d="M9 17a3 3 0 006 0" />
              </svg>
            </button>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              4
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="User avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-medium text-white">Hailey Carter</p>
              <p className="text-xs text-gray-400">Master Admin</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
