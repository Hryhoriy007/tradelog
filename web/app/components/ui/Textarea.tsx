"use client";

import type { TextareaHTMLAttributes, CSSProperties } from "react";
import { ui } from "./styles";

export function Textarea({
  minHeight = 110,
  style,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { minHeight?: number; style?: CSSProperties }) {
  return <textarea {...props} style={{ ...ui.textarea(minHeight), ...style }} />;
}
