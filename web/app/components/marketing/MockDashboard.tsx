"use client";

import { Card } from "@/app/components/ui/Card";
import { ui } from "@/app/components/ui/styles";

export function MockDashboard() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 22,
        padding: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        overflow: "hidden",
      }}
    >
      {/* blur glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background:
            "radial-gradient(600px 200px at 80% 0%, rgba(140,80,255,0.25), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "grid", gap: 12 }}>
        {/* Top cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <MiniCard label="Total R" value="+12.4R" />
          <MiniCard label="Win rate" value="48%" />
          <MiniCard label="Avg R" value="+0.42R" />
          <MiniCard label="Streak" value="WIN × 4" />
        </div>

        {/* Equity curve mock */}
        <Card title="Equity curve (R)" subtitle="Last 30 trades">
          <svg width="100%" height="120" viewBox="0 0 400 120">
            <polyline
              points="0,80 40,90 80,70 120,75 160,55 200,60 240,40 280,45 320,30 360,20"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </Card>

        {/* Last trades */}
        <Card title="Last trades" subtitle="Preview">
          <div style={{ display: "grid", gap: 6 }}>
            <TradeRow pair="ETHUSDT" side="SHORT" r="+2.1R" />
            <TradeRow pair="BTCUSDT" side="LONG" r="-1.0R" />
            <TradeRow pair="ETHUSDT" side="LONG" r="+1.4R" />
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

function TradeRow({ pair, side, r }: { pair: string; side: string; r: string }) {
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
      }}
    >
      <div>
        <b>{pair}</b>{" "}
        <span style={{ opacity: 0.7 }}>{side}</span>
      </div>
      <div style={{ fontWeight: 700 }}>{r}</div>
    </div>
  );
}
