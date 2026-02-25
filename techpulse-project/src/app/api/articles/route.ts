// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserFromToken, requireRole } from '@/lib/auth'
import { z } from 'zod'
import { ArticleStatus, Category } from '@prisma/client'

const ArticleSchema = z.object({
  title: z.string().min(10).max(300),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(ArticleStatus).default('DRAFT'),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  readTime: z.number().int().min(1).max(60),
  featuredImg: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
})

// GET /api/articles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category') as Category | null
    const search = searchParams.get('search')
    const tag = searchParams.get('tag')
    const featured = searchParams.get('featured') === 'true'

    const where: any = { status: 'PUBLISHED' }
    if (category) where.category = category
    if (featured) where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (tag) {
      where.tags = { some: { tag: { slug: tag } } }
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true, role: true } },
          tags: { include: { tag: { select: { name: true, slug: true } } } },
          _count: { select: { comments: true, likes: true } },
        },
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/articles
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user || !requireRole(user.role, 'WRITER')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const data = ArticleSchema.parse(body)

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const article = await prisma.article.create({
      data: {
        ...data,
        slug,
        authorId: user.id,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        tags: data.tags
          ? {
              create: await Promise.all(
                data.tags.map(async (tagName) => {
                  const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  const tag = await prisma.tag.upsert({
                    where: { slug: tagSlug },
                    update: {},
                    create: { name: tagName, slug: tagSlug },
                  })
                  return { tagId: tag.id }
                })
              ),
            }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        tags: { include: { tag: true } },
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
