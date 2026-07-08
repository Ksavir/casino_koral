"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "casino-koral-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isLight = theme === "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="focus-ring inline-flex h-12 w-[5.25rem] shrink-0 items-center rounded-full border border-brass/30 bg-ink/70 p-1 shadow-casino backdrop-blur transition hover:border-brass"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
    >
      <span
        className={`grid size-10 place-items-center rounded-full bg-brass text-ink shadow-glow transition ${
          isLight ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isLight ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </span>
    </button>
  );
}
