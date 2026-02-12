// web/app/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";

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
function pnlTone(v?: number) {
  if (v === undefined || v === null) return { bg: "rgba(255,255,255,0.04)", br: "rgba(255,255,255,0.08)" };
  if (v > 0) return { bg: "rgba(80,200,120,0.14)", br: "rgba(80,200,120,0.22)" };
  if (v < 0) return { bg: "rgba(255,100,100,0.14)", br: "rgba(255,100,100,0.22)" };
  return { bg: "rgba(180,180,180,0.10)", br: "rgba(180,180,180,0.16)" };
}

function fmtMoney(v?: number) {
  if (v === undefined || v === null) return "—";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)} USD`;
}

function TraderCalendarPanel() {
  const trader = {
    name: "Dmytro Kovalenko",
    age: 28,
    yearsTrading: 4,
    style: "Futures • Intraday",
    note: "Tracks risk in R, avoids revenge trading",
    photoUrl: "/trader.jpg", // ✅ put an image into /public/trader.jpg or change this path
  };

  const monthLabel = "2026-02";

  // Mock daily PnL (28 days example). undefined = no data
  const dailyPnl: Array<number | undefined> = [
    -0.33, +582.39, +0.11, -0.3, -69.7, -310.54, -0.21, -0.02, +0.51, -58.93, -0.43, -0.14, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined,
  ];

  const today = 0.0;
  const pnl7d = -369.76;
  const pnl30d = -92.77;
  const pnlAll = -2094.16;

  // Adjust this (0..6) to align the month start visually
  const leadingEmpty = 6;

  return (
    <Card title="Trader snapshot" subtitle="A full panel before “How it works” (Binance-style calendar).">
      <div
        className="traderPanelGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {/* LEFT: Trader */}
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: 0.92,
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
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

        {/* RIGHT: Calendar */}
        <div
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.02)",
            padding: 14,
            display: "grid",
            gap: 12,
          }}
        >
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 950, fontSize: 14 }}>Futures PnL</div>
              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  fontSize: 12,
                  opacity: 0.9,
                }}
              >
                {monthLabel}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {[
                { k: "Today", v: today },
                { k: "7d", v: pnl7d },
                { k: "30d", v: pnl30d },
                { k: "All time", v: pnlAll },
              ].map((it) => {
                const t = pnlTone(it.v);
                return (
                  <div
                    key={it.k}
                    style={{
                      padding: 10,
                      borderRadius: 14,
                      border: `1px solid ${t.br}`,
                      background: t.bg,
                      display: "grid",
                      gap: 4,
                    }}
                  >
                    <div style={{ fontSize: 11, opacity: 0.75 }}>{it.k}</div>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{fmtMoney(it.v)}</div>
                  </div>
                );
              })}
            </div>
          </div>

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

              {dailyPnl.map((v, idx) => {
                const day = idx + 1;
                const t = pnlTone(v);
                return (
                  <div
                    key={day}
                    style={{
                      height: 44,
                      borderRadius: 10,
                      border: `1px solid ${t.br}`,
                      background: t.bg,
                      padding: "6px 8px",
                      display: "grid",
                      alignContent: "space-between",
                    }}
                    title={v === undefined ? `Day ${day}: no trades` : `Day ${day}: ${fmtMoney(v)}`}
                  >
                    <div style={{ fontSize: 11, opacity: 0.75 }}>{day}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.9 }}>
                      {v === undefined ? "" : (v > 0 ? "+" : "") + (Math.abs(v) >= 100 ? v.toFixed(0) : v.toFixed(2))}
                    </div>
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
              <Badge>Crypto only</Badge>
              <Badge>No exchange API</Badge>
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

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", opacity: 0.85 }}>
              <Badge>📈 R-based stats</Badge>
              <Badge>Win / Loss / BE</Badge>
              <Badge>🧠 Psychology notes</Badge>
              <Badge>🔒 No exchange API</Badge>
            </div>
          </div>

          <div className="mockDashboardWrap">
            <DashboardWindow>
              <MockDashboard />
            </DashboardWindow>
          </div>
        </div>

        {/* ✅ NEW: Trader panel BEFORE How it works */}
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

        {/* PRICING */}
        <div style={{ marginTop: 18 }}>
          <Card title="Pricing" subtitle="Simple subscription. Cancel anytime.">
            <div
              className="pricingGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: 14,
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  padding: 14,
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 28, fontWeight: 950, letterSpacing: -0.4 }}>
                    $9<span style={{ fontSize: 12, opacity: 0.7, fontWeight: 700 }}>/mo</span>
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>or $79/year</div>
                </div>

                <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
                  One plan for traders who want consistency and accountability.
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link href="/register" style={{ textDecoration: "none" }}>
                    <Button variant="primary">Registration</Button>
                  </Link>
                  <Link href="/login" style={{ textDecoration: "none" }}>
                    <Button variant="secondary">Login</Button>
                  </Link>
                </div>

                <div style={{ fontSize: 11, opacity: 0.6 }}>No exchange API • Local-first • Export anytime</div>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  padding: 14,
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 900 }}>Included in Pro</div>

                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, opacity: 0.9, fontSize: 13 }}>
                  <li>R-based stats (expectancy, Avg R, streaks)</li>
                  <li>Psychology notes + rule tracking</li>
                  <li>Templates / presets for repeatable setups</li>
                  <li>CSV export + JSON backup</li>
                  <li>Import with merge / replace modes</li>
                </ul>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.03)",
                      fontSize: 12,
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ✅ Cancel anytime
                  </span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.10)",
                      background: "rgba(255,255,255,0.03)",
                      fontSize: 12,
                      opacity: 0.85,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ✅ No API keys
                  </span>
                </div>
              </div>
            </div>
          </Card>
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
                  Yes. TradeLog is built around local-first principles. You keep control of your data and can export it
                  whenever you want.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* WHY R NOT PNL */}
        <div style={{ marginTop: 18 }}>
          <Card title="Why R, not PnL?" subtitle="Because money alone doesn’t tell the truth.">
            <div style={{ display: "grid", gap: 12, lineHeight: 1.6 }}>
              <div style={{ fontSize: 14, opacity: 0.8 }}>
                PnL changes with position size and luck. A +$200 trade can still be a bad decision if you risked $400.
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                R (risk units) measures discipline — how well you execute your plan, independent of account size.
              </div>
              <div
                style={{
                  marginTop: 6,
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: 13,
                  opacity: 0.85,
                }}
              >
                📌 A trader who respects risk stays consistent. R makes that visible.
              </div>
            </div>
          </Card>
        </div>

        {/* PnL vs R (animated) */}
        <div style={{ marginTop: 18 }}>
          <Card title="PnL vs R" subtitle="PnL is noisy. R shows execution quality.">
            <div
              className="pnlRGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 0.75fr",
                gap: 14,
                alignItems: "stretch",
              }}
            >
              {/* Chart */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background:
                    "radial-gradient(900px 260px at 20% 0%, rgba(140,80,255,0.12), transparent 55%), rgba(255,255,255,0.02)",
                  padding: 14,
                  paddingTop: 18,
                  paddingBottom: 18,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 8,
                    fontSize: 12,
                    opacity: 0.9,
                  }}
                >
                  <div style={{ opacity: 0.75 }}>Better ↑</div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.75 }}>
                      <span
                        style={{
                          width: 18,
                          height: 2,
                          background: "rgba(255,255,255,0.28)",
                          display: "inline-block",
                        }}
                      />
                      PnL (size & luck)
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 18,
                          height: 3,
                          background: "rgba(140,80,255,0.95)",
                          display: "inline-block",
                        }}
                      />
                      R (discipline)
                    </div>
                  </div>

                  <div style={{ opacity: 0.65 }}>Worse ↓</div>
                </div>

                <svg width="100%" height="210" viewBox="0 0 560 210" role="img" aria-label="PnL vs R chart">
                  <defs>
                    <linearGradient id="fade2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                    </linearGradient>

                    <filter id="glow2">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <rect x="0" y="0" width="560" height="210" fill="transparent" />

                  {Array.from({ length: 5 }).map((_, i) => {
                    const y = 40 + i * 35;
                    return (
                      <line
                        key={i}
                        x1="0"
                        y1={y}
                        x2="560"
                        y2={y}
                        stroke={i === 4 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)"}
                        strokeWidth="1"
                      />
                    );
                  })}

                  <rect x="0" y="175" width="560" height="35" fill="url(#fade2)" opacity="0.55" />

                  <polyline
                    className="pnlLine"
                    points="10,135 60,110 110,155 160,102 210,160 260,96 310,172 360,88 410,166 460,80 510,148 550,70"
                    fill="none"
                    stroke="rgba(255,255,255,0.26)"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  <polyline
                    className="rGlow"
                    points="10,165 60,160 110,153 160,148 210,140 260,132 310,124 360,116 410,106 460,98 510,88 550,78"
                    fill="none"
                    stroke="rgba(140,80,255,0.35)"
                    strokeWidth="7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    filter="url(#glow2)"
                    opacity="0.55"
                  />
                  <polyline
                    className="rLine"
                    points="10,165 60,160 110,153 160,148 210,140 260,132 310,124 360,116 410,106 460,98 510,88 550,78"
                    fill="none"
                    stroke="rgba(140,80,255,0.95)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {[
                    [10, 165],
                    [60, 160],
                    [110, 153],
                    [160, 148],
                    [210, 140],
                    [260, 132],
                    [310, 124],
                    [360, 116],
                    [410, 106],
                    [460, 98],
                    [510, 88],
                    [550, 78],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill="rgba(140,80,255,0.95)" />
                  ))}
                </svg>

                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.72, lineHeight: 1.5 }}>
                  PnL swings with size. <b>R stays comparable</b> — it reflects execution quality.
                </div>
              </div>

              {/* Example */}
              <div
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.02)",
                  padding: 14,
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 900 }}>Example</div>

                <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.6 }}>
                  Trade A: +$200 looks great.
                  <br />
                  If risk was $400 → <b>+0.5R</b>.
                </div>

                <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.6 }}>
                  Trade B: -$50 looks small.
                  <br />
                  If risk was $25 → <b>-2R</b>.
                </div>

                <div
                  style={{
                    marginTop: 4,
                    padding: 10,
                    borderRadius: 14,
                    border: "1px solid rgba(140,80,255,0.22)",
                    background: "rgba(140,80,255,0.08)",
                    fontSize: 12,
                    opacity: 0.9,
                    lineHeight: 1.5,
                  }}
                >
                  R makes results honest — and improvement measurable.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* BEFORE / AFTER */}
        <div style={{ marginTop: 18 }}>
          <Card title="Before vs After TradeLog" subtitle="Same trader. Different behavior.">
            <div
              className="beforeAfterGrid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(255,100,100,0.25)",
                  background: "rgba(255,100,100,0.06)",
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 16 }}>Before</div>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, fontSize: 13, opacity: 0.85 }}>
                  <li>Trading without a written plan</li>
                  <li>Revenge trades after losses</li>
                  <li>Moving stop-loss emotionally</li>
                  <li>Judging performance by random PnL</li>
                  <li>Repeating the same mistakes</li>
                </ul>
              </div>

              <div
                style={{
                  padding: 16,
                  borderRadius: 18,
                  border: "1px solid rgba(80,200,120,0.25)",
                  background: "rgba(80,200,120,0.06)",
                  display: "grid",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 16 }}>After</div>
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8, fontSize: 13, opacity: 0.9 }}>
                  <li>Clear rules before every trade</li>
                  <li>Losses tracked and reviewed in R</li>
                  <li>Stops respected, risk controlled</li>
                  <li>Consistency measured, not luck</li>
                  <li>Patterns identified and improved</li>
                </ul>
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
          .mockDashboardWrap :global(*) {
            /* no-op wrapper to scope selectors */
          }
          .mockDashboardWrap :global(*:not(script)) {
            /* we keep safe baseline */
          }
          .mockDashboardWrap :global([class*="demo"]),
          .mockDashboardWrap :global([data-demo]),
          .mockDashboardWrap :global(.demo),
          .mockDashboardWrap :global(.demoData) {
            display: none !important;
          }

          /* PnL vs R line draw animation */
          .pnlLine,
          .rLine,
          .rGlow {
            stroke-dasharray: 900;
            stroke-dashoffset: 900;
            animation: drawLine 1.25s ease forwards;
          }

          .pnlLine {
            animation-duration: 1.05s;
            animation-delay: 0.05s;
            opacity: 0;
            animation-name: drawPnl;
          }

          .rGlow {
            animation-delay: 0.18s;
            filter: blur(6px);
          }

          .rLine {
            animation-delay: 0.18s;
          }

          .pnlRGrid svg circle {
            opacity: 0;
            animation: fadeDots 0.35s ease forwards;
            animation-delay: 0.95s;
          }

          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes drawPnl {
            0% {
              stroke-dashoffset: 900;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
          }

          @keyframes fadeDots {
            to {
              opacity: 0.9;
            }
          }

          @media (max-width: 980px) {
            div[style*="grid-template-columns: 1.2fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="grid-template-columns: repeat(3, 1fr)"] {
              grid-template-columns: 1fr !important;
            }

            .pricingGrid {
              grid-template-columns: 1fr !important;
            }
            .faqGrid {
              grid-template-columns: 1fr !important;
            }
            .pnlRGrid {
              grid-template-columns: 1fr !important;
            }
            .beforeAfterGrid {
              grid-template-columns: 1fr !important;
            }

            /* ✅ Trader panel responsive */
            .traderPanelGrid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </Page>
  );
}
