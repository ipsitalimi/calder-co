import SectionShell from "./SectionShell";

/**
 * Contact — closing editorial statement on Warm Porcelain.
 *
 * The project carries no verified contact details, so this section presents
 * the headline and supporting copy only. No address, phone number or email is
 * invented, and there is no contact form.
 *
 * Composition is deliberately asymmetric: the headline occupies the left
 * columns while the supporting copy sits low and right, echoing the manifesto
 * grid. The section stays visually restrained so the Selected Work dark band
 * remains the dominant dark feature of the page.
 */
export default function Contact() {
  return (
    <SectionShell id="contact" className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1400px]">
        <p
          data-ocid="contact.eyebrow"
          className="text-eyebrow mb-10 text-muted-foreground md:mb-16"
        >
          Contact
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <h2
            data-ocid="contact.headline"
            className="text-display max-w-[14ch] text-balance text-foreground md:col-span-8"
          >
            Have a project in mind?
          </h2>

          <div className="flex flex-col justify-end md:col-span-4 md:pb-3">
            <p
              data-ocid="contact.supporting_copy"
              className="measure text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              We take on a small number of commissions each year, from private
              residences to cultural and civic work. Tell us about the site, the
              brief and the people it is for.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
