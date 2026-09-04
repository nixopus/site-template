#!/usr/bin/env node
// Build-time enforcement of the machine-checkable AGENTS.md rules. Zero dependencies.
// Runs via `npm run build` (prebuild). Exit 1 on any violation.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const VENDORED = join("src", "components", "ui"); // shadcn primitives: exempt from the line cap

const PALETTE =
  "(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";
const PREFIX =
  "(bg|text|border|ring|fill|stroke|from|via|to|divide|outline|decoration|shadow|accent|caret|placeholder)";

// The ruleset. Each rule: which files it applies to, how it checks, what it says.
const RULES = [
  {
    id: "no-raw-palette",
    why: "Style through semantic tokens (AGENTS.md > Styling). Add a token to globals.css instead.",
    applies: (file) => file.endsWith(".tsx"),
    check: perLine(new RegExp(`(?<![\\w-])${PREFIX}-${PALETTE}(?![\\w])`)),
  },
  {
    id: "no-raw-color-values",
    why: "No hex/rgb/hsl literals in components — colors live in globals.css as tokens.",
    applies: (file) => file.endsWith(".tsx"),
    check: perLine(/\[#[0-9a-fA-F]{3,8}\]|\[(?:rgb|hsl)a?\(/),
  },
  {
    id: "no-lorem-ipsum",
    why: "Real copy only (AGENTS.md > Banned clichés). Write it or cut the section.",
    applies: (file) => /\.(tsx|ts|mdx?|css)$/.test(file),
    check: perLine(/lorem ipsum/i),
  },
  {
    id: "component-line-cap",
    why: "Components stay small and composable: 120 lines hard cap (target 80). Split it.",
    applies: (file) => file.endsWith(".tsx") && !file.includes(VENDORED),
    check: (content) => {
      const lines = content.split("\n").length;
      return lines > 120 ? [{ line: lines, excerpt: `${lines} lines (cap 120)` }] : [];
    },
  },
  {
    id: "page-needs-metadata",
    why: "Every page exports `metadata` (AGENTS.md > Routes & rendering).",
    applies: (file) => /src\/app(\/|$).*page\.tsx$/.test(file.replaceAll("\\", "/")),
    check: (content) => {
      if (content.includes('"use client"') || content.includes("'use client'")) return [];
      const ok = /export\s+(const\s+metadata|(async\s+)?function\s+generateMetadata)/.test(content);
      return ok ? [] : [{ line: 1, excerpt: "no `export const metadata` or generateMetadata" }];
    },
  },
];

function perLine(regex) {
  return (content) =>
    content.split("\n").flatMap((text, i) => {
      const match = text.match(regex);
      return match ? [{ line: i + 1, excerpt: match[0] }] : [];
    });
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const violations = [];
let scanned = 0;
for (const path of walk(SRC)) {
  const file = relative(ROOT, path);
  const applicable = RULES.filter((rule) => rule.applies(file));
  if (applicable.length === 0) continue;
  scanned += 1;
  const content = readFileSync(path, "utf8");
  for (const rule of applicable) {
    for (const hit of rule.check(content, file)) {
      violations.push({ file, rule, ...hit });
    }
  }
}

console.log(`check-rules: scanned ${scanned} files under src/`);
if (violations.length > 0) {
  console.error(`\ncheck-rules: ${violations.length} violation(s)\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule.id}]  ${v.excerpt}`);
    console.error(`    ↳ ${v.rule.why}\n`);
  }
  process.exit(1);
}
console.log("check-rules: clean");
