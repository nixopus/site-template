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
  catalog, the `src/components/ui/` stdlib (shadcn primitives + the vendored Aceternity
  catalog under `ui/aceternity/`), the artifact and motion vocabulary under
  `blocks/artifacts/` and `blocks/motion/`, the frozen dependency set, the Dockerfile.
- **Identity (per-site):** DESIGN.md's content, the token VALUES, the typefaces, the bold move
  and its flourishes — for Ballast: the ruled manifest frame, the registration ticks,
  signal-orange — and all demo copy, **and the page's STRUCTURE**. The marketing blocks under
  `src/components/blocks/marketing/` are the demo's sections: a reference implementation to
  learn the patterns from, never the page vocabulary. A gym is not a freight ledger.
- The first act on a new site is writing a fresh DESIGN.md (named direction, exact palette,
  two typefaces, motion numbers, one bold move, **page architecture, imagery plan, depth
  stance, artifact plan**) and
  replacing the identity. Never inherit Ballast's look OR its layout: design the sections this
  site needs, in the order its one action demands, and build them as new blocks under the
  block rules — adapt a demo block only when it genuinely fits the new architecture. The bold
  move is usually structural; a repaint with new copy is not a new site.
- **Imagery:** authored SVG/CSS graphics inside the token system are first-class; leave real
  `<img>` slots for the owner's photography (`blocks/artifacts/img-slot` renders an authored
  plate until a path arrives); never stock-photo placeholders, never fabricated product or
  team shots.
- **Artifacts:** every landing carries 1-2 manufactured objects — `blocks/artifacts/`
  (mock-window, chat-card, marquee, img-slot, section-frame) or equivalents built for the
  site. DESIGN.md's artifact plan names which and where; a page of bare typography is an
  unfinished page, not a minimal one.

## Read first
- Read `DESIGN.md` before styling anything. It is the brief; obey it. No `DESIGN.md`? Write one
  first: named direction, exact palette as tokens, two typefaces with roles, spacing scale,
  radius stance, type scale, motion timing, page architecture (this site's sections, their
  order, the layout system), imagery plan, depth stance (flat-hairline | soft-float | framed,
  expressed as the `--depth-float` token), artifact plan (which 1-2 artifact blocks the
  landing carries, and where). Critique it for genericness, sharpen once, then code.
- When the design direction changes, update `DESIGN.md` in the same commit.

## Styling
- Tokens only. Style through semantic classes (`bg-background`, `text-muted-foreground`,
  `border-border`, the site's accent — Ballast's is `text-signal`). Never raw palette classes
  (`bg-blue-500`, `text-white`, `bg-black/50`) and never hex/rgb/hsl literals in components.
  New color = new token in `src/app/globals.css` (both themes), then use the class.
- Change the theme by editing tokens in `globals.css`, not by touching components.
- Depth is a declared axis: DESIGN.md names the stance and `--depth-float` expresses it
  (the `shadow-float` utility). Components never hard-code a box-shadow.
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
- `src/components/ui/` is the stdlib: pre-vendored shadcn primitives + the free Aceternity
  catalog under `ui/aceternity/` (inventory on `/design`), allowed to sit unused, never
  counted as dead code. Reach for it before authoring an interaction pattern by hand.
- Vendored code is exempt from the line cap, the raw-color rules, and the em-dash rule; it is
  refreshed by `scripts/vendor-aceternity.mjs`, never hand-grown. Our `blocks/` keep full
  token discipline.
- Aceternity is vocabulary, not identity: skin pieces to the site's tokens at the call site
  (className/props). Composing the stock Aceternity look (dark hero + beams + sparkles +
  spotlight) is the cliché rule violated at composition level; a piece earns its place by
  serving DESIGN.md's declared direction.
- Edit, don't regenerate. Change the lines that need changing; never rewrite a file to make a
  small change. Reuse existing blocks and primitives before writing new ones.
- New sections go in `src/components/blocks/`; pages compose blocks and hold no styling logic.
- Catalog-first governs ITERATION within a site: before writing a new component on an existing
  site, check `/design` and `src/components/blocks/` and compose or extend where a block fits.
  First generation is the exception — there, the page architecture in DESIGN.md decides the
  sections, and new blocks are the expected outcome, with demo blocks as reference.
- Give-back: a genuinely new component is written AS a block — token-only, within the line
  cap, self-contained under `src/components/blocks/` — and added to the `/design` catalog, so
  it lifts back into the template.
- The dependency set is FROZEN to the template's (build fails on add or remove): sites are
  authored remotely and never npm-install. Vocabulary comes from what is vendored; a new
  package is a template decision made in `scripts/check-rules.mjs` with the lockfile.

## Motion
- The reduced-motion contract precedes any motion: the kill switch in `globals.css` freezes
  CSS animation and transitions; `MotionConfig reducedMotion="user"` (theme-provider) stills
  motion-lib transforms. A hand-rolled rAF or canvas loop must check
  `prefers-reduced-motion` itself — most vendored canvas pieces do not, so gate them.
- CSS-first: keyframes, transitions, IntersectionObserver before the `motion` library;
  `motion` is sanctioned but never for what CSS does in one line.
- Entrances: `blocks/motion/reveal` (staggered via `delay`; content visible without JS).
  Loops: `blocks/artifacts/marquee` (hover-pause, edge-fade, aria-hidden duplicate).
- Motion numbers live in DESIGN.md. No parallax or scroll hijack unless DESIGN.md declares it.

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
