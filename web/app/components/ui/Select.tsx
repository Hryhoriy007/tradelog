"use client";

import type { SelectHTMLAttributes, CSSProperties } from "react";
import { ui } from "./styles";

export function Select({
  style,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { style?: CSSProperties }) {
  return <select {...props} style={{ ...ui.control, ...style }} />;
}
