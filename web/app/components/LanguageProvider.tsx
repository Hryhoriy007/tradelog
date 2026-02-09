"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "ua" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // 1️⃣ авто-визначення мови
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved) {
      setLang(saved);
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("uk")) {
      setLang("ua");
      localStorage.setItem("lang", "ua");
    } else {
      setLang("en");
      localStorage.setItem("lang", "en");
    }
  }, []);

  // 2️⃣ зберігаємо при зміні
  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem("lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
