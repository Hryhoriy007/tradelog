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

  useEffect(() => {
    setPresets(getPresets());
  }, []);

  const pairs = useMemo(() => {
    // simple helper list; you can remove or replace later
    return ["ETHUSDT", "BTCUSDT", "ARBUSDT", "OPUSDT", "SOLUSDT"];
  }, []);

  const onCreate = () => {
    setEditing({
      id: createId(),
      name: "New preset",
      pair: "",
      side: "Long",
      setup: "",
      risk: 1,
      notes: "",
    });
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
    setEditing(null);
  };

  const onDelete = (id: string) => {
    deletePreset(id);
    setPresets(getPresets());
    if (editing?.id === id) setEditing(null);
  };

  return (
    <Page>
      <HeaderRow
        title="Templates"
        subtitle="Presets для швидкого створення trade"
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/stats">
              <Button variant="secondary">Stats</Button>
            </Link>
            <Link href="/trades/new">
              <Button>Add trade</Button>
            </Link>
          </div>
        }
      />

      <Row cols={2}>
        <Card
          title="Presets"
          subtitle="Список шаблонів"
          right={<Button onClick={onCreate}>New preset</Button>}
        >
          <div style={{ display: "grid", gap: 10 }}>
            {presets.length === 0 ? (
              <div style={{ opacity: 0.7 }}>
                Ще немає пресетів. Натисни <b>New preset</b>.
              </div>
            ) : (
              presets.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, lineHeight: 1.2 }}>{p.name}</div>
                    <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.pair ? pill(p.pair) : null}
                      {p.side ? pill(p.side) : null}
                      {p.setup ? pill(p.setup) : null}
                      {typeof p.risk === "number" ? pill(`Risk: ${p.risk}`) : null}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="secondary" onClick={() => setEditing(p)}>
                      Edit
                    </Button>
                    <Button variant="secondary" onClick={() => onDelete(p.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card title="Editor" subtitle="Налаштування пресету">
          {!editing ? (
            <div style={{ opacity: 0.7 }}>
              Вибери пресет зліва або створи новий.
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
                <Button variant="secondary" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button onClick={onSave}>Save</Button>
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
