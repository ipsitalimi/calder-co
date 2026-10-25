import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { SectionId } from "./sections";

/**
 * SectionShell — shared editorial wrapper for every page section.
 *
 * API:
 *   id        — anchor id (typed SectionId) so nav links resolve.
 *   children  — section content.
 *   className — optional overrides (e.g. a dark band background).
 *   tight     — use the tighter vertical rhythm.
 *
 * Applies `scroll-mt-*` so the fixed navbar never covers a heading, plus the
 * shared page gutter and vertical rhythm from the design tokens.
 */
interface SectionShellProps {
  id: SectionId;
  children?: ReactNode;
  className?: string;
  tight?: boolean;
}

export default function SectionShell({
  id,
  children,
  className,
  tight = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-ocid={`section.${id}`}
      className={cn(
        "page-gutter scroll-mt-20 md:scroll-mt-24",
        tight ? "section-y-tight" : "section-y",
        className,
      )}
    >
      {children}
    </section>
  );
}
