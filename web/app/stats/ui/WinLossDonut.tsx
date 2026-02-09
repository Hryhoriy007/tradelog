"use client";

import { useMemo } from "react";

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

export function WinLossDonut({
  wins,
  losses,
  be,
}: {
  wins: number;
  losses: number;
  be: number;
}) {
  const total = wins + losses + be;

  const parts = useMemo(() => {
    if (total <= 0) return [];
    const values = [
      { key: "Win", v: wins, fill: "rgba(255,255,255,0.92)" },
      { key: "Loss", v: losses, fill: "rgba(255,255,255,0.55)" },
      { key: "BE", v: be, fill: "rgba(255,255,255,0.22)" },
    ].filter((p) => p.v > 0);

    let a = -Math.PI / 2;
    return values.map((p) => {
      const da = (p.v / total) * Math.PI * 2;
      const seg = { ...p, a0: a, a1: a + da };
      a += da;
      return seg;
    });
  }, [wins, losses, be, total]);

  if (total <= 0) {
    return <div style={{ opacity: 0.7 }}>Немає даних</div>;
  }

  const W = 320;
  const H = 320;
  const cx = W / 2;
  const cy = H / 2;
  const r = 110;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {/* base ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="20" />

      {/* segments */}
      {parts.map((p) => (
        <path
          key={p.key}
          d={arcPath(cx, cy, r, p.a0, p.a1)}
          fill="none"
          stroke={p.fill}
          strokeWidth="20"
          strokeLinecap="round"
        />
      ))}

      {/* center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="34" fill="rgba(255,255,255,0.92)" fontWeight="700">
        {total}
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.65)">
        trades
      </text>
    </svg>
  );
}
