// components/article/HeroCarousel.tsx
"use client";
import { useState, useEffect } from "react";
import { AnimatePresence }      from "framer-motion";
import { ArticleCard }          from "./ArticleCard";
import type { ArticleWithRelations } from "@/types";

interface Props { articles: ArticleWithRelations[] }

export function HeroCarousel({ articles }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % articles.length), 5000);
    return () => clearInterval(t);
  }, [articles.length]);

  if (!articles.length) return null;

  return (
    <div>
      <AnimatePresence mode="wait">
        <ArticleCard key={articles[index].id} article={articles[index]} variant="hero" />
      </AnimatePresence>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {articles.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "bg-emerald-500 w-6" : "bg-white/20 w-1.5 hover:bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}
