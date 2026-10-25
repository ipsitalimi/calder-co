import { HERO_ID, navSections } from "./sections";

/**
 * Footer — compact Dark Walnut band with Warm Porcelain text.
 *
 * Carries the C&C wordmark (linking back to the top of the page), the shared
 * navigation links, the existing contact link, and the copyright line. The
 * attribution link follows the platform convention.
 *
 * Kept intentionally short so the Selected Work dark band stays the dominant
 * dark feature of the page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-ocid="footer"
      className="dark border-t border-border bg-background text-foreground"
    >
      <div className="page-gutter mx-auto w-full max-w-[1400px] py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <a
            href={`#${HERO_ID}`}
            data-ocid="footer.wordmark_link"
            className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground motion-hover hover:text-secondary md:text-[1.75rem]"
          >
            C&amp;C
          </a>

          <nav aria-label="Footer" className="md:pt-2">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    data-ocid={`footer.link.${section.id}`}
                    className="text-eyebrow text-muted-foreground motion-hover hover:text-foreground"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p
            data-ocid="footer.copyright"
            className="text-eyebrow text-muted-foreground"
          >
            &copy; {year} Calder &amp; Co. All rights reserved.
          </p>

          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window === "undefined" ? "" : window.location.hostname,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="footer.attribution_link"
            className="text-eyebrow text-muted-foreground motion-hover hover:text-foreground"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
