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
  // yyyy-mm-dd -> ISO at 00:00 local
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d, 0, 0, 0, 0);
  return dt.toISOString();
}

function isoDayEnd(dateStr: string) {
  // yyyy-mm-dd -> ISO at 23:59:59 local
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d, 23, 59, 59, 999);
  return dt.toISOString();
}

function tradeDateIso(t: any) {
  // prefer openedAt then date then createdAt
  return (t?.openedAt ?? t?.date ?? t?.createdAt ?? null) as string | null;
}

function normSide(x: any): "LONG" | "SHORT" | null {
  const v = String(x ?? "").toUpperCase();
  if (v === "LONG") return "LONG";
  if (v === "SHORT") return "SHORT";
  // legacy values
  if (v === "LONG ") return "LONG";
  if (v === "SHORT ") return "SHORT";
  return null;
}

function normPair(x: any) {
  return String(x ?? "").trim().toUpperCase();
}

function normSetup(x: any) {
  return String(x ?? "").trim();
}

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  // filters
  const [range, setRange] = useState<RangeKey>("ALL");
  const [pair, setPair] = useState<string>("ALL");
  const [side, setSide] = useState<Side>("ALL");
  const [setup, setSetup] = useState<string>("ALL");
  const [from, setFrom] = useState<string>(""); // yyyy-mm-dd
  const [to, setTo] = useState<string>(""); // yyyy-mm-dd

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

      if (fromIso && new Date(dIso).toISOString() < fromIso) return false;
      if (toIso && new Date(dIso).toISOString() > toIso) return false;

      return true;
    });
  }, [trades, pair, side, setup, from, to]);

  const summary = useMemo(() => {
    const rs = filtered.map((t) => tradeR(t)).filter((x) => Number.isFinite(x));
    const total = rs.reduce((a, b) => a + b, 0);
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? total / rs.length : 0;
    return { count: rs.length, total, avg, winRate, wins, losses, be };
  }, [filtered]);

  const topSetups = useMemo(() => {
    const map = new Map<
      string,
      { setup: string; n: number; total: number; wins: number; losses: number; be: number }
    >();

    for (const t of filtered as any[]) {
      const st = normSetup(t?.setupTag ?? t?.setup) || "(no setup)";
      const r = tradeR(t);
      if (!Number.isFinite(r)) continue;

      const cur =
        map.get(st) ??
        { setup: st, n: 0, total: 0, wins: 0, losses: 0, be: 0 };

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

    // sort by avg desc, then trades desc
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

  const titleHint = (text: string) => ({
    title: text,
    style: { cursor: "help" as const },
  });

  return (
    <Page>
      <HeaderRow
        title="Stats"
        subtitle="Filters + top setups by Avg R"
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
            <Button
              variant={range === "30" ? "primary" : "secondary"}
              onClick={() => setRange("30")}
              {...titleHint("Останні 30 днів")}
            >
              Last 30
            </Button>
            <Button
              variant={range === "7" ? "primary" : "secondary"}
              onClick={() => setRange("7")}
              {...titleHint("Останні 7 днів")}
            >
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
        <Card
          title="Total R"
          subtitle="Сумарно"
          right={<span style={{ fontWeight: 800 }}>{fmt(summary.total, 2)}R</span>}
        />
        <Card
          title="Avg R"
          subtitle="Середнє за угоду"
          right={<span style={{ fontWeight: 800 }}>{fmt(summary.avg, 2)}R</span>}
        />
        <Card
          title="Win rate"
          subtitle="Відсоток Win"
          right={<span style={{ fontWeight: 800 }}>{pct(summary.winRate, 1)}</span>}
        />
        <Card
          title="W / L / BE"
          subtitle="Розподіл"
          right={
            <span style={{ fontWeight: 800 }}>
              {summary.wins} / {summary.losses} / {summary.be}
            </span>
          }
        />
      </Row>

      {/* Top setups */}
      <Row cols={2} style={{ marginTop: 14 }}>
        <Card
          title="Top setups by Avg R"
          subtitle="Рейтинг сетапів (фільтри застосовані)"
        >
          {topSetups.length === 0 ? (
            <div style={{ opacity: 0.7 }}>
              Немає даних для таблиці. Додай трейди або зміни фільтри.
            </div>
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
                    <tr
                      key={r.setup}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td style={{ padding: "10px 10px", fontWeight: 800 }}>{r.setup}</td>
                      <td style={{ padding: "10px 10px" }}>{r.n}</td>
                      <td style={{ padding: "10px 10px", fontWeight: 800 }}>
                        {fmt(r.avg, 2)}R
                      </td>
                      <td style={{ padding: "10px 10px" }}>{fmt(r.total, 2)}R</td>
                      <td style={{ padding: "10px 10px" }}>{pct(r.winRate, 1)}</td>
                      <td style={{ padding: "10px 10px" }}>
                        {r.wins}/{r.losses}/{r.be}
                      </td>
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
                  <Link
                    key={t.id}
                    href={`/trades/${t.id}`}
                    style={{ textDecoration: "none" }}
                  >
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
