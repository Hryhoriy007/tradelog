import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/src/lib/prisma";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  const token = match?.[1];

  // Завжди чистимо cookie (навіть якщо токена нема)
  const res = NextResponse.json({ ok: true });

  if (token) {
    const tokenHash = sha256(token);

    // revokємо сесію в БД (якщо знайдеться)
    await prisma.session.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  // чистимо cookie
  res.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
