"use client";

import { useMemo } from "react";

type Bin = { from: number; to: number; count: number };

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toFixed(digits);
}

export function RHistogram({ bins }: { bins: Bin[] }) {
  const model = useMemo(() => {
    if (!bins || bins.length === 0) {
      return { bars: [], maxCount: 0, zeroIndex: -1 };
    }

    const maxCount = Math.max(...bins.map((b) => b.count), 1);
    // find bin that contains 0 (for a subtle marker)
    const zeroIndex = bins.findIndex((b) => b.from <= 0 && b.to > 0);

    return { bars: bins, maxCount, zeroIndex };
  }, [bins]);

  if (!bins || bins.length === 0) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center", opacity: 0.7 }}>
        Додай угоди, щоб побачити розподіл.
      </div>
    );
  }

  const W = 1000;
  const H = 360;

  const left = 24;
  const right = 16;
  const top = 16;
  const bottom = 46;

  const innerW = W - left - right;
  const innerH = H - top - bottom;

  const gap = 6;
  const barW = (innerW - gap * (model.bars.length - 1)) / model.bars.length;

  // show fewer x labels if many bins
  const labelEvery = model.bars.length > 24 ? 4 : model.bars.length > 16 ? 2 : 1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block" }}>
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = top + innerH * (1 - t);
        return (
          <line
            key={i}
            x1={left}
            x2={W - right}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* bars */}
      {model.bars.map((b, i) => {
        const h = (b.count / model.maxCount) * innerH;
        const x = left + i * (barW + gap);
        const y = top + (innerH - h);

        const isZero = i === model.zeroIndex;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={10}
              ry={10}
              fill={isZero ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)"}
              stroke="rgba(255,255,255,0.10)"
            />
            {/* count label on tall bars */}
            {b.count > 0 && h > 36 ? (
              <text
                x={x + barW / 2}
                y={y + 18}
                textAnchor="middle"
                fontSize="12"
                fill="rgba(255,255,255,0.75)"
              >
                {b.count}
              </text>
            ) : null}
            {/* x labels */}
            {i % labelEvery === 0 ? (
              <text
                x={x + barW / 2}
                y={H - 18}
                textAnchor="middle"
                fontSize="12"
                fill="rgba(255,255,255,0.65)"
              >
                {fmt(b.from, 2)}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* axis label */}
      <text x={left} y={H - 6} fontSize="12" fill="rgba(255,255,255,0.65)">
        R (bin start)
      </text>
    </svg>
  );
}
