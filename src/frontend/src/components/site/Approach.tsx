import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import { APPROACH_ID } from "./sections";

/**
 * Approach — the studio's four-stage method.
 *
 * A staggered editorial sequence rather than four identical cards: each stage
 * is a bare row of oversized numeral, stage title and a short description,
 * separated by fine Sandstone hairlines. On desktop the rows alternate their
 * column offset and width so the eye travels down a diagonal; on mobile they
 * collapse to a single clean vertical sequence.
 *
 * No icons, no card chrome, no shadows — the composition carries the rhythm.
 */

interface Stage {
  /** Fixed two-digit index, rendered as the large numeral. */
  index: string;
  /** Short stage title. */
  title: string;
  /** One-sentence description of what happens at this stage. */
  description: string;
}

const STAGES: readonly Stage[] = [
  {
    index: "01",
    title: "Observe",
    description:
      "We begin on site — reading the light, the ground and the way people already move through the place.",
  },
  {
    index: "02",
    title: "Develop",
    description:
      "Drawings and physical models test the idea at every scale until the plan earns its keep.",
  },
  {
    index: "03",
    title: "Resolve",
    description:
      "Structure, material and detail are settled together, so nothing is left to chance on site.",
  },
  {
    index: "04",
    title: "Realise",
    description:
      "We stay through construction, holding the intent of the drawing until the building stands.",
  },
] as const;

function StageRow({ stage, index }: { stage: Stage; index: number }) {
  // Alternate the offset so the sequence reads as a staggered composition
  // rather than a uniform list. 01 steps right, 02 sits left, 03 right,
  // 04 left — the eye travels down a diagonal.
  const offsetRight = index % 2 === 0;
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      data-ocid={`approach.stage.${index + 1}`}
      className={cn(
        "grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-12 md:gap-8 md:pt-5",
        // Alternation is visible at every width: right-aligned stages inset
        // from the left, left-aligned stages inset from the right. The base
        // offset is a clear percentage step; md keeps the wider grid offset.
        offsetRight ? "pl-[22%] md:pl-[16%]" : "pr-[22%] md:pr-[16%]",
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-hidden="true"
        data-ocid={`approach.numeral.${index + 1}`}
        className="font-display text-4xl font-light leading-none tracking-[-0.02em] text-muted-foreground md:col-span-2 md:text-5xl"
      >
        {stage.index}
      </span>

      <h3
        data-ocid={`approach.title.${index + 1}`}
        className={cn(
          "text-section text-foreground",
          offsetRight ? "md:col-span-4" : "md:col-span-3",
        )}
      >
        {stage.title}
      </h3>

      <p
        data-ocid={`approach.description.${index + 1}`}
        className={cn(
          "measure text-base leading-relaxed text-muted-foreground md:pt-2",
          offsetRight
            ? "md:col-span-5 md:col-start-8"
            : "md:col-span-6 md:col-start-6",
        )}
      >
        {stage.description}
      </p>
    </motion.li>
  );
}

export default function Approach() {
  return (
    <div
      id={APPROACH_ID}
      data-ocid="approach.section"
      className="scroll-mt-20 md:scroll-mt-24"
    >
      <header className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <h2
          data-ocid="approach.heading"
          className="text-display max-w-[14ch] text-balance text-foreground"
        >
          How we work
        </h2>
        <p className="text-eyebrow text-muted-foreground md:pb-3">
          Four stages — one continuous method
        </p>
      </header>

      <ol data-ocid="approach.list" className="flex flex-col">
        {STAGES.map((stage, index) => (
          <StageRow key={stage.index} stage={stage} index={index} />
        ))}
      </ol>
    </div>
  );
}
