"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

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

export default function DashboardPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const stats = useMemo(() => {
    const rs = trades.map((t) => tradeR(t)).filter((x) => Number.isFinite(x));
    const total = rs.reduce((a, b) => a + b, 0);
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? total / rs.length : 0;

    // Equity curve by cumulative R in chronological order
    const ordered = [...trades].sort((a: any, b: any) => {
      const da = new Date((a?.date ?? a?.createdAt ?? 0) as any).getTime();
      const db = new Date((b?.date ?? b?.createdAt ?? 0) as any).getTime();
      return da - db;
    });

    let cum = 0;
    const curve = ordered.map((t, idx) => {
      const r = tradeR(t);
      if (Number.isFinite(r)) cum += r;
      const label =
        (t as any)?.date ??
        (t as any)?.createdAt ??
        `#${idx + 1}`;
      return { x: idx, label: String(label), y: cum };
    });

    return { total, wins, losses, be, winRate, avg, curve };
  }, [trades]);

  const lastTrades = useMemo(() => {
    // newest first
    const ordered = [...trades].sort((a: any, b: any) => {
      const da = new Date((a?.date ?? a?.createdAt ?? 0) as any).getTime();
      const db = new Date((b?.date ?? b?.createdAt ?? 0) as any).getTime();
      return db - da;
    });
    return ordered.slice(0, 10);
  }, [trades]);

  return (
    <Page>
      <HeaderRow
        title="Dashboard"
        subtitle="Equity curve та останні угоди"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/trades">
              <Button variant="secondary">Trades</Button>
            </Link>
            <Link href="/trades/new">
              <Button>Add trade</Button>
            </Link>
          </div>
        }
      />

      <Row cols={4}>
        <Card
          title="Total R"
          subtitle="Сумарний результат"
          right={<span style={{ fontWeight: 700 }}>{fmt(stats.total, 2)}R</span>}
        />
        <Card
          title="Win rate"
          subtitle="Відсоток виграшних"
          right={<span style={{ fontWeight: 700 }}>{fmt(stats.winRate, 1)}%</span>}
        />
        <Card
          title="Avg R"
          subtitle="Середня R на угоду"
          right={<span style={{ fontWeight: 700 }}>{fmt(stats.avg, 2)}R</span>}
        />
        <Card
          title="W / L / BE"
          subtitle="Розподіл"
          right={
            <span style={{ fontWeight: 700 }}>
              {stats.wins} / {stats.losses} / {stats.be}
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
                const date = String(t?.date ?? t?.createdAt ?? "—");
                const pair = String(t?.pair ?? t?.symbol ?? "—");
                const side = String(t?.side ?? "—");

                return (
                  <Link
                    key={t?.id ?? `${date}-${pair}-${Math.random()}`}
                    href={`/trades/${t?.id ?? ""}`}
                    style={{ textDecoration: "none" }}
                  >
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
