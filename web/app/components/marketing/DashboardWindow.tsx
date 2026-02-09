"use client";

import React from "react";

function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        opacity: 0.85,
      }}
    />
  );
}

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "win" | "loss" | "be";
}) {
  const map = {
    win: "rgba(80,200,120,0.18)",
    loss: "rgba(255,100,100,0.18)",
    be: "rgba(180,180,180,0.18)",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 12,
        border: `1px solid ${map[tone]}`,
        background: map[tone],
        opacity: 0.9,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function DashboardWindow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.12)",
        background:
          `
          linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.15)),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")
          `,
        overflow: "hidden",
      }}
    >
      {/* macOS header */}
      <div
        style={{
          height: 38,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />

        <div style={{ marginLeft: 10, display: "flex", gap: 8 }}>
          <Pill tone="win">Win</Pill>
          <Pill tone="loss">Loss</Pill>
          <Pill tone="be">BE</Pill>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}
