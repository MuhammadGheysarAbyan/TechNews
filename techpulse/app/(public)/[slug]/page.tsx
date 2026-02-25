// app/(public)/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound }       from "next/navigation";
import Image              from "next/image";
import Link               from "next/link";
import { db }             from "@/lib/db";
import { Badge }          from "@/components/ui/Badge";
import { CommentSection } from "@/components/article/CommentSection";
import { ArticleCard }    from "@/components/article/ArticleCard";
import { NewsletterBox }  from "@/components/article/NewsletterBox";
import { ArticleActions } from "@/components/article/ArticleActions";
import { formatDate, formatNumber, estimateReadTime } from "@/lib/utils";
import { Eye, Clock, Calendar, ChevronRight } from "lucide-react";

interface Props { params: { slug: string } }

async function getArticle(slug: string) {
  const article = await db.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author:   { select: { id: true, name: true, avatar: true, bio: true, role: true } },
      tags:     { include: { tag: true } },
      comments: {
        where:   { parentId: null },
        include: {
          author:  { select: { id: true, name: true, avatar: true } },
          replies: { include: { author: { select: { id: true, name: true, avatar: true } } }, orderBy: { createdAt: "asc" } },
          _count:  { select: { likes: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      _count: { select: { comments: true, likes: true, bookmarks: true } },
    },
  });

  if (!article) return null;

  // Increment views (fire and forget)
  db.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } }).catch(() => {});

  return article;
}

async function getRelatedArticles(category: string, excludeId: string) {
  return db.article.findMany({
    where:   { status: "PUBLISHED", category: category as any, id: { not: excludeId } },
    include: { author: { select: { id: true, name: true, avatar: true, bio: true, role: true } }, tags: { include: { tag: true } }, _count: { select: { comments: true, likes: true, bookmarks: true } } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await db.article.findUnique({
    where: { slug: params.slug }, select: { title: true, excerpt: true, featuredImage: true, seoTitle: true, seoDesc: true, publishedAt: true },
  });
  if (!article) return { title: "Artikel tidak ditemukan" };

  return {
    title:       article.seoTitle ?? article.title,
    description: article.seoDesc  ?? article.excerpt,
    openGraph: {
      title:       article.seoTitle ?? article.title,
      description: article.seoDesc  ?? article.excerpt,
      type:        "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.featuredImage ? [{ url: article.featuredImage }] : [],
    },
    twitter: {
      card:        "summary_large_image",
      title:       article.seoTitle ?? article.title,
      description: article.seoDesc  ?? article.excerpt,
      images:      article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const [article, related] = await Promise.all([
    getArticle(params.slug),
    getArticle(params.slug).then((a) => a ? getRelatedArticles(a.category, a.id) : []),
  ]);

  if (!article) notFound();

  const tags = article.tags.map((t) => t.tag);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
        <ChevronRight size={12} />
        <Link href={`/category/${article.category.toLowerCase()}`} className="hover:text-emerald-400 transition-colors capitalize">
          {article.category.replace("_", " ")}
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-400 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <Badge category={article.category} size="md" />
        <h1 className="mt-3 text-3xl md:text-4xl font-black text-white leading-tight">{article.title}</h1>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed font-serif">{article.excerpt}</p>
      </header>

      {/* Meta bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
            {article.author.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{article.author.name}</p>
            <p className="text-gray-500 text-xs">{article.author.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-sm ml-auto flex-wrap">
          <span className="flex items-center gap-1"><Calendar size={13} />{article.publishedAt ? formatDate(article.publishedAt) : ""}</span>
          <span className="flex items-center gap-1"><Clock size={13} />{article.readTime}m baca</span>
          <span className="flex items-center gap-1"><Eye size={13} />{formatNumber(article.views)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <ArticleActions article={{ id: article.id, likes: article._count.likes, bookmarked: false }} />

      {/* Featured image */}
      {article.featuredImage && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 mt-6">
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose-tech mb-10"
        dangerouslySetInnerHTML={{ __html: article.content }} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-white/10">
        {tags.map((tag) => (
          <Link key={tag.id} href={`/tag/${tag.slug}`}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs hover:border-emerald-500/40 hover:text-emerald-400 transition-all">
            #{tag.name}
          </Link>
        ))}
      </div>

      {/* Author bio */}
      <div className="card p-6 mb-10">
        <h3 className="text-white font-bold mb-4">Tentang Penulis</h3>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-base font-bold text-white flex-shrink-0">
            {article.author.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{article.author.name}</p>
            <p className="text-emerald-400 text-sm mb-2">{article.author.role}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{article.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />

      {/* Comments */}
      <CommentSection
        articleId={article.id}
        initialComments={article.comments.map((c) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
          replies: c.replies.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })),
        }))}
      />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-white font-bold text-xl mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((a, i) => <ArticleCard key={a.id} article={a as any} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
