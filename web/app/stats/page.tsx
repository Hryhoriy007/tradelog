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

function toMs(d: any) {
  const t = new Date(d ?? 0).getTime();
  return Number.isFinite(t) ? t : 0;
}

function toISODate(ms: number) {
  const d = new Date(ms);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function tradeDateMs(t: any) {
  return toMs(t?.date ?? t?.createdAt);
}

function getPair(t: any) {
  return String(t?.pair ?? t?.symbol ?? "").trim();
}

function getSide(t: any) {
  return String(t?.side ?? "").trim();
}

function getSetup(t: any) {
  // підтримка різних назв поля
  return String(t?.setup ?? t?.preset ?? t?.template ?? t?.strategy ?? "").trim();
}

type Timeframe = "all" | "30d" | "7d";

export default function StatsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [binSize, setBinSize] = useState(0.5);

  // timeframe switch
  const [timeframe, setTimeframe] = useState<Timeframe>("all");

  // filters
  const [pair, setPair] = useState("");
  const [side, setSide] = useState<"" | "Long" | "Short">("");
  const [setup, setSetup] = useState("");

  // date range (YYYY-MM-DD)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setTrades(getTrades());
  }, []);

  const options = useMemo(() => {
    const pairs = Array.from(
      new Set(trades.map((t: any) => getPair(t)).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    const setups = Array.from(
      new Set(trades.map((t: any) => getSetup(t)).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    return { pairs, setups };
  }, [trades]);

  const filteredTrades = useMemo(() => {
    const now = Date.now();

    let startMs = 0;
    if (timeframe === "7d") startMs = now - 7 * 24 * 60 * 60 * 1000;
    if (timeframe === "30d") startMs = now - 30 * 24 * 60 * 60 * 1000;

    const fromMs = fromDate ? toMs(`${fromDate}T00:00:00`) : 0;
    const toMsInc = toDate ? toMs(`${toDate}T23:59:59`) : 0;

    const qPair = pair.trim().toLowerCase();
    const qSetup = setup.trim().toLowerCase();

    return trades.filter((t: any) => {
      const dms = tradeDateMs(t);

      // timeframe
      if (timeframe !== "all" && dms < startMs) return false;

      // date range
      if (fromDate && dms < fromMs) return false;
      if (toDate && dms > toMsInc) return false;

      // pair filter (dropdown or typed)
      const p = getPair(t).toLowerCase();
      if (qPair && p !== qPair) return false;

      // side filter
      const s = getSide(t);
      if (side && s !== side) return false;

      // setup filter
      const st = getSetup(t).toLowerCase();
      if (qSetup && st !== qSetup) return false;

      return true;
    });
  }, [trades, timeframe, fromDate, toDate, pair, side, setup]);

  const rs = useMemo(() => {
    return filteredTrades
      .map((t) => tradeR(t))
      .filter((x) => Number.isFinite(x)) as number[];
  }, [filteredTrades]);

  const wl = useMemo(() => {
    const wins = rs.filter((x) => x > 0).length;
    const losses = rs.filter((x) => x < 0).length;
    const be = rs.length - wins - losses;

    const total = rs.reduce((a, b) => a + b, 0);
    const winRate = rs.length ? (wins / rs.length) * 100 : 0;
    const avg = rs.length ? total / rs.length : 0;

    const sumW = rs.filter((x) => x > 0).reduce((a, b) => a + b, 0);
    const sumL = rs.filter((x) => x < 0).reduce((a, b) => a + b, 0);
    const pf = sumL !== 0 ? sumW / Math.abs(sumL) : sumW > 0 ? Infinity : 0;

    return { wins, losses, be, winRate, avg, pf, total };
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

  const topSetups = useMemo(() => {
    // групуємо тільки ті угоди, де є setup
    const map = new Map<
      string,
      { setup: string; n: number; wins: number; losses: number; be: number; totalR: number }
    >();

    filteredTrades.forEach((t: any) => {
      const st = getSetup(t);
      if (!st) return;

      const r = tradeR(t);
      if (!Number.isFinite(r)) return;

      const row = map.get(st) ?? { setup: st, n: 0, wins: 0, losses: 0, be: 0, totalR: 0 };
      row.n += 1;
      row.totalR += r;

      if (r > 0) row.wins += 1;
      else if (r < 0) row.losses += 1;
      else row.be += 1;

      map.set(st, row);
    });

    const rows = Array.from(map.values()).map((r) => ({
      ...r,
      avgR: r.n ? r.totalR / r.n : 0,
      winRate: r.n ? (r.wins / r.n) * 100 : 0,
    }));

    // сортуємо по avgR, потім по n
    rows.sort((a, b) => (b.avgR - a.avgR) || (b.n - a.n));

    return rows.slice(0, 10);
  }, [filteredTrades]);

  const onReset = () => {
    setTimeframe("all");
    setPair("");
    setSide("");
    setSetup("");
    setFromDate("");
    setToDate("");
    setBinSize(0.5);
  };

  // auto-fill date inputs when switching timeframe (не блокує ручний режим)
  useEffect(() => {
    if (timeframe === "all") return;
    const now = Date.now();
    const startMs = timeframe === "7d"
      ? now - 7 * 24 * 60 * 60 * 1000
      : now - 30 * 24 * 60 * 60 * 1000;

    // якщо користувач вручну не задав from/to — підставимо
    setFromDate((v) => (v ? v : toISODate(startMs)));
    setToDate((v) => (v ? v : toISODate(now)));
  }, [timeframe]);

  return (
    <Page>
      <HeaderRow
        title="Stats"
        subtitle="Фільтри, графіки та топ сетапів"
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

      {/* Timeframe switch */}
      <Row cols={1}>
        <Card title="Filters" subtitle="Timeframe + pair + side + date range + setup">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 6 }}>
              <Button variant={timeframe === "all" ? "primary" : "secondary"} onClick={() => setTimeframe("all")}>
                All
              </Button>
              <Button variant={timeframe === "30d" ? "primary" : "secondary"} onClick={() => setTimeframe("30d")}>
                Last 30
              </Button>
              <Button variant={timeframe === "7d" ? "primary" : "secondary"} onClick={() => setTimeframe("7d")}>
                Last 7
              </Button>
            </div>

            <div style={fieldWrap}>
              <span style={label}>Pair</span>
              <select style={selectStyle} value={pair} onChange={(e) => setPair(e.target.value)}>
                <option value="">All</option>
                {options.pairs.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldWrap}>
              <span style={label}>Side</span>
              <select style={selectStyle} value={side} onChange={(e) => setSide(e.target.value as any)}>
                <option value="">All</option>
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>

            <div style={fieldWrap}>
              <span style={label}>From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={fieldWrap}>
              <span style={label}>To</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={fieldWrap}>
              <span style={label}>Setup</span>
              <select style={selectStyle} value={setup} onChange={(e) => setSetup(e.target.value)}>
                <option value="">All</option>
                {options.setups.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <Button variant="secondary" onClick={onReset}>
                Reset
              </Button>
            </div>
          </div>

          <div style={{ marginTop: 10, opacity: 0.75, fontSize: 13 }}>
            Showing <b>{filteredTrades.length}</b> trades
          </div>
        </Card>
      </Row>

      <Row cols={4}>
        <Card title="Trades" subtitle="К-сть угод" right={<span style={{ fontWeight: 700 }}>{rs.length}</span>} />
        <Card title="Win rate" subtitle="Виграшні" right={<span style={{ fontWeight: 700 }}>{fmt(wl.winRate, 1)}%</span>} />
        <Card title="Avg R" subtitle="Середня R" right={<span style={{ fontWeight: 700 }}>{fmt(wl.avg, 2)}R</span>} />
        <Card
          title="Profit factor"
          subtitle="Σwins / |Σloss|"
          right={<span style={{ fontWeight: 700 }}>{wl.pf === Infinity ? "∞" : fmt(wl.pf, 2)}</span>}
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
            <div style={pillStyle}>
              <span style={{ opacity: 0.75 }}>Total</span>
              <b style={{ marginLeft: 6 }}>{fmt(wl.total, 2)}R</b>
            </div>
          </div>
        </Card>
      </Row>

      <Row cols={1}>
        <Card title="Top setups" subtitle="Топ-10 сетапів по Avg R (з урахуванням поточних фільтрів)">
          {topSetups.length === 0 ? (
            <div style={{ opacity: 0.7 }}>Немає сетапів у відфільтрованих угодах (або поле setup порожнє).</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Setup</th>
                    <th style={thStyle}>Trades</th>
                    <th style={thStyle}>Win rate</th>
                    <th style={thStyle}>Avg R</th>
                    <th style={thStyle}>Total R</th>
                    <th style={thStyle}>W/L/BE</th>
                  </tr>
                </thead>
                <tbody>
                  {topSetups.map((r) => (
                    <tr key={r.setup}>
                      <td style={tdStyleStrong}>{r.setup}</td>
                      <td style={tdStyle}>{r.n}</td>
                      <td style={tdStyle}>{fmt(r.winRate, 1)}%</td>
                      <td style={tdStyleStrong}>{fmt(r.avgR, 2)}R</td>
                      <td style={tdStyle}>{fmt(r.totalR, 2)}R</td>
                      <td style={tdStyle}>
                        {r.wins}/{r.losses}/{r.be}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

const fieldWrap: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.02)",
};

const label: React.CSSProperties = { opacity: 0.7, fontSize: 13 };

const inputStyle: React.CSSProperties = {
  height: 34,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.20)",
  color: "inherit",
  padding: "0 10px",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  height: 34,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.20)",
  color: "inherit",
  padding: "0 10px",
  outline: "none",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  overflow: "hidden",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 12,
  letterSpacing: 0.2,
  opacity: 0.75,
  padding: "10px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  opacity: 0.9,
  whiteSpace: "nowrap",
};

const tdStyleStrong: React.CSSProperties = {
  ...tdStyle,
  fontWeight: 650,
  opacity: 1,
};
