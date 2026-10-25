import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SectionShell from "@/components/site/SectionShell";

/**
 * SectionShell — the shared editorial wrapper every page section reuses.
 *
 * The new Studio, Approach, Contact and Footer sections are required to reuse
 * this wrapper, so its contract is characterized here: the typed anchor id, the
 * `data-ocid` hook, the page gutter, the vertical rhythm, and the scroll-margin
 * that keeps a heading clear of the fixed navbar.
 */
describe("SectionShell", () => {
  it("renders a section carrying the anchor id and data-ocid hook", () => {
    const { container } = render(
      <SectionShell id="studio">
        <h2>Studio</h2>
      </SectionShell>,
    );

    const section = container.querySelector("#studio");
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("data-ocid", "section.studio");
    expect(section?.tagName).toBe("SECTION");
  });

  it("applies the shared page gutter and section rhythm", () => {
    const { container } = render(<SectionShell id="contact" />);

    const section = container.querySelector("#contact") as HTMLElement;
    expect(section.className).toContain("page-gutter");
    expect(section.className).toContain("section-y");
  });

  it("keeps anchor targets clear of the fixed navbar via scroll margin", () => {
    const { container } = render(<SectionShell id="studio" />);

    const section = container.querySelector("#studio") as HTMLElement;
    expect(section.className).toMatch(/scroll-mt-/);
  });

  it("uses the tighter rhythm when asked and merges caller classes", () => {
    const { container } = render(
      <SectionShell id="contact" tight className="bg-background" />,
    );

    const section = container.querySelector("#contact") as HTMLElement;
    expect(section.className).toContain("section-y-tight");
    expect(section.className).not.toContain("section-y ");
    expect(section.className).toContain("bg-background");
  });

  it("renders its children inside the section", () => {
    render(
      <SectionShell id="studio">
        <h2>Studio</h2>
      </SectionShell>,
    );

    expect(screen.getByRole("heading", { name: "Studio" })).toBeInTheDocument();
  });
});
