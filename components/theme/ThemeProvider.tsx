"use client";

import { Theme } from "@radix-ui/themes";
import { createContext, useContext, useState, ReactNode } from "react";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  mode: ThemeMode;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Theme

      appearance={mode}
      accentColor="lime"
      grayColor="gray"
      radius="medium"
    >
      <ThemeContext.Provider value={{ mode, toggle }}>
        {children}
      </ThemeContext.Provider>
    </Theme>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }
  return ctx;
}