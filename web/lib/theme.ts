export type Theme = "dark" | "light";

export const THEME_KEY = "tradelog_theme_v1";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = (localStorage.getItem(THEME_KEY) || "").toLowerCase();
  return v === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.dataset.theme = theme;
}

export function toggleTheme(): Theme {
  const next: Theme = getStoredTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
