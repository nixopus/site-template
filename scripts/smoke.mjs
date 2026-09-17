#!/usr/bin/env node
// Walks the built site like a first visitor: every internal link reachable from `/`, at a phone
// and a desktop width. Fails on a broken link or server error, a console or page error, an image
// that did not load, or a page wider than the screen. Each failure is a GitHub annotation.
// Usage: node scripts/smoke.mjs http://127.0.0.1:3000   (needs `playwright` resolvable)

import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const WIDTHS = [390, 1440];
const MAX_PAGES = 40;
const failures = [];

function fail(path, message) {
  failures.push(`${path}: ${message}`);
  if (process.env.GITHUB_ACTIONS) console.log(`::error file=src/app/page.tsx,line=1::smoke ${path}: ${message}`);
}

// A private app redirects to its sign-in page; with SMOKE_EMAIL/SMOKE_PASSWORD set the crawl
// signs in once and walks the protected screens too.
async function signInIfAsked(page) {
  const email = process.env.SMOKE_EMAIL;
  const password = process.env.SMOKE_PASSWORD;
  const form = await page.$("input[type=password]");
  if (!email || !password || !form) return false;
  await page.fill("input[type=email], input[name=email]", email);
  await page.fill("input[type=password]", password);
  await Promise.all([page.waitForLoadState("networkidle"), page.press("input[type=password]", "Enter")]);
  await page.waitForTimeout(500);
  return !(await page.$("input[type=password]"));
}

const browser = await chromium.launch();
const context = await browser.newContext();
const queue = ["/"];
const seen = new Set(queue);

while (queue.length && seen.size <= MAX_PAGES) {
  const path = queue.shift();
  for (const width of WIDTHS) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    page.on("console", (m) => m.type() === "error" && fail(path, `console error at ${width}px: ${m.text().slice(0, 200)}`));
    page.on("pageerror", (e) => fail(path, `page error at ${width}px: ${e.message.slice(0, 200)}`));
    const response = await page.goto(BASE + path, { waitUntil: "networkidle" }).catch((e) => fail(path, e.message));
    if (response && response.status() >= 400) fail(path, `HTTP ${response.status()} (linked from the site)`);
    if (await signInIfAsked(page)) await page.goto(BASE + path, { waitUntil: "networkidle" });
    const report = await page.evaluate(() => {
      const wide = document.documentElement.scrollWidth - window.innerWidth;
      const culprit = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .map((el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}.${String(el.className).split(" ")[0]}`)
        .at(-1);
      const broken = [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src);
      const links = [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href").split("#")[0]);
      return { wide, culprit, broken, links };
    });
    if (report.wide > 1) fail(path, `page is ${report.wide}px wider than a ${width}px screen (widest element: ${report.culprit})`);
    for (const src of report.broken) fail(path, `image did not load: ${src}`);
    for (const link of report.links) {
      if (link && !seen.has(link)) {
        seen.add(link);
        queue.push(link);
      }
    }
    await page.close();
  }
}

await browser.close();
console.log(`smoke: ${seen.size} page(s) at ${WIDTHS.join(" and ")}px, ${failures.length} failure(s)`);
for (const f of failures) console.error(`  ${f}`);
process.exit(failures.length ? 1 : 0);
