// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import crypto from 'crypto'

const SubscribeSchema = z.object({
  email: z.string().email('Email tidak valid'),
})

// POST /api/newsletter - subscribe
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = SubscribeSchema.parse(body)

    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) {
      if (existing.confirmed) {
        return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 200 })
      }
      return NextResponse.json({ message: 'Silakan cek email Anda untuk konfirmasi' }, { status: 200 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    await prisma.newsletter.create({
      data: { email, token },
    })

    // TODO: Send confirmation email via nodemailer
    // await sendConfirmationEmail(email, token)

    return NextResponse.json({
      message: 'Terima kasih! Silakan cek email Anda untuk konfirmasi langganan.',
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Email tidak valid' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// GET /api/newsletter/confirm?token=xxx
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) return NextResponse.json({ error: 'Token tidak valid' }, { status: 400 })

    const subscriber = await prisma.newsletter.findFirst({ where: { token } })
    if (!subscriber) return NextResponse.json({ error: 'Token tidak ditemukan' }, { status: 404 })

    await prisma.newsletter.update({
      where: { id: subscriber.id },
      data: { confirmed: true, token: null },
    })

    return NextResponse.json({ message: 'Email berhasil dikonfirmasi! Selamat datang di TechPulse.' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
