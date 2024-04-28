import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Cek user sudah login
    if (!req.nextauth?.token) {
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      
      // Jika pengguna belum login 
      if (pathname.startsWith('/applications') || pathname.startsWith("/data")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } else {
      // Jika pengguna sudah login 
      if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/data/category", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true
    },
  },
);

export const config = { matcher: ["/", "/applications/:path*", "/data/:path*", "/auth/:path*"] };
