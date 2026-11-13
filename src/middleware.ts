import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, sitemap.xml, robots.txt
     * - static files with extensions (.png, .jpg, .svg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\..*).*)",
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Normalize host: strip port if present (e.g. travel.localhost:3000 -> travel.localhost)
  const currentHost = hostname.split(":")[0].toLowerCase();

  // Subdomain detection rules
  // Production: travel.deorganica.am, manpower.deorganica.am, careers.deorganica.am
  // Local testing: travel.localhost, manpower.localhost, careers.localhost
  const isTravelSubdomain =
    currentHost.startsWith("travel.deorganica.am") ||
    currentHost.startsWith("travel.localhost");

  const isManpowerSubdomain =
    currentHost.startsWith("manpower.deorganica.am") ||
    currentHost.startsWith("careers.deorganica.am") ||
    currentHost.startsWith("manpower.localhost") ||
    currentHost.startsWith("careers.localhost");

  // Keep API, Sanity Studio, contact, & shared legal routes untouched across all domains and subdomains
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/studio") ||
    url.pathname === "/contact" ||
    url.pathname === "/privacy" ||
    url.pathname === "/terms"
  ) {
    return NextResponse.next();
  }

  // 1. Travel Subdomain (travel.deorganica.am)
  if (isTravelSubdomain) {
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/travel", req.url));
    }
    // If not already prefixed with /travel, rewrite
    if (!url.pathname.startsWith("/travel")) {
      return NextResponse.rewrite(new URL(`/travel${url.pathname}`, req.url));
    }
    return NextResponse.next();
  }

  // 2. Manpower Subdomain (manpower.deorganica.am or careers.deorganica.am)
  if (isManpowerSubdomain) {
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/manpower", req.url));
    }
    if (!url.pathname.startsWith("/manpower")) {
      return NextResponse.rewrite(new URL(`/manpower${url.pathname}`, req.url));
    }
    return NextResponse.next();
  }

  // 3. Default root domain (deorganica.am / www.deorganica.am / localhost:3000)
  return NextResponse.next();
}
