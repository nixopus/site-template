# DESIGN.md — the design brief for this site

Every site built from this template carries a `DESIGN.md`. It is written **before any UI
code** and is binding: agents read it first and style nothing that contradicts it. When the
direction changes, this file changes in the same commit. This one is the brief for the demo
site — a fictional freight-operations product called **Ballast** — and doubles as the worked
example of the format.

## 1. Direction (named, committed)

**Shipping-manifest Swiss.** The page is a printed freight document: a ruled ledger frame,
numbered records, stencil-wide display type, monospaced reference codes. Precision is the
aesthetic — the design says "your cargo is accounted for" before the copy does. Not: corporate
logistics blue, not startup-gradient, not brutalist-for-its-own-sake.

## 2. The one bold move

**The ruled manifest frame.** Two full-height vertical hairlines bound the content column for
the entire landing page; every marketing section is a numbered record (`01 / TRACKING`)
separated by full-bleed horizontal rules, with `+` registration ticks at rule intersections.
Everything else is restrained: no shadows, no gradients, radius 0, two typefaces, one signal
color used small.

## 3. Palette (exact, tokens only)

| Token | Light | Dark | Role |
|---|---|---|---|
| `background` | `hsl(45 25% 96.5%)` | `hsl(226 25% 8%)` | paper / night ink |
| `foreground` | `hsl(226 30% 11%)` | `hsl(45 20% 93%)` | ink / paper |
| `primary` | `hsl(226 42% 15%)` | `hsl(45 20% 93%)` | brand ink — buttons, emphasis |
| `muted` | `hsl(45 14% 91%)` | `hsl(226 18% 15%)` | recessed surfaces |
| `muted-foreground` | `hsl(226 10% 40%)` | `hsl(226 8% 64%)` | secondary text |
| `border` | `hsl(226 14% 82%)` | `hsl(226 12% 22%)` | the hairlines |
| `signal` | `hsl(24 96% 49%)` | `hsl(24 95% 55%)` | THE accent — status, ticks, focus |
| `destructive` | `hsl(5 70% 42%)` | `hsl(5 75% 58%)` | errors only |

**Signal discipline:** orange appears only as marks — status dots, ticks, one underline, the
focus ring, a countdown figure. Never as a fill larger than ~2rem square, never as decoration.
1 brand (ink), 3 neutrals (paper, muted, border), 1 accent (signal). That's the whole palette.

### Dark mode — the ink edition

The same manifest printed on a second stock: near-black ink paper, off-white ink. It is a
designed edition, not an inversion — the token table above is the entire difference, and no
component changes between modes.

- **Hairlines stay hairlines.** `border` drops to `hsl(226 12% 22%)` — legible against the
  8%-lightness page, never luminous. If a rule glows, the token is too light; dim the token,
  don't touch the component.
- **Signal holds identity.** Same hue and saturation, luminance lifted one step
  (`hsl(24 95% 55%)`) so dots, ticks, and the countdown figure keep reading on ink. It stays
  a mark — the size discipline above applies in both modes.
- **Record data stays secondary.** `muted-foreground` sits at 64% lightness: clearly above
  the hairlines, clearly below `foreground`, so mono reference data keeps its rank.
- **The console sidebar is ink in both modes** — it prints on the `sidebar-*` tokens and
  simply gets a darker sheet (`hsl(226 28% 6%)`) in the dark edition.

Mechanics: `next-themes` class strategy, light by default — the paper look is the identity.
The switch is `blocks/theme-toggle`, a mono record field reading `MODE: LIGHT` /
`MODE: DARK`: the current stock stated as data, the way this document states everything.

## 4. Type (two faces, fixed roles)

| Face | Role | Rules |
|---|---|---|
| **Archivo** (variable, `wdth` axis) | Display + UI text | Display: 800 weight, `font-stretch: 116%`, uppercase, line-height 0.92, tracking -0.01em. Body: 400/500, normal width. |
| **IBM Plex Mono** | Reference data | Overlines, record codes, container IDs, table numerals, footer. 400/500, overlines uppercase +0.14em tracking. |

Scale: 12 (mono label) / 14 / 16 (body) / 18 / 20 / 25 / 31 — ratio 1.25 — then one deliberate
jump to display `clamp(2.5rem, 6.2vw + 1rem, 6rem)`. Nothing between 31px and display: the
gap **is** the hierarchy. The 2.5rem floor is load-bearing — it is what keeps the longest
headline word inside a 390px viewport.

## 5. Space, radius, depth

- Spacing: 4px base. Inside blocks: 8/12/16/24. Between blocks: 48/64. Section padding:
  96px desktop / 64px mobile. Content column: max-width 72rem.
- Radius: **0 everywhere.** Sharp corners are the stance; do not soften individual components.
- Depth stance: **flat-hairline.** No blurred shadows; hierarchy comes from rules, surface
  shifts (`muted`), and type. Artifacts alone sit on `--depth-float`, a hard 6px offset rule
  reading as a second sheet under the document — it tracks `border`, so both editions keep it
  matte. If anything ever *glows*, the stance has been violated.
- Artifact plan: **two manufactured objects, no more.** The tracking console (record 01)
  prints inside a `mock-window` titled with its container ID, and the importer strip is a
  `marquee` — cargo keeps moving. Everything else stays typographic; the manifest frame
  itself is the page's primary object.
- Density: whitespace is the conversion tool (`AGENTS.md > Landing density`). The demo holds
  the budgets — subline ≤16 words, record bodies ≤2 sentences, the CTA band one line + one
  button; a weak section loses text and gains space, never the reverse.

## 6. Motion

- Hover/focus micro: 150ms `cubic-bezier(0.25, 1, 0.5, 1)`.
- Reveals (accordion): 300ms, same curve. No parallax, no floating blobs, no scroll hijack.
- Marquee: 32s linear loop, edge-faded, pauses on hover. Section entrances: none — the
  document is already printed; records do not fade in.
- One continuously animated mark: the final CTA's outline carries a signal spark
  (`ui/aceternity/moving-border`, 4s). It is a mark under the signal size rule, not a fill;
  nothing else on the page loops except the marquee.
- Reduced motion: everything above stills — the `globals.css` kill switch freezes CSS
  animation, `MotionConfig reducedMotion="user"` covers the motion-lib spark.

## 7. Voice (the copy spec — `AGENTS.md > Copy` applies on top)

- **Register:** operations log. The page reads like a document a dispatcher trusts, not a
  pitch. Freight vocabulary used correctly: demurrage, free days, discharge, drayage, HTS.
- **Point of view:** second person for the reader ("your container"); the product is the
  named actor ("Ballast counts your free time"). No corporate "we believe".
- **Tense & mood:** present tense, declarative. State what the product does — never what it
  "can help you achieve". Headlines are statements, not questions.
- **Sentence length:** short. One idea per sentence; a three-word sentence is welcome.
- **Vocabulary domain:** numbers over adjectives — "3 free days left", "$285/day",
  "214 terminals", never "powerful insights". Every figure in the demo is internally
  consistent and plainly fictional; lorem ipsum never ships.

## 8. Self-critique (kept, so the next author sees the method)

Draft one was "Swiss grotesk + mono labels + navy/orange" — which is itself becoming an AI
tell, and navy+orange is every logistics brand. Sharpened: navy pushed to near-black **ink**
(a neutral, not a blue), orange demoted from brand color to **signal** with an enforceable
size rule, and the generic "clean sections" upgraded to the literal manifest frame with
numbered records and registration ticks. The uppercase stretched display face replaced a
default tight-tracked grotesk headline.
