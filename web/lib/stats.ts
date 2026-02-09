import type { Trade } from "./tradeStore";
import { calcRMultiple } from "./tradeMath";

function safeNum(n: number | null | undefined): number | null {
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

export function tradeR(t: Trade): number | null {
  const sl = safeNum(t.stopLoss);
  const ex = safeNum(t.exit);

  // важливо: 0 не відкидаємо через "!sl"
  if (sl === null || ex === null) return null;
  if (!(t.entry > 0)) return null;

  return calcRMultiple({
    direction: t.direction,
    entry: t.entry,
    exit: ex,
    stopLoss: sl,
  });
}

function avg(arr: number[]) {
  return arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : 0;
}

function winrateFrom(arr: number[]) {
  return arr.length ? arr.filter((r) => r > 0).length / arr.length : 0;
}

function sortByDateAsc(a: Trade, b: Trade) {
  const ta = Date.parse(a.openedAt || a.createdAt || "") || 0;
  const tb = Date.parse(b.openedAt || b.createdAt || "") || 0;
  return ta - tb;
}

export function computeStats(trades: Trade[]) {
  // беремо тільки R-ready та сортуємо по даті для streak-ів
  const rs = [...trades]
    .sort(sortByDateAsc)
    .map((t) => ({ t, r: tradeR(t) }))
    .filter((x): x is { t: Trade; r: number } => x.r !== null);

  const count = rs.length;

  const rValues = rs.map((x) => x.r);
  const wins = rValues.filter((r) => r > 0);
  const losses = rValues.filter((r) => r < 0);
  const bes = rValues.filter((r) => r === 0);

  const winrate = count ? wins.length / count : 0;

  const avgR = avg(rValues);
  const avgWinR = avg(wins);
  const avgLossR = avg(losses); // negative

  const expectancy = winrate * avgWinR - (1 - winrate) * Math.abs(avgLossR);

  const sumWin = wins.reduce((s, r) => s + r, 0);
  const sumLossAbs = losses.reduce((s, r) => s + Math.abs(r), 0);
  const profitFactor = sumLossAbs > 0 ? sumWin / sumLossAbs : wins.length ? Infinity : 0;

  // streaks (по часу)
  let bestWinStreak = 0;
  let bestLoseStreak = 0;
  let curWin = 0;
  let curLose = 0;

  for (const { r } of rs) {
    if (r > 0) {
      curWin += 1;
      curLose = 0;
    } else if (r < 0) {
      curLose += 1;
      curWin = 0;
    } else {
      curWin = 0;
      curLose = 0;
    }
    bestWinStreak = Math.max(bestWinStreak, curWin);
    bestLoseStreak = Math.max(bestLoseStreak, curLose);
  }

  // group helper
  const makeGroupStats = (arr: number[]) => {
    const n = arr.length;
    const wr = winrateFrom(arr);
    const a = avg(arr);
    const w = avg(arr.filter((r) => r > 0));
    const l = avg(arr.filter((r) => r < 0)); // negative
    return { n, winrate: wr, avgR: a, avgWinR: w, avgLossR: l };
  };

  // by setup
  const setupGroups: Record<string, number[]> = {};
  for (const x of rs) {
    const key = (x.t.setupTag || "—").trim() || "—";
    (setupGroups[key] ??= []).push(x.r);
  }

  const bySetup: Record<string, ReturnType<typeof makeGroupStats>> = {};
  for (const [k, arr] of Object.entries(setupGroups)) {
    bySetup[k] = makeGroupStats(arr);
  }

  // by psych tags
  const psychGroups: Record<string, number[]> = {};
  for (const x of rs) {
    const tags = Array.isArray(x.t.psychTags) ? x.t.psychTags : [];
    for (const tag of tags) {
      const key = (tag || "").trim();
      if (!key) continue;
      (psychGroups[key] ??= []).push(x.r);
    }
  }

  const byPsych: Record<string, ReturnType<typeof makeGroupStats>> = {};
  for (const [k, arr] of Object.entries(psychGroups)) {
    byPsych[k] = makeGroupStats(arr);
  }

  return {
    count,
    wins: wins.length,
    losses: losses.length,
    bes: bes.length,

    winrate,
    avgR,
    avgWinR,
    avgLossR,
    expectancy,
    profitFactor,

    bestWinStreak,
    bestLoseStreak,

    bySetup,
    byPsych,
  };
}
