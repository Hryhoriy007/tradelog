"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { deleteTrade, getTradeById, type Trade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple } from "@/lib/tradeMath";
import { tradeR } from "@/lib/stats";

import { Page, HeaderRow, Row, Grid2, Grid5 } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { ui } from "@/app/components/ui/styles";

function fmt(n: number | null | undefined, digits = 2) {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}

function pill(text: string, tone: "neutral" | "green" | "red" = "neutral") {
  const color =
    tone === "green" ? "#4ade80" : tone === "red" ? "#f87171" : "rgba(255,255,255,0.85)";
  const border =
    tone === "green" ? "rgba(74,222,128,0.35)" : tone === "red" ? "rgba(248,113,113,0.35)" : "#222";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${border}`,
        color,
        fontWeight: 900,
        fontSize: 12,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function dtLocal(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  // local, але це викликається тільки після mount (див. нижче), тож hydration не ламається
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export default function TradeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [trade, setTrade] = useState<Trade | null>(null);

  useEffect(() => {
    setMounted(true);
    setTrade(getTradeById(id));
  }, [id]);

  const plannedRR = useMemo(() => {
    if (!trade) return null;
    if (trade.stopLoss === null || trade.takeProfit === null || trade.entry <= 0) return null;
    return calcPlannedRR({
      direction: trade.direction,
      entry: trade.entry,
      stopLoss: trade.stopLoss,
      takeProfit: trade.takeProfit,
    });
  }, [trade]);

  const factR = useMemo(() => {
    if (!trade) return null;
    if (trade.stopLoss === null || trade.exit === null || trade.entry <= 0) return null;
    return calcRMultiple({
      direction: trade.direction,
      entry: trade.entry,
      exit: trade.exit,
      stopLoss: trade.stopLoss,
    });
  }, [trade]);

  const r = useMemo(() => (trade ? tradeR(trade) : null), [trade]);

  if (!mounted) {
    return (
      <Page>
        <div style={{ ...ui.card, textAlign: "center", opacity: 0.8 }}>Loading…</div>
      </Page>
    );
  }

  if (!trade) {
    return (
      <Page>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Trade not found</h1>
        <Row style={{ marginTop: 12 }}>
          <Button onClick={() => router.push("/trades")}>← Back to trades</Button>
        </Row>
      </Page>
    );
  }

  function onDelete() {
    const ok = confirm("Delete this trade? This cannot be undone.");
    if (!ok) return;
    deleteTrade(trade.id);
    router.push("/trades");
  }

  const sideTone = trade.direction === "LONG" ? "green" : "red";
  const rTone = r === null ? "neutral" : r >= 0 ? "green" : "red";

  return (
    <Page>
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8 }}>
            {trade.symbol} {pill(trade.direction, sideTone)}
          </h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            Opened: <b>{dtLocal(trade.openedAt)}</b> · Closed: <b>{dtLocal(trade.closedAt)}</b>
          </div>
        </div>

        <Row style={{ alignItems: "center" }}>
          <Button onClick={() => router.push("/trades")}>Back</Button>

          <Link href={`/trades/${trade.id}/edit`}>
            <Button>Edit</Button>
          </Link>

          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </Row>
      </HeaderRow>

      <Row style={{ marginBottom: 14, gap: 10 }}>
        {pill(`Planned R:R ${fmt(plannedRR, 2)}`, "neutral")}
        {pill(`Fact R ${fmt(factR, 2)}`, "neutral")}
        {pill(`R ${r === null ? "—" : fmt(r, 2)}`, rTone)}
      </Row>

      <Card title="Trade">
        <Grid2>
          <Info label="Symbol" value={trade.symbol} bold />
          <Info
            label="Direction"
            value={trade.direction}
            color={trade.direction === "LONG" ? "#4ade80" : "#f87171"}
            bold
          />

          <Info label="Entry" value={trade.entry} />
          <Info label="Exit" value={trade.exit} />

          <Info label="Stop Loss" value={trade.stopLoss} />
          <Info label="Take Profit" value={trade.takeProfit} />

          <Info label="Opened At" value={dtLocal(trade.openedAt)} />
          <Info label="Closed At" value={dtLocal(trade.closedAt)} />

          <Info label="Setup tag" value={trade.setupTag || "—"} />
          <Info
            label="Psych tags"
            value={(trade.psychTags ?? []).length ? (trade.psychTags ?? []).join(", ") : "—"}
          />
        </Grid2>
      </Card>

      <div style={{ marginTop: 16 }}>
        <Card title="Notes">
          <div style={{ display: "grid", gap: 12 }}>
            <Block label="Thesis" text={trade.notes?.thesis} />
            <Block label="What went well" text={trade.notes?.whatWentWell} />
            <Block label="Improve next time" text={trade.notes?.improve} />
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 16 }}>
        <Card title="Psychology">
          <div style={{ display: "grid", gap: 12 }}>
            <Block label="Before" text={trade.psych?.before} />
            <Block label="During" text={trade.psych?.during} />
            <Block label="After" text={trade.psych?.after} />
          </div>

          <div style={{ marginTop: 14 }}>
            <Grid5>
              <Score label="Focus" value={trade.psych?.focus} />
              <Score label="Fear" value={trade.psych?.fear} />
              <Score label="Greed" value={trade.psych?.greed} />
              <Score label="Confidence" value={trade.psych?.confidence} />
              <Score label="Fatigue" value={trade.psych?.fatigue} />
            </Grid5>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Rules</div>
            <div style={{ opacity: 0.85 }}>
              {trade.psych?.ruleBroken ? (
                <>
                  {pill("Rule broken", "red")}{" "}
                  <span style={{ marginLeft: 8 }}>
                    {trade.psych?.ruleText?.trim() ? trade.psych.ruleText : "—"}
                  </span>
                </>
              ) : (
                <>
                  {pill("No rule broken", "green")} <span style={{ marginLeft: 8 }}>Good discipline.</span>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div style={{ opacity: 0.6, fontSize: 12, marginTop: 10 }}>
        Tip: If R is “—”, fill <b>Stop Loss</b> and <b>Exit</b>.
      </div>
    </Page>
  );
}

function Info({
  label,
  value,
  bold,
  color,
}: {
  label: string;
  value: any;
  bold?: boolean;
  color?: string;
}) {
  const v = value === null || value === undefined || value === "" ? "—" : String(value);
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: bold ? 900 : 700, color: color || "inherit", wordBreak: "break-word" }}>
        {v}
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text?: string | null }) {
  const v = (text ?? "").trim();
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.8 }}>{label}</div>
      <div
        style={{
          border: "1px solid #222",
          borderRadius: 14,
          padding: 12,
          opacity: v ? 0.95 : 0.6,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {v || "—"}
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value?: number | null }) {
  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 900 }}>{value ?? "—"}</div>
    </div>
  );
}
