// components/ui/Badge.tsx
import { cn, CATEGORY_COLORS } from "@/lib/utils";

interface BadgeProps {
  category: string;
  size?: "sm" | "md";
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  blue:    "bg-blue-500/20 text-blue-400 border-blue-500/30",
  purple:  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  orange:  "bg-orange-500/20 text-orange-400 border-orange-500/30",
  red:     "bg-red-500/20 text-red-400 border-red-500/30",
  slate:   "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const LABEL_MAP: Record<string, string> = {
  AI:             "AI",
  PROGRAMMING:    "Programming",
  GADGET:         "Gadget",
  STARTUP:        "Startup",
  CYBER_SECURITY: "Cyber Security",
};

export function Badge({ category, size = "sm", className }: BadgeProps) {
  const color = CATEGORY_COLORS[category] ?? "slate";
  const label = LABEL_MAP[category] ?? category;
  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-semibold border",
      size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      COLOR_MAP[color] ?? COLOR_MAP.slate,
      className,
    )}>
      {label}
    </span>
  );
}
