// components/admin/AdminChart.tsx
"use client";

const MONTHS = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];
const DATA   = [45000, 78000, 52000, 91000, 67000, 84000, 96000, 73000, 88000, 110000, 95000, 128000];

export function AdminChart() {
  const max = Math.max(...DATA);

  return (
    <div className="flex items-end gap-2 h-40">
      {DATA.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="relative w-full">
            <div
              className="w-full bg-emerald-500/80 hover:bg-emerald-400 rounded-t-sm transition-all duration-300 cursor-pointer"
              style={{ height: `${(v / max) * 140}px` }}
              title={`${MONTHS[i]}: ${v.toLocaleString("id-ID")} views`}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {(v / 1000).toFixed(0)}k
            </div>
          </div>
          <span className="text-gray-600 text-xs">{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}
