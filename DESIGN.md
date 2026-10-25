# Design Brief

## Direction

CALDER & CO. — an architectural monograph rendered as a website: monumental serif headlines set against generous porcelain whitespace.

## Tone

Editorial / magazine extreme — printed-architecture-journal restraint, not a generic agency template.

## Differentiation

Oversized high-contrast Didone serif type at architectural scale, framed by hairline Sandstone rules and asymmetric off-grid composition.

## Color Palette

| Token      | Hex       | OKLCH           | Role                                        |
| ---------- | --------- | --------------- | ------------------------------------------- |
| background | `#F7F4ED` | `0.965 0.012 92`| Warm Porcelain — primary page ground        |
| foreground | `#24140F` | `0.235 0.028 40`| Dark Walnut — text + dark sections          |
| card       | `#FAF8F2` | `0.985 0.008 92`| Raised porcelain surfaces                   |
| primary    | `#24140F` | `0.235 0.028 40`| Dark Walnut — dark bands, primary buttons   |
| secondary  | `#D7C5AE` | `0.825 0.032 75`| Sandstone — dividers, secondary details     |
| muted      | `#EDE7DA` | `0.93 0.014 90` | Soft porcelain tint for quiet zones         |
| accent     | `#100906` | `0.135 0.018 40`| Obsidian Brown — small high-contrast accents|
| border     | `#D7C5AE` | `0.825 0.032 75`| Hairline rules, always Sandstone            |

Safe contrast pairings: Warm Porcelain on Dark Walnut (16.2:1); Dark Walnut on Warm Porcelain (16.2:1); Sandstone on Dark Walnut (10.5:1); muted-foreground on Warm Porcelain (5.1:1). Obsidian Brown only for small high-contrast accents — never body copy.

### Contrast Rules (WCAG AA, verified)

| Text                 | Background   | Ratio  | Verdict            |
| -------------------- | ------------ | ------ | ------------------ |
| Warm Porcelain       | Dark Walnut  | 16.2:1 | AAA body           |
| Dark Walnut          | Warm Porcelain | 16.2:1 | AAA body         |
| Sandstone            | Dark Walnut  | 10.5:1 | AAA body           |
| muted-foreground     | Warm Porcelain | 5.1:1 | AA body           |
| Obsidian Brown       | Warm Porcelain | ~19:1 | accents only, never body |

All body pairings clear 4.5:1; Sandstone-on-Dark-Walnut and Warm-Porcelain-on-Dark-Walnut both pass comfortably, so Sandstone may carry metadata on dark bands.

## Typography

- Display: **Fraunces** — all major headlines; high-contrast variable serif with strong thick/thin modulation, monumental at hero scale.
- Body: **General Sans** — body copy, navigation, labels, metadata.
- Mono: **JetBrains Mono** — project index numerals only.
- Scale: hero `text-hero` clamp(2.75rem→12.5rem, 13vw) / display `text-display` clamp(2.25rem→5.5rem) / section `text-section` clamp(1.75rem→3.25rem) / eyebrow `text-eyebrow` 0.6875rem uppercase 0.24em / body `text-base md:text-lg`, measure `62ch`, lead measure `46ch`.
- Hero scales with viewport width (13vw) so it stays monumental on mobile; floor 2.75rem (44px) plus `overflow-wrap: break-word` and `hyphens: auto` guarantee no horizontal overflow at a 320px viewport.

## Elevation & Depth

Near-flat: depth comes from Sandstone hairlines and dark Walnut bands, not shadows; only `shadow-lift` on hovered work plates (a soft Obsidian-tinted cast, no glow).

## Structural Zones

| Zone    | Background            | Border                   | Notes                                              |
| ------- | --------------------- | ------------------------ | -------------------------------------------------- |
| Header  | Warm Porcelain        | hairline Sandstone `b`   | Wordmark "C&C", thin nav, transparent feel         |
| Hero    | Warm Porcelain        | —                        | Oversized serif, asymmetric, deliberate void       |
| Manifesto | Warm Porcelain      | hairline top/bottom      | Text-only, wide measure, Sandstone eyebrow         |
| Selected Work | Dark Walnut band | hairline Sandstone       | Stacking cards, porcelain type on Walnut           |

## Spacing & Rhythm

Shared grid: `--section-y` clamp(4.5rem→11rem) between sections, `--section-y-tight` clamp(3rem→7rem) for paired blocks; `--gutter` clamp(1.25rem→5rem) page margins (20px floor); `--stack` clamp(1rem→2rem) and `--stack-tight` clamp(0.5rem→1rem) micro-rhythm inside type blocks; every section aligns to these tokens.

## Component Patterns

- Buttons: squared (`--radius` 0.125rem), Dark Walnut fill on porcelain or inverse; hover shifts to Obsidian Brown, no bounce.
- Cards: rectilinear, no shadow at rest, hairline Sandstone edge; Selected Work uses sticky stacking.
- Badges/labels: uppercase Sandstone eyebrow text, no pill fills.

## Motion

- Entrance: none by default — content is present; no repeated fade-ins.
- Hover: transform/opacity/color only, `--dur-base` 320ms `--ease-editorial`.
- Decorative: none beyond the Selected Work sticky stack.
- Reduced motion: `prefers-reduced-motion: reduce` forces all animation/transition to ~0ms and disables smooth scroll — every motion degrades to static.

## Constraints

- Palette limited to the four brand inks; no new hues.
- No excessive animation, no repeated fade-ins, no generic card grids.
- Preserve original project image colours — no brown tint or filter.
- Do not invent project details or contact information.
- Scope: global design system, navigation, hero, manifesto, Selected Work only.

## Signature Detail

The monumental low-weight Fraunces hero set against a hairline Sandstone rule and vast porcelain void — a printed monograph cover, not a web hero.
