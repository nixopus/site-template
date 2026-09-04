<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — authoring contract

Rules for any agent (or human) editing a site built from this template. `npm run build`
enforces the machine-checkable subset via `scripts/check-rules.mjs`; the rest is still binding.

## Read first
- Read `DESIGN.md` before styling anything. It is the brief; obey it. No `DESIGN.md`? Write one
  first: named direction, exact palette as tokens, two typefaces with roles, spacing scale,
  radius stance, type scale, motion timing. Critique it for genericness, sharpen once, then code.
- When the design direction changes, update `DESIGN.md` in the same commit.

## Styling
- Tokens only. Style through semantic classes (`bg-background`, `text-muted-foreground`,
  `border-border`, `text-signal`). Never raw palette classes (`bg-blue-500`, `text-white`,
  `bg-black/50`) and never hex/rgb/hsl literals in components. New color = new token in
  `src/app/globals.css` (both themes), then use the class.
- Change the theme by editing tokens in `globals.css`, not by touching components.
- Respect the radius stance and type roles in `DESIGN.md`. Do not add box-shadows, gradients,
  or a third typeface on a whim — that is a `DESIGN.md` change.

## Banned clichés (the slop list — keep current, do not reintroduce)
- Inter as a display face. Purple/indigo gradients. Gradient blobs. Glassmorphism cards.
- Emoji as icons. Three identical icon-top feature cards. Badge-above-H1 hero.
- Single-italic-word headlines. Cream+terracotta. Dark background + acid green.
- Lorem ipsum or placeholder copy of any kind. Write real, specific copy or leave the section out.

## Components
- Small and composable: one block per file, ≤80 lines target, 120 hard cap (build fails).
  `src/components/ui/` (vendored primitives) is exempt.
- Edit, don't regenerate. Change the lines that need changing; never rewrite a file to make a
  small change. Reuse existing blocks and primitives before writing new ones.
- New sections go in `src/components/blocks/`; pages compose blocks and hold no styling logic.

## Routes & rendering
- Marketing routes (landing, pricing, about) stay static — no dynamic APIs, no client-side
  data fetching for content. App routes (`/app/...`) may be dynamic.
- Every page exports `metadata` (title, description) — build fails otherwise. Set OpenGraph
  fields on pages that will be shared.
- Client components only where interaction demands it; keep `"use client"` out of pages.

## Accessibility
- Semantic landmarks: one `<h1>` per page, `<header>/<main>/<nav>/<footer>`, headings in order.
- Every image gets meaningful `alt`; decorative images get `alt=""`.
- Interactive elements are buttons/links, keyboard-reachable, with visible focus (`ring` token).
- Maintain ≥4.5:1 contrast for text; check anything placed on `muted` or `signal`.

## Hygiene
- NEVER commit secrets, tokens, or `.env` values. Env vars are configured on the deployment
  platform. `NEXT_PUBLIC_SITE_URL` is the only env var the template reads.
- Keep the build green: `npm run build` runs the rule checks first; fix violations, never
  disable the checker.
