// app/(public)/layout.tsx
import { Navbar }      from "@/components/layout/Navbar";
import { Footer }      from "@/components/layout/Footer";
import { BreakingBar } from "@/components/layout/BreakingBar";
import { db }          from "@/lib/db";

async function getTrendingArticles() {
  try {
    return await db.article.findMany({
      where:   { status: "PUBLISHED", isTrending: true },
      select:  { id: true, title: true, slug: true },
      orderBy: { views: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const trending = await getTrendingArticles();

  return (
    <>
      <Navbar />
      {trending.length > 0 && <BreakingBar articles={trending} />}
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
