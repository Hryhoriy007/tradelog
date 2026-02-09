"use client";

import { useLang } from "./LanguageProvider";

export default function LangSwitch() {
  const { lang, setLang } = useLang();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={() => setLang("ua")}
        style={{ fontWeight: lang === "ua" ? "bold" : "normal" }}
      >
        UA
      </button>
      <button
        onClick={() => setLang("en")}
        style={{ fontWeight: lang === "en" ? "bold" : "normal" }}
      >
        EN
      </button>
    </div>
  );
}
