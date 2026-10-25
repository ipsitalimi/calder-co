import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Footer from "@/components/site/Footer";
import { navSections } from "@/components/site/sections";

/**
 * Footer — compact Dark Walnut band with Warm Porcelain text.
 *
 * Accepted requirements: the C&C wordmark linking back to the top of the page,
 * the essential navigation links (Work, Studio, Contact) reusing the existing
 * nav section source of truth, the existing contact link, and the copyright
 * line. It must stay visually restrained so the Selected Work dark band remains
 * the dominant dark feature.
 */
describe("Footer", () => {
  it("renders a Dark Walnut band with Warm Porcelain text", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('[data-ocid="footer"]');
    expect(footer).not.toBeNull();
    // Dark Walnut ground with porcelain foreground, via the shared tokens.
    expect(footer?.className).toContain("dark");
    expect(footer?.className).toContain("bg-background");
    expect(footer?.className).toContain("text-foreground");
  });

  it("shows the C&C wordmark linking back to the top of the page", () => {
    render(<Footer />);

    const wordmark = screen.getByRole("link", { name: "C&C" });
    expect(wordmark).toHaveAttribute("href", "#hero");
  });

  it("reuses the shared nav source of truth for Work, Studio and Contact", () => {
    render(<Footer />);

    const nav = screen.getByRole("navigation", { name: "Footer" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(
      navSections.map((section) => section.label),
    );

    for (const section of navSections) {
      expect(
        within(nav).getByRole("link", { name: section.label }),
      ).toHaveAttribute("href", `#${section.id}`);
    }
  });

  it("shows the copyright line", () => {
    render(<Footer />);

    const copyright = document.querySelector('[data-ocid="footer.copyright"]');
    expect(copyright?.textContent).toMatch(/Calder & Co\./);
    expect(copyright?.textContent).toMatch(/All rights reserved/);
    expect(copyright?.textContent).toMatch(/\d{4}/);
  });

  it("keeps the footer restrained rather than a second dominant dark band", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector(
      '[data-ocid="footer"]',
    ) as HTMLElement;
    // Compact vertical rhythm, not a full section-y band.
    expect(footer.className).not.toContain("section-y");
    const inner = footer.querySelector("div") as HTMLElement;
    expect(inner.className).toMatch(/py-12|py-16/);
  });
});
