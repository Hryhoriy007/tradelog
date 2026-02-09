"use client";

import { useEffect, useMemo, useState } from "react";
import { getTrades, type Trade } from "@/lib/tradeStore";
import { computeStats } from "@/lib/stats";

function pct(x: number) {
  return `${(x * 100).toFixed(1)}%`;
}

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const stats = useMemo(() => computeStats(trades), [trades]);

  const setupRows = Object.entries(stats.bySetup)
    .map(([k, v]) => ({ k, ...v }))
    .sort((a, b) => b.n - a.n);

  const psychRows = Object.entries(stats.byPsych)
    .map(([k, v]) => ({ k, ...v }))
    .sort((a, b) => b.n - a.n);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Stats (R-based)</h1>

      {stats.count === 0 ? (
        <p style={{ opacity: 0.7 }}>
          Немає угод з розрахунком R (потрібні Stop Loss + Exit). Додай хоча б одну завершену угоду.
        </p>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
            <Card title="Trades (R-ready)" value={String(stats.count)} />
            <Card title="Winrate" value={pct(stats.winrate)} />
            <Card title="Avg R" value={stats.avgR.toFixed(2)} />
            <Card title="Expectancy" value={stats.expectancy.toFixed(2)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
            <Card title="Wins / Losses / BE" value={`${stats.wins} / ${stats.losses} / ${stats.bes}`} />
            <Card title="Avg Win R" value={stats.avgWinR.toFixed(2)} />
            <Card title="Avg Loss R" value={stats.avgLossR.toFixed(2)} />
            <Card title="Profit Factor" value={stats.profitFactor === Infinity ? "∞" : stats.profitFactor.toFixed(2)} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 18 }}>
            <Card title="Best win streak" value={String(stats.bestWinStreak)} />
            <Card title="Best loss streak" value={String(stats.bestLoseStreak)} />
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "20px 0 10px" }}>By setup</h2>
          {setupRows.length === 0 ? <p style={{ opacity: 0.7 }}>No setup tags yet.</p> : <Table rows={setupRows} />}

          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "20px 0 10px" }}>By psych tags</h2>
          {psychRows.length === 0 ? <p style={{ opacity: 0.7 }}>No psych tags yet.</p> : <Table rows={psychRows} />}
        </>
      )}
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

function Table({ rows }: { rows: { k: string; n: number; winrate: number; avgR: number }[] }) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #222" }}>
            <th style={{ padding: 12 }}>Tag</th>
            <th style={{ padding: 12 }}>N</th>
            <th style={{ padding: 12 }}>Winrate</th>
            <th style={{ padding: 12 }}>Avg R</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} style={{ borderBottom: "1px solid #161616" }}>
              <td style={{ padding: 12 }}>{r.k}</td>
              <td style={{ padding: 12 }}>{r.n}</td>
              <td style={{ padding: 12 }}>{(r.winrate * 100).toFixed(1)}%</td>
              <td style={{ padding: 12 }}>{r.avgR.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
