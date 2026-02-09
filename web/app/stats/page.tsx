"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";

import { RHistogram } from "./ui/RHistogram";
import { WinLossDonut } from "./ui/WinLossDonut";

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [binSize, setBinSize] = useState(0.5); // R per bin (0.25/0.5/1)

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const rs = useMemo(() => {
    return trades
      .map((t) => tradeR(t))
      .filter((x) => Number.isFinite(x)) as number[];
  }, [trades]);

  const wl = useMemo(() => {
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : 0;

    // profit factor in R: sum(wins)/abs(sum(losses))
    const sumW = rs.filter((x) => x > 0).reduce((a, b) => a + b, 0);
    const sumL = rs.filter((x) => x < 0).reduce((a, b) => a + b, 0); // negative
    const pf = sumL !== 0 ? sumW / Math.abs(sumL) : sumW > 0 ? Infinity : 0;

    return { wins, losses, be, winRate, avg, pf };
  }, [rs]);

  const histogram = useMemo(() => {
    if (rs.length === 0) return { bins: [] as { from: number; to: number; count: number }[] };

    const min = Math.min(...rs);
    const max = Math.max(...rs);

    const size = Math.max(0.1, binSize);
    const start = Math.floor(min / size) * size;
    const end = Math.ceil(max / size) * size;

    const bins: { from: number; to: number; count: number }[] = [];
    for (let x = start; x < end + 1e-9; x += size) {
      bins.push({ from: x, to: x + size, count: 0 });
    }

    rs.forEach((v) => {
      const idx = Math.min(
        bins.length - 1,
        Math.max(0, Math.floor((v - start) / size))
      );
      bins[idx].count += 1;
    });

    return { bins };
  }, [rs, binSize]);

  return (
    <Page>
      <HeaderRow
        title="Stats"
        subtitle="Графіки: розподіл R та win/loss"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
            <Link href="/trades/new">
              <Button>Add trade</Button>
            </Link>
          </div>
        }
      />

      <Row cols={4}>
        <Card
          title="Trades"
          subtitle="К-сть угод"
          right={<span style={{ fontWeight: 700 }}>{rs.length}</span>}
        />
        <Card
          title="Win rate"
          subtitle="Виграшні"
          right={<span style={{ fontWeight: 700 }}>{fmt(wl.winRate, 1)}%</span>}
        />
        <Card
          title="Avg R"
          subtitle="Середня R"
          right={<span style={{ fontWeight: 700 }}>{fmt(wl.avg, 2)}R</span>}
        />
        <Card
          title="Profit factor"
          subtitle="Σwins / |Σloss|"
          right={
            <span style={{ fontWeight: 700 }}>
              {wl.pf === Infinity ? "∞" : fmt(wl.pf, 2)}
            </span>
          }
        />
      </Row>

      <Row cols={2}>
        <Card
          title="R distribution"
          subtitle="Скільки угод у кожному діапазоні R"
          right={
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ opacity: 0.7, fontSize: 13 }}>Bin:</span>
              <div style={{ display: "flex", gap: 6 }}>
                <Button
                  variant={binSize === 0.25 ? "primary" : "secondary"}
                  onClick={() => setBinSize(0.25)}
                >
                  0.25
                </Button>
                <Button
                  variant={binSize === 0.5 ? "primary" : "secondary"}
                  onClick={() => setBinSize(0.5)}
                >
                  0.5
                </Button>
                <Button
                  variant={binSize === 1 ? "primary" : "secondary"}
                  onClick={() => setBinSize(1)}
                >
                  1
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ height: 280 }}>
            <RHistogram bins={histogram.bins} />
          </div>
        </Card>

        <Card title="Win / Loss / BE" subtitle="Розподіл результатів">
          <div style={{ height: 280, display: "grid", placeItems: "center" }}>
            <WinLossDonut wins={wl.wins} losses={wl.losses} be={wl.be} />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <div style={pillStyle}>
              <span style={{ opacity: 0.75 }}>Win</span>
              <b style={{ marginLeft: 6 }}>{wl.wins}</b>
            </div>
            <div style={pillStyle}>
              <span style={{ opacity: 0.75 }}>Loss</span>
              <b style={{ marginLeft: 6 }}>{wl.losses}</b>
            </div>
            <div style={pillStyle}>
              <span style={{ opacity: 0.75 }}>BE</span>
              <b style={{ marginLeft: 6 }}>{wl.be}</b>
            </div>
          </div>
        </Card>
      </Row>
    </Page>
  );
}

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.02)",
};
