"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navigation />
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-around gap-2 px-6 py-16 w-full h-screen">
        {/* Left: Text Content */}
        <div className="flex-1 ml-10">
          <p className="text-4xl md:text-5xl font-extrabold text-gray-200 mb-6 leading-tight">
            <span className="text-5xl"> Create Events.</span> <br />
            Mint NFTs, Ship Trust.
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-2/3">
            The developer-first platform for building event systems with
            <br />
            on-chain ticketing, real ownership, and production-ready APIs.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => (window.location.href = "/events")}
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Right: Image & Code Card */}
        <div className="flex-1 flex flex-col items-center relative w-full">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
              alt="Event dashboard"
              height={500}
              width={700}
            />
          </div>
        </div>
      </section>
      <div className="h-20" /> {/* Spacer for code card overlap */}
    </div>
  );
}
