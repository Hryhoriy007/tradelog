import type { ReactNode } from "react";
import { ui } from "./styles";

export function Page({ children }: { children: ReactNode }) {
  return <div style={ui.page}>{children}</div>;
}

import React from "react";
export function HeaderRow(
  props:
    | {
        title?: string;
        subtitle?: string;
        right?: React.ReactNode;
        children?: React.ReactNode;
      }
    | any
) {
  const { title, subtitle, right, children } = props ?? {};

  // If children are passed explicitly (old style), render them as-is.
  // Otherwise render the title/subtitle/right layout (new style).
  const useChildren =
    children != null &&
    (typeof title === "undefined" && typeof subtitle === "undefined" && typeof right === "undefined");

  if (useChildren) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 14,
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: 260 }}>
        <div style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>
          {title ?? ""}
        </div>
        {subtitle ? (
          <div style={{ opacity: 0.7, fontSize: 13, marginTop: 6 }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      {right ? <div style={{ display: "flex", gap: 8 }}>{right}</div> : null}
    </div>
  );
}

export function Row({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...ui.row, ...style }}>{children}</div>;
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div style={ui.grid2}>{children}</div>;
}

export function Grid3({ children }: { children: ReactNode }) {
  return <div style={ui.grid3}>{children}</div>;
}

export function Grid5({ children }: { children: ReactNode }) {
  return <div style={ui.grid5}>{children}</div>;
}
