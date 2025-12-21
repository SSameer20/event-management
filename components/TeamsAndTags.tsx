import React from "react";

export const TeamsAndTags: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Teams Card */}
      <div className="lg:col-span-3 rounded-2xl border border-[#21262d] bg-[#0d1117] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-white">Teams</h3>
          <button className="text-[10px] text-blue-400 hover:underline">
            See all
          </button>
        </div>
        <div className="space-y-4">
          <TeamRow
            name="Gastonia Ghost Peppers"
            img="https://picsum.photos/seed/team1/32/32"
          />
          <TeamRow
            name="Charleston Dirty Birds"
            img="https://picsum.photos/seed/team2/32/32"
          />
        </div>
      </div>

      {/* Tags Card */}
      <div className="lg:col-span-9 rounded-2xl border border-[#21262d] bg-[#0d1117] p-6">
        <h3 className="text-sm font-semibold text-white mb-6">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            text="Fire Works (2)"
            color="bg-red-900/20 text-red-400 border-red-900/30"
          />
          <Tag
            text="High Spender"
            color="bg-green-900/20 text-green-400 border-green-900/30"
          />
          <Tag
            text="Music Lover"
            color="bg-purple-900/20 text-purple-400 border-purple-900/30"
          />
          <Tag
            text="Loyal"
            color="bg-yellow-900/20 text-yellow-400 border-yellow-900/30"
          />
          <Tag
            text="VIP"
            color="bg-cyan-900/20 text-cyan-400 border-cyan-900/30"
          />
          <Tag
            text="Sports"
            color="bg-blue-900/20 text-blue-400 border-blue-900/30"
          />
          <Tag
            text="Frequent Buyer"
            color="bg-orange-900/20 text-orange-400 border-orange-900/30"
          />
          <Tag
            text="Phone Verified"
            color="bg-emerald-900/20 text-emerald-400 border-emerald-900/30"
          />
          <Tag
            text="Promo Code"
            color="bg-rose-900/20 text-rose-400 border-rose-900/30"
          />
        </div>
      </div>
    </div>
  );
};

const TeamRow: React.FC<{ name: string; img: string }> = ({ name, img }) => (
  <div className="flex items-center gap-3">
    <img src={img} className="h-8 w-8 rounded-full border border-[#30363d]" />
    <span className="text-sm text-[#c9d1d9] font-medium">{name}</span>
  </div>
);

const Tag: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <span
    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${color} cursor-default`}
  >
    {text}
  </span>
);
