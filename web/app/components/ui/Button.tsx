"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { ui } from "./styles";

type Variant = "ghost" | "primary" | "danger";

export function Button({
  variant = "ghost",
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; style?: CSSProperties }) {
  const base =
    variant === "primary" ? ui.btnPrimary : variant === "danger" ? ui.btnDanger : ui.btn;

  return <button {...props} style={{ ...base, ...style }} />;
}
