// web/app/page.tsx
"use client";

import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";

import { Page, HeaderRow } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ui } from "@/app/components/ui/styles";

import { MockDashboard } from "@/app/components/marketing/MockDashboard";
import { DashboardWindow } from "@/app/components/marketing/DashboardWindow";
import { Background3D } from "@/app/components/marketing/Background3D";

type FeatureItem = {
  title: string;
  subtitle: string;
  points: string[];
};

const copy: {
  heroTitle: React.ReactNode;
  heroSub: string;
  how1: string;
  how1Text: string;
  how2: string;
  how2Text: string;
  how3: string;
  how3Text: string;
  featuresTitle: string;
  features: FeatureItem[];
  bottomTitle: string;
  bottomSub: string;
} = {
  heroTitle: (
    <>
      Trade with data,
      <br />
      not emotions.
      <br />
      Stay consistent.
    </>
  ),
  heroSub: "Log entries, exits, risk, emotions, and rules — so your results stop lying to you.",

  how1: "Log what you executed",
  how1Text: "Pair, side, entry, stop, target — done in seconds.",
  how2: "Capture the real context",
  how2Text: "Setup, bias, emotions before & after. Why you entered. Why you exited.",
  how3: "Review your behavior",
  how3Text: "Equity in R, mistakes, overtrading, best setups.",

  featuresTitle: "Features",
  features: [
    {
      title: "Log trades without breaking focus",
      subtitle: "Fast, no clutter",
      points: ["Add a trade in ~30 seconds", "Presets for repeatable setups", "Tags for mistakes, psychology, FOMO"],
    },
    {
      title: "Stats that expose your discipline",
      subtitle: "See what you repeat",
      points: ["Equity curve in R (not fake PnL)", "Win / Loss / BE distribution", "Best & worst setups by Avg R"],
    },
    {
      title: "Your data. No lock-in. Ever.",
      subtitle: "Export & restore anytime",
      points: ["One-click JSON backup", "CSV export for Excel / Sheets", "Import with merge or replace modes"],
    },
  ],

  bottomTitle: "Ready to stop repeating the same mistakes?",
  bottomSub: "Create an account and start logging trades in minutes.",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        fontSize: 12,
        opacity: 0.9,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Feature({ title, subtitle, points }: { title: string; subtitle: string; points: string[] }) {
  return (
    <div style={{ height: "100%" }}>
      <Card title={title} subtitle={subtitle}>
        <div style={{ display: "grid", gap: 10 }}>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, opacity: 0.9 }}>
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        display: "grid",
        gap: 8,
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            display: "grid",
            placeItems: "center",
            fontWeight: 900,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.03)",
            flex: "0 0 auto",
          }}
        >
          {n}
        </div>
        <div style={{ fontWeight: 900 }}>{title}</div>
      </div>
      <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

/* =========================
   Trader Panel (Binance-like)
   ========================= */

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function fmtMoney(v?: number) {
  if (v === undefined || v === null) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)} USD`;
}

// deterministic pseudo-random (stable per month/day)
function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rand01(seed: number) {
  let x = seed || 123456789;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return ((x >>> 0) % 1_000_000) / 1_000_000;
}

/** Binance-like tone with intensity by abs(v) / maxAbs */
function pnlTone(v: number | undefined, maxAbs: number) {
  if (v === undefined || v === null) {
    return { bg: "rgba(255,255,255,0.04)", br: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.70)" };
  }

  if (v === 0) {
    return { bg: "rgba(180,180,180,0.10)", br: "rgba(180,180,180,0.16)", text: "rgba(255,255,255,0.88)" };
  }

  const t = maxAbs > 0 ? clamp01(Math.abs(v) / maxAbs) : 0;
  const bgA = 0.08 + t * 0.30;
  const brA = 0.16 + t * 0.26;

  if (v > 0) return { bg: `rgba(0, 180, 120, ${bgA})`, br: `rgba(0, 180, 120, ${brA})`, text: "rgba(235,255,245,0.95)" };
  return { bg: `rgba(240, 70, 70, ${bgA})`, br: `rgba(240, 70, 70, ${brA})`, text: "rgba(255,235,235,0.95)" };
}

const TRADER_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="675" viewBox="0 0 900 675">
  <defs>
    <radialGradient id="g" cx="30%" cy="0%" r="90%">
      <stop offset="0%" stop-color="rgba(140,80,255,0.55)"/>
      <stop offset="55%" stop-color="rgba(140,80,255,0.12)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.15)"/>
    </radialGradient>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b12"/>
      <stop offset="100%" stop-color="#11131b"/>
    </linearGradient>
  </defs>
  <rect width="900" height="675" fill="url(#b)"/>
  <rect width="900" height="675" fill="url(#g)"/>
  <circle cx="450" cy="310" r="150" fill="rgba(255,255,255,0.06)"/>
  <circle cx="450" cy="270" r="70" fill="rgba(255,255,255,0.10)"/>
  <path d="M290,530c35-90,115-135,160-135s125,45,160,135" fill="rgba(255,255,255,0.10)"/>
  <text x="50%" y="92%" text-anchor="middle" fill="rgba(255,255,255,0.60)" font-family="Inter, Arial" font-size="28">
    Dmytro_515
  </text>
</svg>
`);

