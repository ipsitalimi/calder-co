import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import SectionShell from "./SectionShell";
import { MANIFESTO_ID } from "./sections";

/**
 * Manifesto — pure typographic statement.
 *
 * The statement is broken into phrase units. As the section travels through
 * the viewport each phrase transitions from Sandstone to Dark Walnut with a
 * restrained letter-spacing settle. Only `color` and `letter-spacing` animate
 * on elements whose box is already fixed, so the layout never shifts and touch
 * scrolling is never hijacked. Under `prefers-reduced-motion` the phrases
 * render in their final Dark Walnut state with no scroll-linked motion.
 */

const PHRASES = [
  "We don\u2019t simply",
  "design spaces.",
  "We shape how",
  "they are lived.",
] as const;

const SANDSTONE = "oklch(0.825 0.032 75)";
const DARK_WALNUT = "oklch(0.235 0.028 40)";

function Phrase({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Stagger each phrase across the section's scroll span.
  const start = index / total;
  const end = (index + 1) / total;

  const color = useTransform(progress, [start, end], [SANDSTONE, DARK_WALNUT]);
  const letterSpacing = useTransform(
    progress,
    [start, end],
    ["0.02em", "-0.02em"],
  );

  return (
    <motion.span
      data-ocid={`manifesto.phrase.${index + 1}`}
      style={{ color, letterSpacing }}
      className="block"
    >
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <SectionShell
      id={MANIFESTO_ID}
      className="border-y border-border bg-background"
    >
      <div ref={sectionRef} className="relative">
        <p
          data-ocid="manifesto.eyebrow"
          className="text-eyebrow mb-10 text-muted-foreground md:mb-16"
        >
          Manifesto
        </p>

        <h2
          data-ocid="manifesto.statement"
          className="text-display max-w-[16ch] text-foreground"
        >
          {prefersReducedMotion
            ? PHRASES.map((phrase, index) => (
                <span
                  key={phrase}
                  data-ocid={`manifesto.phrase.${index + 1}`}
                  className="block"
                  style={{ color: DARK_WALNUT }}
                >
                  {phrase}
                </span>
              ))
            : PHRASES.map((phrase, index) => (
                <Phrase
                  key={phrase}
                  index={index}
                  total={PHRASES.length}
                  progress={scrollYProgress}
                >
                  {phrase}
                </Phrase>
              ))}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:mt-20 md:grid-cols-12">
          <p
            data-ocid="manifesto.supporting_copy"
            className="measure text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7 md:text-lg"
          >
            Architecture rooted in material, context and the lasting
            relationship between people and place.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
