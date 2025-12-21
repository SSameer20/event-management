"use client";
export const Pagination = () => {
  return (
    <div className="mt-8 flex items-center gap-2">
      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#161b22] text-[#c9d1d9] transition-colors hover:bg-[#21262d]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className="flex items-center gap-1 rounded-lg bg-[#161b22] p-1">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
              page === 2
                ? "bg-[#1d4ed8] text-white"
                : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#161b22] text-[#c9d1d9] transition-colors hover:bg-[#21262d]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};
