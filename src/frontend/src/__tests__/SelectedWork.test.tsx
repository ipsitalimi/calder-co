import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SelectedWork from "@/components/site/SelectedWork";
import { projects } from "@/components/site/projects";

/**
 * Selected Work — dark band with four distinct projects, each card linking to
 * its own destination, and the sticky stacking structure preserved.
 */
describe("SelectedWork", () => {
  it("renders all four named projects", () => {
    render(<SelectedWork />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { name: project.title }),
      ).toBeInTheDocument();
    }
    expect(projects).toHaveLength(4);
  });

  it("links each card to its own case study or demo destination", () => {
    render(<SelectedWork />);

    const hrefs = projects.map((project) => {
      const link = screen.getByRole("link", {
        name: `View the ${project.title} project`,
      });
      return link.getAttribute("href");
    });

    expect(hrefs).toEqual(projects.map((project) => project.demoUrl));
    expect(new Set(hrefs).size).toBe(4);
  });

  it("preserves the sticky stacking structure rather than a static grid", () => {
    const { container } = render(<SelectedWork />);

    const list = container.querySelector('[data-ocid="work.list"]');
    expect(list).not.toBeNull();
    // Each card is wrapped in a sticky container.
    expect(list?.querySelectorAll(".sticky")).toHaveLength(projects.length);
  });

  it("renders project imagery monochrome by default, revealing colour on hover", () => {
    render(<SelectedWork />);

    for (const project of projects) {
      const image = screen.getByRole("img", { name: project.imageAlt });
      expect(image).toHaveAttribute("src", project.image);
      // Grayscale is applied via the shared .work-image utility; the uploaded
      // file itself is never recoloured or replaced.
      expect(image.className).toMatch(/work-image/);
      expect(image.className).not.toMatch(/sepia|hue-rotate/);
    }
  });
});
