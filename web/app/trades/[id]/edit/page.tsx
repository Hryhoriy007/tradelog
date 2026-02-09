"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";
import { getTradeById, updateTrade, type Trade } from "@/lib/tradeStore";

function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EditTradePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const trade = getTradeById(id);

  // якщо не знайдено
  if (!trade) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Trade not found</h1>
        <button onClick={() => router.push("/trades")} style={{ padding: 10, borderRadius: 12 }}>
          Back to trades
        </button>
      </div>
    );
  }

  // state (prefill)
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

  // RR / R calc
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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!symbol.trim()) return alert("Вкажи symbol (наприклад ETHUSDT)");
    if (!(entry > 0)) return alert("Entry має бути > 0");

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
      notes: { thesis, whatWentWell: wentWell, improve },
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

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Edit Trade</h1>
          <div style={{ opacity: 0.75, fontSize: 13 }}>{trade.symbol} · {trade.direction}</div>
        </div>
        <button onClick={() => router.push(`/trades/${id}`)} style={{ padding: "10px 14px", borderRadius: 12 }}>
          Back
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, margin: "14px 0", flexWrap: "wrap" }}>
        <div><b>Planned R:R:</b> {plannedRR ? plannedRR.toFixed(2) : "—"}</div>
        <div><b>Fact R:</b> {rMultiple ? rMultiple.toFixed(2) : "—"}</div>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <section style={{ border: "1px solid #222", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Trade</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label>
              Symbol
              <input value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ width: "100%" }} />
            </label>

            <label>
              Direction
              <select value={direction} onChange={(e) => setDirection(e.target.value as Direction)} style={{ width: "100%" }}>
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </label>

            <label>
              Entry
              <input type="number" value={entry} onChange={(e) => setEntry(Number(e.target.value))} style={{ width: "100%" }} />
            </label>

            <label>
              Exit (optional)
              <input type="number" value={exit} onChange={(e) => setExit(e.target.value === "" ? "" : Number(e.target.value))} style={{ width: "100%" }} />
            </label>

            <label>
              Stop Loss (optional)
              <input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value === "" ? "" : Number(e.target.value))} style={{ width: "100%" }} />
            </label>

            <label>
              Take Profit (optional)
              <input type="number" value={takeProfit} onChange={(e) => setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))} style={{ width: "100%" }} />
            </label>

            <label>
              Opened At
              <input type="datetime-local" value={openedAt} onChange={(e) => setOpenedAt(e.target.value)} style={{ width: "100%" }} />
            </label>

            <label>
              Closed At (optional)
              <input type="datetime-local" value={closedAt} onChange={(e) => setClosedAt(e.target.value)} style={{ width: "100%" }} />
            </label>

            <label>
              Setup tag
              <input value={setupTag} onChange={(e) => setSetupTag(e.target.value)} style={{ width: "100%" }} />
            </label>

            <label>
              Psych tags (comma)
              <input value={psychTagsRaw} onChange={(e) => setPsychTagsRaw(e.target.value)} style={{ width: "100%" }} />
            </label>
          </div>
        </section>

        <section style={{ border: "1px solid #222", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Notes</h2>
          <label>Thesis<input value={thesis} onChange={(e) => setThesis(e.target.value)} style={{ width: "100%" }} /></label>
          <label>What went well<textarea value={wentWell} onChange={(e) => setWentWell(e.target.value)} style={{ width: "100%", minHeight: 70 }} /></label>
          <label>Improve next time<textarea value={improve} onChange={(e) => setImprove(e.target.value)} style={{ width: "100%", minHeight: 70 }} /></label>
        </section>

        <section style={{ border: "1px solid #222", borderRadius: 14, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Psychology</h2>

          <label>Before<textarea value={before} onChange={(e) => setBefore(e.target.value)} style={{ width: "100%", minHeight: 60 }} /></label>
          <label>During<textarea value={during} onChange={(e) => setDuring(e.target.value)} style={{ width: "100%", minHeight: 60 }} /></label>
          <label>After<textarea value={after} onChange={(e) => setAfter(e.target.value)} style={{ width: "100%", minHeight: 60 }} /></label>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 10 }}>
            <label>Focus<input type="number" min={1} max={5} value={focus} onChange={(e) => setFocus(Number(e.target.value))} /></label>
            <label>Fear<input type="number" min={1} max={5} value={fear} onChange={(e) => setFear(Number(e.target.value))} /></label>
            <label>Greed<input type="number" min={1} max={5} value={greed} onChange={(e) => setGreed(Number(e.target.value))} /></label>
            <label>Conf.<input type="number" min={1} max={5} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} /></label>
            <label>Fatigue<input type="number" min={1} max={5} value={fatigue} onChange={(e) => setFatigue(Number(e.target.value))} /></label>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={ruleBroken} onChange={(e) => setRuleBroken(e.target.checked)} />
              Rule broken?
            </label>
            {ruleBroken && (
              <input
                placeholder="Яке правило порушив?"
                value={ruleText}
                onChange={(e) => setRuleText(e.target.value)}
                style={{ width: "100%", marginTop: 8 }}
              />
            )}
          </div>
        </section>

        <button type="submit" style={{ padding: 12, borderRadius: 12, fontWeight: 900 }}>
          Save changes
        </button>
      </form>
    </div>
  );
}
