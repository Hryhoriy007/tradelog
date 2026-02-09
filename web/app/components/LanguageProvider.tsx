"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "ua" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  ready: boolean;
};

const STORAGE_KEY = "lang";

const LangContext = createContext<LangContextType | null>(null);

function isLang(v: unknown): v is Lang {
  return v === "ua" || v === "en";
}

function detectLangFromNavigator(): Lang {
  const browserLang = (navigator.language || "").toLowerCase();
  // uk / uk-UA => ua
  if (browserLang.startsWith("uk")) return "ua";
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  // 1) ініціалізація (saved -> navigator)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLang(saved)) {
        setLangState(saved);
      } else {
        const detected = detectLangFromNavigator();
        setLangState(detected);
        localStorage.setItem(STORAGE_KEY, detected);
      }
    } catch {
      // якщо localStorage недоступний — просто беремо navigator
      setLangState(detectLangFromNavigator());
    } finally {
      setReady(true);
    }
  }, []);

  // 2) зміна мови вручну
  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }

  const value = useMemo(() => ({ lang, setLang, ready }), [lang, ready]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
