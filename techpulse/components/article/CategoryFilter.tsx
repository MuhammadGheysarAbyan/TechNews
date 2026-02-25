// components/article/CategoryFilter.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const CATEGORIES = [
  { label: "Semua",          value: "" },
  { label: "AI",             value: "AI" },
  { label: "Programming",    value: "PROGRAMMING" },
  { label: "Gadget",         value: "GADGET" },
  { label: "Startup",        value: "STARTUP" },
  { label: "Cyber Security", value: "CYBER_SECURITY" },
];

export function CategoryFilter() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const current      = searchParams.get("category") ?? "";

  const select = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("category", value);
    else params.delete("category");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button key={cat.value} onClick={() => select(cat.value)}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200">
          {current === cat.value && (
            <motion.span layoutId="cat-pill"
              className="absolute inset-0 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/25"
              transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          )}
          <span className={`relative z-10 transition-colors ${current === cat.value ? "text-white" : "text-gray-400 hover:text-white"}`}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}
