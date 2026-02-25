// app/api/articles/[id]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db }             from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { commentSchema }  from "@/lib/validations";

interface Params { params: { id: string } }

export async function GET(_: NextRequest, { params }: Params) {
  const comments = await db.comment.findMany({
    where:   { articleId: params.id, parentId: null },
    include: {
      author:  { select: { id: true, name: true, avatar: true } },
      replies: {
        include: { author: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ success: true, data: comments });
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ error: "Login diperlukan" }, { status: 401 });

  const body   = await req.json();
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const comment = await db.comment.create({
    data: {
      content:   parsed.data.content,
      articleId: params.id,
      authorId:  (session.user as any).id,
      parentId:  parsed.data.parentId,
    },
    include: { author: { select: { id: true, name: true, avatar: true } } },
  });

  return NextResponse.json({ success: true, data: comment }, { status: 201 });
}
