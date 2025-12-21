"use client";
import { EventDetailCard } from "@/components/EventDetailCard";
import { EventSummarySidebar } from "@/components/EventSummarySidebar";
import Navigation from "@/components/navigation";
import { TabbedContent } from "@/components/TabbedContent";
import { TeamsAndTags } from "@/components/TeamsAndTags";
import { Event } from "@/events";
import { getAllEvents } from "@/services/eventServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col gap-5 pb-10">
      <Navigation />
      <main className="w-full px-20 mt-5">
        {/* Top Grid: Main Info + Summary */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 w-full lg:w-auto">
            <EventDetailCard />
          </div>
          <div className="hidden xl:block">
            <EventSummarySidebar />
          </div>
        </div>

        {/* Middle Section: Teams & Tags */}
        <TeamsAndTags />

        {/* Bottom Section: Tabs */}
        <TabbedContent />

        {/* Tablet/Mobile only summary view fallback if needed */}
        <div className="mt-6 xl:hidden">
          <EventSummarySidebar />
        </div>
      </main>
    </div>
  );
}
