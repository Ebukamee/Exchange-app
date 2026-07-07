import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, hostname } = request.nextUrl;

  // Handle subdomains
  // Extract subdomain from hostname
  const hostparts = hostname.split(".");
  let subdomain = null;

  // For local development (localhost:3000)
  if (hostname.includes("localhost")) {
    // Use query params or path-based routing for local dev
    // Or parse from custom header if needed
  } else {
    // For production domains, extract subdomain
    // admin.website.com, dashboard.website.com, website.com
    if (hostparts.length > 2) {
      subdomain = hostparts[0];
    }
  }

  // Rewrite URLs based on subdomain
  if (subdomain === "admin") {
    // Admin subdomain routes to /admin
    if (!pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
    }
  } else if (subdomain === "dashboard") {
    // Dashboard subdomain routes to /dashboard
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.rewrite(new URL(`/dashboard${pathname}`, request.url));
    }
  } else {
    // Main domain - keep current routing for main site
    // Admin and dashboard routes on main domain will be blocked/redirected
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/")) {
      // Optionally redirect to appropriate subdomain
      // For now, allow them to pass through
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
