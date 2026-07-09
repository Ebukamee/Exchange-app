

  import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // Never rewrite API routes — they must stay reachable at the real path
  // on every subdomain, since auth/session calls happen from all of them.
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const hostparts = hostname.split(".");
  let subdomain = null;

  if (!hostname.includes("localhost") && hostparts.length > 2) {
    subdomain = hostparts[0];
  }

  if (subdomain === "admin" && !pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
  }
  if (subdomain === "dashboard" && !pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL(`/dashboard${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
