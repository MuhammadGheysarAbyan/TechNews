// app/(public)/page.tsx
import type { Metadata } from "next";
import { db }            from "@/lib/db";
import { ArticleCard }   from "@/components/article/ArticleCard";
import { NewsletterBox } from "@/components/article/NewsletterBox";
import { HeroCarousel }  from "@/components/article/HeroCarousel";
import { CategoryFilter }from "@/components/article/CategoryFilter";
import { PopularTags }   from "@/components/article/PopularTags";
import { Suspense }      from "react";
import { SkeletonCard }  from "@/components/ui/SkeletonCard";

export const metadata: Metadata = {
  title:       "TechPulse — Berita Teknologi Terdepan Indonesia",
  description: "Media teknologi terpercaya Indonesia. Berita terkini AI, Programming, Gadget, Startup, dan Cyber Security.",
};

export const revalidate = 60; // ISR every 60 seconds

async function getFeaturedArticles() {
  return db.article.findMany({
    where:   { status: "PUBLISHED", isFeatured: true },
    include: { author: { select: { id: true, name: true, avatar: true, bio: true, role: true } }, tags: { include: { tag: true } }, _count: { select: { comments: true, likes: true, bookmarks: true } } },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });
}

async function getLatestArticles() {
  return db.article.findMany({
    where:   { status: "PUBLISHED" },
    include: { author: { select: { id: true, name: true, avatar: true, bio: true, role: true } }, tags: { include: { tag: true } }, _count: { select: { comments: true, likes: true, bookmarks: true } } },
    orderBy: { publishedAt: "desc" },
    take: 12,
  });
}

async function getTrendingArticles() {
  return db.article.findMany({
    where:   { status: "PUBLISHED", isTrending: true },
    include: { author: { select: { id: true, name: true, avatar: true, bio: true, role: true } }, tags: { include: { tag: true } }, _count: { select: { comments: true, likes: true, bookmarks: true } } },
    orderBy: { views: "desc" },
    take: 5,
  });
}

async function getPopularTags() {
  return db.tag.findMany({ take: 20 });
}

export default async function HomePage() {
  const [featured, latest, trending, tags] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(),
    getTrendingArticles(),
    getPopularTags(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <HeroCarousel articles={featured as any} />
          </div>
          {/* Trending sidebar */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-bold text-sm tracking-wider">TRENDING</span>
            </div>
            <div className="space-y-1">
              {trending.map((a, i) => (
                <ArticleCard key={a.id} article={a as any} variant="compact" index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category filter + grid */}
      <section className="mb-12">
        <CategoryFilter />
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        }>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {latest.map((a, i) => (
              <ArticleCard key={a.id} article={a as any} index={i} />
            ))}
          </div>
        </Suspense>
      </section>

      {/* Newsletter */}
      <NewsletterBox />

      {/* Popular Tags */}
      <section className="mb-8">
        <h2 className="text-white font-bold text-lg mb-4">🏷️ Tag Populer</h2>
        <PopularTags tags={tags} />
      </section>
    </div>
  );
}
