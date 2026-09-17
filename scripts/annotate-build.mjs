#!/usr/bin/env node
// Pipes `next build` output through unchanged and re-emits each compile error as a GitHub
// annotation (file, line, message plus its indented detail), so a failed build is readable
// from the checks API. The workflow's pipefail carries next build's own exit code.

import { createInterface } from "node:readline";

const TSC = /^(\S+?)\((\d+),(\d+)\): error (TS\d+: .*)$/;
const NEXT = /^\.\/(\S+?):(\d+):(\d+)$/;

let open = null; // { file, line, col, parts[] } awaiting its detail lines

function flush() {
  if (!open) return;
  const message = open.parts.join(" ").replace(/\s+/g, " ").trim();
  if (message) console.log(`::error file=${open.file},line=${open.line},col=${open.col}::${message}`);
  open = null;
}

for await (const line of createInterface({ input: process.stdin })) {
  console.log(line);
  const tsc = line.match(TSC);
  const next = line.match(NEXT);
  if (tsc || next) {
    flush();
    const [, file, row, col, first] = tsc ?? next;
    open = { file, line: row, col, parts: first ? [first] : [] };
    continue;
  }
  const detail = open && line.trim() && (open.parts.length === 0 || /^\s/.test(line));
  if (detail && open.parts.length < 4) {
    open.parts.push(line.trim());
    continue;
  }
  flush();
}
flush();
