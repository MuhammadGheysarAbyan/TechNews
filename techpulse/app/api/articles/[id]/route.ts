// app/api/articles/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db }             from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { articleSchema }  from "@/lib/validations";
import { estimateReadTime } from "@/lib/utils";

interface Params { params: { id: string } }

// GET /api/articles/:id
export async function GET(_: NextRequest, { params }: Params) {
  const article = await db.article.findUnique({
    where: { id: params.id },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true, role: true } },
      tags:   { include: { tag: true } },
      _count: { select: { comments: true, likes: true, bookmarks: true } },
    },
  });
  if (!article) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ success: true, data: article });
}

// PUT /api/articles/:id
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await db.article.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });

  const role = (session.user as any).role;
  const uid  = (session.user as any).id;
  if (!["ADMIN", "EDITOR"].includes(role) && existing.authorId !== uid) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body   = await req.json();
  const parsed = articleSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { tags, ...data } = parsed.data;
  const readTime = data.content ? estimateReadTime(data.content) : undefined;

  const article = await db.article.update({
    where: { id: params.id },
    data:  {
      ...data,
      ...(readTime && { readTime }),
      ...(data.status === "PUBLISHED" && !existing.publishedAt && { publishedAt: new Date() }),
      ...(tags && {
        tags: {
          deleteMany: {},
          create: await Promise.all(
            tags.map(async (name) => {
              const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
              const tag  = await db.tag.upsert({ where: { slug }, update: {}, create: { name, slug } });
              return { tag: { connect: { id: tag.id } } };
            })
          ),
        },
      }),
    },
    include: { author: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json({ success: true, data: article });
}

// DELETE /api/articles/:id
export async function DELETE(_: NextRequest, { params }: Params) {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = (session.user as any).role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await db.article.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
