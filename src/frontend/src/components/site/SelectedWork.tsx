import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import SectionShell from "./SectionShell";
import { type Project, projects } from "./projects";

/**
 * SelectedWork — the editorial centrepiece.
 *
 * Each card is `position: sticky` inside a tall scroll container, so as the
 * page scrolls the next card slides up and stacks over the previous one while
 * the earlier cards stay pinned and recede slightly behind. Scroll-linked
 * transform/scale only — no bounce, no spring, no fade-ins.
 *
 * Under `prefers-reduced-motion` the scroll-linked transforms are dropped and
 * the cards render as a stable, fully readable stacked list.
 */

/** How far each card recedes behind the card that stacks on top of it. */
const RECEDE_SCALE = 0.94;
const RECEDE_OPACITY = 0.6;

/** Step between stacked cards, in rem — each card peeks out behind the one
 *  above it. The base offset lives in the `--stack-top` custom property so it
 *  can clear the fixed navbar at each breakpoint. */
const STICKY_STEP_REM = 0.75;

function ProjectCard({
  project,
  index,
  total,
  reduceMotion,
}: {
  project: Project;
  index: number;
  total: number;
  reduceMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // On touch layouts there is no hover, so a card's photograph comes into
  // colour when that card is the one crossing the middle of the viewport.
  // Desktop keeps the hover/focus reveal instead, so the observer is only
  // wired up below the mobile breakpoint.
  const [activeInView, setActiveInView] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setActiveInView(false);
      return;
    }
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActiveInView(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobile]);

  // Progress of this card through the viewport, used to recede it behind the
  // card that stacks on top of it.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, RECEDE_SCALE]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, RECEDE_OPACITY]);

  const isLast = index === total - 1;
  const textOnRight = project.textSide === "right";

  return (
    <div
      className="sticky"
      style={{
        top: `calc(var(--stack-top) + ${index * STICKY_STEP_REM}rem)`,
      }}
    >
      <motion.article
        ref={cardRef}
        data-ocid={`work.card.${index + 1}`}
        style={reduceMotion || isLast ? undefined : { scale, opacity }}
        className={cn(
          "group relative overflow-hidden rounded-sm border border-border",
          "bg-card text-card-foreground shadow-lift",
        )}
      >
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`work.link.${index + 1}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`View the ${project.title} project`}
        >
          <div className="grid items-stretch md:grid-cols-12">
            {/* Image — monochrome by default, original colours revealed on
                hover/focus (desktop) or when active in view (mobile). No tint
                or overlay is ever applied to the photograph. */}
            <div
              className={cn(
                "relative md:col-span-8",
                textOnRight ? "md:order-2" : "md:order-1",
                project.crop,
              )}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                data-active={activeInView ? "true" : undefined}
                className={cn(
                  "work-image h-full w-full object-cover group-hover:scale-[1.02]",
                  project.align,
                )}
              />
            </div>

            {/* Text block — neutral, no scrim over the photograph. */}
            <div
              className={cn(
                "flex flex-col justify-between gap-6 p-6 md:col-span-4 md:p-8",
                textOnRight ? "md:order-1" : "md:order-2",
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-index text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-eyebrow text-muted-foreground">
                  {project.meta}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-section text-balance">{project.title}</h3>
                <p className="measure text-sm leading-relaxed text-foreground">
                  {project.description}
                </p>
              </div>

              <span className="text-eyebrow inline-flex items-center gap-2 text-muted-foreground">
                View project
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </a>
      </motion.article>
    </div>
  );
}

export default function SelectedWork() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SectionShell id="work" className="dark bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Editorial heading — restrained, no marketing paragraph. */}
        <header className="mb-12 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="text-display max-w-[16ch] text-balance">
            Selected Work
          </h2>
          <p className="text-eyebrow text-muted-foreground md:pb-3">
            Four projects — 2021 to 2024
          </p>
        </header>

        {/* Sticky stacking container. `--stack-top` clears the fixed navbar
            (4rem mobile / 5rem desktop) with breathing room. */}
        <div
          data-ocid="work.list"
          className="relative flex flex-col gap-8 [--stack-top:4.5rem] md:gap-12 md:[--stack-top:5.5rem]"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
