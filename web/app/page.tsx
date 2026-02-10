// web/app/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Page, HeaderRow } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ui } from "@/app/components/ui/styles";

import { MockDashboard } from "@/app/components/marketing/MockDashboard";
import { DashboardWindow } from "@/app/components/marketing/DashboardWindow";
import { Background3D } from "@/app/components/marketing/Background3D";

type FeatureItem = {
  title: string;
  subtitle: string;
  points: string[];
};

const copy: {
  heroTitle: React.ReactNode;
  heroSub: string;
  how1: string;
  how1Text: string;
  how2: string;
  how2Text: string;
  how3: string;
  how3Text: string;
  featuresTitle: string;
  features: FeatureItem[];
  bottomTitle: string;
  bottomSub: string;
} = {
  heroTitle: (
    <>
      Trade with data,
      <br />
      not emotions.
      <br />
      Stay consistent.
    </>
  ),
  heroSub: "Log entries, exits, risk, emotions, and rules — so your results stop lying to you.",

  how1: "Log what you executed",
  how1Text: "Pair, side, entry, stop, target — done in seconds.",
  how2: "Capture the real context",
  how2Text: "Setup, bias, emotions before & after. Why you entered. Why you exited.",
  how3: "Review your behavior",
  how3Text: "Equity in R, mistakes, overtrading, best setups.",

  featuresTitle: "Features",
  features: [
    {
      title: "Log trades without breaking focus",
      subtitle: "Fast, no clutter",
      points: ["Add a trade in ~30 seconds", "Presets for repeatable setups", "Tags for mistakes, psychology, FOMO"],
    },
    {
      title: "Stats that expose your discipline",
      subtitle: "See what you repeat",
      points: ["Equity curve in R (not fake PnL)", "Win / Loss / BE distribution", "Best & worst setups by Avg R"],
    },
    {
      title: "Your data. No lock-in. Ever.",
      subtitle: "Export & restore anytime",
      points: ["One-click JSON backup", "CSV export for Excel / Sheets", "Import with merge or replace modes"],
    },
  ],

  bottomTitle: "Ready to stop repeating the same mistakes?",
  bottomSub: "Create an account and start logging trades in minutes.",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        fontSize: 12,
        opacity: 0.9,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Feature({ title, subtitle, points }: { title: string; subtitle: string; points: string[] }) {
  return (
    <div style={{ height: "100%" }}>
      <Card title={title} subtitle={subtitle}>
        <div style={{ display: "grid", gap: 10 }}>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, opacity: 0.9 }}>
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        display: "grid",
        gap: 8,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            display: "grid",
            placeItems: "center",
            fontWeight: 900,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.03)",
            flex: "0 0 auto",
          }}
        >
          {n}
        </div>
        <div style={{ fontWeight: 900 }}>{title}</div>
      </div>
      <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

export default function HomePage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const t = copy;

  return (
    <Page>
      {/* 3D background behind everything */}
      <Background3D />

      {/* Content above background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Top bar */}
        <HeaderRow
          title="TradeLog"
          subtitle="Journal your crypto trades. Trade with data, not emotions."
          right={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="primary">Registration</Button>
              </Link>
            </div>
          }
        />

        {/* HERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 16,
            alignItems: "stretch",
            marginTop: 10,
          }}
        >
          {/* Left hero */}
          <div
            style={{
              padding: 22,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.10)",
              background:
                "radial-gradient(1200px 400px at 10% 10%, rgba(140,80,255,0.16), transparent 50%), rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
              <Badge>Crypto only</Badge>
              {/* removed 7-day free trial */}
              <Badge>No exchange API</Badge>
            </div>

            <div style={{ fontSize: 44, fontWeight: 950, letterSpacing: -0.8, lineHeight: 1.05 }}>
              {t.heroTitle}
            </div>

            <div style={{ marginTop: 12, ...ui.subtle, fontSize: 14, lineHeight: 1.6 }}>{t.heroSub}</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="primary">Registration</Button>
              </Link>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Login</Button>
              </Link>
            </div>

            <div style={{ marginTop: 10, opacity: 0.75, fontSize: 12, lineHeight: 1.5 }}>
              No exchange connection • No spreadsheets • Your data stays yours
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.85 }}>
              <Badge>📈 R-based stats</Badge>
              <Badge>Win / Loss / BE</Badge>
              <Badge>🧠 Psychology notes</Badge>
              <Badge>🔒 No exchange API</Badge>
            </div>
          </div>

          {/* Right: dashboard mock */}
          <div className="mockDashboardWrap">
            <DashboardWindow>
              <MockDashboard />
            </DashboardWindow>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 10 }}>How it works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "stretch" }}>
            <Step n="1" title={t.how1} text={t.how1Text} />
            <Step n="2" title={t.how2} text={t.how2Text} />
            <Step n="3" title={t.how3} text={t.how3Text} />
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginTop: 44 }}>
          <div style={{ fontSize: 20, fontWeight: 950, marginBottom: 14, paddingLeft: 4 }}>{t.featuresTitle}</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "stretch" }}>
            {t.features.map((f) => (
              <Feature key={f.title} title={f.title} subtitle={f.subtitle} points={f.points} />
            ))}
          </div>
        </div>

        {/* CTA BOTTOM */}
        <div
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.10)",
            background:
              "radial-gradient(900px 300px at 90% 10%, rgba(140,80,255,0.14), transparent 55%), rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 950 }}>{t.bottomTitle}</div>
            <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>{t.bottomSub}</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button variant="primary">Registration</Button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>

        {/* Footer (clean, no links) */}
        <div
          style={{
            marginTop: 14,
            opacity: 0.6,
            fontSize: 12,
            display: "flex",
            justifyContent: "center",
          }}
        >
          © {year} TradeLog
        </div>

        {/* Hide "demo data" text inside MockDashboard */}
        <style jsx>{`
          .mockDashboardWrap :global(*) {
            /* no-op wrapper to scope selectors */
          }
          .mockDashboardWrap :global(*:not(script)) {
            /* we keep safe baseline */
          }
          /* Hide any element that contains the exact "demo data" label (common in mock UIs) */
          .mockDashboardWrap :global([class*="demo"]),
          .mockDashboardWrap :global([data-demo]),
          .mockDashboardWrap :global(.demo),
          .mockDashboardWrap :global(.demoData) {
            display: none !important;
          }
        `}</style>

        {/* Responsive */}
        <style jsx>{`
          @media (max-width: 980px) {
            div[style*="grid-template-columns: 1.2fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </Page>
  );
}
