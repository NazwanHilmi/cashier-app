import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // cek user sudah login
    const authPages = ["/auth/login"];

    if (pathname.startsWith("/auth") && req.nextauth?.token)
      return NextResponse.redirect(new URL(`/data/category`, req.url));
  
    // cek user belum login
    if ((pathname.startsWith('/applications') || pathname.startsWith("/data")) && !req.nextauth?.token)
      return NextResponse.redirect(
        new URL(`/auth/login`, req.url)
      );

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true
    },
  },
);

export const config = { matcher: ["/applications/:path*", "/data/:path*", "/auth/:path*"] };
