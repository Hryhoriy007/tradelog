"use client";

import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, toggleTheme, type Theme } from "@/lib/theme";

export function ThemeToggle({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // sync from html dataset or localStorage on mount
    const t =
      (document.documentElement.dataset.theme as Theme) ||
      getStoredTheme();

    setTheme(t);
    applyTheme(t);
  }, []);

  const onToggle = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  const base: React.CSSProperties = {
    height: 30,
    padding: "0 10px",
    borderRadius: 12,
    border: "1px solid var(--tl-border)",
    background: "var(--tl-card)",
    color: "var(--tl-fg)",
    fontSize: 12,
    fontWeight: 900,
    cursor: "pointer",
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    opacity: 0.95,
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  };

  const floating: React.CSSProperties =
    variant === "floating"
      ? {
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 50,
        }
      : {};

  return (
    <button type="button" onClick={onToggle} style={{ ...base, ...floating }} title="Toggle theme">
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
