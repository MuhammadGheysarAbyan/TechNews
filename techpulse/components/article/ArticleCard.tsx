// components/article/ArticleCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Clock, Heart, MessageCircle, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatRelative, cn } from "@/lib/utils";
import type { ArticleWithRelations } from "@/types";
import { useState } from "react";

interface Props {
  article: ArticleWithRelations;
  variant?: "default" | "hero" | "compact" | "featured";
  index?:  number;
}

export function ArticleCard({ article, variant = "default", index = 0 }: Props) {
  const [liked, setLiked]       = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount]   = useState(article._count?.likes ?? 0);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((n) => liked ? n - 1 : n + 1);
    // TODO: call /api/articles/[id]/like
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => !prev);
    // TODO: call /api/articles/[id]/bookmark
  };

  if (variant === "hero") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Link href={`/${article.slug}`} className="group block relative rounded-2xl overflow-hidden h-[520px]">
          {article.featuredImage ? (
            <Image src={article.featuredImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-blue-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          {article.isTrending && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> TRENDING
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge category={article.category} />
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-3">
              {article.title}
            </h2>
            <p className="mt-2 text-gray-300 text-sm line-clamp-2">{article.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  {article.author.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-white font-medium">{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={13} /><span>{article.readTime}m</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Eye size={13} /><span>{formatNumber(article.views)}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/${article.slug}`} className="group flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
        <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-emerald-900 to-blue-900 relative">
          {article.featuredImage && <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <Badge category={article.category} />
          <h4 className="mt-1 text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <p className="text-gray-500 text-xs mt-1">{article.readTime}m • {formatNumber(article.views)} views</p>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}>
      <Link href={`/${article.slug}`}
        className="group block bg-white/5 hover:bg-white/8 border border-white/10 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          {article.featuredImage ? (
            <Image src={article.featuredImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800" />
          )}
          {article.isTrending && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />TRENDING
            </div>
          )}
          <button onClick={handleBookmark}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
              bookmarked ? "bg-emerald-500 text-white" : "bg-black/60 text-white hover:bg-white/20"
            )}>
            <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <Badge category={article.category} />
          <h3 className="mt-2 font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug text-[15px]">
            {article.title}
          </h3>
          <p className="mt-1.5 text-gray-400 text-xs line-clamp-2 leading-relaxed">{article.excerpt}</p>

          {/* Meta */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {article.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-xs font-medium">{article.author.name}</p>
                <p className="text-gray-600 text-xs">{article.publishedAt ? formatRelative(article.publishedAt) : "Draft"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-xs">
              <button onClick={handleLike} className={cn("flex items-center gap-1 hover:text-red-400 transition-colors", liked && "text-red-400")}>
                <Heart size={12} fill={liked ? "currentColor" : "none"} /> {formatNumber(likeCount)}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle size={12} /> {formatNumber(article._count?.comments ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
