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

  // ✅ show Notes only when at least one field has text
  const hasNotes =
    Boolean(trade.notes?.thesis?.trim()) ||
    Boolean(trade.notes?.whatWentWell?.trim()) ||
    Boolean(trade.notes?.improve?.trim());

  // ✅ show psych text only if any field has text
  const hasPsychText =
    Boolean(trade.psych?.before?.trim()) ||
    Boolean(trade.psych?.during?.trim()) ||
    Boolean(trade.psych?.after?.trim());

  const openedLabel = new Date(trade.openedAt).toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>
            {trade.symbol} · {trade.direction}
          </h1>
          <div style={{ opacity: 0.7 }}>{openedLabel}</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/trades">
            <button style={btn()}>← Back</button>
          </Link>

          <Link href={`/trades/${trade.id}/edit`}>
            <button style={btn()}>Edit</button>
          </Link>
        </div>
      </div>

      {/* Summary */}
      <section style={card()}>
        <h2 style={h2()}>Summary</h2>
        <Grid>
          <Item label="Entry" value={trade.entry} />
          <Item label="Exit" value={trade.exit ?? "—"} />
          <Item label="Stop Loss" value={trade.stopLoss ?? "—"} />
          <Item label="Take Profit" value={trade.takeProfit ?? "—"} />
          <Item label="Setup" value={trade.setupTag || "—"} />
          <Item
            label="R"
            value={r !== null ? r.toFixed(2) : "—"}
            color={r !== null ? (r >= 0 ? "#4ade80" : "#f87171") : "#999"}
          />
        </Grid>
      </section>

      {/* ✅ Notes (render only if not empty) */}
      {hasNotes && (
        <section style={card()}>
          <h2 style={h2()}>Notes</h2>
          <Text label="Thesis" value={trade.notes?.thesis ?? ""} />
          <Text label="What went well" value={trade.notes?.whatWentWell ?? ""} />
          <Text label="Improve next time" value={trade.notes?.improve ?? ""} />
        </section>
      )}

      {/* Psychology */}
      <section style={card()}>
        <h2 style={h2()}>Psychology</h2>

        {/* ✅ if no text — show a small hint */}
        {hasPsychText ? (
          <>
            <Text label="Before" value={trade.psych?.before ?? ""} />
            <Text label="During" value={trade.psych?.during ?? ""} />
            <Text label="After" value={trade.psych?.after ?? ""} />
          </>
        ) : (
          <div style={{ opacity: 0.7, marginBottom: 10 }}>No psychology notes yet.</div>
        )}

        <Grid>
          <Item label="Focus" value={trade.psych?.focus ?? 3} />
          <Item label="Fear" value={trade.psych?.fear ?? 3} />
          <Item label="Greed" value={trade.psych?.greed ?? 3} />
          <Item label="Confidence" value={trade.psych?.confidence ?? 3} />
          <Item label="Fatigue" value={trade.psych?.fatigue ?? 3} />
          <Item
            label="Rule broken"
            value={trade.psych?.ruleBroken ? "YES" : "NO"}
            color={trade.psych?.ruleBroken ? "#f87171" : "#4ade80"}
          />
        </Grid>

        {trade.psych?.ruleBroken && trade.psych?.ruleText?.trim() ? (
          <div style={{ marginTop: 10, opacity: 0.9 }}>
            <b>Which rule:</b> {trade.psych.ruleText}
          </div>
        ) : null}
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
  return { fontSize: 18, fontWeight: 900, marginBottom: 10 };
}

function btn(): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "transparent",
    fontWeight: 900,
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
      <div style={{ fontWeight: 900, color }}>{value}</div>
    </div>
  );
}

function Text({ label, value }: { label: string; value: string }) {
  const v = (value || "").trim();
  if (!v) return null;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ opacity: 0.6, fontSize: 12 }}>{label}</div>
      <div style={{ whiteSpace: "pre-wrap" }}>{v}</div>
    </div>
  );
}
