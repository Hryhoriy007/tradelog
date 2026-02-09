"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function mapPresetSideToDirection(side: any): Direction {
  const v = String(side ?? "").toUpperCase();
  if (v === "SHORT") return "SHORT";
  if (v === "LONG") return "LONG";
  // legacy "Long"/"Short"
  if (v === "SHORT" || v === "SHORT ") return "SHORT";
  return "LONG";
}

function normPair(p: any) {
  return String(p ?? "").trim().toUpperCase();
}

export default function NewTradePage() {
  const router = useRouter();
  const params = useSearchParams();

  const nowIso = useMemo(() => new Date().toISOString(), []);
  const nowLocal = useMemo(() => toLocalInputValue(nowIso), [nowIso]);

  // presets
  const [presets, setPresets] = useState<TradePreset[]>([]);
  const [presetId, setPresetId] = useState<string>("");

  useEffect(() => {
    setPresets(getPresets());
  }, []);

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

  // apply preset by id (doesn't overwrite user-entered numeric fields)
  const applyPreset = (p: TradePreset) => {
    const pair = normPair((p as any).pair);
    const dir = mapPresetSideToDirection((p as any).side);
    const setup = String((p as any).setup ?? "").trim();
    const notes = String((p as any).notes ?? "").trim();

    if (pair) setSymbol(pair);
    if (dir) setDirection(dir);
    if (setup) setSetupTag(setup);

    // put preset notes into thesis if thesis empty
    if (notes && !thesis.trim()) setThesis(notes);
  };

  // read preset from URL on first load (or whenever params change)
  useEffect(() => {
    const pid = params.get("preset");
    if (!pid) return;

    // ensure presets loaded
    const list = getPresets();
    setPresets(list);

    const found = list.find((x) => x.id === pid);
    if (!found) return;

    setPresetId(found.id);
    applyPreset(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // when user changes preset from dropdown
  useEffect(() => {
    if (!presetId) return;
    const p = presets.find((x) => x.id === presetId);
    if (!p) return;
    applyPreset(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetId]);

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

  const selectedPreset = useMemo(() => presets.find((p) => p.id === presetId) ?? null, [presets, presetId]);

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

      {/* Preset bar */}
      <Card title="Preset" subtitle="Optional: auto-fill Pair/Side/Setup from Templates">
        <Grid2>
          <Field label="Choose preset">
            <Select
              value={presetId}
              onChange={(e) => setPresetId(e.target.value)}
              title="Selecting preset will auto-fill Pair/Side/Setup"
            >
              <option value="">(none)</option>
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </Field>

          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ fontSize: 13, opacity: 0.75 }}>Actions</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/templates" style={{ textDecoration: "none" }}>
                <Button variant="secondary" title="Open Templates page">
                  Templates
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={() => setPresetId("")}
                disabled={!presetId}
                title="Clear selected preset"
              >
                Clear preset
              </Button>
              {selectedPreset ? (
                <Button
                  variant="secondary"
                  onClick={() => applyPreset(selectedPreset)}
                  title="Re-apply preset fields"
                >
                  Apply again
                </Button>
              ) : null}
            </div>
          </div>
        </Grid2>

        {selectedPreset ? (
          <div style={{ marginTop: 10, opacity: 0.85, fontSize: 13 }}>
            Using: <b>{selectedPreset.name}</b>
            {selectedPreset.pair ? <> • Pair: <b>{String(selectedPreset.pair).toUpperCase()}</b></> : null}
            {selectedPreset.side ? <> • Side: <b>{String(selectedPreset.side)}</b></> : null}
            {selectedPreset.setup ? <> • Setup: <b>{String(selectedPreset.setup)}</b></> : null}
          </div>
        ) : (
          <div style={{ marginTop: 10, opacity: 0.6, fontSize: 13 }}>
            Tip: create presets in <b>Templates</b> → then use them here.
          </div>
        )}
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
        {/* Trade */}
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
