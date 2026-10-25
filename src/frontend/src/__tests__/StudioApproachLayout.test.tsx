import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Approach from "@/components/site/Approach";
import Studio from "@/components/site/Studio";

/**
 * Cover for the Studio facts staircase and the Approach stage rhythm.
 *
 * Two accepted requirements rework the *layout* of these blocks:
 *
 *  - the Studio facts descend as a staircase — Practice on the left, Method
 *    shifted right below it, Scope shifted further right below Method — as a
 *    single-column vertical stack at every breakpoint, with progressive left
 *    insets (0 / 20% / 42% base, 0 / 18% / 38% at md+);
 *  - the four Approach stages tighten their vertical whitespace, alternate
 *    their alignment (01 right, 02 left, 03 right, 04 left) and gain a subtle
 *    scroll-triggered entrance.
 *
 * The content those blocks carry is pinned separately in
 * StudioApproachContent.test.tsx; this file pins the accepted layout so a later
 * iteration cannot silently flatten the staircase or the alternation.
 *
 * The suite runs with `prefers-reduced-motion: reduce` (see vitest.setup.ts),
 * which is the branch the acceptance criteria pin down: the entrance animation
 * is suppressed and every stage stays fully readable. jsdom cannot run
 * scroll-linked animation, so the animated branch itself is not observable
 * here.
 */
describe("Studio facts staircase", () => {
  it("stacks the three facts in a single column at every breakpoint", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;
    expect(facts).not.toBeNull();

    const rows = Array.from(facts.querySelectorAll("div"));
    expect(rows).toHaveLength(3);

    // The accepted layout is a vertical stack at every width, not a desktop
    // multi-column grid: the container is single-column and no fact row carries
    // a column start or span that would place it beside its neighbours.
    expect(facts.className).toMatch(/(^|\s)grid-cols-1(\s|$)/);
    expect(facts.className).not.toMatch(/md:grid-cols-12/);

    for (const row of rows) {
      expect(row.className).not.toMatch(/col-start-/);
      expect(row.className).not.toMatch(/col-span-/);
    }
  });

  it("descends left-to-right: Practice, then Method, then Scope", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;
    const rows = Array.from(facts.querySelectorAll("div"));

    // Each successive fact is inset further from the left than the one above
    // it, so the three facts read as a descending staircase rather than a flat
    // stack. The base inset is the accepted 0 / 20% / 42% step.
    const baseInsets = rows.map((row) => {
      const match = row.className.match(/(?:^|\s)pl-\[(\d+)%\]/);
      return match ? Number(match[1]) : 0;
    });

    expect(baseInsets).toEqual([0, 20, 42]);
    for (let position = 1; position < baseInsets.length; position += 1) {
      expect(baseInsets[position]).toBeGreaterThan(baseInsets[position - 1]);
    }
  });

  it("keeps the staircase visible at desktop widths with a wider inset", () => {
    render(<Studio />);

    const facts = document.querySelector(
      '[data-ocid="studio.facts"]',
    ) as HTMLElement;
    const rows = Array.from(facts.querySelectorAll("div"));

    // The accepted requirement is that the staircase is visible at BOTH mobile
    // and desktop widths, so each fact carries an md+ left inset that grows
    // down the list: 0 / 18% / 38%. The first fact stays flush left.
    const mdInsets = rows.map((row) => {
      const match = row.className.match(/md:pl-\[(\d+)%\]/);
      return match ? Number(match[1]) : 0;
    });

    expect(mdInsets).toEqual([0, 18, 38]);
    for (let position = 1; position < mdInsets.length; position += 1) {
      expect(mdInsets[position]).toBeGreaterThan(mdInsets[position - 1]);
    }
  });
});

describe("Approach stage rhythm", () => {
  it("alternates alignment 01 right, 02 left, 03 right, 04 left", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);

    // A right-aligned stage is inset from the left; a left-aligned stage is
    // inset from the right. The exact direction is the accepted requirement.
    const alignment = items.map((item) =>
      item.className.includes("md:pl-") ? "right" : "left",
    );

    expect(alignment).toEqual(["right", "left", "right", "left"]);

    // The accepted md+ inset is a clear 16% step: right-aligned rows inset
    // from the left, left-aligned rows from the right.
    const mdInsets = items.map((item) => {
      const match = item.className.match(/md:(pl|pr)-\[(\d+)%\]/);
      return match ? { side: match[1], value: Number(match[2]) } : null;
    });

    expect(mdInsets).toEqual([
      { side: "pl", value: 16 },
      { side: "pr", value: 16 },
      { side: "pl", value: 16 },
      { side: "pr", value: 16 },
    ]);
  });

  it("keeps the alternation visible at base widths, not only on desktop", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    // The accepted requirement is that the alternation reads at BOTH mobile
    // and desktop widths, so each row carries a base-width inset alongside its
    // md: offset. Right-aligned rows inset from the left, left-aligned rows
    // from the right, and the two must not be mixed on one row. The accepted
    // base inset is a clear 22% step.
    const baseInsets = items.map((item) => {
      const insetLeft = /(^|\s)pl-\[/.test(item.className);
      const insetRight = /(^|\s)pr-\[/.test(item.className);
      expect(insetLeft || insetRight).toBe(true);
      expect(insetLeft && insetRight).toBe(false);
      const match = item.className.match(/(?:^|\s)(pl|pr)-\[(\d+)%\]/);
      return match ? { side: match[1], value: Number(match[2]) } : null;
    });

    expect(baseInsets).toEqual([
      { side: "pl", value: 22 },
      { side: "pr", value: 22 },
      { side: "pl", value: 22 },
      { side: "pr", value: 22 },
    ]);
  });

  it("tightens the vertical whitespace between stages", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    // The stages sit closer together than the previous generous rhythm: the
    // accepted base rhythm is a restrained pt-4, widening only to pt-5 on
    // desktop, rather than a full section gap at any width.
    for (const item of items) {
      expect(item.className).toMatch(/(^|\s)pt-4(\s|$)/);
      expect(item.className).toMatch(/md:pt-5/);
      expect(item.className).not.toMatch(/pt-1[0-9]|pt-2[0-9]|py-1[0-9]/);
    }
  });

  it("keeps every stage fully readable when reduced motion is enabled", () => {
    render(<Approach />);

    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");

    // The entrance animation must be suppressed, not merely paused: no stage
    // may be left hidden or transparent, and each keeps its real content.
    for (const item of items) {
      expect(item).not.toHaveAttribute("hidden");
      expect(item.getAttribute("aria-hidden")).not.toBe("true");
      expect(item.style.opacity === "" || item.style.opacity === "1").toBe(
        true,
      );
      expect((item.textContent ?? "").trim().length).toBeGreaterThan(0);
    }
  });
});
