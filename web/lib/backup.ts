import { getTrades, setTrades, type Trade } from "@/lib/tradeStore";
import { getPresets, setPresets, type TradePreset } from "@/lib/presetStore";

export type BackupV1 = {
  version: 1;
  exportedAt: string;
  trades: Trade[];
  presets: TradePreset[];
};

export function buildBackup(): BackupV1 {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    trades: getTrades(),
    presets: getPresets(),
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function uniqById<T extends { id: string }>(arr: T[]) {
  const map = new Map<string, T>();
  for (const x of arr) map.set(x.id, x);
  return Array.from(map.values());
}

export type ImportMode = "replace" | "merge";

export function importBackup(json: BackupV1, mode: ImportMode) {
  if (!json || json.version !== 1) {
    throw new Error("Unsupported backup format (version mismatch).");
  }

  if (!Array.isArray(json.trades) || !Array.isArray(json.presets)) {
    throw new Error("Invalid backup: trades/presets must be arrays.");
  }

  if (mode === "replace") {
    setTrades(json.trades);
    setPresets(json.presets);
    return { trades: json.trades.length, presets: json.presets.length };
  }

  // merge
  const mergedTrades = uniqById([...getTrades(), ...json.trades]);
  const mergedPresets = uniqById([...getPresets(), ...json.presets]);

  setTrades(mergedTrades);
  setPresets(mergedPresets);

  return { trades: mergedTrades.length, presets: mergedPresets.length };
}
