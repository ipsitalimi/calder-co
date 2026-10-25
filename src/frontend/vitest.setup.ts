import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * Shared test setup.
 *
 * jsdom's `matchMedia` always reports `matches: false`, and `motion/react`'s
 * `useReducedMotion` caches the media-query result in a module global the first
 * time it is read. The preference therefore has to be decided before any
 * component renders — a per-test override cannot change it afterwards.
 *
 * The suite runs with `prefers-reduced-motion: reduce` reported as true. That is
 * the branch the acceptance criteria pin down (content renders in its final
 * static state), and it is the only one observable in jsdom, where scroll-linked
 * animation cannot run.
 */
window.matchMedia = ((query: string) => ({
  matches: query.includes("prefers-reduced-motion"),
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})) as unknown as typeof window.matchMedia;

afterEach(() => {
  cleanup();
});
