import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Approach from "@/components/site/Approach";

/**
 * Approach — the studio's four-stage method.
 *
 * The accepted requirement pins the sequence exactly: four stages labelled
 * 01 Observe, 02 Develop, 03 Resolve, 04 Realise, in that order, each with a
 * large numeral, a short title and a concise description, separated by fine
 * Sandstone hairlines. It must not collapse into four identical cards.
 */
describe("Approach", () => {
  it("renders exactly four stages in the fixed order 01–04", () => {
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

  it("gives every stage a numeral, a title and a non-empty description", () => {
    render(<Approach />);

    for (let position = 1; position <= 4; position += 1) {
      const numeral = document.querySelector(
        `[data-ocid="approach.numeral.${position}"]`,
      );
      const title = document.querySelector(
        `[data-ocid="approach.title.${position}"]`,
      );
      const description = document.querySelector(
        `[data-ocid="approach.description.${position}"]`,
      );

      expect(numeral?.textContent?.trim()).toBe(
        String(position).padStart(2, "0"),
      );
      expect(title?.textContent?.trim().length).toBeGreaterThan(0);
      expect(description?.textContent?.trim().length).toBeGreaterThan(0);
    }
  });

  it("separates the stages with fine Sandstone hairline dividers", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    for (const item of items) {
      // The hairline is a top border on each stage row, drawn from the shared
      // Sandstone border token rather than a heavy rule or card chrome.
      expect(item.className).toMatch(/border-t/);
      expect(item.className).toMatch(/border-border/);
    }
  });

  it("composes a staggered editorial sequence rather than four identical cards", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    // Alternating offset: adjacent rows must not share the same desktop
    // composition, which is what would make them four identical cards. The
    // exact direction is a design detail under active revision, so only the
    // alternation invariant is pinned here.
    const offsets = items.map((item) =>
      item.className.includes("md:pl-") ? "right" : "left",
    );
    expect(offsets).toHaveLength(4);
    for (let position = 1; position < offsets.length; position += 1) {
      expect(offsets[position]).not.toBe(offsets[position - 1]);
    }

    // No card chrome — the composition carries the rhythm.
    for (const item of items) {
      expect(item.className).not.toMatch(/rounded|shadow|bg-card/);
    }
  });

  it("keeps the section anchor and scroll margin so nav lands correctly", () => {
    const { container } = render(<Approach />);

    const section = container.querySelector("#approach");
    expect(section).not.toBeNull();
    expect(section?.className).toMatch(/scroll-mt-/);
  });
});
