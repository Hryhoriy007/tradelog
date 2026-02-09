"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTradeById, updateTrade, type Trade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";

function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 800, opacity: 0.85 }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const S = {
  page: {
    maxWidth: 980,
    margin: "0 auto",
    padding: 24,
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  } as React.CSSProperties,
  card: {
    border: "1px solid #222",
    borderRadius: 16,
    padding: 18,
  } as React.CSSProperties,
  h2: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 12,
  } as React.CSSProperties,
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  } as React.CSSProperties,
  grid5: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 12,
  } as React.CSSProperties,
  control: {
    width: "100%",
    height: 44,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid #222",
    background: "transparent",
    color: "inherit",
    outline: "none",
  } as React.CSSProperties,
  textarea: (minHeight = 110) =>
    ({
      width: "100%",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid #222",
      background: "transparent",
      color: "inherit",
      outline: "none",
      minHeight,
      resize: "vertical",
    } as React.CSSProperties),
  btn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "transparent",
    fontWeight: 900,
    cursor: "pointer",
    height: 42,
  } as React.CSSProperties,
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "#fff",
    color: "#111",
    fontWeight: 900,
    cursor: "pointer",
    height: 42,
  } as React.CSSProperties,
};

export default function EditTradePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const trade = getTradeById(id);

  if (!trade) {
    return (
      <div style={S.page}>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Trade not found</h1>
        <button style={S.btn} onClick={() => router.push("/trades")}>
          ← Back to trades
        </button>
      </div>
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
    if (stopLoss === "" || takeProfit === "" || entry <= 0) return null;
    return calcPlannedRR({
      direction,
      entry,
      stopLoss: Number(stopLoss),
      takeProfit: Number(takeProfit),
    });
  }, [direction, entry, stopLoss, takeProfit]);

  const rMultiple = useMemo(() => {
    if (stopLoss === "" || exit === "" || entry <= 0) return null;
    return calcRMultiple({
      direction,
      entry,
      exit: Number(exit),
      stopLoss: Number(stopLoss),
    });
  }, [direction, entry, exit, stopLoss]);

  function buildPatch(): Partial<Trade> {
    const tags = psychTagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    return {
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
  }

  function handleSave() {
    if (!symbol.trim()) return alert("Вкажи symbol (наприклад ETHUSDT)");
    if (!(entry > 0)) return alert("Entry має бути > 0");
    if (!openedAt) return alert("Opened At обовʼязкове");

    const ok = updateTrade(id, buildPatch());
    if (!ok) return alert("Не вдалося оновити trade");

    router.push(`/trades/${id}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSave();
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>
            Edit Trade
          </h1>
          <div style={{ opacity: 0.7 }}>
            {trade.symbol} · {trade.direction}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={S.btn} onClick={() => router.push(`/trades/${id}`)}>
            Back
          </button>
          <button style={S.btnPrimary} onClick={handleSave} type="button">
            Save
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14, opacity: 0.9 }}>
        <div>
          <b>Planned R:R:</b> {plannedRR ? plannedRR.toFixed(2) : "—"}
        </div>
        <div>
          <b>Fact R:</b> {rMultiple ? rMultiple.toFixed(2) : "—"}
        </div>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <section style={S.card}>
          <h2 style={S.h2}>Trade</h2>

          <div style={S.grid2}>
            <Field label="Symbol">
              <input style={S.control} value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </Field>

            <Field label="Direction">
              <select style={S.control} value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </Field>

            <Field label="Entry">
              <input style={S.control} type="number" inputMode="decimal" value={entry} onChange={(e) => setEntry(Number(e.target.value))} />
            </Field>

            <Field label="Exit (optional)">
              <input style={S.control} type="number" inputMode="decimal" value={exit} onChange={(e) => setExit(e.target.value === "" ? "" : Number(e.target.value))} />
            </Field>

            <Field label="Stop Loss (optional)">
              <input style={S.control} type="number" inputMode="decimal" value={stopLoss} onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))} />
            </Field>

            <Field label="Take Profit (optional)">
              <input style={S.control} type="number" inputMode="decimal" value={takeProfit} onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))} />
            </Field>

            <Field label="Opened At">
              <input style={S.control} type="datetime-local" value={openedAt} onChange={(e) => setOpenedAt(e.target.value)} />
            </Field>

            <Field label="Closed At (optional)">
              <input style={S.control} type="datetime-local" value={closedAt} onChange={(e) => setClosedAt(e.target.value)} />
            </Field>

            <Field label="Setup tag">
              <input style={S.control} value={setupTag} onChange={(e) => setSetupTag(e.target.value)} />
            </Field>

            <Field label="Psych tags (comma)">
              <input style={S.control} value={psychTagsRaw} onChange={(e) => setPsychTagsRaw(e.target.value)} />
            </Field>
          </div>
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>Notes</h2>

          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Thesis">
              <input style={S.control} value={thesis} onChange={(e) => setThesis(e.target.value)} />
            </Field>

            <Field label="What went well">
              <textarea style={S.textarea()} value={wentWell} onChange={(e) => setWentWell(e.target.value)} />
            </Field>

            <Field label="Improve next time">
              <textarea style={S.textarea()} value={improve} onChange={(e) => setImprove(e.target.value)} />
            </Field>
          </div>
        </section>

        <section style={S.card}>
          <h2 style={S.h2}>Psychology</h2>

          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Before">
              <textarea style={S.textarea(80)} value={before} onChange={(e) => setBefore(e.target.value)} />
            </Field>

            <Field label="During">
              <textarea style={S.textarea(80)} value={during} onChange={(e) => setDuring(e.target.value)} />
            </Field>

            <Field label="After">
              <textarea style={S.textarea(80)} value={after} onChange={(e) => setAfter(e.target.value)} />
            </Field>
          </div>

          <div style={{ marginTop: 14, ...S.grid5 }}>
            <Field label="Focus">
              <input style={S.control} type="number" min={1} max={5} value={focus} onChange={(e) => setFocus(Number(e.target.value))} />
            </Field>
            <Field label="Fear">
              <input style={S.control} type="number" min={1} max={5} value={fear} onChange={(e) => setFear(Number(e.target.value))} />
            </Field>
            <Field label="Greed">
              <input style={S.control} type="number" min={1} max={5} value={greed} onChange={(e) => setGreed(Number(e.target.value))} />
            </Field>
            <Field label="Confidence">
              <input style={S.control} type="number" min={1} max={5} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} />
            </Field>
            <Field label="Fatigue">
              <input style={S.control} type="number" min={1} max={5} value={fatigue} onChange={(e) => setFatigue(Number(e.target.value))} />
            </Field>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 700 }}>
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
                <input style={S.control} placeholder="Яке правило порушив?" value={ruleText} onChange={(e) => setRuleText(e.target.value)} />
              </div>
            )}
          </div>
        </section>

        <button type="submit" style={{ ...S.btnPrimary, width: "100%" }}>
          Save changes
        </button>
      </form>
    </div>
  );
}
