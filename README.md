# Site Template

An agent-first template for websites **and** web apps. One repo covers both: whether a route
is a marketing page or an app screen is a per-route decision, not a template choice. It ships
with a working demo — a fictional freight-operations product called **Ballast** — that proves
the template produces designed output, not defaults.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui

## The rules system

Design quality here is enforced, not hoped for. Three layers:

| Layer | File | What it does |
|---|---|---|
| Contract | [`AGENTS.md`](AGENTS.md) | The invariant authoring rules any agent or human must follow: token-only styling, small composable components, per-page metadata, the cliché ban list, accessibility basics, no secrets in the repo. |
| Brief | [`DESIGN.md`](DESIGN.md) | This site's design decisions: a named direction, exact palette, two typefaces with roles, spacing/radius/motion numbers. Every new site gets its own, written before any UI code. |
| Enforcement | [`scripts/check-rules.mjs`](scripts/check-rules.mjs) | The machine-checkable subset, run automatically before every build (`prebuild`). Violations fail the build. |

`npm run build` fails on: raw Tailwind palette classes (`bg-blue-500`, `text-white`), hex/rgb/hsl
literals in components, lorem ipsum anywhere, component files over 120 lines, and pages missing
a `metadata` export. Run it standalone with `npm run check`.

## Demo routes

| Route | What it shows |
|---|---|
| `/` | The landing page — statically prerendered, full metadata/OG. |
| `/app` | The app shell — sidebar, stat row, data table. |
| `/design` | The style guide — tokens, type roles, primitives, and app blocks in one place. The visual reference when authoring. |

## Block catalog

Composable sections under `src/components/blocks/`, each ≤ ~80 lines, styled only through
semantic tokens:

- **Marketing** (`blocks/marketing/`): `site-nav`, `hero`, `manifest-strip`, `logo-strip`,
  `record-*` feature sections (four distinct layouts, not three identical cards), `pricing`,
  `faq`, `cta-band`, `site-footer`, plus the `ledger` frame primitives.
- **App** (`blocks/app/`): `app-shell` (sidebar layout), `shipments-table` (data table),
  `stat-row`, `sign-in`, `empty-state`, `settings-form`.
- **Design** (`blocks/design/`): the style-guide specimens rendered on `/design`.

Primitives live in `src/components/ui/` (vendored shadcn/ui — add more with
`npx shadcn@latest add <component>`).

## Theming

All color, radius, and font decisions live in `src/app/globals.css` as semantic tokens
(light + dark), consumed via Tailwind classes like `bg-background`, `text-muted-foreground`,
`text-signal`. Retheming a site is a one-file edit; components never change.

## Quickstart

```bash
npm install
npm run dev        # develop on http://localhost:3000
npm run build      # rule checks, then production build
npm run start      # serve the production build
```

## Deploy

The included multi-stage `Dockerfile` builds a small runtime image from Next.js standalone
output and runs as a non-root user on port 3000 — suitable for any container platform.
Configure environment variables on the platform, never in the repo. The template reads one:
`NEXT_PUBLIC_SITE_URL` (canonical origin for metadata/OG URLs).

```bash
docker build -t my-site .
docker run -p 3000:3000 my-site
```
