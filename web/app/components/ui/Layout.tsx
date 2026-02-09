import type { ReactNode } from "react";
import { ui } from "./styles";

export function Page({ children }: { children: ReactNode }) {
  return <div style={ui.page}>{children}</div>;
}

export function HeaderRow({ children }: { children: ReactNode }) {
  return <div style={ui.headerRow}>{children}</div>;
}

export function Row({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...ui.row, ...style }}>{children}</div>;
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div style={ui.grid2}>{children}</div>;
}

export function Grid5({ children }: { children: ReactNode }) {
  return <div style={ui.grid5}>{children}</div>;
}
