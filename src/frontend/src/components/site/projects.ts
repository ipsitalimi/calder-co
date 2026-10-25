/**
 * Selected Work — project data.
 *
 * Four projects, in editorial sequence. Only the details supplied by the brief
 * are recorded here: no invented clients, locations, dates or awards.
 *
 * `demoUrl` points at each project's own external demo destination — case-study
 * routes do not exist yet, so every card links out to a distinct, project-named
 * URL. `crop` and `align` vary the composition so the stack reads as a sequence
 * rather than four clones.
 */

export interface Project {
  /** Stable identity — used as the React key. */
  id: string;
  /** Display title, set in the display serif. */
  title: string;
  /** One-line description, set in the body sans. */
  description: string;
  /** Root-relative image path. */
  image: string;
  /** Descriptive alt text for the photograph. */
  imageAlt: string;
  /** Minimal Sandstone metadata line. */
  meta: string;
  /** External demo destination for the card link. */
  demoUrl: string;
  /** Aspect ratio class for the image frame — varies per card. */
  crop: string;
  /** object-position class — varies the framing per card. */
  align: string;
  /** Which side the text block sits on, alternating down the stack. */
  textSide: "left" | "right";
}

export const projects: readonly Project[] = [
  {
    id: "mediterranean-residence",
    title: "Mediterranean Residence",
    description:
      "A warm-stone residence organised around a timber-lined courtyard.",
    image: "/assets/images/work-mediterranean.jpg",
    imageAlt:
      "Warm limestone residence with a timber-lined courtyard and deep shaded loggia.",
    meta: "Residential — Courtyard",
    demoUrl: "https://demo.candc.studio/projects/mediterranean-residence",
    crop: "aspect-[4/3]",
    align: "object-center",
    textSide: "left",
  },
  {
    id: "mountain-retreat",
    title: "Mountain Retreat",
    description:
      "A dark-stone retreat framed in black steel against a misty landscape.",
    image: "/assets/images/work-mountain.jpg",
    imageAlt:
      "Dark stone retreat framed in black steel set against a misty mountain landscape.",
    meta: "Residential — Landscape",
    demoUrl: "https://demo.candc.studio/projects/mountain-retreat",
    crop: "aspect-[16/10]",
    align: "object-bottom",
    textSide: "right",
  },
  {
    id: "event-venue",
    title: "Event Venue",
    description: "A sculptural venue composed for dramatic evening lighting.",
    image: "/assets/images/work-venue.jpg",
    imageAlt:
      "Sculptural concrete venue lit dramatically against a deep blue evening sky.",
    meta: "Civic — Assembly",
    demoUrl: "https://demo.candc.studio/projects/event-venue",
    crop: "aspect-[3/2]",
    align: "object-center",
    textSide: "left",
  },
  {
    id: "contemporary-art-museum",
    title: "Contemporary Art Museum",
    description:
      "Cobalt-blue forms with circular openings and reflective metal.",
    image: "/assets/images/work-museum.jpg",
    imageAlt:
      "Cobalt-blue museum volumes with circular openings and reflective metal cladding.",
    meta: "Cultural — Museum",
    demoUrl: "https://demo.candc.studio/projects/contemporary-art-museum",
    crop: "aspect-[5/4]",
    align: "object-top",
    textSide: "right",
  },
] as const;
