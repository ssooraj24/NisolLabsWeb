import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request: { headers: request.headers } });

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

  const pathname = request.nextUrl.pathname;
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