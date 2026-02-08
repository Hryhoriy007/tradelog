import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import prisma from "@/lib/prisma"; // або звідки в тебе prisma client
import bcrypt from "bcryptjs";     // якщо ти хешуєш паролі bcrypt

const COOKIE_NAME = "session";

function signSession(token: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is missing in .env");

  return crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // 1) знаходимо юзера
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2) перевіряємо пароль (якщо у тебе passwordHash)
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3) генеруємо токен сесії
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 днів

    // 4) пишемо сесію в Supabase (таблиця Session)
    await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    // 5) ставимо cookie: token + підпис
    const sig = signSession(token);
    const value = `${token}.${sig}`;

    const isProd = process.env.NODE_ENV === "production";

    cookies().set({
      name: COOKIE_NAME,
      value,
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,         // локально false, на проді true
      path: "/",
      expires: expiresAt,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
