import Image from "next/image";
import { SectionShell } from "@/components/layout/section-shell";
import type { HomepageContent } from "@/types/homepage";

type HomepageOutlineProps = {
  page: HomepageContent;
};

export function HomepageOutline({ page }: HomepageOutlineProps) {
  const heroText = { color: "var(--foreground)" };
  const heroTextSoft = { color: "rgba(33,25,20,0.84)" };
  const heroLabel = { color: "rgba(112,98,85,0.96)" };
  const heroWhatsAppMethod = page.hero.contactMethods.find(
    (method) => method.id === "whatsapp",
  );
  const heroEmailMethod = page.hero.contactMethods.find(
    (method) => method.id === "email",
  );
  const linkedInMethod = page.contact.methods.find(
    (method) => method.id === "linkedin",
  );
  const primaryButtonStyle = {
    backgroundColor: "var(--foreground)",
    borderColor: "var(--foreground)",
    color: "#fbf7f1",
  };
  const secondaryButtonStyle = {
    backgroundColor: "transparent",
    borderColor: "var(--border)",
    color: "var(--foreground)",
  };

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-[1600px] lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div
            className="px-6 py-8 md:px-10 md:py-10"
            style={{ backgroundColor: "var(--surface)", color: "var(--foreground)" }}
          >
            <div className="flex flex-col gap-8">
              <div className="grid gap-8 border-b border-border pb-8 lg:grid-cols-[minmax(0,46rem)_14rem] lg:justify-between">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.28em]" style={heroLabel}>
                    {page.hero.profileLabel}
                  </p>
                  <h1
                    className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl"
                    style={heroText}
                  >
                    {page.hero.name}
                  </h1>
                  <p
                    className="max-w-2xl text-xl leading-8 md:text-2xl"
                    style={heroTextSoft}
                  >
                    {page.hero.role}
                  </p>
                </div>

                <div className="space-y-4 lg:border-l lg:border-border lg:pl-6">
                  {page.hero.location ? (
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em]" style={heroLabel}>
                        {page.hero.locationLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6" style={heroTextSoft}>
                        {page.hero.location}
                      </p>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em]" style={heroLabel}>
                      {page.hero.availabilityLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6" style={heroTextSoft}>
                      {page.hero.availability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,50rem)_16rem] lg:justify-between">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.18em]" style={heroLabel}>
                    {page.hero.summaryLabel}
                  </p>
                  <p
                    className="max-w-3xl text-base leading-8 md:text-[1.05rem]"
                    style={heroTextSoft}
                  >
                    {page.hero.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <details className="group relative">
                      <summary
                        className="inline-flex min-h-11 cursor-pointer list-none items-center justify-center border px-4 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden"
                        style={primaryButtonStyle}
                      >
                        {page.hero.primaryCta.label}
                      </summary>
                      <div className="absolute left-0 top-full z-10 mt-2 grid min-w-[13rem] gap-2 border border-border bg-[var(--surface)] p-2 shadow-[0_18px_40px_rgba(33,25,20,0.14)]">
                        {heroWhatsAppMethod ? (
                          <a
                            className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
                            href={heroWhatsAppMethod.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {heroWhatsAppMethod.label}
                          </a>
                        ) : null}
                        {heroEmailMethod ? (
                          <a
                            className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
                            href={heroEmailMethod.href}
                          >
                            {heroEmailMethod.label}
                          </a>
                        ) : null}
                      </div>
                    </details>
                    <a
                      className="inline-flex min-h-11 items-center justify-center border px-4 py-2 text-sm font-medium"
                      href={page.hero.secondaryCta.href}
                      style={secondaryButtonStyle}
                    >
                      {page.hero.secondaryCta.label}
                    </a>
                  </div>
                </div>

                <dl className="grid gap-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  {page.hero.facts.map((fact) => (
                    <div key={fact.label} className="space-y-1">
                      <dt className="text-xs uppercase tracking-[0.18em]" style={heroLabel}>
                        {fact.label}
                      </dt>
                      <dd className="text-sm leading-6" style={heroTextSoft}>
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <aside className="grid border-t border-border bg-[var(--surface-strong)] lg:border-l lg:border-t-0">
            {page.hero.portraitSrc ? (
              <div className="border-b border-border">
                <Image
                  src={page.hero.portraitSrc}
                  alt="Portrait of Andres Tirano"
                  width={640}
                  height={800}
                  className="aspect-[4/5] w-full object-cover"
                  priority
                />
              </div>
            ) : null}
            <dl className="space-y-3 px-6 py-6 md:px-8">
              {page.hero.contactMethods.map((method) => (
                <div
                  key={method.id}
                  className="grid gap-1 border-b border-border pb-3 last:border-b-0 last:pb-0 md:grid-cols-[5.75rem_minmax(0,1fr)] md:gap-3"
                >
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                    {method.label}
                  </dt>
                  <dd className="min-w-0">
                    <a
                      className="block break-words text-sm leading-6 text-foreground hover:text-accent"
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        method.href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                    >
                      {method.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <div className="bg-[var(--surface)] px-6 py-6 md:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {page.strengthsTitle}
            </h2>
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {page.valueItems.map((item) => (
              <article key={item.title} className="bg-[var(--surface)] p-5 md:p-6">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface)] px-6 pb-6 md:px-10 md:pb-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <section
            aria-label="Andres Tirano in kitchen service"
            className="overflow-hidden border border-border bg-[var(--surface-strong)]"
          >
            <video
              className="aspect-[16/10] w-full object-cover md:aspect-[21/8]"
              src="/videos/andres-kitchen-banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </section>
        </div>
      </div>

      <div className="bg-[var(--surface)] px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <SectionShell
            id="experience"
            heading={page.experienceSection.title}
            summary={page.experienceSection.description}
          >
            <div className="space-y-8">
              {page.experience.map((item) => (
                <article
                  key={`${item.venue}-${item.period}`}
                  className="grid gap-4 border-b border-border pb-8 last:border-b-0 last:pb-0 md:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <div className="space-y-2 md:pt-1">
                    {item.period ? (
                      <p className="text-2xl font-semibold tracking-tight text-accent">
                        {item.period}
                      </p>
                    ) : null}
                    <p className="text-sm leading-6 text-muted">{item.location}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {item.venue}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.14em] text-muted">
                        {item.role}
                      </p>
                    </div>
                    <p className="max-w-3xl text-sm leading-8 text-muted">{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </SectionShell>

          <SectionShell
            id="story"
            heading={page.storySection.title}
            summary={page.storySection.description}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)]">
              <div className="bg-[var(--surface-strong)] p-6 md:p-8">
                <div className="space-y-5">
                  {page.story.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-8 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-px border border-border bg-border">
                <div className="bg-[var(--surface)] p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {page.educationTitle}
                  </h3>
                  <div className="mt-5 space-y-5">
                    {page.education.map((item) => (
                      <article
                        key={`${item.institution}-${item.period ?? item.title}`}
                        className="space-y-1"
                      >
                        <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted">
                          {item.period
                            ? `${item.institution} · ${item.period}`
                            : item.institution}
                        </p>
                        <p className="text-sm leading-6 text-muted">{item.description}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--surface)] p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {page.languagesTitle}
                  </h3>
                  <dl className="mt-5 space-y-2">
                    {page.languages.map((language) => (
                      <div
                        key={language.name}
                        className="flex items-center justify-between gap-4 border-b border-border pb-2 text-sm"
                      >
                        <dt className="text-foreground">{language.name}</dt>
                        <dd className="text-muted">{language.level}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </SectionShell>

          {page.gallery.length > 0 ? (
            <SectionShell
              id="gallery"
              heading={page.gallerySection.title}
              summary={page.gallerySection.description}
            >
              <div className="grid gap-px border border-border bg-border md:grid-cols-3">
                {page.gallery.map((item) => (
                  <article key={item.title} className="bg-[var(--surface)] p-5 md:p-6">
                    <div className="mb-4 aspect-[4/3] bg-[var(--surface-strong)]" />
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </SectionShell>
          ) : null}

          <SectionShell
            id="resume"
            heading={page.resume.title}
            summary={page.resume.description}
          >
            <div className="grid gap-6 bg-[var(--surface-strong)] p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8">
              <p className="max-w-2xl text-sm leading-7 text-muted">{page.resume.note}</p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-white"
                  href={page.resume.fileHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.resume.fileLabel}
                </a>
                {linkedInMethod ? (
                  <a
                    className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground"
                    href={linkedInMethod.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {page.resume.linkedInLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </SectionShell>

          <SectionShell
            id="contact"
            heading={page.contact.title}
            summary={page.contact.description}
          >
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {page.contact.methods.map((method) => (
                <a
                  key={method.id}
                  className="bg-[var(--surface)] p-5 hover:bg-[#f8f1e7] md:p-6"
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {method.label}
                  </p>
                  <p className="mt-3 break-words text-lg font-medium tracking-tight text-foreground">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>
          </SectionShell>
        </div>
      </div>
    </>
  );
}
