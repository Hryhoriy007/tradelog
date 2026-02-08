import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const { email, password, locale } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 днів

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      locale: locale === "en" ? "en" : "ua",
      trialEndsAt,
    },
    select: { id: true, email: true, plan: true, trialEndsAt: true, locale: true },
  });

  return NextResponse.json({ user });
}
