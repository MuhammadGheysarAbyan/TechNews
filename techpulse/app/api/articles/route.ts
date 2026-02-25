// app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db }            from "@/lib/db";
import { getAuthSession }from "@/lib/auth";
import { articleSchema, searchSchema } from "@/lib/validations";
import { createSlug, estimateReadTime } from "@/lib/utils";
import { apiLimit }      from "@/lib/rate-limit";

// GET /api/articles
export async function GET(req: NextRequest) {
  const limited = apiLimit(req);
  if (limited) return limited;

  const { searchParams } = req.nextUrl;
  const parsed = searchSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) return NextResponse.json({ error: "Parameter tidak valid" }, { status: 400 });

  const { q, category, tag, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const where: any = { status: "PUBLISHED" };
  if (q)        where.OR = [{ title: { contains: q, mode: "insensitive" } }, { excerpt: { contains: q, mode: "insensitive" } }];
  if (category) where.category = category.toUpperCase();
  if (tag)      where.tags = { some: { tag: { slug: tag } } };

  const [articles, total] = await Promise.all([
    db.article.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true, role: true } },
        tags:   { include: { tag: true } },
        _count: { select: { comments: true, likes: true, bookmarks: true } },
      },
      orderBy: { publishedAt: "desc" },
      skip, take: limit,
    }),
    db.article.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data:    articles,
    meta: {
      page, limit, total,
      totalPages: Math.ceil(total / limit),
      hasNext:    page < Math.ceil(total / limit),
      hasPrev:    page > 1,
    },
  });
}

// POST /api/articles  (Admin/Editor/Writer only)
export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any).role;
  if (!["ADMIN", "EDITOR", "WRITER"].includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body   = await req.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { tags, ...data } = parsed.data;
  const slug     = await createSlug(data.title);
  const readTime = estimateReadTime(data.content);

  const article = await db.article.create({
    data: {
      ...data,
      slug,
      readTime,
      authorId:    (session.user as any).id,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      tags: {
        create: await Promise.all(
          tags.map(async (name) => {
            const tagSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
            const tag = await db.tag.upsert({
              where: { slug: tagSlug },
              update: {},
              create: { name, slug: tagSlug },
            });
            return { tag: { connect: { id: tag.id } } };
          })
        ),
      },
    },
    include: { author: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json({ success: true, data: article }, { status: 201 });
}
