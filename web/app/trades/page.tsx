"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTrades } from "@/lib/tradeStore";

type Trade = ReturnType<typeof getTrades>[number];

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Trades</h1>
        <Link href="/trades/new">
          <button style={{ padding: "10px 16px", borderRadius: 10 }}>
            + Add trade
          </button>
        </Link>
      </div>

      {trades.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No trades yet. Add your first trade.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #333" }}>
                <th>Date</th>
                <th>Pair</th>
                <th>Side</th>
                <th>R</th>
                <th>Setup</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => {
                const r =
                  t.stopLoss && t.exit
                    ? ((t.direction === "LONG"
                        ? t.exit - t.entry
                        : t.entry - t.exit) /
                      (t.direction === "LONG"
                        ? t.entry - t.stopLoss
                        : t.stopLoss - t.entry))
                    : null;

                return (
                  <tr key={t.id} style={{ borderBottom: "1px solid #222" }}>
                    <td>{new Date(t.openedAt).toLocaleDateString()}</td>
                    <td>{t.symbol}</td>
                    <td style={{ color: t.direction === "LONG" ? "#4ade80" : "#f87171" }}>
                      {t.direction}
                    </td>
                    <td style={{ color: r && r >= 0 ? "#4ade80" : "#f87171" }}>
                      {r ? r.toFixed(2) : "—"}
                    </td>
                    <td>{t.setupTag}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