type RangeKey = "1m" | "3m" | "1y";

function TraderCalendarPanel() {
  const trader = {
    name: "Dmytro_515",
    age: 28,
    yearsTrading: 4,
    style: "Futures • Intraday",
    note: "Tracks risk in R, avoids revenge trading",
    photoUrl: TRADER_PLACEHOLDER,
  };

  const [range, setRange] = useState<RangeKey>("1m");

  const [monthDate, setMonthDate] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });

  const now = useMemo(() => new Date(), []);
  const currentMonthStart = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);
  const historyStart = useMemo(() => new Date(2026, 0, 1), []);

  const monthStart = useMemo(() => new Date(monthDate.getFullYear(), monthDate.getMonth(), 1), [monthDate]);
  const isMonthBeforeHistory = useMemo(() => monthStart < historyStart, [monthStart, historyStart]);

  useEffect(() => {
    if (monthDate > currentMonthStart) {
      setMonthDate(currentMonthStart);
      return;
    }
    if (monthStart < historyStart) {
      setMonthDate(historyStart);
      return;
    }
  }, [monthDate, currentMonthStart, monthStart, historyStart]);

  const year = monthDate.getFullYear();
  const monthIndex = monthDate.getMonth();
  const monthLabel = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

  const daysInMonth = useMemo(() => new Date(year, monthIndex + 1, 0).getDate(), [year, monthIndex]);
  const leadingEmpty = useMemo(() => new Date(year, monthIndex, 1).getDay(), [year, monthIndex]);

  const isThisMonth = now.getFullYear() === year && now.getMonth() === monthIndex;
  const todayDay = now.getDate();

  const isCurrentMonth = isThisMonth;
  const isHistoryStartMonth = year === historyStart.getFullYear() && monthIndex === historyStart.getMonth();

  const goPrevMonth = () => {
    setMonthDate((d) => {
      const prev = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      if (prev < historyStart) return d;
      return prev;
    });
  };

  const goNextMonth = () => {
    setMonthDate((d) => {
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      if (next > currentMonthStart) return d;
      return next;
    });
  };

  const [tip, setTip] = useState<{ open: boolean; x: number; y: number; title: string; value: string }>({
    open: false,
    x: 0,
    y: 0,
    title: "",
    value: "",
  });

  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  const asNum = (v: number | undefined) => (typeof v === "number" ? v : 0);

  const sumDays = (arr: Array<number | undefined>, fromDay: number, toDay: number) => {
    const from = Math.max(1, fromDay);
    const to = Math.min(arr.length, toDay);
    let s = 0;
    for (let d = from; d <= to; d++) s += asNum(arr[d - 1]);
    return s;
  };

  const dailyPnl = useMemo(() => {
    if (isMonthBeforeHistory) {
      return Array.from({ length: daysInMonth }, () => undefined) as Array<number | undefined>;
    }

    const seedBase = hashSeed(`${year}-${monthIndex}`);
    const arr: Array<number | undefined> = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const r = rand01(seedBase + d * 101);
      const r2 = rand01(seedBase + d * 911);

      if (r < 0.22) {
        arr.push(undefined);
        continue;
      }

      let v = (r2 - 0.52) * 6;

      const spike = rand01(seedBase + d * 333);
      if (spike > 0.92) v += (spike - 0.9) * 1500;
      if (spike < 0.06) v -= (0.08 - spike) * 900;

      arr.push(Number(v.toFixed(2)));
    }

    return arr;
  }, [year, monthIndex, daysInMonth, isMonthBeforeHistory]);

  const dailyPnlVisible = useMemo(() => {
    if (!isThisMonth) return dailyPnl;
    return dailyPnl.map((v, idx) => (idx + 1 > todayDay ? undefined : v));
  }, [dailyPnl, isThisMonth, todayDay]);

  const maxAbs = useMemo(() => {
    return dailyPnlVisible.reduce((mx, v) => (v === undefined ? mx : Math.max(mx, Math.abs(v))), 0);
  }, [dailyPnlVisible]);

  const monthsAvailableUpToSelected = useMemo(() => {
    const n = (year - historyStart.getFullYear()) * 12 + (monthIndex - historyStart.getMonth()) + 1;
    return Math.max(0, n);
  }, [year, monthIndex, historyStart]);

  const rangeMonthsRequested = range === "1m" ? 1 : range === "3m" ? 3 : 12;
  const rangeMonths = Math.max(1, Math.min(rangeMonthsRequested, monthsAvailableUpToSelected || 1));

  const rangeSeries = useMemo(() => {
    const series: number[] = [];

    for (let mOffset = rangeMonths - 1; mOffset >= 0; mOffset--) {
      const d = new Date(year, monthIndex - mOffset, 1);
      const histMonthStart = new Date(historyStart.getFullYear(), historyStart.getMonth(), 1);
      if (d < histMonthStart) continue;

      const y = d.getFullYear();
      const mi = d.getMonth();
      const dim = new Date(y, mi + 1, 0).getDate();
      const seedBase = hashSeed(`${y}-${mi}`);

      const isCur = y === now.getFullYear() && mi === now.getMonth();

      for (let day = 1; day <= dim; day++) {
        if (isCur && day > now.getDate()) break;

        const r = rand01(seedBase + day * 101);
        const r2 = rand01(seedBase + day * 911);
        if (r < 0.22) continue;

        let v = (r2 - 0.52) * 6;
        const spike = rand01(seedBase + day * 333);
        if (spike > 0.92) v += (spike - 0.9) * 1500;
        if (spike < 0.06) v -= (0.08 - spike) * 900;

        series.push(Number(v.toFixed(2)));
      }
    }

    return series;
  }, [rangeMonths, year, monthIndex, now, historyStart]);

  const stats = useMemo(() => {
    const endDay = isThisMonth ? todayDay : daysInMonth;
    const today = isThisMonth ? asNum(dailyPnlVisible[todayDay - 1]) : 0;

    const pnl7d = sumDays(dailyPnlVisible, endDay - 6, endDay);
    const pnl30d = sumDays(dailyPnlVisible, endDay - 29, endDay);
    const pnlRange = sum(rangeSeries);

    return {
      today: Number(today.toFixed(2)),
      pnl7d: Number(pnl7d.toFixed(2)),
      pnl30d: Number(pnl30d.toFixed(2)),
      pnlRange: Number(pnlRange.toFixed(2)),
    };
  }, [dailyPnlVisible, todayDay, isThisMonth, daysInMonth, rangeSeries]);

  const rangeLabel = range === "1m" ? "1m" : range === "3m" ? "3m" : monthsAvailableUpToSelected < 12 ? "YTD" : "1y";

  return (
    <Card title="Trader snapshot" subtitle="Binance-style calendar (real month + intensity + tooltip).">
      <div
        className="traderPanelGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)",
            overflow: "hidden",
            display: "grid",
          }}
        >
          <div
            style={{
              aspectRatio: "4 / 3",
              background:
                "radial-gradient(900px 320px at 30% 0%, rgba(140,80,255,0.18), transparent 55%), rgba(255,255,255,0.02)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={trader.photoUrl}
              alt={trader.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.95 }}
            />

            <div style={{ position: "absolute", left: 12, top: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: 12,
                  opacity: 0.9,
                  whiteSpace: "nowrap",
                }}
              >
                {trader.style}
              </span>
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(140,80,255,0.22)",
                  background: "rgba(140,80,255,0.08)",
                  fontSize: 12,
                  opacity: 0.92,
                  whiteSpace: "nowrap",
                }}
              >
                Risk-first
              </span>
            </div>
          </div>

          <div style={{ padding: 14, display: "grid", gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 950 }}>{trader.name}</div>
            <div style={{ fontSize: 13, opacity: 0.75 }}>
              {trader.age} y.o. • {trader.yearsTrading} years trading
            </div>

            <div style={{ marginTop: 4, display: "grid", gap: 8, fontSize: 13, opacity: 0.85, lineHeight: 1.55 }}>
              <div>✅ Logs every trade (entry/stop/target)</div>
              <div>✅ Reviews mistakes weekly</div>
              <div>✅ Measures performance in R, not vibes</div>
            </div>

            <div
              style={{
                marginTop: 6,
                padding: 12,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.02)",
                fontSize: 13,
                opacity: 0.8,
                lineHeight: 1.55,
              }}
            >
              🧠 {trader.note}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)",
            padding: 14,
            display: "grid",
            gap: 12,
            position: "relative",
          }}
          onMouseLeave={() => setTip((t) => ({ ...t, open: false }))}
        >
          {tip.open && (
            <div
              style={{
                position: "fixed",
                left: tip.x,
                top: tip.y,
                transform: "translate(12px, 12px)",
                zIndex: 9999,
                pointerEvents: "none",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(10,10,14,0.92)",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                minWidth: 180,
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 4 }}>{tip.title}</div>
              <div style={{ fontSize: 13, fontWeight: 900 }}>{tip.value}</div>
            </div>
          )}

          {/* header */}
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 950, fontSize: 14 }}>Futures PnL</div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {/* range switch */}
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {(["1m", "3m", "1y"] as RangeKey[]).map((k) => {
                    const active = k === range;
                    const effectiveLabel = k === "1y" && monthsAvailableUpToSelected < 12 ? "YTD" : k;

                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setRange(k)}
                        style={{
                          height: 30,
                          padding: "0 10px",
                          borderRadius: 999,
                          border: active ? "1px solid rgba(255,205,80,0.35)" : "1px solid rgba(255,255,255,0.10)",
                          background: active ? "rgba(255,205,80,0.12)" : "rgba(255,255,255,0.03)",
                          color: "rgba(255,255,255,0.92)",
                          fontSize: 12,
                          cursor: "pointer",
                          fontWeight: active ? 900 : 700,
                          opacity: active ? 1 : 0.85,
                        }}
                      >
                        {effectiveLabel}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={goPrevMonth}
                  disabled={isHistoryStartMonth}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.9)",
                    cursor: isHistoryStartMonth ? "not-allowed" : "pointer",
                    opacity: isHistoryStartMonth ? 0.45 : 1,
                  }}
                  aria-label="Previous month"
                  title={isHistoryStartMonth ? "No earlier data" : "Previous month"}
                >
                  ←
                </button>

                <div
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                    fontSize: 12,
                    opacity: 0.92,
                    minWidth: 84,
                    textAlign: "center",
                  }}
                >
                  {monthLabel}
                </div>

                <button
                  type="button"
                  onClick={goNextMonth}
                  disabled={isCurrentMonth}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.9)",
                    cursor: isCurrentMonth ? "not-allowed" : "pointer",
                    opacity: isCurrentMonth ? 0.45 : 1,
                  }}
                  aria-label="Next month"
                  title={isCurrentMonth ? "You can’t view future months" : "Next month"}
                >
                  →
                </button>
              </div>
            </div>

            {/* summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {[
                { k: "Today", v: stats.today },
                { k: "7d", v: stats.pnl7d },
                { k: "30d", v: stats.pnl30d },
                { k: rangeLabel, v: stats.pnlRange },
              ].map((it) => {
                const tone = pnlTone(it.v, Math.max(1, Math.abs(stats.pnlRange)));
                return (
                  <div
                    key={it.k}
                    style={{
                      padding: 10,
                      borderRadius: 14,
                      border: `1px solid ${tone.br}`,
                      background: tone.bg,
                      display: "grid",
                      gap: 4,
                    }}
                  >
                    <div style={{ fontSize: 11, opacity: 0.75 }}>{it.k}</div>
                    <div style={{ fontWeight: 900, fontSize: 13, color: tone.text }}>{fmtMoney(it.v)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* calendar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 950, fontSize: 13, opacity: 0.9 }}>Daily PnL</div>
              <div style={{ fontSize: 12, opacity: 0.65 }}>S M T W T F S</div>
            </div>

            <div
              className="pnlCalendarGrid"
              style={{
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
              }}
            >
              {Array.from({ length: leadingEmpty }).map((_, i) => (
                <div
                  key={`e-${i}`}
                  style={{
                    height: 44,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    opacity: 0.35,
                  }}
                />
              ))}

              {dailyPnlVisible.map((v, idx) => {
                const day = idx + 1;
                const tone = pnlTone(v, maxAbs);
                const isToday = isThisMonth && day === todayDay;
                const labelDate = `${monthLabel}-${String(day).padStart(2, "0")}`;

                const cellValue = v === undefined ? "No trades" : fmtMoney(v);
                const displaySmall =
                  v === undefined ? "" : (v > 0 ? "+" : "") + (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(2));

                return (
                  <div
                    key={day}
                    style={{
                      height: 44,
                      borderRadius: 10,
                      border: isToday ? "1px solid rgba(255,205,80,0.45)" : `1px solid ${tone.br}`,
                      boxShadow: isToday ? "0 0 0 2px rgba(255,205,80,0.10) inset" : undefined,
                      background: tone.bg,
                      padding: "6px 8px",
                      display: "grid",
                      alignContent: "space-between",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      setTip({ open: true, x: e.clientX, y: e.clientY, title: labelDate, value: cellValue });
                    }}
                    onMouseMove={(e) => setTip((t) => (t.open ? { ...t, x: e.clientX, y: e.clientY } : t))}
                  >
                    <div style={{ fontSize: 11, opacity: 0.75 }}>
                      {day}
                      {isToday ? <span style={{ marginLeft: 6, opacity: 0.85 }}>• today</span> : null}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: tone.text }}>{displaySmall}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.72, lineHeight: 1.5 }}>
              The calendar reveals streaks, revenge days, and risk spikes — the stuff you actually need to fix.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* =========================
   HERO Pricing (moved up)
   ========================= */

function HeroPricingCard() {
  const monthly = 9;
  const yearly = monthly * 12; // 108

  return (
    <div
      style={{
        marginTop: 14,
        padding: 14,
        borderRadius: 18,
        border: "1px solid rgba(140,80,255,0.22)",
        background: "rgba(140,80,255,0.08)",
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontWeight: 950 }}>Pricing</div>

        <span
          style={{
            padding: "5px 10px",
            borderRadius: 999,
            border: "1px solid rgba(255,205,80,0.28)",
            background: "rgba(255,205,80,0.10)",
            fontSize: 12,
            fontWeight: 900,
            opacity: 0.95,
            whiteSpace: "nowrap",
          }}
        >
          Paid only
        </span>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontSize: 28, fontWeight: 950, letterSpacing: -0.3, lineHeight: 1 }}>
          ${monthly} <span style={{ fontSize: 12, opacity: 0.75, fontWeight: 700 }}>/ month</span>
        </div>
        <div style={{ fontSize: 12, opacity: 0.78 }}>
          or <b>${yearly}</b> / year
        </div>
      </div>

      <div style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.55 }}>
        Full access: R-based stats, Win/Loss/BE, psychology notes, exports.
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/register" style={{ textDecoration: "none" }}>
          <Button variant="primary">Get access</Button>
        </Link>
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button variant="secondary">Login</Button>
        </Link>
      </div>

      <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.5 }}>
        (Checkout буде підключений пізніше через Stripe.)
      </div>
    </div>
  );
}

