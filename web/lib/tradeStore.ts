import type { Direction } from "./tradeMath";

export type Trade = {
  id: string;
  createdAt: string;

  symbol: string;
  direction: Direction;

  entry: number;
  exit: number | null;

  stopLoss: number | null;
  takeProfit: number | null;

  openedAt: string;   // ISO
  closedAt: string | null;

  setupTag: string;   // напр. "breakout"
  psychTags: string[]; // напр. ["FOMO","revenge"]

  notes: {
    thesis: string;
    whatWentWell: string;
    improve: string;
  };

  psych: {
    before: string;
    during: string;
    after: string;

    focus: number;      // 1-5
    fear: number;       // 1-5
    greed: number;      // 1-5
    confidence: number; // 1-5
    fatigue: number;    // 1-5

    ruleBroken: boolean;
    ruleText: string;
  };
};

const KEY = "tradelog_trades_v1";

export function getTrades(): Trade[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTrades(trades: Trade[]) {
  localStorage.setItem(KEY, JSON.stringify(trades));
}

export function addTrade(trade: Trade) {
  const trades = getTrades();
  trades.unshift(trade);
  saveTrades(trades);
}

export function getTradeById(id: string) {
  const trades = getTrades();
  return trades.find(t => t.id === id) || null;
}
