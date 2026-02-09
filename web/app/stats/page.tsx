"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row, Grid2 } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Select } from "@/app/components/ui/Select";
import { Input } from "@/app/components/ui/Input";
import { Field } from "@/app/components/ui/Field";
import { ui } from "@/app/components/ui/styles";

type Side = "ALL" | "LONG" | "SHORT";
type RangeKey = "ALL" | "30" | "7";

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}
function pct(n: number, digits = 0) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

function toDateInput(iso: string) {
  const d = new Date(iso);
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function isoDayStart(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0).toISOString();
}
function isoDayEnd(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d, 23, 59, 59, 999).toISOString();
}

function tradeDateIso(t: any) {
  return (t?.openedAt ?? t?.date ?? t?.createdAt ?? null) as string | null;
}
function normSide(x: any): "LONG" | "SHORT" | null {
  const v = String(x ?? "").toUpperCase();
  if (v === "LONG") return "LONG";
  if (v === "SHORT") return "SHORT";
  return null;
}
function normPair(x: any) {
  return String(x ?? "").trim().toUpperCase();
}
function normSetup(x: any) {
  return String(x ?? "").trim();
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/** ---------- Chart: Histogram (R distribution) ---------- */
function RHistogram({
  rs,
  bins = 18,
  min = -5,
  max = 5,
}: {
  rs: number[];
  bins?: number;
  min?: number;
  max?: number;
}) {
  const W = 680;
  const H = 220;
  const padL = 34;
  const padR = 14;
  const padT = 10;
  const padB = 28;

  const data = useMemo(() => {
    const width = max - min;
    const binSize = width / bins;
    const counts = new Array(bins).fill(0);

    for (const r0 of rs) {
      const r = clamp(r0, min, max);
      let idx = Math.floor((r - min) / binSize);
      if (idx < 0) idx = 0;
      if (idx >= bins) idx = bins - 1;
      counts[idx] += 1;
    }

    const peak = Math.max(1, ...counts);
    return { counts, peak, binSize };
  }, [rs, bins, min, max]);

  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const barW = plotW / bins;

  // zero line x position (R=0)
  const zeroX = padL + ((0 - min) / (max - min)) * plotW;

  const xLabel = (x: number) => {
    // show fewer labels
    const v = min + x * (max - min);
    return v.toFixed(0);
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        {/* background */}
        <rect x="0" y="0" width={W} height={H} rx="14" ry="14" fill="rgba(255,255,255,0.01)" />
        {/* grid lines */}
        {[0.25, 0.5, 0.75].map((t) => {
          const y = padT + plotH * (1 - t);
          return (
            <line
              key={t}
              x1={padL}
              x2={W - padR}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}
        {/* zero line */}
        <line
          x1={zeroX}
          x2={zeroX}
          y1={padT}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />

        {/* bars */}
        {data.counts.map((c, i) => {
          const h = (c / data.peak) * plotH;
          const x = padL + i * barW + 2;
          const y = padT + (plotH - h);
          const w = Math.max(2, barW - 4);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="6"
              fill="rgba(255,255,255,0.16)"
            />
          );
        })}

        {/* y labels (count) */}
        <text x={padL - 8} y={padT + 10} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="11">
          {data.peak}
        </text>
        <text
          x={padL - 8}
          y={padT + plotH + 4}
          textAnchor="end"
          fill="rgba(255,255,255,0.55)"
          fontSize="11"
        >
          0
        </text>

        {/* x labels */}
        {Array.from({ length: 5 }).map((_, k) => {
          const t = k / 4; // 0..1
          const x = padL + t * plotW;
          const v = min + t * (max - min);
          return (
            <g key={k}>
              <line
                x1={x}
                x2={x}
                y1={padT + plotH}
                y2={padT + plotH + 6}
                stroke="rgba(255,255,255,0.12)"
              />
              <text
                x={x}
                y={padT + plotH + 22}
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="11"
              >
                {v.toFixed(0)}R
              </text>
            </g>
          );
        })}

        {/* title hint */}
        <text x={padL} y={H - 8} fill="rgba(255,255,255,0.45)" fontSize="11">
          Range: {min}R…{max}R (clamped), bins: {bins}
        </text>
      </svg>
    </div>
  );
}

/** ---------- Chart: Win/Loss/BE stacked bar ---------- */
function WinLossBar({ wins, losses, be }: { wins: number; losses: number; be: number }) {
  const total = Math.max(1, wins + losses + be);
  const wPct = (wins / total) * 100;
  const lPct = (losses / total) * 100;
  const bPct = (be / total) * 100;

  const barStyle: React.CSSProperties = {
    height: 14,
    borderRadius: 999,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    display: "flex",
  };

  const seg = (pct: number, fill: string) => ({
    width: `${pct}%`,
    background: fill,
  });

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={barStyle} title="Win / Loss / BE distribution">
        <div style={seg(wPct, "rgba(255,255,255,0.22)")} />
        <div style={seg(lPct, "rgba(255,255,255,0.10)")} />
        <div style={seg(bPct, "rgba(255,255,255,0.06)")} />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 13 }}>
        <span style={{ opacity: 0.85 }}>
          <b>Win</b>: {wins} ({pct(wPct, 0)})
        </span>
        <span style={{ opacity: 0.85 }}>
          <b>Loss</b>: {losses} ({pct(lPct, 0)})
        </span>
        <span style={{ opacity: 0.85 }}>
          <b>BE</b>: {be} ({pct(bPct, 0)})
        </span>
      </div>

      <div style={{ opacity: 0.6, fontSize: 12 }}>
        Порада: якщо Win rate високий, але Avg R низький — значить профіт маленький, лоси великі.
      </div>
    </div>
  );
}

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  // filters
  const [range, setRange] = useState<RangeKey>("ALL");
  const [pair, setPair] = useState<string>("ALL");
  const [side, setSide] = useState<Side>("ALL");
  const [setup, setSetup] = useState<string>("ALL");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  // quick ranges -> set from/to
  useEffect(() => {
    if (range === "ALL") return;
    const now = new Date();
    const days = range === "7" ? 7 : 30;
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    setFrom(toDateInput(start.toISOString()));
    setTo(toDateInput(now.toISOString()));
  }, [range]);

  const pairs = useMemo(() => {
    const set = new Set<string>();
    for (const t of trades as any[]) {
      const p = normPair(t?.symbol ?? t?.pair);
      if (p) set.add(p);
    }
    return ["ALL", ...Array.from(set).sort()];
  }, [trades]);

  const setups = useMemo(() => {
    const set = new Set<string>();
    for (const t of trades as any[]) {
      const s = normSetup(t?.setupTag ?? t?.setup);
      if (s) set.add(s);
    }
    return ["ALL", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [trades]);

  const filtered = useMemo(() => {
    const fromIso = from ? isoDayStart(from) : null;
    const toIso = to ? isoDayEnd(to) : null;

    return (trades as any[]).filter((t) => {
      const p = normPair(t?.symbol ?? t?.pair);
      const s = normSide(t?.direction ?? t?.side);
      const st = normSetup(t?.setupTag ?? t?.setup);

      if (pair !== "ALL" && p !== pair) return false;
      if (side !== "ALL" && s !== side) return false;
      if (setup !== "ALL" && st !== setup) return false;

      const dIso = tradeDateIso(t);
      if (!dIso) return true;

      const di = new Date(dIso).toISOString();
      if (fromIso && di < fromIso) return false;
      if (toIso && di > toIso) return false;

      return true;
    });
  }, [trades, pair, side, setup, from, to]);

  const rs = useMemo(() => {
    return filtered.map((t) => tradeR(t)).filter((x) => Number.isFinite(x)) as number[];
  }, [filtered]);

  const summary = useMemo(() => {
    const total = rs.reduce((a, b) => a + b, 0);
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? total / rs.length : 0;
    return { count: rs.length, total, avg, winRate, wins, losses, be };
  }, [rs]);

  const topSetups = useMemo(() => {
    const map = new Map<
      string,
      { setup: string; n: number; total: number; wins: number; losses: number; be: number }
    >();

    for (const t of filtered as any[]) {
      const st = normSetup(t?.setupTag ?? t?.setup) || "(no setup)";
      const r = tradeR(t);
      if (!Number.isFinite(r)) continue;

      const cur = map.get(st) ?? { setup: st, n: 0, total: 0, wins: 0, losses: 0, be: 0 };
      cur.n += 1;
      cur.total += r;
      if (r > 0) cur.wins += 1;
      else if (r < 0) cur.losses += 1;
      else cur.be += 1;
      map.set(st, cur);
    }

    const rows = Array.from(map.values()).map((x) => {
      const avg = x.n ? x.total / x.n : 0;
      const winRate = x.n ? (x.wins / x.n) * 100 : 0;
      return { ...x, avg, winRate };
    });

    rows.sort((a, b) => b.avg - a.avg || b.n - a.n);
    return rows.slice(0, 12);
  }, [filtered]);

  const lastTrades = useMemo(() => {
    const ordered = [...filtered].sort((a: any, b: any) => {
      const da = new Date(tradeDateIso(a) ?? 0).getTime();
      const db = new Date(tradeDateIso(b) ?? 0).getTime();
      return db - da;
    });
    return ordered.slice(0, 12);
  }, [filtered]);

  const titleHint = (text: string) => ({ title: text, style: { cursor: "help" as const } });

  return (
    <Page>
      <HeaderRow
        title="Stats"
        subtitle="Filters + charts + top setups by Avg R"
        right={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Dashboard</Button>
            </Link>
            <Link href="/trades" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Trades</Button>
            </Link>
            <Link href="/trades/new" style={{ textDecoration: "none" }}>
              <Button>Add trade</Button>
            </Link>
          </div>
        }
      />

      {/* Filters */}
      <Card title="Filters" subtitle="Pair / side / setup / date range">
        <div style={{ display: "grid", gap: 12 }}>
          <Row style={{ gap: 8 }}>
            <Button
              variant={range === "ALL" ? "primary" : "secondary"}
              onClick={() => {
                setRange("ALL");
                setFrom("");
                setTo("");
              }}
              {...titleHint("Без обмеження по даті")}
            >
              All
            </Button>
            <Button variant={range === "30" ? "primary" : "secondary"} onClick={() => setRange("30")} {...titleHint("Останні 30 днів")}>
              Last 30
            </Button>
            <Button variant={range === "7" ? "primary" : "secondary"} onClick={() => setRange("7")} {...titleHint("Останні 7 днів")}>
              Last 7
            </Button>

            <div style={{ marginLeft: "auto", ...ui.subtle, fontSize: 13 }}>
              Showing <b>{filtered.length}</b> trades
            </div>
          </Row>

          <Grid2>
            <Field label="Pair">
              <Select value={pair} onChange={(e) => setPair(e.target.value)}>
                {pairs.map((p) => (
                  <option key={p} value={p}>
                    {p === "ALL" ? "All pairs" : p}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Side">
              <Select value={side} onChange={(e) => setSide(e.target.value as Side)}>
                <option value="ALL">All</option>
                <option value="LONG">Long</option>
                <option value="SHORT">Short</option>
              </Select>
            </Field>

            <Field label="Setup">
              <Select value={setup} onChange={(e) => setSetup(e.target.value)}>
                {setups.map((s) => (
                  <option key={s} value={s}>
                    {s === "ALL" ? "All setups" : s}
                  </option>
                ))}
              </Select>
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="From">
                <Input
                  type="date"
                  value={from}
                  onChange={(e) => {
                    setRange("ALL");
                    setFrom(e.target.value);
                  }}
                />
              </Field>

              <Field label="To">
                <Input
                  type="date"
                  value={to}
                  onChange={(e) => {
                    setRange("ALL");
                    setTo(e.target.value);
                  }}
                />
              </Field>
            </div>
          </Grid2>
        </div>
      </Card>

      {/* Summary */}
      <Row cols={4} style={{ marginTop: 14 }}>
        <Card title="Total R" subtitle="Сумарно" right={<span style={{ fontWeight: 800 }}>{fmt(summary.total, 2)}R</span>} />
        <Card title="Avg R" subtitle="Середнє за угоду" right={<span style={{ fontWeight: 800 }}>{fmt(summary.avg, 2)}R</span>} />
        <Card title="Win rate" subtitle="Відсоток Win" right={<span style={{ fontWeight: 800 }}>{pct(summary.winRate, 1)}</span>} />
        <Card title="W / L / BE" subtitle="Розподіл" right={<span style={{ fontWeight: 800 }}>{summary.wins} / {summary.losses} / {summary.be}</span>} />
      </Row>

      {/* Charts */}
      <Row cols={2} style={{ marginTop: 14 }}>
        <Card
          title="R distribution"
          subtitle="Гістограма результатів у R (обрізаємо в діапазоні -5..+5)"
        >
          {rs.length === 0 ? (
            <div style={{ opacity: 0.7 }}>Немає даних під ці фільтри.</div>
          ) : (
            <RHistogram rs={rs} bins={18} min={-5} max={5} />
          )}
        </Card>

        <Card title="Win / Loss / BE" subtitle="Розподіл результатів">
          <WinLossBar wins={summary.wins} losses={summary.losses} be={summary.be} />
        </Card>
      </Row>

      {/* Top setups + filtered trades */}
      <Row cols={2} style={{ marginTop: 14 }}>
        <Card title="Top setups by Avg R" subtitle="Рейтинг сетапів (фільтри застосовані)">
          {topSetups.length === 0 ? (
            <div style={{ opacity: 0.7 }}>Немає даних для таблиці. Додай трейди або зміни фільтри.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                <thead>
                  <tr style={{ textAlign: "left", opacity: 0.7, fontSize: 12 }}>
                    <th style={{ padding: "0 10px" }}>Setup</th>
                    <th style={{ padding: "0 10px" }}>Trades</th>
                    <th style={{ padding: "0 10px" }}>Avg R</th>
                    <th style={{ padding: "0 10px" }}>Total R</th>
                    <th style={{ padding: "0 10px" }}>Win rate</th>
                    <th style={{ padding: "0 10px" }}>W/L/BE</th>
                  </tr>
                </thead>
                <tbody>
                  {topSetups.map((r) => (
                    <tr key={r.setup} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <td style={{ padding: "10px 10px", fontWeight: 800 }}>{r.setup}</td>
                      <td style={{ padding: "10px 10px" }}>{r.n}</td>
                      <td style={{ padding: "10px 10px", fontWeight: 800 }}>{fmt(r.avg, 2)}R</td>
                      <td style={{ padding: "10px 10px" }}>{fmt(r.total, 2)}R</td>
                      <td style={{ padding: "10px 10px" }}>{pct(r.winRate, 1)}</td>
                      <td style={{ padding: "10px 10px" }}>{r.wins}/{r.losses}/{r.be}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card title="Filtered trades" subtitle="Останні угоди за фільтром">
          {lastTrades.length === 0 ? (
            <div style={{ opacity: 0.7 }}>Немає угод під ці фільтри.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {lastTrades.map((t: any) => {
                const r = tradeR(t);
                const date = tradeDateIso(t) ?? "—";
                const p = normPair(t?.symbol ?? t?.pair) || "—";
                const s = normSide(t?.direction ?? t?.side) || "—";
                const st = normSetup(t?.setupTag ?? t?.setup) || "—";

                return (
                  <Link key={t.id} href={`/trades/${t.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: 10,
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                      title="Open trade"
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, lineHeight: 1.2 }}>
                          {p} • {s} • {st}
                        </div>
                        <div style={{ opacity: 0.7, fontSize: 13 }}>{date}</div>
                      </div>

                      <div style={{ fontWeight: 900, whiteSpace: "nowrap" }}>
                        {Number.isFinite(r) ? `${fmt(r, 2)}R` : "—"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Card>
      </Row>
    </Page>
  );
}
