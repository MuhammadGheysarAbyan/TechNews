// components/layout/BreakingBar.tsx
"use client";
import Link from "next/link";
import type { Article } from "@prisma/client";

interface Props {
  articles: Pick<Article, "id" | "title" | "slug">[];
}

export function BreakingBar({ articles }: Props) {
  const doubled = [...articles, ...articles]; // infinite loop trick

  return (
    <div className="bg-red-600 py-2 overflow-hidden relative z-40">
      <div className="flex items-center">
        <span className="flex-shrink-0 flex items-center gap-1.5 bg-red-800 px-3 py-0.5 text-white font-bold text-xs mr-3 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          BREAKING
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((a, i) => (
              <Link key={`${a.id}-${i}`} href={`/${a.slug}`}
                className="text-white/90 hover:text-white text-xs mr-10 transition-colors inline-block">
                {a.title}
                <span className="mx-5 text-white/30">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
