import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Approach from "@/components/site/Approach";
import Studio from "@/components/site/Studio";

/**
 * Characterization baseline for the Studio facts and the Approach stages.
 *
 * Two accepted requirements rework the *layout* of these blocks: the Studio
 * facts become a descending staircase, and the Approach stages reverse their
 * alternating alignment, tighten their vertical rhythm and gain a scroll
 * entrance. Neither change may alter the editorial *content* those blocks
 * carry, so this file pins the content and structure that must survive the
 * re-layout — the fact labels and values, the stage order, numerals, titles,
 * descriptions and the fine Sandstone dividers — without asserting the
 * specific grid offsets or spacing that are intentionally being revised.
 */
describe("Studio facts content", () => {
  it("keeps the three practice facts in order with their values", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;
    expect(facts).not.toBeNull();

    const labels = Array.from(facts.querySelectorAll("dt")).map((node) =>
      node.textContent?.trim(),
    );
    const values = Array.from(facts.querySelectorAll("dd")).map((node) =>
      node.textContent?.trim(),
    );

    expect(labels).toEqual(["Practice", "Method", "Scope"]);
    expect(values).toEqual([
      "Architecture & Interiors",
      "Site-led, material-first",
      "Concept to completion",
    ]);
  });

  it("keeps each fact label paired with its own value", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;

    const pairs = Array.from(facts.querySelectorAll("div")).map((row) => ({
      label: row.querySelector("dt")?.textContent?.trim(),
      value: row.querySelector("dd")?.textContent?.trim(),
    }));

    expect(pairs).toEqual([
      { label: "Practice", value: "Architecture & Interiors" },
      { label: "Method", value: "Site-led, material-first" },
      { label: "Scope", value: "Concept to completion" },
    ]);
  });

  it("keeps the facts as a bare hairline row with no card chrome", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;

    // The editorial hairline rule above the facts must survive the re-layout.
    expect(facts.className).toMatch(/border-t/);
    expect(facts.className).toMatch(/border-border/);
    expect(facts.className).not.toMatch(/rounded|shadow|bg-card/);
  });
});

describe("Approach stage content", () => {
  it("keeps the four stages in the fixed 01–04 order with their titles", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);

    const expected = [
      { index: "01", title: "Observe" },
      { index: "02", title: "Develop" },
      { index: "03", title: "Resolve" },
      { index: "04", title: "Realise" },
    ];

    expected.forEach((stage, position) => {
      const item = items[position];
      expect(item).toHaveTextContent(stage.index);
      expect(
        within(item).getByRole("heading", { name: stage.title }),
      ).toBeInTheDocument();
    });
  });

  it("keeps each stage's numeral, title and description intact", () => {
    render(<Approach />);

    const expected = [
      {
        index: "01",
        title: "Observe",
        description:
          "We begin on site — reading the light, the ground and the way people already move through the place.",
      },
      {
        index: "02",
        title: "Develop",
        description:
          "Drawings and physical models test the idea at every scale until the plan earns its keep.",
      },
      {
        index: "03",
        title: "Resolve",
        description:
          "Structure, material and detail are settled together, so nothing is left to chance on site.",
      },
      {
        index: "04",
        title: "Realise",
        description:
          "We stay through construction, holding the intent of the drawing until the building stands.",
      },
    ];

    expected.forEach((stage, position) => {
      const numeral = document.querySelector(
        `[data-ocid="approach.numeral.${position + 1}"]`,
      );
      const title = document.querySelector(
        `[data-ocid="approach.title.${position + 1}"]`,
      );
      const description = document.querySelector(
        `[data-ocid="approach.description.${position + 1}"]`,
      );

      expect(numeral?.textContent?.trim()).toBe(stage.index);
      expect(title?.textContent?.trim()).toBe(stage.title);
      expect(description?.textContent?.trim()).toBe(stage.description);
    });
  });

  it("keeps the fine Sandstone hairline divider on every stage", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    for (const item of items) {
      expect(item.className).toMatch(/border-t/);
      expect(item.className).toMatch(/border-border/);
    }
  });

  it("keeps the section heading and anchor clear of the fixed navbar", () => {
    const { container } = render(<Approach />);

    expect(
      screen.getByRole("heading", { name: "How we work" }),
    ).toBeInTheDocument();

    const section = container.querySelector("#approach");
    expect(section).not.toBeNull();
    expect(section?.className).toMatch(/scroll-mt-/);
  });
});
