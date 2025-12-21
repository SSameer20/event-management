import React from "react";

export const EventDetailCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-[#21262d] bg-[#0d1117] p-4 shadow-xl">
      {/* Cover Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80&w=1200"
          alt="Baseball Field"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile & Header Info */}
      <div className="relative mt-[-40px] px-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-5">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#0d1117] bg-[#161b22] shadow-2xl">
              <img
                src="https://picsum.photos/seed/pepper/200/200"
                alt="Team Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  Gastonia Ghost Peppers vs. Charleston Dirty Bir...
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#24292e] px-2.5 py-0.5 text-[10px] font-medium text-[#8b949e] border border-[#30363d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b949e]" />{" "}
                  Draft
                </span>
                <div className="flex items-center gap-2 ml-4">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#21262d] text-[#8b949e] hover:text-white transition-colors border border-[#30363d]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#21262d] text-[#8b949e] hover:text-white transition-colors border border-[#30363d]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#21262d] text-[#8b949e] hover:text-red-400 transition-colors border border-[#30363d]">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#8b949e] max-w-4xl leading-relaxed">
          The Gastonia Ghost Peppers are a professional baseball team based in
          Gastonia, NC, bringing exciting games and a passionate fan experience
          to the local community.
        </p>

        {/* Detailed Info Grid */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4 rounded-xl border border-[#21262d] bg-[#161b22]/40 p-5">
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d4ed8]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <span>
                26 July, 2025 - 30 July, 2025{" "}
                <span className="text-[#8b949e]">(GMT-6 Central Time)</span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <span>Sports, Baseball</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#c9d1d9]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeWidth={2}
                  />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} />
                </svg>
              </div>
              <span>First Horizon Park, Jr Gilliam Wy, Nashville, TN</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[300px]">
            <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
              <span className="text-[10px] uppercase font-bold text-[#8b949e]">
                Policy
              </span>
              <p className="mt-1 text-sm font-medium text-[#c9d1d9]">
                Gastonia Ghost Peppers Policy
              </p>
            </div>
            <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
              <span className="text-[10px] uppercase font-bold text-[#8b949e]">
                Organizer
              </span>
              <div className="mt-2 flex items-center gap-2">
                <img
                  src="https://picsum.photos/seed/organizer/20/20"
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-sm font-medium text-[#c9d1d9]">
                  Gastonia Ghost Peppers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
