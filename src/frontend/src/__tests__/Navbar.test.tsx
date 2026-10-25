import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Navbar from "@/components/site/Navbar";

/**
 * Navbar — fixed top bar with the C&C wordmark, the three minimal nav links,
 * and a mobile menu that opens, closes on Escape, and locks body scroll.
 */
describe("Navbar", () => {
  it("shows the C&C wordmark linking back to the top of the page", () => {
    render(<Navbar />);

    const wordmark = screen.getByRole("link", { name: "C&C" });
    expect(wordmark).toHaveAttribute("href", "#hero");
  });

  it("lists exactly Work, Studio and Contact as the primary nav links", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    // Wordmark + the three section links.
    expect(links.map((link) => link.textContent)).toEqual([
      "C&C",
      "Work",
      "Studio",
      "Contact",
    ]);
    expect(within(nav).getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(within(nav).getByRole("link", { name: "Studio" })).toHaveAttribute(
      "href",
      "#studio",
    );
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("opens the mobile menu and locks background scroll", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.body.style.overflow).toBe("hidden");

    const menu = document.getElementById("mobile-menu");
    expect(menu).not.toBeNull();
    expect(menu).not.toHaveAttribute("hidden");
    expect(
      within(menu as HTMLElement).getByRole("link", { name: "Work" }),
    ).toHaveAttribute("href", "#work");
  });

  it("closes the mobile menu on Escape and restores body scroll", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("closes the mobile menu when a link is selected", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = document.getElementById("mobile-menu") as HTMLElement;

    await user.click(within(menu).getByRole("link", { name: "Contact" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
