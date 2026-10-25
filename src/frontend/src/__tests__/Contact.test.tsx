import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Contact from "@/components/site/Contact";

/**
 * Contact — closing editorial statement on Warm Porcelain.
 *
 * Accepted requirements: a Warm Porcelain background with a prominent headline
 * reading exactly "Have a project in mind?", supporting copy, no contact form,
 * and no invented email address, phone number or address. The project carries
 * no verified contact details, so the section presents the headline and copy
 * only.
 */
describe("Contact", () => {
  it("shows the exact headline on a Warm Porcelain background", () => {
    const { container } = render(<Contact />);

    expect(
      screen.getByRole("heading", { name: "Have a project in mind?" }),
    ).toBeInTheDocument();

    const section = container.querySelector("#contact") as HTMLElement;
    expect(section.className).toContain("bg-background");
  });

  it("renders supporting copy with real content", () => {
    render(<Contact />);

    const copy = document.querySelector(
      '[data-ocid="contact.supporting_copy"]',
    );
    expect(copy?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it("renders no contact form", () => {
    const { container } = render(<Contact />);

    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
    expect(container.querySelector("textarea")).toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });

  it("invents no email address, phone number or mailto link", () => {
    const { container } = render(<Contact />);

    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent ?? "").not.toMatch(/@[a-z0-9.-]+\.[a-z]{2,}/i);
  });

  it("reuses the shared SectionShell wrapper for the contact anchor", () => {
    const { container } = render(<Contact />);

    const section = container.querySelector("#contact") as HTMLElement;
    expect(section.tagName).toBe("SECTION");
    expect(section.className).toContain("page-gutter");
    expect(section.className).toMatch(/scroll-mt-/);
  });
});
