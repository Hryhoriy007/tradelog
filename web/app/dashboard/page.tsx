"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR, computeStats } from "@/lib/stats";

function pct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const stats = useMemo(() => computeStats(trades), [trades]);

  const lastTrades = useMemo(() => {
    const withR = trades
      .map((t) => ({ t, r: tradeR(t) }))
      .filter((x) => x.r !== null) as { t: Trade; r: number }[];

    return withR.slice(0, 10);
  }, [trades]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Dashboard</h1>
          <div style={{ opacity: 0.75, fontSize: 13 }}>Your performance, discipline and edge — in R.</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/trades">
            <button style={btn()}>Trades</button>
          </Link>
          <Link href="/trades/new">
            <button style={btn(true)}>+ Add trade</button>
          </Link>
          <Link href="/stats">
            <button style={btn()}>Stats</button>
          </Link>
        </div>
      </div>

      {stats.count === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
            <Card title="Trades (R-ready)" value={String(stats.count)} />
            <Card title="Winrate" value={pct(stats.winrate)} />
            <Card title="Avg R" value={stats.avgR.toFixed(2)} />
            <Card title="Expectancy" value={stats.expectancy.toFixed(2)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
            <Card title="Profit Factor" value={stats.profitFactor === Infinity ? "∞" : stats.profitFactor.toFixed(2)} />
            <Card title="Avg Win R" value={stats.avgWinR.toFixed(2)} />
            <Card title="Avg Loss R" value={stats.avgLossR.toFixed(2)} />
            <Card title="Wins / Losses / BE" value={`${stats.wins} / ${stats.losses} / ${stats.bes}`} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 18 }}>
            <Card title="Best win streak" value={String(stats.bestWinStreak)} />
            <Card title="Best loss streak" value={String(stats.bestLoseStreak)} />
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "6px 0 10px" }}>Last trades</h2>

          <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #222" }}>
                  <th style={{ padding: 12 }}>Date</th>
                  <th style={{ padding: 12 }}>Pair</th>
                  <th style={{ padding: 12 }}>Side</th>
                  <th style={{ padding: 12 }}>Setup</th>
                  <th style={{ padding: 12 }}>R</th>
                </tr>
              </thead>
              <tbody>
                {lastTrades.map(({ t, r }) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid #161616" }}>
                    <td style={{ padding: 12 }}>{new Date(t.openedAt).toLocaleDateString()}</td>
                    <td style={{ padding: 12 }}>{t.symbol}</td>
                    <td style={{ padding: 12, fontWeight: 700, color: t.direction === "LONG" ? "#4ade80" : "#f87171" }}>
                      {t.direction}
                    </td>
                    <td style={{ padding: 12 }}>{t.setupTag}</td>
                    <td style={{ padding: 12, fontWeight: 800, color: r >= 0 ? "#4ade80" : "#f87171" }}>
                      {r.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ border: "1px solid #222", borderRadius: 14, padding: 18 }}>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>No R-ready trades yet</div>
      <div style={{ opacity: 0.75, marginBottom: 12 }}>
        Для статистики в R потрібні <b>Stop Loss</b> і <b>Exit</b>. Додай першу завершену угоду.
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/trades/new">
          <button style={btn(true)}>+ Add trade</button>
        </Link>
        <Link href="/trades">
          <button style={btn()}>Open trades</button>
        </Link>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ border: "1px solid #222", borderRadius: 14, padding: 14 }}>
      <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function btn(primary = false): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: primary ? "#fff" : "transparent",
    color: primary ? "#111" : "inherit",
    fontWeight: 800,
    cursor: "pointer",
  };
}
