"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTradeById } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

export default function TradeDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const trade = getTradeById(id);

  if (!trade) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Trade not found</h1>
        <Link href="/trades">
          <button style={btn()}>← Back to trades</button>
        </Link>
      </div>
    );
  }

  const r = tradeR(trade);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>
            {trade.symbol} · {trade.direction}
          </h1>
          <div style={{ opacity: 0.7 }}>
            {new Date(trade.openedAt).toLocaleString()}
          </div>
        </div>

        <Link href="/trades">
          <button style={btn()}>← Back</button>
        </Link>

        <Link href={`/trades/${trade.id}/edit`}>
  <button style={btn()}>Edit</button>
</Link>
      </div>

      {/* Summary */}
      <section style={card()}>
        <h2 style={h2()}>Summary</h2>
        <Grid>
          <Item label="Entry" value={trade.entry} />
          <Item label="Exit" value={trade.exit ?? "—"} />
          <Item label="Stop Loss" value={trade.stopLoss ?? "—"} />
          <Item label="Take Profit" value={trade.takeProfit ?? "—"} />
          <Item label="Setup" value={trade.setupTag} />
          <Item
            label="R"
            value={r !== null ? r.toFixed(2) : "—"}
            color={r !== null ? (r >= 0 ? "#4ade80" : "#f87171") : undefined}
          />
        </Grid>
      </section>

      {/* Notes */}
      <section style={card()}>
        <h2 style={h2()}>Notes</h2>
        <Text label="Thesis" value={trade.notes.thesis} />
        <Text label="What went well" value={trade.notes.whatWentWell} />
        <Text label="Improve next time" value={trade.notes.improve} />
      </section>

      {/* Psychology */}
      <section style={card()}>
        <h2 style={h2()}>Psychology</h2>

        <Text label="Before" value={trade.psych.before} />
        <Text label="During" value={trade.psych.during} />
        <Text label="After" value={trade.psych.after} />

        <Grid>
          <Item label="Focus" value={trade.psych.focus} />
          <Item label="Fear" value={trade.psych.fear} />
          <Item label="Greed" value={trade.psych.greed} />
          <Item label="Confidence" value={trade.psych.confidence} />
          <Item label="Fatigue" value={trade.psych.fatigue} />
        </Grid>

        <div style={{ marginTop: 10 }}>
          <b>Rule broken:</b>{" "}
          {trade.psych.ruleBroken ? (
            <span style={{ color: "#f87171" }}>
              YES — {trade.psych.ruleText}
            </span>
          ) : (
            <span style={{ color: "#4ade80" }}>NO</span>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function card(): React.CSSProperties {
  return {
    border: "1px solid #222",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  };
}

function h2(): React.CSSProperties {
  return { fontSize: 18, fontWeight: 800, marginBottom: 10 };
}

function btn(): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "transparent",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {children}
    </div>
  );
}

function Item({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) {
  return (
    <div>
      <div style={{ opacity: 0.6, fontSize: 12 }}>{label}</div>
      <div style={{ fontWeight: 800, color }}>{value}</div>
    </div>
  );
}

function Text({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ opacity: 0.6, fontSize: 12 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}
