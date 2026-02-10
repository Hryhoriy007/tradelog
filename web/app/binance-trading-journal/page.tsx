// web/app/binance-trading-journal/page.tsx
import Link from "next/link";

import { Background3D } from "../components/marketing/Background3D";
import DashboardWindow from "../components/marketing/DashboardWindow";
import MockDashboard from "../components/marketing/MockDashboard";

export const metadata = {
  title: "Binance Trading Journal — TradeLog",
  description:
    "A crypto trading journal for Binance & Bybit traders. Track decisions, psychology, and performance in R — not emotions.",
};

function Section({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-balance text-2xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-white/70">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export default function BinanceLandingPage() {
  return (
    <main className="relative min-h-screen">
      <Background3D />

      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 pb-10 pt-12 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 flex flex-wrap gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Binance / Bybit
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Futures & Spot
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              No exchange API
            </span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Stop guessing why you lose on Binance & Bybit.
            <br />
            <span className="text-white/70">Track decisions. Fix behavior. Grow in R.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            TradeLog is a crypto trading journal that helps you see patterns behind your wins,
            losses, and mistakes — with R-based stats and psychology notes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Start free trial
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              View main page
            </Link>

            <Link
              href="/templates"
              className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/5"
            >
              View templates
            </Link>
          </div>

          <div className="mt-4 text-xs text-white/50">
            No API keys · No spreadsheets · Your data stays yours
          </div>
        </div>

        {/* Preview */}
        <div className="relative">
          <DashboardWindow>
            <MockDashboard />
          </DashboardWindow>
        </div>
      </section>

      {/* Pain */}
      <Section
        title="If you trade on Binance or Bybit, you’ve been here:"
        subtitle="This is exactly where most traders get stuck — not because of strategy, but because of behavior."
      >
        <ul className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            You made money — but you don’t know <b>why</b>.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            You lost money — and blamed the market.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            Same mistakes. Same emotions. Same outcome.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
            You track PnL, but ignore <b>discipline</b>.
          </li>
        </ul>
      </Section>

      {/* Solution */}
      <Section
        title="TradeLog shows what Binance & Bybit never will"
        subtitle="Exchanges show trades. TradeLog shows decisions."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">📊 R-based performance</div>
            <p className="mt-2 text-sm text-white/70">
              Not PnL. Not luck. See expectancy and consistency in R.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">🧠 Psychology & context</div>
            <p className="mt-2 text-sm text-white/70">
              Log bias, emotions, rules, and the real reason you entered/exited.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">🔁 Pattern detection</div>
            <p className="mt-2 text-sm text-white/70">
              Identify overtrading, revenge trades, FOMO entries, and best setups.
            </p>
          </div>
        </div>
      </Section>

      {/* No API */}
      <Section
        title="No exchange API. And that’s the point."
        subtitle="Most journals want your API keys. TradeLog doesn’t — because manual logging builds discipline."
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
          <ul className="grid gap-2 md:grid-cols-2">
            <li>✅ You stay intentional while logging</li>
            <li>✅ Zero API/security risk</li>
            <li>✅ Works for Binance & Bybit (spot + futures)</li>
            <li>✅ Your data stays yours</li>
          </ul>
        </div>
      </Section>

      {/* How it works */}
      <Section title="How it works">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">1) Log the trade</div>
            <p className="mt-2 text-sm text-white/70">
              Pair · Side · Entry · Stop · Target · R — done in seconds.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">2) Capture the context</div>
            <p className="mt-2 text-sm text-white/70">
              Setup, bias, emotions, rules — what actually mattered.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-medium">3) Review the truth</div>
            <p className="mt-2 text-sm text-white/70">
              Equity in R, mistakes, overtrading patterns — no excuses.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Ready to stop repeating the same trades?</h3>
            <p className="mt-1 text-sm text-white/70">
              Start free trial or open the app — no exchange API required.
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <Link
              href="/register"
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
            >
              Start free trial
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
