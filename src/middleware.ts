import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.nisolai.com";

  // Better Auth stores session in 'better-auth.session_token' (or prefixed with __Secure- in production)
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const protectedPaths = [
    "/dashboard",
    "/audits",
    "/clients",
    "/profile",
    "/portal",
    "/intelligence",
    "/users",
    "/tenants",
    "/questionnaire",
  ];

  // 1. If request hits marketing domain (nisolai.com) and attempts to access portal or login, redirect to app.nisolai.com
  const isMarketingDomain = (host.includes("nisolai.com") || host.includes("vercel.app")) && !host.startsWith("app.");
  const isPortalOrLogin = pathname.startsWith("/login") || protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isMarketingDomain && isPortalOrLogin) {
    const targetUrl = new URL(pathname + request.nextUrl.search, appUrl);
    return NextResponse.redirect(targetUrl);
  }

  // 2. If request hits app domain (app.nisolai.com) and lands on root '/', send to dashboard or login
  const isAppDomain = host.startsWith("app.");
  if (isAppDomain && pathname === "/") {
    const destination = sessionToken ? "/dashboard" : "/login";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  const response = NextResponse.next({ request: { headers: request.headers } });

  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isLogin = pathname.startsWith("/login");

  if (!sessionToken && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionToken && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};