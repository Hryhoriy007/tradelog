import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { prisma } from "@/src/lib/prisma";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ публічні сторінки/апі — пропускаємо
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ якщо це сторінка з protected-зони (див. matcher нижче)
  const token = req.cookies.get("session")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // перевіряємо сесію в БД
  const tokenHash = sha256(token);
  const session = await prisma.session.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    select: { id: true, userId: true },
  });

  if (!session) {
    // сесія невалідна -> прибираємо cookie і на login
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);

    const res = NextResponse.redirect(url);
    res.cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return res;
  }

  // ✅ все ок — пропускаємо
  return NextResponse.next();
}

/**
 * Тут задаємо, ЯКІ маршрути захищаємо.
 * Варіант 1 (простий): захистити все, крім публічних.
 * Але ми вже зробили allowlist в коді, тому matcher можна ставити ширше.
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
