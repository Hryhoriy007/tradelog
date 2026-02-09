"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { ui } from "@/app/components/ui/styles";

type SideFilter = "ALL" | "LONG" | "SHORT";

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}
function pct(n: number, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  // filters
  const [side, setSide] = useState<SideFilter>("ALL");
  const [setup, setSetup] = useState("ALL");
  const [onlyRReady, setOnlyRReady] = useState(true);

  // date filters (YYYY-MM-DD)
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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
    return trades.filter((t) => {
      if (side !== "ALL" && t.direction !== side) return false;
      if (setup !== "ALL" && (t.setupTag || "").trim() !== setup) return false;

      if (from) {
        const d = new Date(t.openedAt);
        const min = new Date(from + "T00:00:00");
        if (d < min) return false;
      }
      if (to) {
        const d = new Date(t.openedAt);
        const max = new Date(to + "T23:59:59");
        if (d > max) return false;
      }

      const r = tradeR(t);
      if (onlyRReady && r === null) return false;

      return true;
    });
  }, [trades, side, setup, from, to, onlyRReady]);

  const rReadyTrades = useMemo(() => filtered.filter((t) => tradeR(t) !== null), [filtered]);

  const stats = useMemo(() => {
    const rs = rReadyTrades.map((t) => tradeR(t) as number);
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

    const expectancy = n ? winrate * avgWinR + (1 - winrate) * avgLossR : 0;

    return { n, wins, losses, be, winrate, avgR, expectancy, profitFactor, avgWinR, avgLossR };
  }, [rReadyTrades]);

  const bySetup = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        n: number;
        wins: number;
        losses: number;
        sumR: number;
        sumWinR: number;
        sumLossR: number;
        winCount: number;
        lossCount: number;
      }
    >();

    for (const t of rReadyTrades) {
      const name = (t.setupTag || "—").trim() || "—";
      const r = tradeR(t) as number;

      if (!map.has(name)) {
        map.set(name, {
          name,
          n: 0,
          wins: 0,
          losses: 0,
          sumR: 0,
          sumWinR: 0,
          sumLossR: 0,
          winCount: 0,
          lossCount: 0,
        });
      }
      const x = map.get(name)!;
      x.n += 1;
      x.sumR += r;

      if (r > 0) {
        x.wins += 1;
        x.sumWinR += r;
        x.winCount += 1;
      } else if (r < 0) {
        x.losses += 1;
        x.sumLossR += r;
        x.lossCount += 1;
      }
    }

    const rows = Array.from(map.values()).map((x) => {
      const winrate = x.n ? x.wins / x.n : 0;
      const avgR = x.n ? x.sumR / x.n : 0;
      const avgWinR = x.winCount ? x.sumWinR / x.winCount : 0;
      const avgLossR = x.lossCount ? x.sumLossR / x.lossCount : 0;
      return { ...x, winrate, avgR, avgWinR, avgLossR };
    });

    rows.sort((a, b) => (b.n - a.n) || (b.avgR - a.avgR));
    return rows;
  }, [rReadyTrades]);

  const byPsych = useMemo(() => {
    const map = new Map<
      string,
      {
        tag: string;
        n: number;
        wins: number;
        losses: number;
        sumR: number;
        sumWinR: number;
        sumLossR: number;
        winCount: number;
        lossCount: number;
      }
    >();

    for (const t of rReadyTrades) {
      const r = tradeR(t) as number;
      const tags = Array.isArray(t.psychTags) ? t.psychTags : [];

      for (const raw of tags) {
        const tag = (raw || "").trim();
        if (!tag) continue;

        if (!map.has(tag)) {
          map.set(tag, {
            tag,
            n: 0,
            wins: 0,
            losses: 0,
            sumR: 0,
            sumWinR: 0,
            sumLossR: 0,
            winCount: 0,
            lossCount: 0,
          });
        }
        const x = map.get(tag)!;
        x.n += 1;
        x.sumR += r;

        if (r > 0) {
          x.wins += 1;
          x.sumWinR += r;
          x.winCount += 1;
        } else if (r < 0) {
          x.losses += 1;
          x.sumLossR += r;
          x.lossCount += 1;
        }
      }
    }

    const rows = Array.from(map.values()).map((x) => {
      const winrate = x.n ? x.wins / x.n : 0;
      const avgR = x.n ? x.sumR / x.n : 0;
      const avgWinR = x.winCount ? x.sumWinR / x.winCount : 0;
      const avgLossR = x.lossCount ? x.sumLossR / x.lossCount : 0;
      return { ...x, winrate, avgR, avgWinR, avgLossR };
    });

    rows.sort((a, b) => (b.n - a.n) || (b.avgR - a.avgR));
    return rows;
  }, [rReadyTrades]);

  return (
    <Page>
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 6 }}>Stats</h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            Stats are calculated from <b>R-ready</b> trades (Stop Loss + Exit).
          </div>
        </div>

        <Row>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/trades">
            <Button>Trades</Button>
          </Link>
          <Link href="/trades/new">
            <Button variant="primary">+ Add trade</Button>
          </Link>
        </Row>
      </HeaderRow>

      {/* Filters */}
      <Card title="Filters">
        <div style={filtersGrid}>
          <div style={fieldWrap}>
            <div style={label()}>Side</div>
            <Select value={side} onChange={(e) => setSide(e.target.value as SideFilter)} style={{ minWidth: 0 }}>
              <option value="ALL">All</option>
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </Select>
          </div>

          <div style={fieldWrap}>
            <div style={label()}>Setup</div>
            <Select value={setup} onChange={(e) => setSetup(e.target.value)} style={{ minWidth: 0 }}>
              {setupOptions.map((x) => (
                <option key={x} value={x}>
                  {x === "ALL" ? "All setups" : x}
                </option>
              ))}
            </Select>
          </div>

          <div style={fieldWrap}>
            <div style={label()}>From</div>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={{ minWidth: 0 }} />
          </div>

          <div style={fieldWrap}>
            <div style={label()}>To</div>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={{ minWidth: 0 }} />
          </div>
        </div>

        <Row style={{ marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 900 }}>
            <input
              type="checkbox"
              checked={onlyRReady}
              onChange={(e) => setOnlyRReady(e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            Only R-ready
          </label>

          <div style={{ opacity: 0.75, fontSize: 13 }}>
            Matching trades: <b>{filtered.length}</b> · R-ready: <b>{rReadyTrades.length}</b>
          </div>

          <div style={{ flex: 1 }} />

          <Button
            onClick={() => {
              setSide("ALL");
              setSetup("ALL");
              setFrom("");
              setTo("");
              setOnlyRReady(true);
            }}
          >
            Reset
          </Button>
        </Row>
      </Card>

      {/* Key metrics */}
      <div
        style={{
          marginTop: 14,
          display: "grid",
          gap: 14,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <Metric title="Trades (R-ready)" value={String(stats.n)} />
        <Metric title="Winrate" value={pct(stats.winrate, 1)} />
        <Metric title="Avg R" value={fmt(stats.avgR, 2)} />
        <Metric title="Expectancy" value={fmt(stats.expectancy, 2)} />
        <Metric title="Profit Factor" value={fmt(stats.profitFactor, 2)} />
        <Metric title="Avg Win R" value={fmt(stats.avgWinR, 2)} />
        <Metric title="Avg Loss R" value={fmt(stats.avgLossR, 2)} />
        <Metric title="Wins / Losses / BE" value={`${stats.wins} / ${stats.losses} / ${stats.be}`} />
      </div>

      {/* By setup */}
      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: "8px 0 10px" }}>By setup</h2>

        <Card>
          <div style={{ ...ui.tableWrap, overflowX: "auto" }}>
            <table style={ui.table}>
              <thead>
                <tr>
                  <th style={ui.th}>Setup</th>
                  <th style={ui.th}>Trades</th>
                  <th style={ui.th}>Winrate</th>
                  <th style={ui.th}>Avg R</th>
                  <th style={ui.th}>Avg Win</th>
                  <th style={ui.th}>Avg Loss</th>
                </tr>
              </thead>

              <tbody>
                {bySetup.length === 0 ? (
                  <tr>
                    <td style={{ ...ui.td, opacity: 0.7 }} colSpan={6}>
                      No R-ready trades in this filter.
                    </td>
                  </tr>
                ) : (
                  bySetup.map((x) => (
                    <tr key={x.name}>
                      <td style={{ ...ui.td, fontWeight: 900, whiteSpace: "nowrap" }}>{x.name}</td>
                      <td style={ui.td}>{x.n}</td>
                      <td style={ui.td}>{pct(x.winrate, 1)}</td>
                      <td style={{ ...ui.td, fontWeight: 900 }}>{fmt(x.avgR, 2)}</td>
                      <td style={ui.td}>{fmt(x.avgWinR, 2)}</td>
                      <td style={ui.td}>{fmt(x.avgLossR, 2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* By psych tags */}
      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: "8px 0 10px" }}>By psych tags</h2>

        <Card>
          <div style={{ ...ui.tableWrap, overflowX: "auto" }}>
            <table style={ui.table}>
              <thead>
                <tr>
                  <th style={ui.th}>Tag</th>
                  <th style={ui.th}>Trades</th>
                  <th style={ui.th}>Winrate</th>
                  <th style={ui.th}>Avg R</th>
                  <th style={ui.th}>Avg Win</th>
                  <th style={ui.th}>Avg Loss</th>
                </tr>
              </thead>

              <tbody>
                {byPsych.length === 0 ? (
                  <tr>
                    <td style={{ ...ui.td, opacity: 0.7 }} colSpan={6}>
                      No psych-tagged R-ready trades in this filter.
                    </td>
                  </tr>
                ) : (
                  byPsych.map((x) => (
                    <tr key={x.tag}>
                      <td style={{ ...ui.td, fontWeight: 900, whiteSpace: "nowrap" }}>{x.tag}</td>
                      <td style={ui.td}>{x.n}</td>
                      <td style={ui.td}>{pct(x.winrate, 1)}</td>
                      <td style={{ ...ui.td, fontWeight: 900 }}>{fmt(x.avgR, 2)}</td>
                      <td style={ui.td}>{fmt(x.avgWinR, 2)}</td>
                      <td style={ui.td}>{fmt(x.avgLossR, 2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
        Tip: If stats look empty — fill <b>Stop Loss</b> + <b>Exit</b> in trades (R-ready).
      </div>
    </Page>
  );
}

/* ----------------- styles ----------------- */

const filtersGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
  alignItems: "end",
};

const fieldWrap: React.CSSProperties = {
  minWidth: 0,
};

function label(): React.CSSProperties {
  return { fontSize: 12, fontWeight: 900, opacity: 0.8, marginBottom: 6 };
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 34, fontWeight: 900, marginTop: 6 }}>{value}</div>
    </Card>
  );
}
