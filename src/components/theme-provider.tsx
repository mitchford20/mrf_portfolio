"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const hydrated = useRef(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
