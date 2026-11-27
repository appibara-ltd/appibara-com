"use client";

import React, { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

export type ThemePreference = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "appibara-theme";
const THEME_CHANGE_EVENT = "appibara-theme-change";

const THEME_OPTIONS: ReadonlyArray<{
  id: ThemePreference;
  label: string;
  icon: typeof Sun;
}> = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function applyThemeClass(theme: ThemePreference) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  } else {
    root.classList.remove("light", "dark");
    root.style.colorScheme = "";
  }
}

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemePreference(stored)) {
        setTheme(stored);
        applyThemeClass(stored);
      }
    } catch {
      // Ignore storage access errors in restricted contexts.
    }
    setMounted(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next: ThemePreference = isThemePreference(event.newValue)
        ? event.newValue
        : "system";
      setTheme(next);
      applyThemeClass(next);
    };

    const handleThemeEvent = (event: Event) => {
      const customEvent = event as CustomEvent<ThemePreference>;
      if (isThemePreference(customEvent.detail)) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeEvent);
    };
  }, []);

  const handleSelect = (next: ThemePreference) => {
    setTheme(next);
    applyThemeClass(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors in restricted contexts.
    }
    window.dispatchEvent(
      new CustomEvent<ThemePreference>(THEME_CHANGE_EVENT, { detail: next }),
    );
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className={cn(styles.switcher, "font-nunito", className)}
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = mounted && theme === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => handleSelect(option.id)}
            className={cn(styles.option, isActive && styles.optionActive)}
            title={`Use ${option.label.toLowerCase()} theme`}
          >
            <Icon className="w-[13px] h-[13px]" aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
