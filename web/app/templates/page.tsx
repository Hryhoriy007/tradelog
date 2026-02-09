"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getTrades, type Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

import {
  createId,
  deletePreset,
  getPresets,
  upsertPreset,
  type TradePreset,
} from "@/lib/presetStore";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Select } from "@/app/components/ui/Select";

function pill(text: string) {
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
        maxWidth: 220,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      title={text}
    >
      {text}
    </span>
  );
}

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}
function pct(n: number, digits = 0) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

// ---- normalize helpers (works for legacy fields too)
function normPair(t: any) {
  return String(t?.symbol ?? t?.pair ?? "").trim().toUpperCase();
}
function normSide(t: any): "LONG" | "SHORT" | null {
  const v = String(t?.direction ?? t?.side ?? "").toUpperCase();
  if (v === "LONG") return "LONG";
  if (v === "SHORT") return "SHORT";
  if (v === "LONG ") return "LONG";
  if (v === "SHORT ") return "SHORT";
  return null;
}
function normSetup(t: any) {
  return String(t?.setupTag ?? t?.setup ?? "").trim();
}

function presetPair(p: any) {
  return String(p?.pair ?? "").trim().toUpperCase();
}
function presetSide(p: any): "LONG" | "SHORT" | null {
  const v = String(p?.side ?? "").toUpperCase();
  if (v === "LONG") return "LONG";
  if (v === "SHORT") return "SHORT";
  // legacy: Long/Short
  if (v === "LONG") return "LONG";
  if (v === "SHORT") return "SHORT";
  if (v === "LONG " || v === "LONG") return "LONG";
  if (v === "SHORT " || v === "SHORT") return "SHORT";
  if (v === "LONG" || v === "Long".toUpperCase()) return "LONG";
  if (v === "SHORT" || v === "Short".toUpperCase()) return "SHORT";
  if (v === "LONG") return "LONG";
  return null;
}
function presetSetup(p: any) {
  return String(p?.setup ?? "").trim();
}

// ---- compute stats for a preset (match by pair+side+setup if provided)
function computePresetStats(trades: Trade[], p: TradePreset) {
  const needPair = presetPair(p);
  const needSide = presetSide(p);
  const needSetup = presetSetup(p);

  const matched = (trades as any[]).filter((t) => {
    const tp = normPair(t);
    const ts = normSide(t);
    const st = normSetup(t);

    if (needPair && tp !== needPair) return false;
    if (needSide && ts !== needSide) return false;
    if (needSetup && st !== needSetup) return false;
    return true;
  });

  const rs = matched.map((t) => tradeR(t)).filter((x) => Number.isFinite(x)) as number[];

  const total = rs.reduce((a, b) => a + b, 0);
  const avg = rs.length ? total / rs.length : 0;
  const wins = rs.filter((x) => x > 0).length;
  const winRate = rs.length ? (wins / rs.length) * 100 : 0;

  return {
    n: rs.length,
    total,
    avg,
    winRate,
  };
}

type SetupInfo = {
  setup: string;
  pairHint?: string; // most common pair
  sideHint?: "Long" | "Short";
  n: number;
  avg: number;
};

