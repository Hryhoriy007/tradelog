"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Page, HeaderRow, Row } from "@/app/components/ui/Layout";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Select } from "@/app/components/ui/Select";
import { Field } from "@/app/components/ui/Field";
import { ui } from "@/app/components/ui/styles";

import {
  buildBackup,
  downloadJson,
  downloadText,
  importBackup,
  type ImportMode,
  type BackupV1,
} from "@/lib/backup";
import { getTrades } from "@/lib/tradeStore";
import { tradesToCsv } from "@/lib/exportCsv";

export default function BackupPage() {
  const [mode, setMode] = useState<ImportMode>("replace");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(""), 2000);
    return () => clearTimeout(t);
  }, [status]);

  const onExportJson = () => {
    const data = buildBackup();
    downloadJson(`tradelog-backup-${new Date().toISOString().slice(0, 10)}.json`, data);
    setStatus("Backup exported ✅");
  };

  const onExportCsv = () => {
    const csv = tradesToCsv(getTrades());
    downloadText(`tradelog-trades-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv");
    setStatus("CSV exported ✅");
  };

  const onImportFile = async (file: File | null) => {
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as BackupV1;

      const res = importBackup(parsed, mode);
      setStatus(`Imported ✅ trades=${res.trades}, presets=${res.presets}`);

      setTimeout(() => window.location.reload(), 300);
    } catch (e: any) {
      alert(e?.message ?? "Import failed");
    }
  };

  return (
    <Page>
      <HeaderRow
        title="Backup"
        subtitle="Export / Import data (trades + presets)"
        right={
          <Row style={{ gap: 8 }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Dashboard</Button>
            </Link>
            <Link href="/stats" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Stats</Button>
            </Link>
            <Link href="/templates" style={{ textDecoration: "none" }}>
              <Button variant="secondary">Templates</Button>
            </Link>
          </Row>
        }
      />

      {status ? (
        <div
          style={{
            marginBottom: 12,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            fontWeight: 900,
          }}
        >
          {status}
        </div>
      ) : null}

      <Row cols={2}>
        <Card title="Export" subtitle="Download your data">
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ ...ui.subtle, fontSize: 13 }}>
              JSON backup includes everything (trades + presets). CSV is for Excel/Google Sheets.
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Button onClick={onExportJson}>Export JSON backup</Button>
              <Button variant="secondary" onClick={onExportCsv}>
                Export CSV (trades)
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Import" subtitle="Restore from JSON backup">
          <div style={{ display: "grid", gap: 12 }}>
            <Field label="Mode">
              <Select value={mode} onChange={(e) => setMode(e.target.value as ImportMode)}>
                <option value="replace">Replace (wipe + restore)</option>
                <option value="merge">Merge (by id)</option>
              </Select>
            </Field>

            <Field label="Choose .json file">
              <input
                type="file"
                accept="application/json"
                onChange={(e) => onImportFile(e.target.files?.[0] ?? null)}
                style={{
                  height: 38,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,0,0,0.20)",
                  color: "inherit",
                  padding: "6px 12px",
                  outline: "none",
                }}
              />
            </Field>

            <div style={{ opacity: 0.7, fontSize: 12 }}>
              Replace: overwrites all data. Merge: adds new records (by <b>id</b>), duplicates are replaced by the latest.
            </div>
          </div>
        </Card>
      </Row>
    </Page>
  );
}
