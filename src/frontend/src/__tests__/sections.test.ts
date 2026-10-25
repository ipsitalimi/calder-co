import { describe, expect, it } from "vitest";

import {
  HERO_ID,
  MANIFESTO_ID,
  NAV_SECTION_IDS,
  PAGE_SECTION_ORDER,
  navSections,
} from "@/components/site/sections";

/**
 * sections.ts — the single source of truth for page anchors.
 *
 * The new Studio, Approach, Contact and Footer sections are required to reuse
 * this registry rather than hardcoding anchor strings, so the existing contract
 * is characterized here: the nav link order, the internal manifesto anchor, and
 * the full page order.
 */
describe("sections registry", () => {
  it("exposes Work, Studio and Contact as the ordered nav links", () => {
    expect(navSections.map((section) => section.id)).toEqual([
      "work",
      "studio",
      "contact",
    ]);
    expect(navSections.map((section) => section.label)).toEqual([
      "Work",
      "Studio",
      "Contact",
    ]);
  });

  it("derives NAV_SECTION_IDS from the nav link order", () => {
    expect(NAV_SECTION_IDS).toEqual(["work", "studio", "contact"]);
  });

  it("keeps the manifesto anchor internal and out of the nav", () => {
    expect(MANIFESTO_ID).toBe("manifesto");
    expect(NAV_SECTION_IDS).not.toContain(MANIFESTO_ID);
  });

  it("preserves the full page section order", () => {
    expect(PAGE_SECTION_ORDER).toEqual([
      HERO_ID,
      "work",
      MANIFESTO_ID,
      "studio",
      "contact",
    ]);
  });
});
