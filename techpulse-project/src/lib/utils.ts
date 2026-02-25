// src/lib/utils.ts

export const formatNumber = (n: number): string =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export const formatDate = (d: string): string =>
    new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export const getCategoryColor = (cat: string): string => {
    const colors: Record<string, string> = {
        "AI": "emerald",
        "Programming": "blue",
        "Gadget": "purple",
        "Startup": "orange",
        "Cyber Security": "red",
        "All": "slate",
    };
    return colors[cat] || "slate";
};

export const CATEGORY_BADGE_COLORS: Record<string, string> = {
    "AI": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Programming": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Gadget": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Startup": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Cyber Security": "bg-red-500/20 text-red-400 border-red-500/30",
};

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}
