"use client";

import type { InputHTMLAttributes, CSSProperties } from "react";
import { ui } from "./styles";

export function Input({
  style,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { style?: CSSProperties }) {
  return <input {...props} style={{ ...ui.control, ...style }} />;
}
