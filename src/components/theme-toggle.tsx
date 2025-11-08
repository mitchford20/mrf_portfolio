"use client";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import * as React from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 bg-card/80 rounded-full shadow-lg px-4 py-2 border border-border">
      <Sun className={`w-5 h-5 transition-colors ${isDark ? "text-muted" : "text-yellow-500"}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
        className="mx-2"
      />
      <Moon className={`w-5 h-5 transition-colors ${isDark ? "text-purple-400" : "text-muted"}`} />
    </div>
  );
} 