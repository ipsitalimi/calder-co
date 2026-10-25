import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { navSections } from "@/components/site/sections";

/**
 * Full-page integration journey.
 *
 * The accepted criteria require the default route to load without a blank
 * screen, with the Studio, Approach, Contact and Footer sections all rendering
 * real content — no empty placeholders — and every navbar anchor resolving to a
 * real section. This exercises the composed page rather than the sections in
 * isolation.
 */
describe("Page sections journey", () => {
  it("renders every section with real, non-empty content", () => {
    const { container } = render(<App />);

    // No blank screen: the page carries substantial text.
    expect((container.textContent ?? "").trim().length).toBeGreaterThan(200);

    for (const id of ["hero", "work", "manifesto", "studio", "contact"]) {
      const section = container.querySelector(`#${id}`);
      expect(section).not.toBeNull();
      expect((section?.textContent ?? "").trim().length).toBeGreaterThan(0);
    }
  });

  it("renders the Studio, Approach, Contact and Footer content on the page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "A small practice, deliberately." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "How we work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Have a project in mind?" }),
    ).toBeInTheDocument();
    const footer = document.querySelector(
      '[data-ocid="footer"]',
    ) as HTMLElement;
    expect(
      within(footer).getByRole("link", { name: "C&C" }),
    ).toBeInTheDocument();
  });

  it("shows the four Approach stages in order within the composed page", () => {
    const { container } = render(<App />);

    const list = container.querySelector('[data-ocid="approach.list"]');
    expect(list).not.toBeNull();

    const titles = Array.from(
      list?.querySelectorAll('[data-ocid^="approach.title."]') ?? [],
    ).map((node) => node.textContent?.trim());
    expect(titles).toEqual(["Observe", "Develop", "Resolve", "Realise"]);
  });

  it("resolves every navbar link to a real section on the page", () => {
    const { container } = render(<App />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const section of navSections) {
      const link = within(nav).getByRole("link", { name: section.label });
      const href = link.getAttribute("href") ?? "";
      expect(href).toBe(`#${section.id}`);
      expect(container.querySelector(href)).not.toBeNull();
    }
  });

  it("keeps the footer nav links pointing at real sections", () => {
    const { container } = render(<App />);

    const nav = screen.getByRole("navigation", { name: "Footer" });
    for (const section of navSections) {
      const link = within(nav).getByRole("link", { name: section.label });
      const href = link.getAttribute("href") ?? "";
      expect(container.querySelector(href)).not.toBeNull();
    }
  });

  it("gives every rendered image descriptive alt text", () => {
    const { container } = render(<App />);

    const images = Array.from(container.querySelectorAll("img"));
    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect((image.getAttribute("alt") ?? "").trim().length).toBeGreaterThan(
        0,
      );
    }
  });
});
