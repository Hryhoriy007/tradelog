"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ui } from "@/app/components/ui/styles";

type RTrade = Trade & { _r: number | null };

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}

function pct(n: number, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const computed = useMemo<RTrade[]>(() => {
    return trades.map((t) => ({ ...t, _r: tradeR(t) }));
  }, [trades]);

  const rReady = useMemo(() => computed.filter((t) => t._r !== null), [computed]);

  const stats = useMemo(() => {
    const rs = rReady.map((t) => t._r as number);

    const n = rs.length;
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.filter((x) => x === 0).length;

    const winrate = n ? wins / n : 0;

    const avgR = n ? rs.reduce((a, b) => a + b, 0) / n : 0;

    const winRs = rs.filter((x) => x > 0);
    const lossRs = rs.filter((x) => x < 0);

    const avgWinR = winRs.length ? winRs.reduce((a, b) => a + b, 0) / winRs.length : 0;
    const avgLossR = lossRs.length ? lossRs.reduce((a, b) => a + b, 0) / lossRs.length : 0;

    const grossProfit = winRs.reduce((a, b) => a + b, 0);
    const grossLossAbs = Math.abs(lossRs.reduce((a, b) => a + b, 0));

    const profitFactor = grossLossAbs > 0 ? grossProfit / grossLossAbs : grossProfit > 0 ? 99 : 0;

    // expectancy in R:
    // E = winrate * avgWinR + (1-winrate) * avgLossR
    const expectancy = n ? winrate * avgWinR + (1 - winrate) * avgLossR : 0;

    // streaks (based on win/loss only; BE breaks streak)
    let bestWinStreak = 0;
    let bestLossStreak = 0;
    let curWin = 0;
    let curLoss = 0;

    for (const r of rs) {
      if (r > 0) {
        curWin += 1;
        curLoss = 0;
      } else if (r < 0) {
        curLoss += 1;
        curWin = 0;
      } else {
        curWin = 0;
        curLoss = 0;
      }
      if (curWin > bestWinStreak) bestWinStreak = curWin;
      if (curLoss > bestLossStreak) bestLossStreak = curLoss;
    }

    return {
      tradesRReady: n,
      wins,
      losses,
      be,
      winrate,
      avgR,
      expectancy,
      profitFactor,
      avgWinR,
      avgLossR,
      bestWinStreak,
      bestLossStreak,
    };
  }, [rReady]);

  const lastTrades = useMemo(() => {
    return [...computed]
      .sort((a, b) => (b.openedAt || "").localeCompare(a.openedAt || ""))
      .slice(0, 7);
  }, [computed]);

  return (
    <Page>
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 6 }}>Dashboard</h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            Your performance, discipline and edge — in <b>R</b>.
          </div>
        </div>

        <Row style={{ alignItems: "center" }}>
          <Link href="/trades">
            <Button>Trades</Button>
          </Link>
          <Link href="/trades/new">
            <Button variant="primary">+ Add trade</Button>
          </Link>
          <Link href="/stats">
            <Button>Stats</Button>
          </Link>
        </Row>
      </HeaderRow>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Trades (R-ready)</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{stats.tradesRReady}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Winrate</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{pct(stats.winrate, 1)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Avg R</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{fmt(stats.avgR, 2)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Expectancy</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{fmt(stats.expectancy, 2)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Profit Factor</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{fmt(stats.profitFactor, 2)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Avg Win R</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{fmt(stats.avgWinR, 2)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Avg Loss R</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{fmt(stats.avgLossR, 2)}</div>
        </Card>

        <Card>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Wins / Losses / BE</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>
            {stats.wins} / {stats.losses} / {stats.be}
          </div>
        </Card>

        <Card style={{ gridColumn: "span 2" }}>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Best win streak</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{stats.bestWinStreak}</div>
        </Card>

        <Card style={{ gridColumn: "span 2" }}>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>Best loss streak</div>
          <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{stats.bestLossStreak}</div>
        </Card>
      </div>

      {/* Last trades */}
      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: "8px 0 10px" }}>Last trades</h2>

        <Card>
          <div style={ui.tableWrap}>
            <table style={ui.table}>
              <thead>
                <tr>
                  <th style={ui.th}>Date</th>
                  <th style={ui.th}>Pair</th>
                  <th style={ui.th}>Side</th>
                  <th style={ui.th}>Setup</th>
                  <th style={ui.th}>R</th>
                </tr>
              </thead>
              <tbody>
                {lastTrades.length === 0 ? (
                  <tr>
                    <td style={{ ...ui.td, opacity: 0.7 }} colSpan={5}>
                      No trades yet. Add your first trade.
                    </td>
                  </tr>
                ) : (
                  lastTrades.map((t) => {
                    const r = t._r;
                    const rReady = r !== null;

                    return (
                      <tr
                        key={t.id}
                        onClick={() => (window.location.href = `/trades/${t.id}`)}
                        style={{ cursor: "pointer", opacity: rReady ? 1 : 0.7 }}
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
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
        Tip: Dashboard uses only <b>R-ready</b> trades for stats (Stop Loss + Exit).
      </div>
    </Page>
  );
}
