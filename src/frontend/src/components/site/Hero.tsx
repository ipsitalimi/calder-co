import { HERO_ID, navSections } from "./sections";

/** The Selected Work anchor, sourced from the shared section registry. */
const WORK_ID =
  navSections.find((section) => section.id === "work")?.id ?? "work";

/**
 * Hero — full-bleed editorial statement.
 *
 * A single architectural photograph fills the viewport; the monumental
 * "CALDER / & CO." lockup is composed over it in the lower-left, with a
 * Dark Walnut gradient scrim guaranteeing contrast for the porcelain type.
 * The image is a background layer, never a split-screen column.
 *
 * Motion is limited to one restrained entrance (opacity + slight rise) that
 * collapses to a static frame under `prefers-reduced-motion`.
 */
export default function Hero() {
  return (
    <section
      id={HERO_ID}
      data-ocid="section.hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[88svh] w-full flex-col justify-end overflow-hidden bg-primary md:min-h-screen"
    >
      {/* Full-bleed architectural photograph */}
      <img
        src="/assets/images/hero-architecture.jpg"
        alt="A modern building exterior in warm limestone and board-formed concrete, its cantilevered upper volume raked by late-afternoon light and deep shadow."
        data-ocid="hero.image"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] md:object-center"
      />

      {/* Controlled scrim — preserves the photograph's own colours, darkens
          only where the type sits so porcelain copy always meets contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-accent/95 via-primary/55 to-primary/10 md:bg-gradient-to-tr md:from-accent/90 md:via-primary/45 md:to-transparent"
      />

      {/* Top scrim keeps the fixed navbar legible over the image: a Warm
          Porcelain fade gives the dark wordmark and nav links a light ground
          at the top of the page, then dissolves before the type region. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-background/85 via-background/40 to-transparent"
      />

      <div className="page-gutter relative w-full pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="max-w-[min(100%,72rem)]">
          <p
            data-ocid="hero.eyebrow"
            className="text-eyebrow mb-6 text-secondary md:mb-8"
          >
            Architecture &amp; Interiors — Est. Practice
          </p>

          <h1
            id="hero-title"
            data-ocid="hero.title"
            className="text-hero text-background"
          >
            <span className="block">CALDER</span>
            <span className="block pl-[0.06em]">&amp; CO.</span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 border-t border-secondary/40 pt-6 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-12">
            <p
              data-ocid="hero.supporting_copy"
              className="max-w-[34ch] text-base leading-relaxed text-secondary/90 md:text-lg"
            >
              A studio working at the meeting point of structure, light and
              material.
            </p>

            <a
              href={`#${WORK_ID}`}
              data-ocid="hero.explore_work_link"
              className="group inline-flex w-fit items-center gap-3 border-b border-secondary/60 pb-2 text-eyebrow text-secondary motion-hover hover:border-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Explore Work
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-[var(--dur-base)] ease-[var(--ease-editorial)] group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
