"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { addTrade, type Trade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";

import { Page, HeaderRow, Row, Grid2, Grid5 } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Select } from "@/app/components/ui/Select";
import { Textarea } from "@/app/components/ui/Textarea";
import { Field } from "@/app/components/ui/Field";
import { ui } from "@/app/components/ui/styles";

import { getPresets, type TradePreset } from "@/lib/presetStore";

function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function NewTradePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- defaults ---
  const nowIso = useMemo(() => new Date().toISOString(), []);
  const nowLocal = useMemo(() => toLocalInputValue(nowIso), [nowIso]);

  // --- form state ---
  const [symbol, setSymbol] = useState("ETHUSDT");
  const [direction, setDirection] = useState<Direction>("SHORT");

  const [entry, setEntry] = useState<number>(0);
  const [exit, setExit] = useState<number | "">("");

  const [stopLoss, setStopLoss] = useState<number | "">("");
  const [takeProfit, setTakeProfit] = useState<number | "">("");

  const [openedAt, setOpenedAt] = useState(nowLocal);
  const [closedAt, setClosedAt] = useState("");

  const [setupTag, setSetupTag] = useState("breakout");
  const [psychTagsRaw, setPsychTagsRaw] = useState("FOMO");

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

  // --- presets ---
  const [presets, setPresets] = useState<TradePreset[]>([]);
  const [presetId, setPresetId] = useState("");
  const [autoApplied, setAutoApplied] = useState(false);

  useEffect(() => {
    setPresets(getPresets());
  }, []);

  const selectedPreset = useMemo(
    () => presets.find((p) => p.id === presetId) ?? null,
    [presets, presetId]
  );

  const chips = useMemo(() => presets.slice(0, 6), [presets]);

  function applyPreset(p?: TradePreset | null) {
    const preset = p ?? selectedPreset;
    if (!preset) return;

    if (preset.pair) setSymbol(String(preset.pair).trim().toUpperCase());

    if (preset.side) {
      const d = preset.side.toUpperCase() as "LONG" | "SHORT";
      setDirection(d);
    }

    if (preset.setup) setSetupTag(preset.setup);

    // do not overwrite what user already typed
    if (preset.notes) setThesis((prev) => (prev ? prev : preset.notes));
  }

  function onChipClick(p: TradePreset) {
    setPresetId(p.id);
    applyPreset(p);
  }

  // ✅ Auto apply preset from query param ?preset=<id>
  useEffect(() => {
    if (presets.length === 0) return;
    if (autoApplied) return;

    const id = searchParams?.get("preset") ?? "";
    if (!id) return;

    const p = presets.find((x) => x.id === id);
    if (!p) return;

    setPresetId(p.id);
    applyPreset(p);
    setAutoApplied(true);
  }, [presets, searchParams, autoApplied]);

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
    const sym = symbol.trim().toUpperCase();
    if (!sym) return alert("Вкажи symbol (наприклад ETHUSDT)");
    if (!(entry > 0)) return alert("Entry має бути > 0");
    if (!openedAt) return alert("Opened At обовʼязкове");

    const tags = psychTagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const trade: Trade = {
      id: uid(),
      createdAt: new Date().toISOString(),

      symbol: sym,
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

    addTrade(trade);
    router.push(`/trades/${trade.id}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSave();
  }

  return (
    <Page>
      <HeaderRow>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>Add Trade</h1>
          <div style={{ ...ui.subtle, fontSize: 13 }}>
            Fill the trade. You can leave Exit/SL/TP empty and update later.
          </div>
        </div>

        <Row>
          <Button onClick={() => router.push("/trades")}>Back</Button>
          <Button variant="primary" onClick={handleSave} type="button">
            Save
          </Button>
        </Row>
      </HeaderRow>

      {/* Presets */}
      <Card
        title="Preset"
        subtitle="One-click chips + URL preset (?preset=id)"
        style={{ marginBottom: 14 }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          {chips.length > 0 ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {chips.map((p) => (
                <Chip
                  key={p.id}
                  active={p.id === presetId}
                  onClick={() => onChipClick(p)}
                  title={[
                    p.name,
                    p.pair ? `• ${p.pair}` : "",
                    p.side ? `• ${p.side}` : "",
                    p.setup ? `• ${p.setup}` : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {p.name}
                </Chip>
              ))}
            </div>
          ) : (
            <div style={{ opacity: 0.7 }}>
              Немає пресетів. Створи їх у{" "}
              <Link href="/templates" style={{ textDecoration: "underline", color: "inherit" }}>
                Templates
              </Link>
              .
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ minWidth: 240 }}>
              <Select value={presetId} onChange={(e) => setPresetId(e.target.value)}>
                <option value="">(none)</option>
                {presets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </div>

            <Button variant="secondary" onClick={() => applyPreset()} disabled={!presetId}>
              Apply
            </Button>

            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Manage presets</Button>
            </Link>

            {selectedPreset ? (
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {selectedPreset.pair ? <Pill>{selectedPreset.pair}</Pill> : null}
                {selectedPreset.side ? <Pill>{selectedPreset.side}</Pill> : null}
                {selectedPreset.setup ? <Pill>{selectedPreset.setup}</Pill> : null}
              </div>
            ) : null}
          </div>
        </div>
      </Card>

      {/* RR */}
      <Row style={{ marginBottom: 14, opacity: 0.9 }}>
        <div>
          <b>Planned R:R:</b> {plannedRR ? plannedRR.toFixed(2) : "—"}
        </div>
        <div>
          <b>Fact R:</b> {rMultiple ? rMultiple.toFixed(2) : "—"}
        </div>
      </Row>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <Card title="Trade">
          <Grid2>
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
          </Grid2>
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
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={fatigue}
                  onChange={(e) => setFatigue(Number(e.target.value))}
                />
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
          Save trade
        </Button>
      </form>
    </Page>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.02)",
        fontSize: 12,
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  );
}

function Chip({
  children,
  onClick,
  active,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        cursor: "pointer",
        borderRadius: 999,
        padding: "8px 12px",
        border: active ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(255,255,255,0.10)",
        background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
        color: "inherit",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: 0.1,
      }}
    >
      {children}
    </button>
  );
}
