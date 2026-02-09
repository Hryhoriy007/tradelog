import type { Trade } from "./tradeStore";
import { calcRMultiple } from "./tradeMath";

function safeNum(n: number | null | undefined) {
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

export function tradeR(t: Trade): number | null {
  const sl = safeNum(t.stopLoss);
  const ex = safeNum(t.exit);
  if (!sl || !ex || !(t.entry > 0)) return null;

  return calcRMultiple({
    direction: t.direction,
    entry: t.entry,
    exit: ex,
    stopLoss: sl,
  });
}

export function computeStats(trades: Trade[]) {
  const rs = trades
    .map((t) => ({ t, r: tradeR(t) }))
    .filter((x) => x.r !== null) as { t: Trade; r: number }[];

  const count = rs.length;
  const wins = rs.filter((x) => x.r > 0);
  const losses = rs.filter((x) => x.r < 0);
  const bes = rs.filter((x) => x.r === 0);

  const winrate = count ? wins.length / count : 0;

  const avgR = count ? rs.reduce((s, x) => s + x.r, 0) / count : 0;
  const avgWinR = wins.length ? wins.reduce((s, x) => s + x.r, 0) / wins.length : 0;
  const avgLossR = losses.length ? losses.reduce((s, x) => s + x.r, 0) / losses.length : 0; // negative

  const expectancy = winrate * avgWinR - (1 - winrate) * Math.abs(avgLossR);

  const sumWin = wins.reduce((s, x) => s + x.r, 0);
  const sumLossAbs = losses.reduce((s, x) => s + Math.abs(x.r), 0);
  const profitFactor = sumLossAbs > 0 ? sumWin / sumLossAbs : wins.length ? Infinity : 0;

  let bestWinStreak = 0,
    bestLoseStreak = 0;
  let curWin = 0,
    curLose = 0;

  for (const x of rs) {
    if (x.r > 0) {
      curWin += 1;
      curLose = 0;
    } else if (x.r < 0) {
      curLose += 1;
      curWin = 0;
    } else {
      curWin = 0;
      curLose = 0;
    }
    bestWinStreak = Math.max(bestWinStreak, curWin);
    bestLoseStreak = Math.max(bestLoseStreak, curLose);
  }

  const bySetup: Record<string, { n: number; winrate: number; avgR: number }> = {};
  const setupGroups: Record<string, number[]> = {};

  for (const x of rs) {
    const key = (x.t.setupTag || "—").trim() || "—";
    (setupGroups[key] ??= []).push(x.r);
  }

  for (const [k, arr] of Object.entries(setupGroups)) {
    const n = arr.length;
    const wr = n ? arr.filter((r) => r > 0).length / n : 0;
    const a = n ? arr.reduce((s, r) => s + r, 0) / n : 0;
    bySetup[k] = { n, winrate: wr, avgR: a };
  }

  const byPsych: Record<string, { n: number; winrate: number; avgR: number }> = {};
  const psychGroups: Record<string, number[]> = {};

  for (const x of rs) {
    const tags = Array.isArray(x.t.psychTags) ? x.t.psychTags : [];
    for (const tag of tags) {
      const key = (tag || "").trim();
      if (!key) continue;
      (psychGroups[key] ??= []).push(x.r);
    }
  }

  for (const [k, arr] of Object.entries(psychGroups)) {
    const n = arr.length;
    const wr = n ? arr.filter((r) => r > 0).length / n : 0;
    const a = n ? arr.reduce((s, r) => s + r, 0) / n : 0;
    byPsych[k] = { n, winrate: wr, avgR: a };
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
