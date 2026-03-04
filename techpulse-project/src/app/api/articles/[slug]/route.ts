// src/app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserFromToken, requireRole } from '@/lib/auth'
import { z } from 'zod'

// GET /api/articles/:slug
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug: params.slug },
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true, role: true } },
        tags: { include: { tag: { select: { name: true, slug: true } } } },
        comments: {
          where: { parentId: null },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
            replies: {
              include: { user: { select: { id: true, name: true, avatar: true } } },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { likes: true, bookmarks: true, comments: true } },
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ ...article, views: article.views + 1 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/articles/:slug
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const article = await prisma.article.findUnique({ where: { slug: params.slug } })
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Only admin/editor OR the author can edit
    if (!requireRole(user.role, 'EDITOR') && String(article.authorId) !== String(user.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const updated = await prisma.article.update({
      where: { slug: params.slug },
      data: {
        ...body,
        publishedAt: body.status === 'PUBLISHED' && !article.publishedAt ? new Date() : article.publishedAt,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/articles/:slug
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user || !requireRole(user.role, 'EDITOR')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.article.delete({ where: { slug: params.slug } })
    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
