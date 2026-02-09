import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  const isPublic = PUBLIC_PATHS.includes(pathname);

  // ❌ без cookie — не пускаємо на закриті сторінки
  if (!session && !isPublic) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ✅ з cookie — не пускаємо на login/register
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
