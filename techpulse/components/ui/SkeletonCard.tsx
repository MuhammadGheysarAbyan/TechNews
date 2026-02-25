// components/ui/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-20 bg-white/10 rounded-full" />
        <div className="h-4 bg-white/10 rounded" />
        <div className="h-4 bg-white/10 rounded w-4/5" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="space-y-1">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-2 w-16 bg-white/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="rounded-2xl overflow-hidden h-[520px] bg-white/5 animate-pulse">
      <div className="h-full bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}
