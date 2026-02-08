import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/src/lib/prisma";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
  const token = match?.[1];

  if (!token) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }

  const tokenHash = sha256(token);

  const session = await prisma.session.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!session) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: session.user.id,
      email: session.user.email,
      plan: session.user.plan,
      locale: session.user.locale,
      trialEndsAt: session.user.trialEndsAt,
    },
  });
}
