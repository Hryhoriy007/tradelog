"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
      }}
    >
      {text}
    </span>
  );
}

export default function TemplatesPage() {
  const [presets, setPresets] = useState<TradePreset[]>([]);
  const [editing, setEditing] = useState<TradePreset | null>(null);

  // ✅ highlight selected/saved item
  const [activeId, setActiveId] = useState<string>("");

  // ✅ tiny toast
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    setPresets(getPresets());
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const pairs = useMemo(() => {
    return ["ETHUSDT", "BTCUSDT", "ARBUSDT", "OPUSDT", "SOLUSDT"];
  }, []);

  // ✅ auto-open editor after create
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

    // ✅ keep editor open and synced with saved version
    const saved = next.find((p) => p.id === clean.id) ?? clean;
    setEditing(saved);
    setActiveId(saved.id);

    // ✅ toast
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
        subtitle="Presets для швидкого створення trade"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/stats" style={{ textDecoration: "none" }}>
              <Button variant="secondary" title="Open Stats">
                Stats
              </Button>
            </Link>
            <Link href="/trades/new" style={{ textDecoration: "none" }}>
              <Button title="Add a new trade">Add trade</Button>
            </Link>
          </div>
        }
      />

      <Row cols={2}>
        <Card
          title="Presets"
          subtitle="Список шаблонів"
          right={
            <Button onClick={onCreate} title="Create a new preset">
              New preset
            </Button>
          }
        >
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
                <div style={{ opacity: 0.7, fontSize: 13 }}>
                  Після створення пресети зʼявляться в Add Trade (Preset + Chips).
                </div>
              </div>
            ) : (
              presets.map((p) => {
                const isActive = p.id === activeId;

                return (
                  <div
                    key={p.id}
                    title="Preset card — click Edit to modify"
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
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, lineHeight: 1.2 }}>{p.name}</div>
                      <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {p.pair ? pill(p.pair) : null}
                        {p.side ? pill(p.side) : null}
                        {p.setup ? pill(p.setup) : null}
                        {typeof p.risk === "number" ? pill(`Risk: ${p.risk}`) : null}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <Link
                        href={`/trades/new?preset=${encodeURIComponent(p.id)}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="secondary" title="Use this preset to create a new trade">
                          Use
                        </Button>
                      </Link>

                      <Button
                        variant="secondary"
                        onClick={() => onEdit(p)}
                        title="Click Edit to modify this preset"
                      >
                        Edit
                      </Button>

                      <Button variant="secondary" onClick={() => onDelete(p.id)} title="Delete this preset">
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
              <Button
                variant="secondary"
                onClick={onCreate}
                title="Create a new preset and open editor"
                style={{ justifySelf: "flex-start" }}
              >
                New preset
              </Button>
              <div style={{ opacity: 0.7, fontSize: 13 }}>
                Порада: щоб змінити існуючий пресет — натисни <b>Edit</b>.
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
                  value={editing.pair ?? ""}
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
