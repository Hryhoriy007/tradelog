"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";

import { EquityCurve } from "./ui/EquityCurve";

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}

function winLossFromR(r: number) {
  if (r > 0) return "Win";
  if (r < 0) return "Loss";
  return "BE";
}

function tradeDateIso(t: any) {
  return (t?.openedAt ?? t?.date ?? t?.createdAt ?? null) as string | null;
}
function normPair(t: any) {
  return String(t?.symbol ?? t?.pair ?? "—").toUpperCase();
}
function normSide(t: any) {
  return String(t?.direction ?? t?.side ?? "—").toUpperCase();
}
function normSetup(t: any) {
  return String(t?.setupTag ?? t?.setup ?? "").trim() || "(no setup)";
}

type RangeKey = "ALL" | "30" | "7";

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [range, setRange] = useState<RangeKey>("ALL");

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const filtered = useMemo(() => {
    if (range === "ALL") return trades;
    const days = range === "7" ? 7 : 30;
    const since = Date.now() - days * 24 * 60 * 60 * 1000;

    return trades.filter((t: any) => {
      const iso = tradeDateIso(t);
      if (!iso) return true;
      return new Date(iso).getTime() >= since;
    });
  }, [trades, range]);

  const stats = useMemo(() => {
    const rs = filtered.map((t) => tradeR(t)).filter((x) => Number.isFinite(x)) as number[];
    const total = rs.reduce((a, b) => a + b, 0);
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? total / rs.length : 0;

    // Equity curve (cumulative R)
    const ordered = [...filtered].sort((a: any, b: any) => {
      const da = new Date(tradeDateIso(a) ?? 0).getTime();
      const db = new Date(tradeDateIso(b) ?? 0).getTime();
      return da - db;
    });

    let cum = 0;
    const curve = ordered.map((t, idx) => {
      const r = tradeR(t);
      if (Number.isFinite(r)) cum += r;

      const label = tradeDateIso(t) ?? `#${idx + 1}`;
      return { x: idx, label: String(label), y: cum };
    });

    return { total, wins, losses, be, winRate, avg, curve };
  }, [filtered]);

  const lastTrades = useMemo(() => {
    const ordered = [...filtered].sort((a: any, b: any) => {
      const da = new Date(tradeDateIso(a) ?? 0).getTime();
      const db = new Date(tradeDateIso(b) ?? 0).getTime();
      return db - da;
    });
    return ordered.slice(0, 10);
  }, [filtered]);

  const todayThisWeek = useMemo(() => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();

    // week start: Monday
    const day = now.getDay(); // 0=Sun
    const diffToMon = (day === 0 ? 6 : day - 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMon, 0, 0, 0, 0).getTime();

    let todayR = 0;
    let weekR = 0;

    for (const t of filtered as any[]) {
      const iso = tradeDateIso(t);
      if (!iso) continue;
      const ts = new Date(iso).getTime();
      const r = tradeR(t);
      if (!Number.isFinite(r)) continue;

      if (ts >= startOfDay) todayR += r;
      if (ts >= startOfWeek) weekR += r;
    }

    return { todayR, weekR };
  }, [filtered]);

  const streak = useMemo(() => {
    // last trades sorted desc, count consecutive wins or losses, ignore BE as breaker
    const ordered = [...filtered].sort((a: any, b: any) => {
      const da = new Date(tradeDateIso(a) ?? 0).getTime();
      const db = new Date(tradeDateIso(b) ?? 0).getTime();
      return db - da;
    });

    let kind: "WIN" | "LOSS" | "NONE" = "NONE";
    let count = 0;

    for (const t of ordered as any[]) {
      const r = tradeR(t);
      if (!Number.isFinite(r) || r === 0) break;

      const k = r > 0 ? "WIN" : "LOSS";
      if (kind === "NONE") {
        kind = k;
        count = 1;
      } else if (kind === k) {
        count += 1;
      } else {
        break;
      }
    }

    return { kind, count };
  }, [filtered]);

  const bestWorstSetup = useMemo(() => {
    const map = new Map<string, { setup: string; n: number; total: number }>();

    for (const t of filtered as any[]) {
      const setup = normSetup(t);
      const r = tradeR(t);
      if (!Number.isFinite(r)) continue;

      const cur = map.get(setup) ?? { setup, n: 0, total: 0 };
      cur.n += 1;
      cur.total += r;
      map.set(setup, cur);
    }

    const rows = Array.from(map.values())
      .map((x) => ({ ...x, avg: x.n ? x.total / x.n : 0 }))
      .filter((x) => x.n >= 3) // min trades
      .sort((a, b) => b.avg - a.avg);

    const best = rows[0] ?? null;
    const worst = rows.length ? rows[rows.length - 1] : null;

    return { best, worst };
  }, [filtered]);

  return (
    <Page>
      <HeaderRow
        title="Dashboard"
        subtitle="Equity curve + last trades"
        right={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ThemeToggle />

            <Link href="/backup" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Backup</Button>
            </Link>

            <Link href="/stats" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Stats</Button>
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

      {/* Quick range */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <Button variant={range === "ALL" ? "primary" : "secondary"} onClick={() => setRange("ALL")}>
          All
        </Button>
        <Button variant={range === "30" ? "primary" : "secondary"} onClick={() => setRange("30")}>
          Last 30
        </Button>
        <Button variant={range === "7" ? "primary" : "secondary"} onClick={() => setRange("7")}>
          Last 7
        </Button>

        <div style={{ marginLeft: "auto", opacity: 0.7, fontSize: 13 }}>
          Showing <b>{filtered.length}</b> trades
        </div>
      </div>

      {/* Top cards */}
      <Row cols={4}>
        <Card title="Total R" subtitle="Сумарний результат" right={<span style={{ fontWeight: 700 }}>{fmt(stats.total, 2)}R</span>} />
        <Card title="Win rate" subtitle="Відсоток виграшних" right={<span style={{ fontWeight: 700 }}>{fmt(stats.winRate, 1)}%</span>} />
        <Card title="Avg R" subtitle="Середня R на угоду" right={<span style={{ fontWeight: 700 }}>{fmt(stats.avg, 2)}R</span>} />
        <Card title="W / L / BE" subtitle="Розподіл" right={<span style={{ fontWeight: 700 }}>{stats.wins} / {stats.losses} / {stats.be}</span>} />
      </Row>

      {/* New cards */}
      <Row cols={4}>
        <Card
          title="Today R"
          subtitle="Сьогодні"
          right={<span style={{ fontWeight: 700 }}>{fmt(todayThisWeek.todayR, 2)}R</span>}
        />
        <Card
          title="This week R"
          subtitle="З понеділка"
          right={<span style={{ fontWeight: 700 }}>{fmt(todayThisWeek.weekR, 2)}R</span>}
        />
        <Card
          title="Streak"
          subtitle="Consecutive wins/losses"
          right={
            <span style={{ fontWeight: 700 }}>
              {streak.kind === "NONE" ? "—" : `${streak.kind} × ${streak.count}`}
            </span>
          }
        />
        <Card
          title="Best / Worst setup"
          subtitle="Avg R (min 3 trades)"
          right={
            <span style={{ fontWeight: 700 }}>
              {bestWorstSetup.best ? `${bestWorstSetup.best.setup}: ${fmt(bestWorstSetup.best.avg, 2)}R` : "—"}
            </span>
          }
        />
      </Row>

      <Row cols={2}>
        <Card title="Equity curve (R)" subtitle="Кумулятивний результат">
          <div style={{ height: 260 }}>
            <EquityCurve data={stats.curve} />
          </div>
        </Card>

        <Card title="Last trades" subtitle="Останні 10 угод">
          <div style={{ display: "grid", gap: 8 }}>
            {lastTrades.length === 0 ? (
              <div style={{ opacity: 0.7 }}>
                Поки що немає угод. Натисни <b>Add trade</b>.
              </div>
            ) : (
              lastTrades.map((t: any) => {
                const r = tradeR(t);
                const wl = winLossFromR(r);
                const date = String(tradeDateIso(t) ?? "—");
                const pair = normPair(t);
                const side = normSide(t);

                return (
                  <Link key={t?.id ?? `${date}-${pair}`} href={`/trades/${t?.id ?? ""}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
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
                        <div style={{ fontWeight: 650, lineHeight: 1.2 }}>
                          {pair} • {side}
                        </div>
                        <div style={{ opacity: 0.7, fontSize: 13 }}>{date}</div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            fontSize: 12,
                            padding: "4px 8px",
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.10)",
                            opacity: 0.9,
                            whiteSpace: "nowrap",
                          }}
                          title="Win/Loss/BE"
                        >
                          {wl}
                        </div>
                        <div style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                          {Number.isFinite(r) ? `${fmt(r, 2)}R` : "—"}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </Card>
      </Row>
    </Page>
  );
}
