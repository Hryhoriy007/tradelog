export type Theme = "dark" | "light";

const KEY = "tradelog_theme_v1";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const v = (localStorage.getItem(KEY) || "").toLowerCase();
  return v === "light" ? "light" : "dark";
}

export function setTheme(t: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, t);
  document.documentElement.dataset.theme = t;
}

export function toggleTheme() {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
