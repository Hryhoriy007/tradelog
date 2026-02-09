import type { CSSProperties } from "react";

export const ui = {
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
  } as CSSProperties,

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  } as CSSProperties,

  card: {
    border: "1px solid #222",
    borderRadius: 16,
    padding: 18,
    background: "rgba(0,0,0,0.2)",
  } as CSSProperties,

  cardTitle: {
    fontSize: 18,
    fontWeight: 900,
    marginBottom: 12,
  } as CSSProperties,

  subtle: { opacity: 0.7 } as CSSProperties,

  row: { display: "flex", gap: 12, flexWrap: "wrap" } as CSSProperties,

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  } as CSSProperties,

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  } as CSSProperties,

  grid5: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 12,
  } as CSSProperties,

  control: {
    width: "100%",
    height: 44,
    padding: "0 12px",
    borderRadius: 12,
    border: "1px solid #222",
    background: "transparent",
    color: "inherit",
    outline: "none",
  } as CSSProperties,

  textarea: (minHeight = 110) =>
    ({
      width: "100%",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid #222",
      background: "transparent",
      color: "inherit",
      outline: "none",
      minHeight,
      resize: "vertical",
    } as CSSProperties),

  btn: {
    height: 42,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "transparent",
    fontWeight: 900,
    cursor: "pointer",
    color: "inherit",
  } as CSSProperties,

  btnPrimary: {
    height: 42,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "#fff",
    color: "#111",
    fontWeight: 900,
    cursor: "pointer",
  } as CSSProperties,

  btnDanger: {
    height: 42,
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "#ff4d4d",
    color: "#111",
    fontWeight: 900,
    cursor: "pointer",
  } as CSSProperties,

  tableWrap: {
    border: "1px solid #222",
    borderRadius: 16,
    overflow: "hidden",
  } as CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse",
  } as CSSProperties,

  th: {
    textAlign: "left",
    padding: "12px 14px",
    fontSize: 13,
    fontWeight: 900,
    opacity: 0.8,
    borderBottom: "1px solid #222",
  } as CSSProperties,

  td: {
    padding: "12px 14px",
    borderBottom: "1px solid #161616",
    verticalAlign: "middle",
  } as CSSProperties,
};
