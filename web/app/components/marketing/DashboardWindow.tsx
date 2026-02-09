"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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
        opacity: 0.92,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

type Theme = "dark" | "light";
const THEME_KEY = "tradelog_theme_v1";

function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = (localStorage.getItem(THEME_KEY) || "").toLowerCase();
  return v === "light" ? "light" : "dark";
}

function applyTheme(t: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, t);
  document.documentElement.dataset.theme = t;
}

function ThemeToggleMini() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const onToggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      title="Toggle theme"
      style={{
        height: 26,
        padding: "0 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        color: "inherit",
        fontSize: 12,
        fontWeight: 800,
        opacity: 0.92,
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}

export function DashboardWindow({
  children,
  watermark = "Demo data",
}: {
  children: React.ReactNode;
  watermark?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });
  const [glow, setGlow] = useState({ x: 70, y: 12 }); // percent positions

  const supportsFinePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: fine)").matches ?? false;
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!supportsFinePointer) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    // tilt around center
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 10;

    setTilt({ rx, ry, s: 1.01 });

    // parallax glow anchor (in % for CSS gradients)
    setGlow({
      x: Math.max(0, Math.min(100, px * 100)),
      y: Math.max(0, Math.min(100, py * 100)),
    });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0, s: 1 });
    setGlow({ x: 70, y: 12 }); // back to nice default
  };

  return (
    <div style={{ perspective: 900 }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
          transformStyle: "preserve-3d",
          transition: supportsFinePointer ? "transform 120ms ease" : "none",
          willChange: "transform",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          boxShadow: "0 40px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative",
          background:
            `
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.15)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")
            `,
        }}
      >
        {/* Parallax glow (moves with cursor) */}
        <div
          style={{
            position: "absolute",
            inset: -80,
            pointerEvents: "none",
            background: `radial-gradient(650px 240px at ${glow.x}% ${glow.y}%, rgba(140,80,255,0.26), transparent 60%)`,
            transition: supportsFinePointer ? "background 60ms linear" : "none",
          }}
        />

        {/* Specular highlight (soft glassy shine) */}
        <div
          style={{
            position: "absolute",
            inset: -120,
            pointerEvents: "none",
            background: `radial-gradient(520px 200px at ${Math.min(
              100,
              glow.x + 10
            )}% ${Math.max(0, glow.y - 10)}%, rgba(255,255,255,0.10), transparent 65%)`,
            mixBlendMode: "screen",
            opacity: 0.7,
            transition: supportsFinePointer ? "background 60ms linear" : "none",
          }}
        />

        {/* watermark */}
        <div
          style={{
            position: "absolute",
            right: 14,
            bottom: 12,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 0.6,
            opacity: 0.16,
            transform: "rotate(-8deg)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {watermark}
        </div>

        {/* macOS header */}
        <div
          style={{
            position: "relative",
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

          <div style={{ marginLeft: 10, display: "flex", gap: 8, alignItems: "center" }}>
            <Pill tone="win">Win</Pill>
            <Pill tone="loss">Loss</Pill>
            <Pill tone="be">BE</Pill>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <ThemeToggleMini />
          </div>
        </div>

        {/* content */}
        <div style={{ position: "relative", padding: 14 }}>{children}</div>
      </div>
    </div>
  );
}
