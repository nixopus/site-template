"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// Accepts next-themes' own props so canonical usage compiles; defaults stay ours.
// MotionConfig makes motion-lib animations honor prefers-reduced-motion app-wide;
// the CSS kill switch in globals.css covers keyframes and transitions.
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
