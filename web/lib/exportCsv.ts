import type { Trade } from "@/lib/tradeStore";
import { tradeR } from "@/lib/stats";

function esc(v: any) {
  const s = String(v ?? "");
  // CSV safe quotes
  const needs = /[",\n]/.test(s);
  const out = s.replaceAll('"', '""');
  return needs ? `"${out}"` : out;
}

export function tradesToCsv(trades: Trade[]) {
  const headers = [
    "id",
    "createdAt",
    "symbol",
    "direction",
    "entry",
    "exit",
    "stopLoss",
    "takeProfit",
    "openedAt",
    "closedAt",
    "setupTag",
    "psychTags",
    "R",
    "thesis",
    "whatWentWell",
    "improve",
  ];

  const lines: string[] = [];
  lines.push(headers.join(","));

  for (const t of trades as any[]) {
    const r = tradeR(t);
    const row = [
      t.id,
      t.createdAt,
      t.symbol ?? t.pair,
      t.direction ?? t.side,
      t.entry,
      t.exit,
      t.stopLoss,
      t.takeProfit,
      t.openedAt ?? t.date,
      t.closedAt,
      t.setupTag ?? t.setup,
      Array.isArray(t.psychTags) ? t.psychTags.join("|") : "",
      Number.isFinite(r) ? r.toFixed(4) : "",
      t?.notes?.thesis ?? "",
      t?.notes?.whatWentWell ?? "",
      t?.notes?.improve ?? "",
    ].map(esc);

    lines.push(row.join(","));
  }

  return lines.join("\n");
}
