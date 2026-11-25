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
  const hostParts = hostname.split(":");
  const currentHost = hostParts[0].toLowerCase();
  const port = hostParts[1] ? `:${hostParts[1]}` : "";
  const isLocalhost = currentHost.includes("localhost");

  // Subdomain detection rules
  const isTravelSubdomain =
    currentHost.startsWith("travel.deorganica.am") ||
    currentHost.startsWith("travel.localhost");

  const isManpowerSubdomain =
    currentHost.startsWith("manpower.deorganica.am") ||
    currentHost.startsWith("careers.deorganica.am") ||
    currentHost.startsWith("manpower.localhost") ||
    currentHost.startsWith("careers.localhost");

  // Keep API and Sanity Studio routes untouched across all domains and subdomains
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/studio")
  ) {
    return NextResponse.next();
  }

  // Canonical base host for SEO consolidation and shared cookie context
  const canonicalBase = isLocalhost
    ? `http://localhost${port || ":3000"}`
    : "https://deorganica.am";

  // 1. Travel Subdomain -> 308 Permanent Redirect to https://deorganica.am/travel
  if (isTravelSubdomain) {
    let targetPath = "/travel";
    if (url.pathname !== "/") {
      targetPath = url.pathname.startsWith("/travel")
        ? url.pathname
        : `/travel${url.pathname}`;
    }
    const targetUrl = new URL(targetPath, canonicalBase);
    targetUrl.search = url.search;
    return NextResponse.redirect(targetUrl, 308);
  }

  // 2. Manpower Subdomain -> 308 Permanent Redirect to https://deorganica.am/manpower
  if (isManpowerSubdomain) {
    let targetPath = "/manpower";
    if (url.pathname !== "/") {
      targetPath = url.pathname.startsWith("/manpower")
        ? url.pathname
        : `/manpower${url.pathname}`;
    }
    const targetUrl = new URL(targetPath, canonicalBase);
    targetUrl.search = url.search;
    return NextResponse.redirect(targetUrl, 308);
  }

  // 3. Canonicalize www.deorganica.am -> https://deorganica.am (308 Permanent)
  if (currentHost === "www.deorganica.am") {
    const targetUrl = new URL(`${url.pathname}${url.search}`, "https://deorganica.am");
    return NextResponse.redirect(targetUrl, 308);
  }

  // 4. Default root domain (deorganica.am / localhost:3000)
  return NextResponse.next();
}
