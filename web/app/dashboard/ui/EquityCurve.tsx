"use client";

import { useMemo } from "react";

type Point = { x: number; y: number; label?: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function EquityCurve({ data }: { data: Point[] }) {
  const { path, minY, maxY, lastY, hasData } = useMemo(() => {
    if (!data || data.length < 2) {
      const y = data?.[0]?.y ?? 0;
      return {
        path: "",
        minY: y,
        maxY: y,
        lastY: y,
        hasData: data?.length > 0,
      };
    }

    const ys = data.map((p) => p.y);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);

    // add padding so line not glued to borders
    const pad = (maxY - minY) * 0.08 || 1;
    minY -= pad;
    maxY += pad;

    const W = 1000;
    const H = 360;
    const left = 24;
    const right = 16;
    const top = 16;
    const bottom = 28;

    const innerW = W - left - right;
    const innerH = H - top - bottom;

    const xStep = innerW / (data.length - 1);
    const mapY = (y: number) => {
      const t = (y - minY) / (maxY - minY || 1);
      return top + (1 - t) * innerH;
    };

    const d = data
      .map((p, i) => {
        const x = left + i * xStep;
        const y = mapY(p.y);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");

    return { path: d, minY, maxY, lastY: data[data.length - 1].y, hasData: true };
  }, [data]);

  if (!hasData) {
    return (
      <div style={{ height: "100%", display: "grid", placeItems: "center", opacity: 0.7 }}>
        Додай хоча б одну угоду, щоб побачити графік.
      </div>
    );
  }

  const W = 1000;
  const H = 360;

  const gridLines = 4;
  const ticks = new Array(gridLines + 1).fill(0).map((_, i) => i / gridLines);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        style={{ display: "block" }}
        role="img"
        aria-label="Equity curve"
      >
        {/* background grid */}
        {ticks.map((t, i) => {
          const y = 16 + (H - 16 - 28) * t;
          return (
            <line
              key={i}
              x1="24"
              x2={W - 16}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* zero line if inside range */}
        {minY < 0 && maxY > 0 ? (
          <line
            x1="24"
            x2={W - 16}
            y1={16 + (H - 16 - 28) * clamp((maxY - 0) / (maxY - minY || 1), 0, 1)}
            y2={16 + (H - 16 - 28) * clamp((maxY - 0) / (maxY - minY || 1), 0, 1)}
            stroke="rgba(255,255,255,0.16)"
            strokeDasharray="6 6"
            strokeWidth="1"
          />
        ) : null}

        {/* curve */}
        {path ? (
          <>
            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* last point */}
            <circle
              cx={W - 16}
              cy={16 + (H - 16 - 28) * clamp((maxY - lastY) / (maxY - minY || 1), 0, 1)}
              r="5"
              fill="rgba(255,255,255,0.92)"
            />
          </>
        ) : (
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="rgba(255,255,255,0.7)">
            Недостатньо даних для лінії
          </text>
        )}

        {/* min/max labels */}
        <text x="24" y="14" fill="rgba(255,255,255,0.65)" fontSize="12">
          {maxY.toFixed(1)}R
        </text>
        <text x="24" y={H - 8} fill="rgba(255,255,255,0.65)" fontSize="12">
          {minY.toFixed(1)}R
        </text>
      </svg>
    </div>
  );
}
