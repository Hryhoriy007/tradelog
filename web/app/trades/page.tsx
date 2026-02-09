"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row, Grid2 } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { ui } from "@/app/components/ui/styles";

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
    <Page>
      {/* Header */}
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>Trades</h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            Click a trade to open details. R is calculated from <b>Stop Loss</b> + <b>Exit</b>.
          </div>
        </div>

        <Link href="/trades/new">
          <Button variant="primary">+ Add trade</Button>
        </Link>
      </HeaderRow>

      {/* Filters */}
      <Row style={{ marginBottom: 14, alignItems: "center" }}>
        <div style={{ flex: 2, minWidth: 260 }}>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search: ETHUSDT, breakout, FOMO..."
          />
        </div>

        <div style={{ flex: 1, minWidth: 180 }}>
          <Select value={side} onChange={(e) => setSide(e.target.value as SideFilter)}>
            <option value="ALL">All sides</option>
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </Select>
        </div>

        <div style={{ flex: 1, minWidth: 180 }}>
          <Select value={setup} onChange={(e) => setSetup(e.target.value)}>
            {setupOptions.map((x) => (
              <option key={x} value={x}>
                {x === "ALL" ? "All setups" : x}
              </option>
            ))}
          </Select>
        </div>
      </Row>

      {/* Empty */}
      {filtered.length === 0 ? (
        <Card>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>No trades found</div>
          <div style={{ opacity: 0.75, marginBottom: 14 }}>
            Try changing filters or add a new trade.
          </div>
          <Link href="/trades/new">
            <Button variant="primary">+ Add trade</Button>
          </Link>
        </Card>
      ) : (
        <Card>
          <div style={ui.tableWrap}>
            <table style={ui.table}>
              <thead>
                <tr>
                  <th style={ui.th}>Date</th>
                  <th style={ui.th}>Pair</th>
                  <th style={ui.th}>Side</th>
                  <th style={ui.th}>Setup</th>
                  <th style={ui.th}>Psych tags</th>
                  <th style={ui.th}>R</th>
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
                        cursor: "pointer",
                        opacity: rReady ? 1 : 0.7,
                      }}
                      title="Open trade details"
                    >
                      <td style={ui.td}>{new Date(t.openedAt).toLocaleDateString()}</td>

                      <td style={{ ...ui.td, fontWeight: 900 }}>{t.symbol}</td>

                      <td
                        style={{
                          ...ui.td,
                          fontWeight: 900,
                          color: t.direction === "LONG" ? "#4ade80" : "#f87171",
                        }}
                      >
                        {t.direction}
                      </td>

                      <td style={ui.td}>{t.setupTag || "—"}</td>

                      <td style={{ ...ui.td, opacity: 0.85 }}>
                        {(t.psychTags || []).length ? (t.psychTags || []).join(", ") : "—"}
                      </td>

                      <td
                        style={{
                          ...ui.td,
                          fontWeight: 900,
                          color: rReady ? (r! >= 0 ? "#4ade80" : "#f87171") : "#999",
                        }}
                      >
                        {rReady ? r!.toFixed(2) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Footer hint */}
      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
        Tip: to make a trade “R-ready”, fill <b>Stop Loss</b> and <b>Exit</b>.
      </div>
    </Page>
  );
}