export default function HomePage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const t = copy;

  return (
    <Page>
      <Background3D />

      <div style={{ position: "relative", zIndex: 1 }}>
        <HeaderRow
          title="TradeLog"
          subtitle="Journal your crypto trades. Trade with data, not emotions."
          right={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="primary">Registration</Button>
              </Link>
            </div>
          }
        />

        {/* HERO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 16,
            alignItems: "stretch",
            marginTop: 10,
          }}
        >
          <div
            style={{
              padding: 22,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.10)",
              background:
                "radial-gradient(1200px 400px at 10% 10%, rgba(140,80,255,0.16), transparent 50%), rgba(255,255,255,0.02)",
            }}
          >
            {/* ✅ badges moved UP (as requested) */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
              <Badge>Crypto only</Badge>
              <Badge>No exchange API</Badge>
              <Badge>📈 R-based stats</Badge>
              <Badge>Win / Loss / BE</Badge>
              <Badge>🧠 Psychology notes</Badge>
            </div>

            <div style={{ fontSize: 44, fontWeight: 950, letterSpacing: -0.8, lineHeight: 1.05 }}>{t.heroTitle}</div>

            <div style={{ marginTop: 12, ...ui.subtle, fontSize: 14, lineHeight: 1.6 }}>{t.heroSub}</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="primary">Registration</Button>
              </Link>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button variant="secondary">Login</Button>
              </Link>
            </div>

            <div style={{ marginTop: 10, opacity: 0.75, fontSize: 12, lineHeight: 1.5 }}>
              No exchange connection • No spreadsheets • Your data stays yours
            </div>

            {/* ✅ pricing moved into HERO (as requested) */}
            <HeroPricingCard />
          </div>

          <div className="mockDashboardWrap">
            <DashboardWindow>
              <MockDashboard />
            </DashboardWindow>
          </div>
        </div>

        {/* Trader panel */}
        <div style={{ marginTop: 12 }}>
          <TraderCalendarPanel />
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 950, marginBottom: 10 }}>How it works</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "stretch" }}>
            <Step n="1" title={t.how1} text={t.how1Text} />
            <Step n="2" title={t.how2} text={t.how2Text} />
            <Step n="3" title={t.how3} text={t.how3Text} />
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginTop: 44 }}>
          <div style={{ fontSize: 20, fontWeight: 950, marginBottom: 14, paddingLeft: 4 }}>{t.featuresTitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, alignItems: "stretch" }}>
            {t.features.map((f) => (
              <Feature key={f.title} title={f.title} subtitle={f.subtitle} points={f.points} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 18 }}>
          <Card title="FAQ" subtitle="Quick answers before you start.">
            <div
              className="faqGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                alignItems: "stretch",
              }}
            >
              {[
                {
                  q: "Do I need exchange API keys?",
                  a: "No. TradeLog doesn’t require Binance/Bybit API keys. You log trades manually to stay intentional and reduce security risk.",
                },
                {
                  q: "Spot & Futures supported?",
                  a: "Yes. Log spot or futures trades the same way — with entry, stop, target and the result measured in R.",
                },
                {
                  q: "Why R instead of PnL?",
                  a: "PnL can lie when position size changes. R (risk units) shows discipline and consistency — comparable across trades.",
                },
                {
                  q: "Can I export / backup?",
                  a: "Yes. Export CSV for spreadsheets and create JSON backups to restore or migrate your journal anytime.",
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    padding: 14,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.02)",
                    display: "grid",
                    gap: 8,
                  }}
                >
                  <div style={{ fontWeight: 900 }}>{q}</div>
                  <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.6 }}>{a}</div>
                </div>
              ))}

              <div
                style={{
                  padding: 14,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  display: "grid",
                  gap: 8,
                  gridColumn: "1 / -1",
                }}
              >
                <div style={{ fontWeight: 900 }}>Is my data private?</div>
                <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.6 }}>
                  Yes. TradeLog is built around local-first principles. You keep control of your data and can export it whenever you want.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 18,
            padding: 18,
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.10)",
            background:
              "radial-gradient(900px 300px at 90% 10%, rgba(140,80,255,0.14), transparent 55%), rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 950 }}>{t.bottomTitle}</div>
            <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>
              {t.bottomSub}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button variant="primary">Registration</Button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 14, opacity: 0.6, fontSize: 12, display: "flex", justifyContent: "center" }}>
          © {year} TradeLog
        </div>

        <style jsx>{`
          .mockDashboardWrap :global([class*="demo"]),
          .mockDashboardWrap :global([data-demo]),
          .mockDashboardWrap :global(.demo),
          .mockDashboardWrap :global(.demoData) {
            display: none !important;
          }

          @media (max-width: 980px) {
            div[style*="grid-template-columns: 1.2fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }

            .faqGrid {
              grid-template-columns: 1fr !important;
            }

            .traderPanelGrid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </Page>
  );
}
