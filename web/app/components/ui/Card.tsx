import type { CSSProperties, ReactNode } from "react";
import { ui } from "./styles";

export function Card({
  title,
  children,
  style,
}: {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section style={{ ...ui.card, ...style }}>
      {title ? <h2 style={ui.cardTitle}>{title}</h2> : null}
      {children}
    </section>
  );
}