export default function TemplatesPage() {
  const [presets, setPresets] = useState<TradePreset[]>([]);
  const [editing, setEditing] = useState<TradePreset | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  const [toast, setToast] = useState<string>("");

  // trades for stats / create-from-setup
  const [trades, setTrades] = useState<Trade[]>([]);

  // create from setup UI
  const [createFromSetup, setCreateFromSetup] = useState<string>("");

  useEffect(() => {
    setPresets(getPresets());
    setTrades(getTrades());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  // pairs list for editor select (optional)
  const pairs = useMemo(() => {
    const set = new Set<string>();
    for (const t of trades as any[]) {
      const p = normPair(t);
      if (p) set.add(p);
    }
    const arr = Array.from(set).sort();
    // fallback common list if empty
    if (arr.length === 0) return ["ETHUSDT", "BTCUSDT", "ARBUSDT", "OPUSDT", "SOLUSDT"];
    return arr;
  }, [trades]);

  // top setups from trades (global, not filtered)
  const setupInfos = useMemo<SetupInfo[]>(() => {
    const map = new Map<
      string,
      { setup: string; n: number; total: number; pairCount: Map<string, number>; sideCount: Map<string, number> }
    >();

    for (const t of trades as any[]) {
      const st = normSetup(t) || "(no setup)";
      const r = tradeR(t);
      if (!Number.isFinite(r)) continue;

      const entry =
        map.get(st) ??
        { setup: st, n: 0, total: 0, pairCount: new Map(), sideCount: new Map() };

      entry.n += 1;
      entry.total += r;

      const p = normPair(t);
      if (p) entry.pairCount.set(p, (entry.pairCount.get(p) ?? 0) + 1);

      const s = normSide(t);
      if (s) entry.sideCount.set(s, (entry.sideCount.get(s) ?? 0) + 1);

      map.set(st, entry);
    }

    const rows = Array.from(map.values()).map((x) => {
      const avg = x.n ? x.total / x.n : 0;

      const pairHint = Array.from(x.pairCount.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
      const sideRaw = Array.from(x.sideCount.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] as
        | "LONG"
        | "SHORT"
        | undefined;

      const sideHint = sideRaw ? (sideRaw === "LONG" ? "Long" : "Short") : undefined;

      return { setup: x.setup, n: x.n, avg, pairHint, sideHint };
    });

    // show only meaningful (>=2) and sorted by avg
    rows.sort((a, b) => b.avg - a.avg || b.n - a.n);
    return rows.slice(0, 40);
  }, [trades]);

  const presetStatsMap = useMemo(() => {
    const map = new Map<string, { n: number; avg: number; total: number; winRate: number }>();
    for (const p of presets) {
      map.set(p.id, computePresetStats(trades, p));
    }
    return map;
  }, [presets, trades]);

  const onCreate = () => {
    const next: TradePreset = {
      id: createId(),
      name: "New preset",
      pair: "",
      side: "Long",
      setup: "",
      risk: 1,
      notes: "",
    };
    setEditing(next);
    setActiveId(next.id);
  };

  const onCreateFromSetup = () => {
    const chosen = setupInfos.find((x) => x.setup === createFromSetup);
    if (!chosen) return;

    const next: TradePreset = {
      id: createId(),
      name: chosen.setup === "(no setup)" ? "Preset" : chosen.setup,
      pair: chosen.pairHint ?? "",
      side: chosen.sideHint ?? "Long",
      setup: chosen.setup === "(no setup)" ? "" : chosen.setup,
      risk: 1,
      notes: "",
    };

    setEditing(next);
    setActiveId(next.id);
    setToast("Preset created from setup ✅");
  };

  const onSave = () => {
    if (!editing) return;

    const clean: TradePreset = {
      ...editing,
      name: (editing.name ?? "").trim() || "Preset",
      pair: (editing.pair ?? "").trim() || undefined,
      setup: (editing.setup ?? "").trim() || undefined,
      notes: (editing.notes ?? "").trim() || undefined,
      risk: typeof editing.risk === "number" && Number.isFinite(editing.risk) ? editing.risk : undefined,
    };

    upsertPreset(clean);

    const next = getPresets();
    setPresets(next);

    const saved = next.find((p) => p.id === clean.id) ?? clean;
    setEditing(saved);
    setActiveId(saved.id);

    setToast("Saved ✅");
  };

  const onDelete = (id: string) => {
    deletePreset(id);
    const next = getPresets();
    setPresets(next);

    if (editing?.id === id) setEditing(null);
    if (activeId === id) setActiveId("");
    setToast("Deleted");
  };

  const onEdit = (p: TradePreset) => {
    setEditing(p);
    setActiveId(p.id);
  };

  return (
    <Page>
      {/* Toast */}
      {toast ? (
        <div
          style={{
            position: "fixed",
            top: 18,
            right: 18,
            zIndex: 50,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            fontWeight: 800,
            fontSize: 13,
          }}
        >
          {toast}
        </div>
      ) : null}

      <HeaderRow
        title="Templates"
        subtitle="Presets + performance (Avg R / Win rate)"
        right={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/stats" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Stats</Button>
            </Link>
            <Link href="/trades/new" style={{ textDecoration: "none" }}>
              <Button>Add trade</Button>
            </Link>
          </div>
        }
      />

      <Row cols={2}>
        <Card
          title="Presets"
          subtitle="Шаблони + їхній performance"
          right={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <Button onClick={onCreate} title="Create a new preset">
                New preset
              </Button>
            </div>
          }
        >
          {/* Create from setup */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "end",
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <Field label="Create from setup (from your trades)">
                <Select value={createFromSetup} onChange={(e) => setCreateFromSetup(e.target.value)}>
                  <option value="">Choose setup…</option>
                  {setupInfos.map((s) => (
                    <option key={s.setup} value={s.setup}>
                      {s.setup} • Avg {fmt(s.avg, 2)}R • n={s.n}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Button
              variant="secondary"
              onClick={onCreateFromSetup}
              disabled={!createFromSetup}
              title="Create preset from selected setup"
            >
              Create
            </Button>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {presets.length === 0 ? (
              <div style={{ opacity: 0.85, display: "grid", gap: 12 }}>
                <div>Ще немає пресетів.</div>
                <Button
                  variant="secondary"
                  onClick={onCreate}
                  title="Create your first preset"
                  style={{ justifySelf: "flex-start" }}
                >
                  Create first preset
                </Button>
              </div>
            ) : (
              presets.map((p) => {
                const isActive = p.id === activeId;
                const st = presetStatsMap.get(p.id) ?? { n: 0, avg: 0, total: 0, winRate: 0 };

                return (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 10,
                      borderRadius: 12,
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.28)"
                        : "1px solid rgba(255,255,255,0.10)",
                      background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                      boxShadow: isActive ? "0 0 0 1px rgba(255,255,255,0.10) inset" : undefined,
                    }}
                    title="Preset card"
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 900, lineHeight: 1.2 }}>{p.name}</div>

                      <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.pair ? pill(String(p.pair).toUpperCase()) : null}
                        {p.side ? pill(String(p.side)) : null}
                        {p.setup ? pill(String(p.setup)) : null}
                        {typeof p.risk === "number" ? pill(`Risk: ${p.risk}`) : null}
                      </div>

                      <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12, opacity: 0.85 }}>
                        <span title="Number of trades matched by this preset">
                          Trades: <b>{st.n}</b>
                        </span>
                        <span title="Average R for matched trades">
                          Avg R: <b>{fmt(st.avg, 2)}</b>
                        </span>
                        <span title="Total R for matched trades">
                          Total: <b>{fmt(st.total, 2)}R</b>
                        </span>
                        <span title="Win rate for matched trades">
                          Win: <b>{pct(st.winRate, 0)}</b>
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <Link href={`/trades/new?preset=${encodeURIComponent(p.id)}`} style={{ textDecoration: "none" }}>
                        <Button variant="secondary" title="Use this preset to create a new trade">
                          Use
                        </Button>
                      </Link>

                      <Button variant="secondary" onClick={() => onEdit(p)} title="Edit preset">
                        Edit
                      </Button>

                      <Button variant="secondary" onClick={() => onDelete(p.id)} title="Delete preset">
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card title="Editor" subtitle="Налаштування пресету">
          {!editing ? (
            <div style={{ opacity: 0.85, display: "grid", gap: 12 }}>
              <div>Вибери пресет зліва або створи новий.</div>
              <Button variant="secondary" onClick={onCreate} style={{ justifySelf: "flex-start" }}>
                New preset
              </Button>
              <div style={{ opacity: 0.7, fontSize: 13 }}>
                Порада: можна створити пресет з існуючого сетапу через <b>Create from setup</b>.
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="Name">
                <input
                  value={editing.name ?? ""}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Напр. Breakout scalp"
                />
              </Field>

              <Field label="Pair">
                <select
                  value={(editing.pair ?? "") as any}
                  onChange={(e) => setEditing({ ...editing, pair: e.target.value })}
                  style={selectStyle}
                >
                  <option value="">(empty)</option>
                  {pairs.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Side">
                <select
                  value={editing.side ?? "Long"}
                  onChange={(e) => setEditing({ ...editing, side: e.target.value as any })}
                  style={selectStyle}
                >
                  <option value="Long">Long</option>
                  <option value="Short">Short</option>
                </select>
              </Field>

              <Field label="Setup">
                <input
                  value={editing.setup ?? ""}
                  onChange={(e) => setEditing({ ...editing, setup: e.target.value })}
                  style={inputStyle}
                  placeholder="Напр. Breakout / Reversal / Range"
                />
              </Field>

              <Field label="Risk">
                <input
                  type="number"
                  value={editing.risk ?? 1}
                  onChange={(e) => setEditing({ ...editing, risk: Number(e.target.value) })}
                  style={inputStyle}
                  step="0.25"
                />
              </Field>

              <Field label="Notes">
                <textarea
                  value={editing.notes ?? ""}
                  onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                  style={{ ...inputStyle, height: 90, paddingTop: 10 }}
                  placeholder="Шаблонні нотатки для цієї стратегії..."
                />
              </Field>

              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditing(null);
                    setToast("Closed");
                  }}
                  title="Close editor"
                >
                  Close
                </Button>
                <Button onClick={onSave} title="Save preset">
                  Save
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Row>
    </Page>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 13, opacity: 0.75 }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 38,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.20)",
  color: "inherit",
  padding: "0 12px",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
};
