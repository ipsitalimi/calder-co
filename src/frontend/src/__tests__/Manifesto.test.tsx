import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Manifesto from "@/components/site/Manifesto";

/**
 * Manifesto — text-only typographic statement. No image, both copy strings
 * verbatim, and a static final state under reduced motion.
 *
 * The suite runs with `prefers-reduced-motion: reduce` (see vitest.setup.ts),
 * so the phrases render in their final Dark Walnut state with no scroll-linked
 * motion — the reduced-motion branch the acceptance criteria require.
 */
describe("Manifesto", () => {
  it("renders the statement and supporting copy verbatim with no image", () => {
    const { container } = render(<Manifesto />);

    const statement = screen.getByRole("heading", {
      name: /We don.t simply design spaces\. We shape how they are lived\./,
    });
    expect(statement).toHaveTextContent("We don\u2019t simply");
    expect(statement).toHaveTextContent("design spaces.");
    expect(statement).toHaveTextContent("We shape how");
    expect(statement).toHaveTextContent("they are lived.");

    expect(
      screen.getByText(
        "Architecture rooted in material, context and the lasting relationship between people and place.",
      ),
    ).toBeInTheDocument();

    expect(container.querySelector("img")).toBeNull();
  });

  it("renders the phrases in their final Dark Walnut state under reduced motion", () => {
    render(<Manifesto />);

    const phrase = document.querySelector(
      '[data-ocid="manifesto.phrase.1"]',
    ) as HTMLElement;
    expect(phrase).not.toBeNull();
    // Final state: Dark Walnut, no scroll-linked transform.
    expect(phrase.style.color).toBe("oklch(0.235 0.028 40)");
  });
});
