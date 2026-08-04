"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  TrackedActionLink,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import { PassLampScene } from "@/components/home/pass-lamp-scene";
import { SectionShell } from "@/components/layout/section-shell";
import type { HomepageContent } from "@/types/homepage";

type HomepageOutlineProps = {
  page: HomepageContent;
};

const statementsByLocale = {
  es: [
    ["Precisión antes del servicio.", "Calma durante el pase."],
    ["Orden en la partida.", "Libertad en cada movimiento."],
    ["Respeto por el producto.", "Intención en cada detalle."],
    ["Técnica en las manos.", "Criterio en cada decisión."],
    ["Confianza en el equipo.", "Un mismo ritmo durante el servicio."],
    ["Exigencia hasta el final.", "Orgullo después del último plato."],
  ],
  en: [
    ["Precision before service.", "Calm during the pass."],
    ["Order at the station.", "Freedom in every movement."],
    ["Respect for the product.", "Intention in every detail."],
    ["Technique in the hands.", "Judgment in every decision."],
    ["Trust in the team.", "One rhythm throughout service."],
    ["High standards to the end.", "Pride after the last plate."],
  ],
} as const;

const flavorIcons = [
  "/images/flavors/dulce-miel.png",
  "/images/flavors/salado-sal-marina.png",
  "/images/flavors/amargo-cafe.png",
  "/images/flavors/acido-limon.png",
  "/images/flavors/umami-shiitake.png",
] as const;

