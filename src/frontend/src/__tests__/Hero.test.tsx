import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Hero from "@/components/site/Hero";

/**
 * Hero — full-bleed architectural image with the monumental CALDER & CO.
 * lockup and a single Explore Work action pointing at Selected Work.
 */
describe("Hero", () => {
  it("renders CALDER & CO. as the level-one heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("CALDER");
    expect(heading).toHaveTextContent("& CO.");
  });

  it("uses the architectural photograph as a full-bleed background layer", () => {
    render(<Hero />);

    const image = screen.getByRole("img", {
      name: /modern building exterior/i,
    });
    expect(image).toHaveAttribute(
      "src",
      "/assets/images/hero-architecture.jpg",
    );
    // Background layer, not a split-screen column: absolutely positioned and
    // covering the section.
    expect(image.className).toContain("absolute");
    expect(image.className).toContain("object-cover");
  });

  it("points Explore Work at the Selected Work section", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /Explore Work/ })).toHaveAttribute(
      "href",
      "#work",
    );
  });
});
