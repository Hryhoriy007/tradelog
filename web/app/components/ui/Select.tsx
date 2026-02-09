"use client";

import type { SelectHTMLAttributes, CSSProperties } from "react";
import { ui } from "./styles";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { style?: CSSProperties };

export function Select({ style, ...props }: Props) {
  const base =
    (ui as any)?.control ??
    (ui as any)?.input ??
    fallback;

  return (
    <select
      {...props}
      style={{
        ...base,
        ...style,
        // нормальний вигляд стрілки + щоб текст не залазив під неї
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        paddingRight: 34,
      }}
    />
  );
}

const fallback: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid #222",
  background: "transparent",
  color: "inherit",
  outline: "none",
};
