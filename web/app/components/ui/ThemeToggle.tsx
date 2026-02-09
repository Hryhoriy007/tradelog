"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { getTheme, toggleTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  return (
    <Button
      variant="secondary"
      onClick={() => setThemeState(toggleTheme())}
      title="Toggle theme"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </Button>
  );
}
