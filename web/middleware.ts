import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаємо public сторінки
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  const session = req.cookies.get("session")?.value;

  // якщо немає cookie і це НЕ public → редірект на login
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // якщо є cookie і користувач на login/register → редірект на dashboard
  if (session && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
