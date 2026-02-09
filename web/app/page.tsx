"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ui } from "@/app/components/ui/styles";

import { MockDashboard } from "@/app/components/marketing/MockDashboard";

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

function Feature({
  title,
  subtitle,
  points,
}: {
  title: string;
  subtitle: string;
  points: string[];
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div style={{ display: "grid", gap: 10 }}>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, opacity: 0.9 }}>
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </Card>
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

  return (
    <Page>
      {/* Top bar */}
      <HeaderRow
        title="TradeLog"
        subtitle="Journal your crypto trades. Stay consistent. Improve your edge."
        right={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Open app</Button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button variant="primary">Start free trial</Button>
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
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Badge>UA + EN</Badge>
            <Badge>Crypto only</Badge>
            <Badge>7-day free trial</Badge>
            <Badge>No spreadsheets</Badge>
          </div>

          <div style={{ fontSize: 44, fontWeight: 950, letterSpacing: -0.8, lineHeight: 1.05 }}>
            Track trades.
            <br />
            Fix mistakes.
            <br />
            Grow consistency.
          </div>

          <div style={{ marginTop: 12, ...ui.subtle, fontSize: 14, lineHeight: 1.6 }}>
            EN: Track entries/exits, emotions, rules, and stats — keep your strategy honest.
            <br />
            UA: Фіксуй входи/виходи, емоції, правила і статистику — дисципліна стає видимою.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button variant="primary">Create account (Trial)</Button>
            </Link>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Try demo (local)</Button>
            </Link>
            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Templates</Button>
            </Link>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.85 }}>
            <Badge>⏱ fast logging</Badge>
            <Badge>📈 R-based stats</Badge>
            <Badge>🧠 psychology notes</Badge>
            <Badge>💾 backup/export</Badge>
          </div>
        </div>

        {/* Right: dashboard mock */}
        <div>
          <MockDashboard />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 10 }}>How it works</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <Step n="1" title="Log the trade" text="Pair, side, entry/exit, SL/TP, setup, tags — done in seconds." />
          <Step n="2" title="Add context" text="Thesis + what went well + improve. Psychology before/during/after." />
          <Step n="3" title="Review stats" text="Equity curve, win/loss, R distribution, top setups, streaks." />
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 10 }}>Features / Можливості</div>
        <Row cols={3}>
          <Feature
            title="Fast trade logging"
            subtitle="Швидке внесення угод"
            points={[
              "Add trades in ~30 seconds",
              "Presets/Templates for repeatable setups",
              "Tags for psychology & mistakes",
            ]}
          />
          <Feature
            title="Stats & discipline"
            subtitle="Статистика і дисципліна"
            points={[
              "Equity curve in R",
              "Win/Loss/BE + distribution",
              "Top setups by Avg R",
            ]}
          />
          <Feature
            title="Backup & export"
            subtitle="Бекап та експорт"
            points={[
              "Export JSON backup (restore anytime)",
              "CSV export for Sheets/Excel",
              "Import merge/replace modes",
            ]}
          />
        </Row>
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
          <div style={{ fontSize: 18, fontWeight: 950 }}>Ready to become consistent?</div>
          <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>
            Start a free trial or open the app locally (no account).
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/signup" style={{ textDecoration: "none" }}>
            <Button variant="primary">Start free trial</Button>
          </Link>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Button variant="secondary">Open app</Button>
          </Link>
          <Link href="/backup" style={{ textDecoration: "none" }}>
            <Button variant="secondary">Backup</Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 14,
          opacity: 0.6,
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div>© {year} TradeLog</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            App
          </Link>
          <Link href="/stats" style={{ textDecoration: "none", color: "inherit" }}>
            Stats
          </Link>
          <Link href="/templates" style={{ textDecoration: "none", color: "inherit" }}>
            Templates
          </Link>
          <Link href="/backup" style={{ textDecoration: "none", color: "inherit" }}>
            Backup
          </Link>
        </div>
      </div>

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
    </Page>
  );
}
