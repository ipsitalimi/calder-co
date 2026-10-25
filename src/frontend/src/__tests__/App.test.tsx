import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { navSections } from "@/components/site/sections";

/**
 * App smoke journey — the default route must render the whole editorial page
 * rather than a blank screen, and every anchor the nav depends on must exist.
 */
describe("App", () => {
  it("renders the navbar, hero, manifesto and Selected Work sections", () => {
    render(<App />);

    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Selected Work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /We don.t simply design spaces/ }),
    ).toBeInTheDocument();
  });

  it("exposes every section anchor the nav links target", () => {
    const { container } = render(<App />);

    for (const id of ["hero", "work", "manifesto", "studio", "contact"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("resolves every nav link to a real section on the page", () => {
    const { container } = render(<App />);

    for (const section of navSections) {
      expect(container.querySelector(`#${section.id}`)).not.toBeNull();
    }
  });

  it("keeps the existing section order: hero, work, manifesto, studio, contact", () => {
    const { container } = render(<App />);

    const ids = Array.from(container.querySelectorAll("section[id]")).map(
      (section) => section.id,
    );
    expect(ids).toEqual(["hero", "work", "manifesto", "studio", "contact"]);
  });
});
