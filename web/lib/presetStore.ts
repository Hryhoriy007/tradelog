export type TradePreset = {
  id: string;
  name: string;

  // optional defaults for Add Trade
  pair?: string;
  side?: "Long" | "Short";
  setup?: string;

  // anything else you may have in Trade form (keep optional)
  risk?: number; // e.g. 1 (R risk), or your own meaning
  notes?: string;
};

const KEY = "tradelog:presets:v1";

function safeParse<T>(s: string | null, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch {
    return fallback;
  }
}

export function getPresets(): TradePreset[] {
  if (typeof window === "undefined") return [];
  const presets = safeParse<TradePreset[]>(localStorage.getItem(KEY), []);
  return Array.isArray(presets) ? presets : [];
}

export function savePresets(presets: TradePreset[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(presets));
}

export function upsertPreset(p: TradePreset) {
  const presets = getPresets();
  const idx = presets.findIndex((x) => x.id === p.id);
  if (idx >= 0) presets[idx] = p;
  else presets.unshift(p);
  savePresets(presets);
}

export function deletePreset(id: string) {
  const presets = getPresets().filter((p) => p.id !== id);
  savePresets(presets);
}

export function createId() {
  return Math.random().toString(36).slice(2, 10) + "-" + Date.now().toString(36);
}
