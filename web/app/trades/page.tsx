"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

type SideFilter = "ALL" | "LONG" | "SHORT";

export default function TradesPage() {
  const router = useRouter();
  const [trades, setTrades] = useState<Trade[]>([]);

  // filters
  const [q, setQ] = useState("");
  const [side, setSide] = useState<SideFilter>("ALL");
  const [setup, setSetup] = useState("ALL");

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const setupOptions = useMemo(() => {
    const s = new Set<string>();
    for (const t of trades) {
      const tag = (t.setupTag || "").trim();
      if (tag) s.add(tag);
    }
    return ["ALL", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [trades]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return trades.filter((t) => {
      if (side !== "ALL" && t.direction !== side) return false;
      if (setup !== "ALL" && (t.setupTag || "").trim() !== setup) return false;

      if (!query) return true;
      const hay = `${t.symbol} ${(t.setupTag || "")} ${(t.psychTags || []).join(",")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [trades, q, side, setup]);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Trades</h1>
          <div style={{ opacity: 0.7, fontSize: 13 }}>
            Click a trade to open details. R is calculated from Stop Loss + Exit.
          </div>
        </div>

        <Link href="/trades/new">
          <button style={btn(true)}>+ Add trade</button>
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search: ETHUSDT, breakout, FOMO..."
          style={input()}
        />

        <select value={side} onChange={(e) => setSide(e.target.value as SideFilter)} style={input()}>
          <option value="ALL">All sides</option>
          <option value="LONG">LONG</option>
          <option value="SHORT">SHORT</option>
        </select>

        <select value={setup} onChange={(e) => setSetup(e.target.value)} style={input()}>
          {setupOptions.map((x) => (
            <option key={x} value={x}>
              {x === "ALL" ? "All setups" : x}
            </option>
          ))}
        </select>
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div style={{ border: "1px solid #222", borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
            No trades found
          </div>
          <div style={{ opacity: 0.75, marginBottom: 12 }}>
            Try changing filters or add a new trade.
          </div>
          <Link href="/trades/new">
            <button style={btn(true)}>+ Add trade</button>
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 14 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #222" }}>
                <th style={th()}>Date</th>
                <th style={th()}>Pair</th>
                <th style={th()}>Side</th>
                <th style={th()}>Setup</th>
                <th style={th()}>Psych tags</th>
                <th style={th()}>R</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => {
                const r = tradeR(t);
                const rReady = r !== null;

                return (
                  <tr
                    key={t.id}
                    onClick={() => router.push(`/trades/${t.id}`)}
                    style={{
                      borderBottom: "1px solid #161616",
                      cursor: "pointer",
                      opacity: rReady ? 1 : 0.75,
                    }}
                    title="Open trade details"
                  >
                    <td style={td()}>{new Date(t.openedAt).toLocaleDateString()}</td>
                    <td style={td({ fontWeight: 800 })}>{t.symbol}</td>

                    <td
                      style={td({
                        fontWeight: 800,
                        color: t.direction === "LONG" ? "#4ade80" : "#f87171",
                      })}
                    >
                      {t.direction}
                    </td>

                    <td style={td()}>{t.setupTag || "—"}</td>

                    <td style={td({ opacity: 0.85 })}>
                      {(t.psychTags || []).length ? (t.psychTags || []).join(", ") : "—"}
                    </td>

                    <td
                      style={td({
                        fontWeight: 900,
                        color: rReady ? (r >= 0 ? "#4ade80" : "#f87171") : "#999",
                      })}
                    >
                      {rReady ? r.toFixed(2) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer hint */}
      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
        Tip: to make a trade “R-ready”, fill <b>Stop Loss</b> and <b>Exit</b>.
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

function btn(primary = false): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: primary ? "#fff" : "transparent",
    color: primary ? "#111" : "inherit",
    fontWeight: 900,
    cursor: "pointer",
  };
}

function input(): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #222",
    background: "transparent",
    color: "inherit",
    outline: "none",
  };
}

function th(): React.CSSProperties {
  return { padding: 12, fontSize: 12, opacity: 0.8, fontWeight: 800 };
}

function td(extra?: React.CSSProperties): React.CSSProperties {
  return { padding: 12, ...extra };
}
