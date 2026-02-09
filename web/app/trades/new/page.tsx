"use client";

import { useMemo, useState } from "react";
import { addTrade } from "@/lib/tradeStore";
import { calcPlannedRR, calcRMultiple, type Direction } from "@/lib/tradeMath";

function nowLocalISO() {
  const d = new Date();
  // простий локальний ISO без Z, щоб не плутатись
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function NewTradePage() {
  const [symbol, setSymbol] = useState("ETHUSDT");
  const [direction, setDirection] = useState<Direction>("SHORT");

  const [entry, setEntry] = useState<number>(0);
  const [exit, setExit] = useState<number | "">("");

  const [stopLoss, setStopLoss] = useState<number | "">("");
  const [takeProfit, setTakeProfit] = useState<number | "">("");

  const [openedAt, setOpenedAt] = useState(nowLocalISO());
  const [closedAt, setClosedAt] = useState<string>("");

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
      .map(t => t.trim())
      .filter(Boolean);

    const trade = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),

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
        before, during, after,
        focus, fear, greed, confidence, fatigue,
        ruleBroken,
        ruleText: ruleBroken ? ruleText : "",
      },
    };

    addTrade(trade);
    alert("✅ Trade збережено (localStorage)");
    // Можеш зробити router.push("/trades") коли сторінка списку буде готова
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Add Trade</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div><b>Planned R:R:</b> {plannedRR ? plannedRR.toFixed(2) : "—"}</div>
        <div><b>Fact R:</b> {rMultiple ? rMultiple.toFixed(2) : "—"}</div>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Trade</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label>
              Symbol
              <input value={symbol} onChange={(e)=>setSymbol(e.target.value)} style={{ width:"100%" }} />
            </label>

            <label>
              Direction
              <select value={direction} onChange={(e)=>setDirection(e.target.value as Direction)} style={{ width:"100%" }}>
                <option value="LONG">LONG</option>
                <option value="SHORT">SHORT</option>
              </select>
            </label>

            <label>
              Entry
              <input type="number" value={entry} onChange={(e)=>setEntry(Number(e.target.value))} style={{ width:"100%" }} />
            </label>

            <label>
              Exit (optional)
              <input type="number" value={exit} onChange={(e)=>setExit(e.target.value === "" ? "" : Number(e.target.value))} style={{ width:"100%" }} />
            </label>

            <label>
              Stop Loss (optional)
              <input type="number" value={stopLoss} onChange={(e)=>setStopLoss(e.target.value === "" ? "" : Number(e.target.value))} style={{ width:"100%" }} />
            </label>

            <label>
              Take Profit (optional)
              <input type="number" value={takeProfit} onChange={(e)=>setTakeProfit(e.target.value === "" ? "" : Number(e.target.value))} style={{ width:"100%" }} />
            </label>

            <label>
              Opened At
              <input type="datetime-local" value={openedAt} onChange={(e)=>setOpenedAt(e.target.value)} style={{ width:"100%" }} />
            </label>

            <label>
              Closed At (optional)
              <input type="datetime-local" value={closedAt} onChange={(e)=>setClosedAt(e.target.value)} style={{ width:"100%" }} />
            </label>

            <label>
              Setup tag
              <input value={setupTag} onChange={(e)=>setSetupTag(e.target.value)} style={{ width:"100%" }} />
            </label>

            <label>
              Psych tags (comma)
              <input value={psychTagsRaw} onChange={(e)=>setPsychTagsRaw(e.target.value)} style={{ width:"100%" }} />
            </label>
          </div>
        </section>

        <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Notes</h2>
          <label>Thesis<input value={thesis} onChange={(e)=>setThesis(e.target.value)} style={{ width:"100%" }} /></label>
          <label>What went well<textarea value={wentWell} onChange={(e)=>setWentWell(e.target.value)} style={{ width:"100%", minHeight: 70 }} /></label>
          <label>Improve next time<textarea value={improve} onChange={(e)=>setImprove(e.target.value)} style={{ width:"100%", minHeight: 70 }} /></label>
        </section>

        <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Psychology</h2>

          <label>Before<textarea value={before} onChange={(e)=>setBefore(e.target.value)} style={{ width:"100%", minHeight: 60 }} /></label>
          <label>During<textarea value={during} onChange={(e)=>setDuring(e.target.value)} style={{ width:"100%", minHeight: 60 }} /></label>
          <label>After<textarea value={after} onChange={(e)=>setAfter(e.target.value)} style={{ width:"100%", minHeight: 60 }} /></label>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap: 12, marginTop: 10 }}>
            <label>Focus<input type="number" min={1} max={5} value={focus} onChange={(e)=>setFocus(Number(e.target.value))} /></label>
            <label>Fear<input type="number" min={1} max={5} value={fear} onChange={(e)=>setFear(Number(e.target.value))} /></label>
            <label>Greed<input type="number" min={1} max={5} value={greed} onChange={(e)=>setGreed(Number(e.target.value))} /></label>
            <label>Conf.<input type="number" min={1} max={5} value={confidence} onChange={(e)=>setConfidence(Number(e.target.value))} /></label>
            <label>Fatigue<input type="number" min={1} max={5} value={fatigue} onChange={(e)=>setFatigue(Number(e.target.value))} /></label>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={{ display:"flex", gap: 8, alignItems:"center" }}>
              <input type="checkbox" checked={ruleBroken} onChange={(e)=>setRuleBroken(e.target.checked)} />
              Rule broken?
            </label>
            {ruleBroken && (
              <input
                placeholder="Яке правило порушив?"
                value={ruleText}
                onChange={(e)=>setRuleText(e.target.value)}
                style={{ width:"100%", marginTop: 8 }}
              />
            )}
          </div>
        </section>

        <button type="submit" style={{ padding: 12, borderRadius: 12, fontWeight: 700 }}>
          Save trade
        </button>
      </form>
    </div>
  );
}