export function HomepageOutline({ page }: HomepageOutlineProps) {
  const [statementIndex, setStatementIndex] = useState(0);
  const statements = statementsByLocale[page.locale];
  const activeStatement =
    statements[statementIndex % statements.length] ?? statements[0];
  const [firstName = page.hero.name, ...familyNameParts] =
    page.hero.name.split(" ");
  const familyName = familyNameParts.join(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setStatementIndex((currentIndex) => currentIndex + 1);
    }, 7000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const editorial =
    page.locale === "es"
      ? {
          role: "Cocinero profesional",
          contact: "Contactar",
          journey: "Ver trayectoria",
          pillars: ["Dulce", "Salado", "Amargo", "Ácido", "Umami"],
        }
      : {
          role: "Professional cook",
          contact: "Contact",
          journey: "View experience",
          pillars: ["Sweet", "Salty", "Bitter", "Sour", "Umami"],
        };
  const heroWhatsAppMethod = page.hero.contactMethods.find(
    (method) => method.id === "whatsapp",
  );
  const heroEmailMethod = page.hero.contactMethods.find(
    (method) => method.id === "email",
  );
  const linkedInMethod = page.contact.methods.find(
    (method) => method.id === "linkedin",
  );
  return (
    <>
      <section id="top" className="relative border-b border-border">
        <div className="grid min-h-screen w-full lg:grid-cols-[57.5fr_42.5fr]">
          <div
            className="hero-copy relative flex px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-10"
            style={{ color: "var(--foreground)" }}
          >
            <PassLampScene locale={page.locale} />
            <div className="relative z-10 flex w-full flex-col justify-between gap-12">
              <div className="pt-[clamp(2rem,7vh,6rem)]">
                <h1 className="max-w-[8.5ch] font-editorial text-[clamp(5rem,8.4vw,10rem)] font-medium uppercase leading-[0.78] tracking-[-0.045em] text-foreground">
                  <span className="block">{firstName}</span>
                  {familyName ? (
                    <span className="block ps-[0.22em]">{familyName}</span>
                  ) : null}
                </h1>
                <p className="mt-7 text-[clamp(0.9rem,1.15vw,1.15rem)] font-semibold uppercase tracking-[0.3em] text-foreground/70">
                  {editorial.role}
                </p>
                <div className="mt-8 h-px w-20 bg-accent" />

                <p
                  key={`${page.locale}-${statementIndex}`}
                  className="editorial-statement mt-8 min-h-[clamp(6rem,9vw,9rem)] text-[clamp(2rem,3.15vw,4rem)] leading-[1.12] tracking-[-0.025em] text-foreground/90"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {activeStatement.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                <div className="hero-actions mt-10">
                  <details className="group relative">
                    <summary
                      className="hero-action hero-action-primary inline-flex min-h-[3.75rem] cursor-pointer list-none items-center justify-center border border-accent bg-accent px-9 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground [&::-webkit-details-marker]:hidden"
                    >
                      {editorial.contact}
                    </summary>
                    <div className="absolute left-0 top-full z-10 mt-2 grid min-w-[14rem] gap-2 border border-border bg-[var(--surface)] p-2">
                      {heroWhatsAppMethod ? (
                        <TrackedActionLink
                          className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
                          href={heroWhatsAppMethod.href}
                          methodId={heroWhatsAppMethod.id}
                          eventPayload={{ locale: page.locale, placement: "hero-contact-menu" }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {heroWhatsAppMethod.label}
                        </TrackedActionLink>
                      ) : null}
                      {heroEmailMethod ? (
                        <TrackedActionLink
                          className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground hover:text-accent"
                          href={heroEmailMethod.href}
                          methodId={heroEmailMethod.id}
                          eventPayload={{ locale: page.locale, placement: "hero-contact-menu" }}
                        >
                          {heroEmailMethod.label}
                        </TrackedActionLink>
                      ) : null}
                    </div>
                  </details>
                  <a
                    className="hero-action hero-action-secondary inline-flex min-h-[3.75rem] items-center justify-center border border-foreground/45 bg-white/[0.025] px-9 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-foreground"
                    href="#experience"
                  >
                    {editorial.journey}
                  </a>
                </div>
              </div>

              <div className="hero-pillars grid grid-cols-2 xl:grid-cols-5">
                {editorial.pillars.map((pillar, index) => {
                  const icon = flavorIcons[index] ?? flavorIcons[0];

                  return (
                    <div
                      key={pillar}
                      className="group relative isolate flex min-h-24 items-center justify-center overflow-hidden px-4 py-5 text-center last:col-span-2 xl:last:col-span-1"
                      style={
                        {
                          "--flavor-delay": `${index * 5}s`,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        width={92}
                        height={92}
                        className="mobile-flavor-icon pointer-events-none absolute left-1/2 top-1/2 z-0 h-[5.75rem] w-[5.75rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-[0.65]"
                      />
                      <span className="mobile-flavor-label relative z-10 text-[0.9rem] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-opacity duration-300 ease-out group-hover:opacity-0">
                        {pillar}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="mobile-knife-track pointer-events-none absolute inset-y-24 right-4 z-20 w-px bg-foreground/20 lg:hidden"
              aria-hidden="true"
            >
              <div
                className="knife-runner"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "7%",
                  transform: "translateX(-50%)",
                  filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.42))",
                  animation:
                    "knife-descent 14s cubic-bezier(0.45, 0, 0.55, 1) infinite",
                }}
              >
                <span className="absolute inset-y-0 left-1/2 z-0 w-[3px] -translate-x-1/2 bg-[#0d0c0a]" />
                <div
                  className="relative z-10 h-32 w-14 overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: "damascus-knife-turn 18s linear infinite",
                  }}
                >
                  <Image
                    src="/images/decor/damascus-knife.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover object-center brightness-[1.18] contrast-110"
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="relative min-h-[38rem] overflow-hidden border-t border-border bg-[#14110e] lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/images/portrait/andres-skin-tone-test-v1.png"
              alt="Andres Tirano working during kitchen service"
              fill
              priority
              sizes="(min-width: 1024px) 43vw, 100vw"
              className="hero-photo object-cover object-[center_44%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,8,0.18)_0%,transparent_18%),linear-gradient(0deg,rgba(11,10,8,0.12)_0%,transparent_28%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
          </aside>
        </div>
        <div className="knife-track pointer-events-none absolute inset-y-20 left-[57.5%] z-20 hidden w-px lg:block" aria-hidden="true">
          <div
            className="knife-runner"
            style={{
              position: "absolute",
              left: "50%",
              top: "7%",
              color: "var(--foreground)",
              transform: "translateX(-50%)",
              filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.42))",
              animation: "knife-descent 14s cubic-bezier(0.45, 0, 0.55, 1) infinite",
            }}
          >
            <span className="absolute inset-y-0 left-1/2 z-0 w-[3px] -translate-x-1/2 bg-[#0d0c0a]" />
            <div
              className="relative z-10 h-48 w-20 overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                animation:
                  "damascus-knife-turn 18s linear infinite",
              }}
            >
              <Image
                src="/images/decor/damascus-knife.png"
                alt=""
                fill
                sizes="80px"
                className="object-cover object-center brightness-[1.18] contrast-110"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[var(--surface)] px-6 py-6 md:px-10">
        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
                <TrackedLink
                  className="inline-flex min-h-11 items-center justify-center border border-accent bg-accent px-4 py-2 text-sm font-medium text-foreground"
                  eventName="resume_download"
                  eventPayload={{
                    locale: page.locale,
                    document: "resume",
                    placement: "resume-section",
                  }}
                  href={page.resume.fileHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.resume.fileLabel}
                </TrackedLink>
                <TrackedLink
                  className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground"
                  eventName="resume_download"
                  eventPayload={{
                    locale: page.locale,
                    document: "cover_letter",
                    placement: "resume-section",
                  }}
                  href={page.resume.coverLetterHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.resume.coverLetterLabel}
                </TrackedLink>
                {linkedInMethod ? (
                  <TrackedActionLink
                    className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-2 text-sm font-medium text-foreground"
                    eventPayload={{
                      locale: page.locale,
                      placement: "resume-section",
                    }}
                    href={linkedInMethod.href}
                    methodId={linkedInMethod.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {page.resume.linkedInLabel}
                  </TrackedActionLink>
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
                <TrackedActionLink
                  key={method.id}
                  className="bg-[var(--surface)] p-5 hover:bg-[var(--surface-strong)] md:p-6"
                  eventPayload={{
                    locale: page.locale,
                    placement: "contact-section",
                  }}
                  href={method.href}
                  methodId={method.id}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {method.label}
                  </p>
                  <p className="mt-3 break-words text-lg font-medium tracking-tight text-foreground">
                    {method.value}
                  </p>
                </TrackedActionLink>
              ))}
            </div>
          </SectionShell>
        </div>
      </div>
    </>
  );
}
