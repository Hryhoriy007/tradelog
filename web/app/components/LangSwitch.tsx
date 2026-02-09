"use client";

import { useLang } from "./LanguageProvider";

export default function LangSwitch() {
  const { lang, setLang, ready } = useLang();

  if (!ready) return null;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: active ? "#111" : "transparent",
    color: active ? "#fff" : "#111",
    cursor: "pointer",
    fontWeight: active ? 600 : 400,
  });

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button
        type="button"
        onClick={() => setLang("ua")}
        style={btnStyle(lang === "ua")}
        aria-pressed={lang === "ua"}
      >
        UA
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        style={btnStyle(lang === "en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
