// lib/rate-limit.ts
import { NextRequest, NextResponse } from "next/server";

const store = new Map<string, { count: number; reset: number }>();

export function rateLimit(max: number, windowMs: number) {
  return function middleware(req: NextRequest): NextResponse | null {
    const ip  = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous";
    const key = `${ip}:${req.nextUrl.pathname}`;
    const now = Date.now();
    const rec = store.get(key);

    if (!rec || now > rec.reset) {
      store.set(key, { count: 1, reset: now + windowMs });
      return null;
    }

    rec.count++;
    if (rec.count > max) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi nanti." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rec.reset - now) / 1000)) } }
      );
    }
    return null;
  };
}

export const apiLimit   = rateLimit(60,  60_000);   // 60 req/min
export const authLimit  = rateLimit(5,   60_000);   // 5 login attempts/min
export const emailLimit = rateLimit(3,  300_000);   // 3 email sends/5min
