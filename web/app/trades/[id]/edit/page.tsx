"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTradeById, updateTrade, type Trade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";

import { Page, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { Textarea } from "@/app/components/ui/Textarea";
import { Field } from "@/app/components/ui/Field";
import { ui } from "@/app/components/ui/styles";

function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

function safeNum(n: number | null | undefined) {
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

export default function EditTradePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const trade = getTradeById(id);

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

  // --- prefill ---
  const [symbol, setSymbol] = useState(trade.symbol);
  const [direction, setDirection] = useState<Direction>(trade.direction);

  const [entry, setEntry] = useState<number>(trade.entry);
  const [exit, setExit] = useState<number | "">(trade.exit ?? "");

  const [stopLoss, setStopLoss] = useState<number | "">(trade.stopLoss ?? "");
  const [takeProfit, setTakeProfit] = useState<number | "">(trade.takeProfit ?? "");

  const [openedAt, setOpenedAt] = useState(toLocalInputValue(trade.openedAt));
  const [closedAt, setClosedAt] = useState(toLocalInputValue(trade.closedAt));

  const [setupTag, setSetupTag] = useState(trade.setupTag ?? "");
  const [psychTagsRaw, setPsychTagsRaw] = useState((trade.psychTags ?? []).join(", "));

  const [thesis, setThesis] = useState(trade.notes?.thesis ?? "");
  const [wentWell, setWentWell] = useState(trade.notes?.whatWentWell ?? "");
  const [improve, setImprove] = useState(trade.notes?.improve ?? "");

  const [before, setBefore] = useState(trade.psych?.before ?? "");
  const [during, setDuring] = useState(trade.psych?.during ?? "");
  const [after, setAfter] = useState(trade.psych?.after ?? "");

  const [focus, setFocus] = useState(trade.psych?.focus ?? 3);
  const [fear, setFear] = useState(trade.psych?.fear ?? 3);
  const [greed, setGreed] = useState(trade.psych?.greed ?? 3);
  const [confidence, setConfidence] = useState(trade.psych?.confidence ?? 3);
  const [fatigue, setFatigue] = useState(trade.psych?.fatigue ?? 3);

  const [ruleBroken, setRuleBroken] = useState(trade.psych?.ruleBroken ?? false);
  const [ruleText, setRuleText] = useState(trade.psych?.ruleText ?? "");

  // --- derived ---
  const plannedRR = useMemo(() => {
    if (stopLoss === "" || takeProfit === "" || !(entry > 0)) return null;
    return calcPlannedRR({
      direction,
      entry,
      stopLoss: Number(stopLoss),
      takeProfit: Number(takeProfit),
    });
  }, [direction, entry, stopLoss, takeProfit]);

  const rMultiple = useMemo(() => {
    if (stopLoss === "" || exit === "" || !(entry > 0)) return null;
    return calcRMultiple({
      direction,
      entry,
      exit: Number(exit),
      stopLoss: Number(stopLoss),
    });
  }, [direction, entry, exit, stopLoss]);

  function handleSave() {
    if (!symbol.trim()) return alert("Вкажи symbol (наприклад ETHUSDT)");
    if (!(safeNum(entry) !== null && entry > 0)) return alert("Entry має бути > 0");
    if (!openedAt) return alert("Opened At обовʼязкове");

    const tags = psychTagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const patch: Partial<Trade> = {
      symbol: symbol.trim().toUpperCase(),
      direction,
      entry: Number(entry),
      exit: exit === "" ? null : Number(exit),
      stopLoss: stopLoss === "" ? null : Number(stopLoss),
      takeProfit: takeProfit === "" ? null : Number(takeProfit),
      openedAt: new Date(openedAt).toISOString(),
      closedAt: closedAt ? new Date(closedAt).toISOString() : null,
      setupTag: setupTag.trim(),
      psychTags: tags,
      notes: {
        thesis,
        whatWentWell: wentWell,
        improve,
      },
      psych: {
        before,
        during,
        after,
        focus,
        fear,
        greed,
        confidence,
        fatigue,
        ruleBroken,
        ruleText: ruleBroken ? ruleText : "",
      },
    };

    const ok = updateTrade(id, patch);
    if (!ok) return alert("Не вдалося оновити trade");

    router.push(`/trades/${id}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSave();
  }

  return (
    <Page>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        <div style={{ minWidth: 260 }}>
          <h1 style={{ fontSize: 34, fontWeight: 900, margin: 0 }}>Edit Trade</h1>
          <div style={{ ...ui.subtle, fontSize: 13, marginTop: 6 }}>
            {trade.symbol} · {trade.direction}
          </div>
        </div>

        <Row style={{ gap: 10, justifyContent: "flex-end" }}>
          <Button onClick={() => router.push(`/trades/${id}`)}>Back</Button>
          <Button variant="primary" onClick={handleSave} type="button">
            Save
          </Button>
        </Row>
      </div>

      {/* RR */}
      <Row style={{ marginBottom: 14, opacity: 0.9, gap: 18 }}>
        <div>
          <b>Planned R:R:</b> {plannedRR === null ? "—" : plannedRR.toFixed(2)}
        </div>
        <div>
          <b>Fact R:</b> {rMultiple === null ? "—" : rMultiple.toFixed(2)}
        </div>
      </Row>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        {/* Trade */}
        <Card title="Trade">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            <Field label="Symbol">
              <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </Field>

            <Field label="Direction">
              <Select value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </Select>
            </Field>

            <Field label="Entry">
              <Input
                type="number"
                inputMode="decimal"
                value={entry}
                onChange={(e) => setEntry(Number(e.target.value))}
              />
            </Field>

            <Field label="Exit (optional)">
              <Input
                type="number"
                inputMode="decimal"
                value={exit}
                onChange={(e) => setExit(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </Field>

            <Field label="Stop Loss (optional)">
              <Input
                type="number"
                inputMode="decimal"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </Field>

            <Field label="Take Profit (optional)">
              <Input
                type="number"
                inputMode="decimal"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </Field>

            <Field label="Opened At">
              <Input type="datetime-local" value={openedAt} onChange={(e) => setOpenedAt(e.target.value)} />
            </Field>

            <Field label="Closed At (optional)">
              <Input type="datetime-local" value={closedAt} onChange={(e) => setClosedAt(e.target.value)} />
            </Field>

            <Field label="Setup tag">
              <Input value={setupTag} onChange={(e) => setSetupTag(e.target.value)} />
            </Field>

            <Field label="Psych tags (comma)">
              <Input value={psychTagsRaw} onChange={(e) => setPsychTagsRaw(e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* Notes */}
        <Card title="Notes">
          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Thesis">
              <Input value={thesis} onChange={(e) => setThesis(e.target.value)} />
            </Field>

            <Field label="What went well">
              <Textarea value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
            </Field>

            <Field label="Improve next time">
              <Textarea value={improve} onChange={(e) => setImprove(e.target.value)} />
            </Field>
          </div>
        </Card>

        {/* Psychology */}
        <Card title="Psychology">
          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Before">
              <Textarea minHeight={90} value={before} onChange={(e) => setBefore(e.target.value)} />
            </Field>

            <Field label="During">
              <Textarea minHeight={90} value={during} onChange={(e) => setDuring(e.target.value)} />
            </Field>

            <Field label="After">
              <Textarea minHeight={90} value={after} onChange={(e) => setAfter(e.target.value)} />
            </Field>
          </div>

          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
              }}
            >
              <Field label="Focus">
                <Input type="number" min={1} max={5} value={focus} onChange={(e) => setFocus(Number(e.target.value))} />
              </Field>
              <Field label="Fear">
                <Input type="number" min={1} max={5} value={fear} onChange={(e) => setFear(Number(e.target.value))} />
              </Field>
              <Field label="Greed">
                <Input type="number" min={1} max={5} value={greed} onChange={(e) => setGreed(Number(e.target.value))} />
              </Field>
              <Field label="Confidence">
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                />
              </Field>
              <Field label="Fatigue">
                <Input type="number" min={1} max={5} value={fatigue} onChange={(e) => setFatigue(Number(e.target.value))} />
              </Field>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 900 }}>
              <input
                type="checkbox"
                checked={ruleBroken}
                onChange={(e) => setRuleBroken(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              Rule broken?
            </label>

            {ruleBroken && (
              <div style={{ marginTop: 10 }}>
                <Input
                  placeholder="Яке правило порушив?"
                  value={ruleText}
                  onChange={(e) => setRuleText(e.target.value)}
                />
              </div>
            )}
          </div>
        </Card>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Save changes
        </Button>
      </form>
    </Page>
  );
}
