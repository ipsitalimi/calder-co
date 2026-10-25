import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HERO_ID, navSections } from "./sections";

/**
 * Navbar — fixed editorial top bar.
 *
 * Wordmark "C&C" scrolls to the top; nav links smooth-scroll to their section
 * anchors. Over the light hero the bar is transparent; once scrolled it gains a
 * Warm Porcelain ground with a Sandstone hairline so it stays legible over both
 * light and dark sections. Below `md` the links collapse behind a menu button.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      data-ocid="navbar"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)] ease-[var(--ease-editorial)]",
        scrolled || menuOpen
          ? "border-b border-border bg-background/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="page-gutter flex h-16 items-center justify-between md:h-20"
      >
        <a
          href={`#${HERO_ID}`}
          data-ocid="navbar.wordmark_link"
          onClick={closeMenu}
          className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground motion-hover hover:text-accent md:text-[1.75rem]"
        >
          C&amp;C
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                data-ocid={`navbar.link.${section.id}`}
                className="text-eyebrow text-muted-foreground motion-hover hover:text-foreground"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          data-ocid="navbar.menu_button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center text-foreground motion-hover hover:text-accent md:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-current transition-transform duration-[var(--dur-base)] ease-[var(--ease-editorial)]",
                menuOpen ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-current transition-transform duration-[var(--dur-base)] ease-[var(--ease-editorial)]",
                menuOpen ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-border bg-background md:hidden"
      >
        <ul className="page-gutter flex flex-col py-4">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                data-ocid={`navbar.mobile_link.${section.id}`}
                onClick={closeMenu}
                className="block py-4 font-display text-3xl tracking-[-0.02em] text-foreground motion-hover hover:text-accent"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
