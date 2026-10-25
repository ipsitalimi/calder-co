/**
 * Single source of truth for the page's section anchors.
 *
 * `navSections` drives the navbar links (Work, Studio, Contact).
 * `manifesto` and `approach` are internal anchors used for in-page ordering
 * only — both are deliberately excluded from the nav.
 *
 * Import `SectionId` / `NAV_SECTION_IDS` instead of hardcoding anchor strings.
 */

export const HERO_ID = "hero" as const;
export const MANIFESTO_ID = "manifesto" as const;
export const APPROACH_ID = "approach" as const;

export type SectionId =
  | typeof HERO_ID
  | "work"
  | "studio"
  | "contact"
  | typeof MANIFESTO_ID
  | typeof APPROACH_ID;

export interface NavSection {
  id: SectionId;
  label: string;
}

/** Ordered nav links — the only sections surfaced in the navbar. */
export const navSections: readonly NavSection[] = [
  { id: "work", label: "Work" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
] as const;

export const NAV_SECTION_IDS: readonly SectionId[] = navSections.map(
  (section) => section.id,
);

/** Full page order, including the hero and internal manifesto anchors. */
export const PAGE_SECTION_ORDER: readonly SectionId[] = [
  HERO_ID,
  "work",
  MANIFESTO_ID,
  "studio",
  "contact",
] as const;
