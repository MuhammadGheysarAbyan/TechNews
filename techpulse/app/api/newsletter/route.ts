// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db }              from "@/lib/db";
import { newsletterSchema }from "@/lib/validations";
import { emailLimit }      from "@/lib/rate-limit";
import crypto              from "crypto";

export async function POST(req: NextRequest) {
  const limited = emailLimit(req);
  if (limited) return limited;

  const body   = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Email tidak valid" }, { status: 422 });

  const { email } = parsed.data;

  const existing = await db.newsletter.findUnique({ where: { email } });
  if (existing) {
    if (existing.isVerified) return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    return NextResponse.json({ success: true, message: "Silakan verifikasi email Anda" });
  }

  const verifyToken = crypto.randomBytes(32).toString("hex");
  await db.newsletter.create({ data: { email, verifyToken } });

  // TODO: send verification email via nodemailer
  // await sendVerificationEmail(email, verifyToken);

  return NextResponse.json({ success: true, message: "Cek email Anda untuk konfirmasi" });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Token tidak valid" }, { status: 400 });

  const newsletter = await db.newsletter.findFirst({ where: { verifyToken: token } });
  if (!newsletter)  return NextResponse.json({ error: "Token kadaluarsa" }, { status: 404 });

  await db.newsletter.update({ where: { id: newsletter.id }, data: { isVerified: true, verifyToken: null } });
  return NextResponse.redirect(new URL("/?subscribed=1", req.url));
}
