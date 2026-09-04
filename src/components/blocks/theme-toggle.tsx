"use client";

import { useTheme } from "next-themes";

/**
 * Mode switch as a manifest record field: the current stock is stated as data
 * (`MODE: LIGHT`), not symbolized by an icon. The visible label is swapped by
 * the `dark:` variant so it is correct from first paint, before hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="type-overline inline-flex h-7 items-center border border-border px-2.5 text-muted-foreground transition-colors duration-150 ease-manifest outline-none hover:border-input hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="dark:hidden">Mode: Light</span>
      <span className="hidden dark:inline">Mode: Dark</span>
    </button>
  );
}
