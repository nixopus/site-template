#!/usr/bin/env node
// Vendors the free Aceternity UI catalog (ui.aceternity.com/components) into
// src/components/ui/aceternity/ via the shadcn registry protocol. Zero dependencies.
// Re-run to refresh; review the diff like any vendored update.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DEST = join(ROOT, "src", "components", "ui", "aceternity");
const REGISTRY = "https://ui.aceternity.com/registry";

// Registry item names for every slug on /components. Page slugs that differ from
// registry names are mapped; the three "*-free" pages are section-template
// collections (compositions, not vocabulary) and are deliberately not vendored.
const ITEMS = [
  "3d-card", "3d-globe", "3d-marquee", "3d-pin", "animated-modal",
  "animated-testimonials", "animated-tooltip", "apple-cards-carousel", "ascii-art",
  "aurora-background", "background-beams", "background-beams-with-collision",
  "background-boxes", "background-gradient", "background-gradient-animation",
  "background-lines", "background-ripple-effect", "bento-grid",
  "canvas-reveal-effect", "canvas-text", "card-hover-effect", "card-spotlight",
  "card-stack", "carousel", "chromatic-image", "cloud-shader", "code-block",
  "colourful-text", "comet-card", "compare", "container-scroll-animation",
  "container-text-flip", "cover", "direction-aware-hover", "dither-shader",
  "dotted-glow-background", "draggable-card", "encrypted-text",
  "evervault-card", "expandable-card-on-click", "file-upload", "flip-words",
  "floating-dock", "floating-navbar", "focus-cards", "following-pointer",
  "glare-card", "globe", "glowing-effect", "glowing-stars", "gooey-input",
  "google-gemini-effect", "grid", "hero-highlight", "hero-parallax",
  "hover-border-gradient", "images-badge", "images-slider",
  "infinite-moving-cards", "input", "keyboard", "label", "lamp", "layout-grid",
  "layout-text-flip", "lens", "link-preview", "loader", "macbook-scroll",
  "magnetic-button", "meteors", "moving-border", "multi-step-loader",
  "navbar-menu", "noise-background", "notch", "parallax-hero-images",
  "parallax-scroll", "parallax-scroll-2", "pixelated-canvas",
  "placeholders-and-vanish-input", "pointer-highlight", "resizable-navbar",
  "scales", "shooting-stars", "sidebar", "sparkles", "spotlight",
  "spotlight-new", "squiggly-text", "stars-background", "stateful-button",
  "sticky-banner", "sticky-scroll-reveal", "svg-mask-effect", "tabs",
  "tailwindcss-buttons", "terminal", "text-flipping-board",
  "text-generate-effect", "text-hover-effect", "text-reveal-card", "timeline",
  "tooltip-card", "tracing-beam", "typewriter-effect", "vortex",
  "wavy-background", "webcam-pixel-grid", "wobble-card", "world-map",
];

// After a refresh, re-apply the React 19 type fixups by reviewing `git diff`
// against the previous vendored state: useRef() needs an initial value,
// RefObject<T> parameters widen to RefObject<T | null>, JSX.Element becomes
// React.JSX.Element, and polymorphic `as` props fall back to any.
function rewrite(content) {
  return content
    .replaceAll(/from\s+"framer-motion"/g, 'from "motion/react"')
    .replaceAll('"@/utils/cn"', '"@/lib/utils"')
    .replaceAll(
      /@\/components\/ui\/(?!aceternity\/)([a-z0-9-]+)/g,
      "@/components/ui/aceternity/$1"
    );
}

const written = new Map();
const deps = new Set();
const skipped = [];

for (const name of ITEMS) {
  const res = await fetch(`${REGISTRY}/${name}.json`);
  const item = res.ok ? await res.json() : null;
  if (!item || !Array.isArray(item.files) || item.files.length === 0) {
    skipped.push(name);
    continue;
  }
  for (const dep of item.dependencies ?? []) {
    deps.add(dep.replace(/@alpha$/, "").replace(/^motion\/react$/, "motion"));
  }
  for (const file of item.files) {
    const base = file.target.split("/").pop();
    const dest =
      file.type === "registry:hook" ? join(ROOT, "src", "hooks", base) : join(DEST, base);
    if (written.has(dest)) continue;
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, rewrite(file.content));
    written.set(dest, name);
  }
  process.stdout.write(`vendored ${name}\n`);
}

// The globe component's country data (imported as @/data/globe.json).
const globe = await fetch("https://assets.aceternity.com/globe.json");
if (globe.ok) {
  mkdirSync(join(ROOT, "src", "data"), { recursive: true });
  writeFileSync(join(ROOT, "src", "data", "globe.json"), await globe.text());
}

console.log(`\n${written.size} files written, ${skipped.length} misses`);
if (skipped.length > 0) console.log("misses:", skipped.join(", "));
console.log("npm deps required:", [...deps].sort().join(", "));
