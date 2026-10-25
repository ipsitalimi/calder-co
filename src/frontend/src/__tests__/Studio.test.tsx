import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Studio from "@/components/site/Studio";

/**
 * Studio — who the practice is and how it works.
 *
 * Accepted requirements: a Warm Porcelain ground with an asymmetric editorial
 * layout (offset text column, not a centred grid), concise distinctive copy in
 * the existing typography, no decorative cards, and — because every uploaded
 * asset is an exterior photograph of a finished building — no documentary image
 * and therefore no placeholder or invented imagery. The four-stage Approach is
 * composed inside this section.
 */
describe("Studio", () => {
  it("renders the studio heading and lead copy with real content", () => {
    render(<Studio />);

    expect(
      screen.getByRole("heading", { name: "A small practice, deliberately." }),
    ).toBeInTheDocument();

    const lead = document.querySelector('[data-ocid="studio.lead"]');
    expect(lead?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it("renders both body columns and the practice facts", () => {
    render(<Studio />);

    const body1 = document.querySelector('[data-ocid="studio.body.1"]');
    const body2 = document.querySelector('[data-ocid="studio.body.2"]');
    expect(body1?.textContent?.trim().length).toBeGreaterThan(0);
    expect(body2?.textContent?.trim().length).toBeGreaterThan(0);

    const facts = document.querySelector('[data-ocid="studio.facts"]');
    expect(facts).not.toBeNull();
    expect(facts?.querySelectorAll("dt")).toHaveLength(3);
    expect(facts?.querySelectorAll("dd")).toHaveLength(3);
  });

  it("uses an asymmetric offset grid rather than a centred symmetric layout", () => {
    const { container } = render(<Studio />);

    const eyebrow = document.querySelector('[data-ocid="studio.eyebrow"]');
    // The label column is offset against a wider statement column.
    expect(eyebrow?.className).toMatch(/md:col-span-3/);

    // Body columns step across the grid instead of centring.
    const body1 = document.querySelector('[data-ocid="studio.body.1"]');
    const body2 = document.querySelector('[data-ocid="studio.body.2"]');
    expect(body1?.className).toMatch(/md:col-start-2/);
    expect(body2?.className).toMatch(/md:col-start-8/);

    // No decorative card chrome anywhere in the section.
    expect(container.querySelector(".rounded, .shadow-lift")).toBeNull();
  });

  it("renders text-only with no placeholder or invented imagery", () => {
    const { container } = render(<Studio />);

    // No suitable documentary asset exists, so the section must carry no image
    // at all rather than a placeholder.
    expect(container.querySelector("img")).toBeNull();
  });

  it("composes the four-stage Approach method inside the studio section", () => {
    const { container } = render(<Studio />);

    const section = container.querySelector("#studio");
    expect(section).not.toBeNull();
    expect(section?.querySelector("#approach")).not.toBeNull();
    expect(
      screen.getByRole("heading", { name: "How we work" }),
    ).toBeInTheDocument();
  });

  it("reuses the shared SectionShell wrapper for the studio anchor", () => {
    const { container } = render(<Studio />);

    const section = container.querySelector("#studio") as HTMLElement;
    expect(section.tagName).toBe("SECTION");
    expect(section.className).toContain("page-gutter");
    expect(section.className).toContain("section-y");
    expect(section.className).toMatch(/scroll-mt-/);
  });
});
