# Project Guidance

## User Preferences

- High-end editorial architecture portfolio — not a generic agency template
- Bold contrast, oversized typography, deliberate negative space, asymmetric compositions
- Palette: Warm Porcelain #F7F4ED, Dark Walnut #24140F, Sandstone #D7C5AE, Obsidian Brown #100906
- High-contrast display serif for major headlines; clean sans-serif for body, navigation, and metadata
- Navbar wordmark is C&C, not the full studio name
- Hero must not be a split-screen SaaS layout
- Manifesto is text-only, no image
- Selected Work keeps the sticky stacking card animation
- Preserve original project image colours; no brown tint
- Avoid unnecessary dependencies, excessive animations, generic cards, and repeated fade-in effects
- Respect reduced-motion preferences and maintain accessible contrast
- Do not invent project details or contact information
- Studio facts (Practice/Method/Scope) must read as a descending staircase at BOTH mobile and desktop widths
- How We Work stages alternate 01 right / 02 left / 03 right / 04 left at BOTH mobile and desktop widths

## Verified Commands

- **typecheck**: `mops check --fix`
- **fix**: `mops check --fix`
- **build**: `mops build`

## Learnings

- This project's sticky stacking work cards work because each card sits in a `position: sticky` div inside one tall flex container; the last card correctly drops the recede transform.
- The project's uploaded project images carry an inherent warm/golden-hour cast in the source files; no CSS tint or overlay is applied, so 'no brown tint' is satisfied at source level.
- The frontend test suite is vitest + jsdom + Testing Library with a root `test` script composing the frontend suite and a PocketIC backend lane that skips cleanly when no backend wasm is present.
- Tailwind v3 colors defined without <alpha-value> (e.g. background: "oklch(var(--background))") silently drop opacity modifiers like /85 and render fully opaque.
- This project's sticky stacking work cards work because each card sits in a position: sticky div inside one tall flex container; the last card correctly drops the recede transform.
- A single .work-image utility owning both filter and transform transitions avoids Tailwind grayscale/grayscale-0 source-order conflicts and motion-hover clashes.
- The frontend test suite is vitest + jsdom + Testing Library with a root test script composing the frontend suite and a PocketIC backend lane that skips cleanly when no backend wasm is present.
- The footer's Dark Walnut band uses the .dark class so bg-background/text-foreground resolve to Dark Walnut and Warm Porcelain without adding new tokens.
- Approach renders as a nested div[id=approach] inside the studio section so the pinned top-level section order [hero, work, manifesto, studio, contact] stays intact.
- No uploaded asset depicts models, drawings or material samples, so the Studio section is intentionally text-only per the brief's no-invented-imagery rule.
- getApiDoc must be a mixin with no top-level let: a bare let in a mixin is stable state and traps at runtime.
- The Studio facts block (Practice/Method/Scope) uses md:grid-cols-12 with md:col-start-1/5/9 on md:col-span-4 items to produce a descending staircase while keeping the border-t hairline and unchanged typography.
- Approach stages alternate md:pl-[8.333%] / md:pr-[8.333%] with 01 right, 02 left, 03 right, 04 left; the entrance uses motion.li whileInView gated by useReducedMotion so jsdom tests still render the li.
- motion/react is already a project dependency (used by SelectedWork.tsx and Manifesto.tsx); reuse it rather than adding a new animation library.
- Base-width (mobile) offsets must be plain utilities (pl-[16%], pr-[12%]); md: variants alone leave mobile flat, which is why an earlier attempt was invisible.
- A desktop 3-column grid (md:grid-cols-12 with md:col-start-1/5/9) renders the Studio facts as a flat row, not a staircase; the staircase needs a single-column stack at every breakpoint with progressive left insets.
- When a base padding and an md grid column both indent, reset the base padding at md (md:pl-0) so the grid owns the desktop offset.
- The Studio facts staircase uses a single-column grid with per-row pl-[16%]/pl-[32%] base insets and md:pl-[14%]/md:pl-[28%] overrides, so the descent reads at both mobile and desktop.
- Approach alternation derives from index % 2 === 0 (right) with base pl-[12%]/pr-[12%] plus md:pl-[8.333%]/md:pr-[8.333%], keeping the diagonal visible below md.
- Approach stage rhythm is pt-5 md:pt-6 per row; the layout test pins this and the alternation classes.
- motion/react useReducedMotion gating with initial={false} and whileInView={undefined} renders stages static under reduced motion; the CSS kill-switch does not affect JS-driven motion.
- Preview screenshots under .platform/design/ can be stale or from a different app variant; verify against the current source and a fresh local render before concluding a change is missing.
- Studio facts staircase: single-column grid (grid-cols-1, no md:grid-cols-12) with per-row pl-0 / pl-[20%] md:pl-[18%] / pl-[42%] md:pl-[38%] keeps the descent visible at both mobile and desktop.
- Approach alternation derives from index % 2 === 0 (right) with base pl-[22%]/pr-[22%] and md:pl-[16%]/md:pr-[16%]; the aligned side also owns the numeral/title/description column spans.
- Approach stage rhythm is pt-4 md:pt-5 per row; the layout test pins this and the alternation classes.
