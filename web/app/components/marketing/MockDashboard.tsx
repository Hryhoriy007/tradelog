"use client";

import { Card } from "@/app/components/ui/Card";

export function MockDashboard() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 22,
        padding: 0,
      }}
    >
      <div style={{ display: "grid", gap: 12 }}>
        {/* Top cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <MiniCard label="Total R" value="+12.4R" />
          <MiniCard label="Win rate" value="48%" />
          <MiniCard label="Avg R" value="+0.42R" />
          <MiniCard label="Streak" value="WIN × 4" />
        </div>

        {/* Equity curve mock */}
        <Card title="Equity curve (R)" subtitle="Last 30 trades">
          <div style={{ position: "relative" }}>
            <svg width="100%" height="120" viewBox="0 0 400 120">
              {/* subtle baseline */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

              {/* animated line */}
              <polyline
                className="eqLine"
                points="0,80 40,90 80,70 120,75 160,55 200,60 240,40 280,45 320,30 360,20"
                fill="none"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="2.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* glow line (soft) */}
              <polyline
                className="eqGlow"
                points="0,80 40,90 80,70 120,75 160,55 200,60 240,40 280,45 320,30 360,20"
                fill="none"
                stroke="rgba(140,80,255,0.35)"
                strokeWidth="6"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.35"
              />
            </svg>

            <style jsx>{`
              .eqLine {
                stroke-dasharray: 520;
                stroke-dashoffset: 520;
                animation: draw 1.15s ease forwards;
              }
              .eqGlow {
                stroke-dasharray: 520;
                stroke-dashoffset: 520;
                animation: draw 1.15s ease forwards;
                filter: blur(6px);
              }
              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>
        </Card>

        {/* Last trades */}
        <Card title="Last trades" subtitle="Preview">
          <div style={{ display: "grid", gap: 6 }}>
            <TradeRow pair="ETHUSDT" side="SHORT" r="+2.1R" tone="win" />
            <TradeRow pair="BTCUSDT" side="LONG" r="-1.0R" tone="loss" />
            <TradeRow pair="ETHUSDT" side="LONG" r="+1.4R" tone="win" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.65 }}>{label}</div>
      <div style={{ fontWeight: 900, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function toneStyle(tone: "win" | "loss" | "be") {
  if (tone === "win")
    return {
      bg: "rgba(80,200,120,0.14)",
      br: "rgba(80,200,120,0.22)",
    };
  if (tone === "loss")
    return {
      bg: "rgba(255,100,100,0.14)",
      br: "rgba(255,100,100,0.22)",
    };
  return {
    bg: "rgba(180,180,180,0.12)",
    br: "rgba(180,180,180,0.18)",
  };
}

function TradeRow({
  pair,
  side,
  r,
  tone,
}: {
  pair: string;
  side: string;
  r: string;
  tone: "win" | "loss" | "be";
}) {
  const t = toneStyle(tone);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        padding: "6px 8px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        fontSize: 12,
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <b>{pair}</b> <span style={{ opacity: 0.7 }}>{side}</span>
        </div>

        <span
          style={{
            padding: "3px 8px",
            borderRadius: 999,
            border: `1px solid ${t.br}`,
            background: t.bg,
            opacity: 0.92,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {tone.toUpperCase()}
        </span>
      </div>

      <div style={{ fontWeight: 800 }}>{r}</div>
    </div>
  );
}
