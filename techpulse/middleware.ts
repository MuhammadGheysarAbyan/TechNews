// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token    = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Block non-admins from admin routes (except login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
      const role = (token as any).role;
      if (!["ADMIN", "EDITOR", "WRITER"].includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow login page always
        if (req.nextUrl.pathname === "/admin/login") return true;
        // All other /admin routes need token
        if (req.nextUrl.pathname.startsWith("/admin")) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
