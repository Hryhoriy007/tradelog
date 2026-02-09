export type Direction = "LONG" | "SHORT";

export function calcPlannedRR(params: {
  direction: Direction;
  entry: number;
  stopLoss: number;
  takeProfit: number;
}) {
  const { direction, entry, stopLoss, takeProfit } = params;

  const risk =
    direction === "LONG" ? entry - stopLoss : stopLoss - entry;

  const reward =
    direction === "LONG" ? takeProfit - entry : entry - takeProfit;

  if (risk <= 0 || reward <= 0) return null;
  return reward / risk;
}

export function calcRMultiple(params: {
  direction: Direction;
  entry: number;
  exit: number;
  stopLoss: number;
}) {
  const { direction, entry, exit, stopLoss } = params;

  const denom =
    direction === "LONG" ? entry - stopLoss : stopLoss - entry;

  if (denom <= 0) return null;

  const numer =
    direction === "LONG" ? exit - entry : entry - exit;

  return numer / denom;
}
