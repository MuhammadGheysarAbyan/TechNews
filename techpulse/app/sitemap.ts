// app/sitemap.ts
import { MetadataRoute } from "next";
import { db }            from "@/lib/db";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techpulse.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await db.article.findMany({
    where:  { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const staticPages = ["/", "/about", "/contact", "/newsletter"].map((path) => ({
    url:          `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:     path === "/" ? 1 : 0.8,
  }));

  const articlePages = articles.map((a) => ({
    url:          `${BASE}/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly" as const,
    priority:     0.7,
  }));

  const categoryPages = ["ai", "programming", "gadget", "startup", "cyber-security"].map((cat) => ({
    url:          `${BASE}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority:     0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
