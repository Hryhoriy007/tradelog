"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTradeById, updateTrade, type Trade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";

import { Page, HeaderRow, Row, Grid2, Grid3, Grid5 } from "@/app/components/ui/Layout";
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
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EditTradePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [trade, setTrade] = useState<Trade | null>(null);

  useEffect(() => {
    setMounted(true);
    setTrade(getTradeById(id));
  }, [id]);

  // --- form state (filled after trade loads) ---
  const inited = useRef(false);

  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<Direction>("LONG");

  const [entry, setEntry] = useState<number>(0);
  const [exit, setExit] = useState<number | "">("");

  const [stopLoss, setStopLoss] = useState<number | "">("");
  const [takeProfit, setTakeProfit] = useState<number | "">("");

  const [openedAt, setOpenedAt] = useState("");
  const [closedAt, setClosedAt] = useState("");

  const [setupTag, setSetupTag] = useState("");
  const [psychTagsRaw, setPsychTagsRaw] = useState("");

  const [thesis, setThesis] = useState("");
  const [wentWell, setWentWell] = useState("");
  const [improve, setImprove] = useState("");

  const [before, setBefore] = useState("");
  const [during, setDuring] = useState("");
  const [after, setAfter] = useState("");

  const [focus, setFocus] = useState(3);
  const [fear, setFear] = useState(3);
  const [greed, setGreed] = useState(3);
  const [confidence, setConfidence] = useState(3);
  const [fatigue, setFatigue] = useState(3);

  const [ruleBroken, setRuleBroken] = useState(false);
  const [ruleText, setRuleText] = useState("");

  useEffect(() => {
    if (!trade || inited.current) return;
    inited.current = true;

    setSymbol(trade.symbol ?? "");
    setDirection(trade.direction);

    setEntry(trade.entry ?? 0);
    setExit(trade.exit ?? "");

    setStopLoss(trade.stopLoss ?? "");
    setTakeProfit(trade.takeProfit ?? "");

    setOpenedAt(toLocalInputValue(trade.openedAt));
    setClosedAt(toLocalInputValue(trade.closedAt));

    setSetupTag(trade.setupTag ?? "");
    setPsychTagsRaw((trade.psychTags ?? []).join(", "));

    setThesis(trade.notes?.thesis ?? "");
    setWentWell(trade.notes?.whatWentWell ?? "");
    setImprove(trade.notes?.improve ?? "");

    setBefore(trade.psych?.before ?? "");
    setDuring(trade.psych?.during ?? "");
    setAfter(trade.psych?.after ?? "");

    setFocus(trade.psych?.focus ?? 3);
    setFear(trade.psych?.fear ?? 3);
    setGreed(trade.psych?.greed ?? 3);
    setConfidence(trade.psych?.confidence ?? 3);
    setFatigue(trade.psych?.fatigue ?? 3);

    setRuleBroken(trade.psych?.ruleBroken ?? false);
    setRuleText(trade.psych?.ruleText ?? "");
  }, [trade]);

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
    if (!(entry > 0)) return alert("Entry має бути > 0");
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
        <Button onClick={() => router.push("/trades")}>← Back to trades</Button>
      </Page>
    );
  }

  return (
    <Page>
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>Edit Trade</h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            {trade.symbol} · {trade.direction}
          </div>
        </div>

        <Row style={{ alignItems: "center" }}>
          <Button onClick={() => router.push(`/trades/${id}`)}>Back</Button>
          <Button variant="primary" onClick={handleSave} type="button">
            Save
          </Button>
        </Row>
      </HeaderRow>

      <Row style={{ marginBottom: 14, opacity: 0.9 }}>
        <div>
          <b>Planned R:R:</b> {plannedRR !== null ? plannedRR.toFixed(2) : "—"}
        </div>
        <div>
          <b>Fact R:</b> {rMultiple !== null ? rMultiple.toFixed(2) : "—"}
        </div>
      </Row>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <Card title="Trade">
          {/* 3 колонки на широкому екрані, а на вузькому автоматично стане норм */}
          <Grid3>
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
              <Input type="number" inputMode="decimal" value={entry} onChange={(e) => setEntry(Number(e.target.value))} />
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
          </Grid3>
        </Card>

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
            <Grid5>
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
            </Grid5>
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
                <Input placeholder="Яке правило порушив?" value={ruleText} onChange={(e) => setRuleText(e.target.value)} />
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
