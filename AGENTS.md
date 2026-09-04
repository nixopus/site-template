<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — authoring contract

Rules for any agent (or human) editing a site built from this template. `npm run build`
enforces the machine-checkable subset via `scripts/check-rules.mjs`; the rest is still binding.

## Chassis vs identity (what you keep, what you replace)
This template is a chassis wearing a disposable demo identity.
- **Chassis (permanent):** the stack, the semantic token SLOTS and their light/dark structure,
  every rule in this file, `scripts/check-rules.mjs`, the block mechanism and the `/design`
  catalog, the `src/components/ui/` stdlib, the Dockerfile.
- **Identity (per-site):** DESIGN.md's content, the token VALUES, the typefaces, the bold move
  and its flourishes — for Ballast: the ruled manifest frame, the registration ticks,
  signal-orange — and all demo copy.
- The first act on a new site is writing a fresh DESIGN.md (named direction, exact palette,
  two typefaces, motion numbers, one bold move) and replacing the identity. Never inherit
  Ballast's look: Ballast is the worked example proving the system, not the starting point.
  Blocks provide structure; their skin follows the new tokens.

## Read first
- Read `DESIGN.md` before styling anything. It is the brief; obey it. No `DESIGN.md`? Write one
  first: named direction, exact palette as tokens, two typefaces with roles, spacing scale,
  radius stance, type scale, motion timing. Critique it for genericness, sharpen once, then code.
- When the design direction changes, update `DESIGN.md` in the same commit.

## Styling
- Tokens only. Style through semantic classes (`bg-background`, `text-muted-foreground`,
  `border-border`, the site's accent — Ballast's is `text-signal`). Never raw palette classes
  (`bg-blue-500`, `text-white`, `bg-black/50`) and never hex/rgb/hsl literals in components.
  New color = new token in `src/app/globals.css` (both themes), then use the class.
- Change the theme by editing tokens in `globals.css`, not by touching components.
- Respect the radius stance and type roles in `DESIGN.md`. Do not add box-shadows, gradients,
  or a third typeface on a whim — that is a `DESIGN.md` change.

## Banned clichés (the slop list — keep current, do not reintroduce)
- Inter as a display face. Purple/indigo gradients. Gradient blobs. Glassmorphism cards.
- Emoji as icons. Three identical icon-top feature cards. Badge-above-H1 hero.
- Single-italic-word headlines. Cream+terracotta. Dark background + acid green.
- Lorem ipsum or placeholder copy of any kind. Write real, specific copy or leave the section out.

## Copy (the anti-slop discipline — build-enforced where checkable)
- Voice lives in `DESIGN.md`: every site's brief defines register, point of view, tense,
  sentence length, and vocabulary domain. Copy obeys it. No voice spec? Write one first.
- No em dashes in site copy (build fails). Restructure the sentence, or use a period,
  comma, or colon.
- Banned vocabulary (build fails — keep the list in `check-rules.mjs` current): seamless,
  effortless, unlock, unleash, empower, elevate, supercharge, game-changing, revolutionize,
  delve, robust, cutting-edge, next-level, world-class, leverage (as a verb), journey,
  "in today's fast-paced world".
- Banned constructions: "It's not just X, it's Y". "Whether you're a X or a Y".
  Rhetorical-question headlines. Triadic fragment slogans ("Simple. Fast. Secure.").
  Exclamation marks. Emoji in copy.
- Concrete over abstract: verifiable nouns and numbers over adjectives; every claim
  checkable. NEVER fabricate testimonials, customer logos, stats, or press quotes on a real
  site. Demo/fictional content must say it is fictional.
- CTAs name the action ("Track a container"). "Get Started" and "Learn More" are defaults,
  not decisions (build fails). Buttons ≤3 words.
- Error messages say what happened and what to do next.
- One idea per sentence. Cut filler transitions: Moreover, Furthermore, Additionally.

## Landing density (scarce words, generous space)
- Say it in the title. A description exists only for a fact the title cannot carry; a
  description that restates its title gets deleted, not rewritten.
- Budgets: hero headline ≤7 words; hero subline ≤16; section intro = one sentence;
  feature/record body ≤2 sentences; CTA section = one line + one button, nothing else.
- Whitespace is the conversion tool — attention concentrates on what little text remains.
  When a section feels weak, remove text and widen spacing BEFORE adding anything.
- One message per section. A section that needs a paragraph to explain itself is the
  wrong section.
- Landing defaults only: app screens and docs-like pages (FAQ answers, legal) are exempt
  where information genuinely needs the words.

## Components
- Small and composable: one block per file, ≤80 lines target, 120 hard cap (build fails).
  `src/components/ui/` (vendored primitives) is exempt.
- Edit, don't regenerate. Change the lines that need changing; never rewrite a file to make a
  small change. Reuse existing blocks and primitives before writing new ones.
- New sections go in `src/components/blocks/`; pages compose blocks and hold no styling logic.
- Catalog-first: before writing a new component, check `/design` and `src/components/blocks/`.
  Compose or extend an existing block; a brand-new component means no block fit — say so.
- Give-back: a genuinely new component is written AS a block — token-only, within the line
  cap, self-contained under `src/components/blocks/` — and added to the `/design` catalog, so
  it lifts back into the template.
- Third-party UI libraries are never added for looks (no Aceternity/Magic-UI-style imports;
  `framer-motion` only if genuinely load-bearing — build fails otherwise). Need such a piece?
  Vendor the single component in, restyle it to the site's tokens and motion values: it
  becomes an ordinary block under these rules.

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
- Maintain ≥4.5:1 contrast for text; check anything placed on `muted` or the accent token.

## Hygiene
- NEVER commit secrets, tokens, or `.env` values. Env vars are configured on the deployment
  platform. `NEXT_PUBLIC_SITE_URL` is the only env var the template reads.
- Keep the build green: `npm run build` runs the rule checks first; fix violations, never
  disable the checker.
