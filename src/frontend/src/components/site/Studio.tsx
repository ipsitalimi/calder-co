import { cn } from "@/lib/utils";

import Approach from "./Approach";
import SectionShell from "./SectionShell";

/**
 * Studio — who the practice is and how it works.
 *
 * Warm Porcelain ground with an asymmetric editorial composition: a narrow
 * offset label column against a wide statement column, then a two-column
 * body that steps across the grid rather than centring. No cards, no icons.
 *
 * The brief allows one documentary image of models, drawings or material
 * samples — but only from an existing uploaded asset. Every uploaded asset is
 * an exterior photograph of a finished building, so no suitable documentary
 * image exists and the section is rendered text-only, with no placeholder or
 * invented imagery.
 *
 * The four-stage method (Approach) is composed inside this same section so the
 * studio's identity and its process read as one continuous statement.
 */

const FACTS: readonly { label: string; value: string }[] = [
  { label: "Practice", value: "Architecture & Interiors" },
  { label: "Method", value: "Site-led, material-first" },
  { label: "Scope", value: "Concept to completion" },
] as const;

export default function Studio() {
  return (
    <SectionShell id="studio" className="bg-background">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Asymmetric intro: a narrow offset label against a wide statement. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <p
            data-ocid="studio.eyebrow"
            className="text-eyebrow text-muted-foreground md:col-span-3 md:pt-3"
          >
            Studio
          </p>

          <div className="md:col-span-9">
            <h2
              data-ocid="studio.heading"
              className="text-display max-w-[18ch] text-balance text-foreground"
            >
              A small practice, deliberately.
            </h2>

            <p
              data-ocid="studio.lead"
              className="measure-tight mt-8 text-lg leading-relaxed text-foreground md:mt-10 md:text-xl"
            >
              We take on few projects so each one gets the attention it needs —
              from the first site visit to the last detail on site.
            </p>
          </div>
        </div>

        {/* Body: two columns that step across the grid, not a centred block. */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
          <p
            data-ocid="studio.body.1"
            className="measure text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-2"
          >
            Every project starts with the place itself — its light, its climate,
            the way the ground falls. We design with those conditions rather
            than against them, and we keep the drawings honest about what the
            building will actually be.
          </p>

          <p
            data-ocid="studio.body.2"
            className="measure text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8"
          >
            Material is chosen early and tested in the hand, not on a screen.
            The result is architecture that feels settled in its setting and
            ages with intention rather than against it.
          </p>
        </div>

        {/* Facts — a bare hairline row that descends as a staircase: Practice
            sits left, Method steps right below it, Scope steps furthest right.
            No card chrome; the offset carries the composition. */}
        <dl
          data-ocid="studio.facts"
          className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-8 md:mt-24 md:gap-10"
        >
          {FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(
                "flex flex-col gap-2",
                // Descending staircase at every width: each fact steps further
                // right than the one above it, so the descent is visible on
                // mobile and desktop alike. The step scales up at md/lg.
                index === 0 && "pl-0",
                index === 1 && "pl-[20%] md:pl-[18%]",
                index === 2 && "pl-[42%] md:pl-[38%]",
              )}
            >
              <dt className="text-eyebrow text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="font-display text-xl tracking-[-0.01em] text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* The four-stage method, composed within the studio section. */}
        <div className="mt-24 md:mt-32">
          <Approach />
        </div>
      </div>
    </SectionShell>
  );
}
