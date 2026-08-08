"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  TrackedActionLink,
  TrackedLink,
} from "@/components/analytics/tracked-link";
import { CinematicVideoSequence } from "@/components/home/cinematic-video-sequence";
import { PassLampScene } from "@/components/home/pass-lamp-scene";
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

const experienceLogos = {
  "A Tafona": {
    src: "/images/experience-logos/atafona.gif",
    width: 2400,
    height: 1600,
    treatment: "dark-on-light",
  },
  LUME: {
    src: "/images/experience-logos/lume.png",
    width: 372,
    height: 135,
    treatment: "dark-on-light",
  },
  "The Club": {
    src: "/images/experience-logos/the-club.png",
    width: 1024,
    height: 1024,
    treatment: "dark-on-light",
  },
  "La Deriva": {
    src: "/images/experience-logos/la-deriva.png",
    width: 225,
    height: 225,
    treatment: "light-on-dark",
  },
  "Hotel Gran Cervantes": {
    src: "/images/experience-logos/gran-cervantes.jpeg",
    width: 447,
    height: 447,
    treatment: "dark-on-light",
  },
  "Only YOU Hotel Málaga": {
    src: "/images/experience-logos/only-you.png",
    width: 320,
    height: 320,
    treatment: "dark-on-light",
  },
} as const;

const experienceChaptersByLocale = {
  es: [
    {
      title: "Origen",
      period: "Santiago de Compostela · 2021",
      description:
        "La precisión se aprende desde la base: producto, preparación y atención al detalle.",
      venues: ["A Tafona", "LUME"],
    },
    {
      title: "Ritmo",
      period: "Málaga · 2022",
      description:
        "La partida exige orden, lectura del servicio y coordinación con el equipo.",
      venues: ["The Club", "La Deriva"],
    },
    {
      title: "Hospitalidad",
      period: "Málaga · 2024–2025",
      description:
        "El oficio se amplía cuando técnica y servicio responden al mismo estándar.",
      venues: ["Hotel Gran Cervantes", "Only YOU Hotel Málaga"],
    },
  ],
  en: [
    {
      title: "Foundations",
      period: "Santiago de Compostela · 2021",
      description:
        "Precision begins with the fundamentals: product, preparation, and attention to detail.",
      venues: ["A Tafona", "LUME"],
    },
    {
      title: "Rhythm",
      period: "Málaga · 2022",
      description:
        "A station demands order, awareness of service, and coordination with the team.",
      venues: ["The Club", "La Deriva"],
    },
    {
      title: "Hospitality",
      period: "Málaga · 2024–2025",
      description:
        "The craft expands when technique and service answer to the same standard.",
      venues: ["Hotel Gran Cervantes", "Only YOU Hotel Málaga"],
    },
  ],
} as const;

const profileEditorialByLocale = {
  es: {
    title: "El cocinero",
    statement:
      "La curiosidad abre el camino. La disciplina convierte cada aprendizaje en oficio.",
    educationStatement:
      "Una base práctica que sigue creciendo con cada cocina, cada técnica y cada servicio.",
    languageStatement:
      "La comunicación también forma parte del servicio.",
  },
  en: {
    title: "The cook",
    statement:
      "Curiosity opens the way. Discipline turns every lesson into craft.",
    educationStatement:
      "A practical foundation that continues to grow through every kitchen, technique, and service.",
    languageStatement:
      "Communication is part of service too.",
  },
} as const;

const documentsEditorialByLocale = {
  es: {
    title: "Documentos profesionales",
    statement:
      "Experiencia, formación y contacto reunidos en documentos preparados para selección.",
    documents: [
      {
        number: "01",
        title: "Currículum",
        meta: "Experiencia · Formación · Contacto",
        action: "Descargar PDF",
      },
      {
        number: "02",
        title: "Carta de presentación",
        meta: "Perfil · Motivación · Disponibilidad",
        action: "Descargar PDF",
      },
    ],
    linkedIn: "Perfil profesional en LinkedIn",
  },
  en: {
    title: "Professional documents",
    statement:
      "Experience, training, and contact details gathered in documents prepared for recruitment.",
    documents: [
      {
        number: "01",
        title: "Curriculum vitae",
        meta: "Experience · Training · Contact",
        action: "Download PDF",
      },
      {
        number: "02",
        title: "Cover letter",
        meta: "Profile · Motivation · Availability",
        action: "Download PDF",
      },
    ],
    linkedIn: "Professional profile on LinkedIn",
  },
} as const;

const contactEditorialByLocale = {
  es: {
    title: "Hablemos de la próxima cocina.",
    statement:
      "Disponible para nuevas oportunidades, equipos exigentes y proyectos donde el producto, el ritmo y el servicio importan.",
    backToTop: "Volver arriba",
    availability: "Málaga · Disponible para reubicación",
  },
  en: {
    title: "Let’s talk about the next kitchen.",
    statement:
      "Available for new opportunities, demanding teams, and projects where product, rhythm, and service matter.",
    backToTop: "Back to top",
    availability: "Málaga · Available for relocation",
  },
} as const;

const galleryEditorialByLocale = {
  es: {
    eyebrow: "Cuaderno de servicio",
    title: "En servicio",
    carouselLabel: "Galería de cocina en movimiento",
    viewerClose: "Cerrar fotografía",
    viewerPrevious: "Fotografía anterior",
    viewerNext: "Fotografía siguiente",
    statement:
      "Fuego, producto y precisión. El oficio ocurre en el movimiento, no en la pose.",
    images: [
      {
        src: "/images/gallery/prawn-stock.JPG",
        alt: "Fondo de marisco cocinándose lentamente sobre el fuego",
        label: "Fondo",
      },
      {
        src: "/images/gallery/plating-prawn.JPG",
        alt: "Emplatado de langostino con crema y aceite verde",
        label: "Emplatado",
      },
      {
        src: "/images/gallery/beef-service.JPG",
        alt: "Selección de carne trinchada y preparada para el servicio",
        label: "Producto",
      },
      {
        src: "/images/gallery/slow-roast.JPG",
        alt: "Cocción lenta de piezas de cerdo en una cocina profesional",
        label: "Tiempo",
      },
      {
        src: "/images/gallery/prawn-reduction.JPG",
        alt: "Reducción de marisco en plena ebullición",
        label: "Reducción",
      },
    ],
  },
  en: {
    eyebrow: "Service journal",
    title: "In service",
    carouselLabel: "Moving kitchen gallery",
    viewerClose: "Close photograph",
    viewerPrevious: "Previous photograph",
    viewerNext: "Next photograph",
    statement:
      "Fire, product, and precision. The craft lives in movement, never in the pose.",
    images: [
      {
        src: "/images/gallery/prawn-stock.JPG",
        alt: "Shellfish stock cooking slowly over the flame",
        label: "Stock",
      },
      {
        src: "/images/gallery/plating-prawn.JPG",
        alt: "Prawn plated with a smooth cream and green oil",
        label: "Plating",
      },
      {
        src: "/images/gallery/beef-service.JPG",
        alt: "Sliced beef selected and prepared for service",
        label: "Product",
      },
      {
        src: "/images/gallery/slow-roast.JPG",
        alt: "Slow-roasted pork in a professional kitchen",
        label: "Time",
      },
      {
        src: "/images/gallery/prawn-reduction.JPG",
        alt: "Shellfish reduction at a full simmer",
        label: "Reduction",
      },
    ],
  },
} as const;

export function HomepageOutline({ page }: HomepageOutlineProps) {
  const [statementIndex, setStatementIndex] = useState(0);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null);
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
  const emailMethod = page.contact.methods.find(
    (method) => method.id === "email",
  );
  const footerMethods = ["whatsapp", "linkedin", "instagram"]
    .map((id) => page.contact.methods.find((method) => method.id === id))
    .filter((method): method is NonNullable<typeof method> => Boolean(method));
  const experienceChapters = experienceChaptersByLocale[page.locale];
  const profileEditorial = profileEditorialByLocale[page.locale];
  const galleryEditorial = galleryEditorialByLocale[page.locale];
  const contactEditorial = contactEditorialByLocale[page.locale];
  const selectedGalleryImage =
    selectedGalleryIndex === null
      ? null
      : galleryEditorial.images[selectedGalleryIndex];

  useEffect(() => {
    if (selectedGalleryIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedGalleryIndex(null);
      } else if (event.key === "ArrowLeft") {
        setSelectedGalleryIndex((current) =>
          current === null
            ? null
            : (current - 1 + galleryEditorial.images.length) %
              galleryEditorial.images.length,
        );
      } else if (event.key === "ArrowRight") {
        setSelectedGalleryIndex((current) =>
          current === null
            ? null
            : (current + 1) % galleryEditorial.images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryEditorial.images.length, selectedGalleryIndex]);
  const experienceIntro =
    page.locale === "es"
      ? {
          title: "La trayectoria",
          statement:
            "Cada cocina dejó una forma distinta de entender el producto, el equipo y el servicio.",
        }
      : {
          title: "The journey",
          statement:
            "Each kitchen shaped a different way of understanding product, teamwork, and service.",
        };

  return (
    <>
      <section id="top" className="relative border-b border-border">
        <div className="grid min-h-screen w-full lg:grid-cols-[57.5fr_42.5fr]">
          <div
            className="hero-copy relative flex px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-10"
            style={{ color: "var(--foreground)" }}
          >
            <PassLampScene
              locale={page.locale}
              linkedInHref={
                linkedInMethod?.href ??
                "https://www.linkedin.com/in/andres-felipe-tirano-vasquez-5792b51a1/"
              }
            />
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

      <section
        id="craft"
        aria-labelledby="craft-title"
        className="craft-section"
      >
        <div className="craft-section__intro">
          <div>
            <span className="craft-section__rule" aria-hidden="true" />
            <h2 id="craft-title" className="craft-section__title">
              {page.strengthsTitle}
            </h2>
          </div>
          <p className="craft-section__statement">{page.promiseIntro}</p>
        </div>

        <div className="craft-principles">
          {page.valueItems.map((item) => (
            <article key={item.title} className="craft-principle">
              <h3 className="craft-principle__title">{item.title}</h3>
              <p className="craft-principle__description">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="bg-[var(--surface)] px-6 pb-6 md:px-10 md:pb-10">
        <div className="w-full">
          <section
            aria-label="Andres Tirano in kitchen service"
            className="overflow-hidden border border-border bg-[var(--surface-strong)]"
          >
            <CinematicVideoSequence />
          </section>
        </div>
      </div>

      <div className="bg-[var(--surface)]">
        <div className="w-full">
          <section id="experience" className="experience-journey">
            <header className="experience-journey__intro">
              <div>
                <span className="experience-journey__rule" aria-hidden="true" />
                <h2 className="experience-journey__title">
                  {experienceIntro.title}
                </h2>
              </div>
              <p className="experience-journey__statement">
                {experienceIntro.statement}
              </p>
            </header>

            <div className="experience-chapters">
              {experienceChapters.map((chapter) => (
                <article key={chapter.title} className="experience-chapter">
                  <div className="experience-chapter__heading">
                    <p className="experience-chapter__period">{chapter.period}</p>
                    <h3 className="experience-chapter__title">{chapter.title}</h3>
                    <p className="experience-chapter__description">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="experience-chapter__venues">
                    {chapter.venues.map((venueName) => {
                      const item = page.experience.find(
                        (experience) => experience.venue === venueName,
                      );
                      const logo =
                        experienceLogos[
                          venueName as keyof typeof experienceLogos
                        ];

                      if (!item || !logo) {
                        return null;
                      }

                      return (
                        <div key={venueName} className="experience-venue">
                          <div className="experience-venue__logo">
                            <Image
                              src={logo.src}
                              alt=""
                              aria-hidden="true"
                              width={logo.width}
                              height={logo.height}
                              className={`experience-logo experience-logo--${logo.treatment} ${
                                venueName === "A Tafona"
                                  ? "experience-logo--atafona"
                                  : ""
                              }`}
                            />
                          </div>
                          <div className="experience-venue__copy">
                            <h4>{item.venue}</h4>
                            <p>{item.role}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="story" className="profile-editorial">
            <div className="profile-editorial__frame">
              <aside className="profile-editorial__rail" aria-hidden="true">
                <span>01</span>
                <p>{page.storySection.title}</p>
              </aside>

              <div className="profile-editorial__body">
                <header className="profile-editorial__intro">
                  <div>
                    <span className="profile-editorial__rule" aria-hidden="true" />
                    <h2 className="profile-editorial__title">
                      {profileEditorial.title}
                    </h2>
                  </div>
                  <p className="profile-editorial__statement">
                    {profileEditorial.statement}
                  </p>
                </header>

                <div className="profile-narrative">
                  <p className="profile-narrative__lead">{page.story[0]}</p>
                  <div className="profile-narrative__support">
                    {page.story.slice(1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <section className="profile-education">
                  <header className="profile-subsection__heading">
                    <h3>{page.educationTitle}</h3>
                    <p>{profileEditorial.educationStatement}</p>
                  </header>

                  <div className="profile-education__list">
                    {page.education.map((item, index) => (
                      <article
                        key={`${item.institution}-${item.period ?? item.title}`}
                        className="profile-education__item"
                      >
                        <span aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="profile-education__copy">
                          <div>
                            <h4>{item.title}</h4>
                            <p className="profile-education__institution">
                              {item.period
                                ? `${item.institution} · ${item.period}`
                                : item.institution}
                            </p>
                          </div>
                          <p className="profile-education__description">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="profile-languages">
                  <div className="profile-languages__heading">
                    <h3>{page.languagesTitle}</h3>
                    <p>{profileEditorial.languageStatement}</p>
                  </div>
                  <dl className="profile-languages__list">
                    {page.languages.map((language) => (
                      <div key={language.name}>
                        <dt>{language.name}</dt>
                        <dd>{language.level}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </section>

          <section id="gallery" className="service-gallery">
            <div className="service-gallery__frame">
              <header className="service-gallery__intro">
                <div>
                  <span className="service-gallery__rule" aria-hidden="true" />
                  <p className="service-gallery__eyebrow">
                    {galleryEditorial.eyebrow}
                  </p>
                  <h2>{galleryEditorial.title}</h2>
                </div>
                <p className="service-gallery__statement">
                  {galleryEditorial.statement}
                </p>
              </header>

              <div
                className="service-gallery__viewport"
                role="region"
                aria-label={galleryEditorial.carouselLabel}
              >
                <div className="service-gallery__rail">
                  {[0, 1].map((groupIndex) => (
                    <div
                      key={groupIndex}
                      className="service-gallery__rail-group"
                      aria-hidden={groupIndex === 1 ? true : undefined}
                    >
                      {galleryEditorial.images.map((item, index) => (
                        <figure
                          key={`${groupIndex}-${item.src}`}
                          className={`service-gallery__image service-gallery__image--${index + 1}`}
                          role={groupIndex === 0 ? "button" : undefined}
                          tabIndex={groupIndex === 0 ? 0 : -1}
                          onClick={() => setSelectedGalleryIndex(index)}
                          onKeyDown={(event) => {
                            if (
                              groupIndex === 0 &&
                              (event.key === "Enter" || event.key === " ")
                            ) {
                              event.preventDefault();
                              setSelectedGalleryIndex(index);
                            }
                          }}
                        >
                          <Image
                            src={item.src}
                            alt={groupIndex === 0 ? item.alt : ""}
                            fill
                            sizes="(min-width: 768px) 42vw, 84vw"
                          />
                          <figcaption>
                            <span>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p>{item.label}</p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="resume" className="documents-section">
            <div className="documents-section__frame">
              <header className="documents-section__intro">
                <div>
                  <span className="documents-section__rule" aria-hidden="true" />
                  <h2>{documentsEditorialByLocale[page.locale].title}</h2>
                </div>
                <p>{documentsEditorialByLocale[page.locale].statement}</p>
              </header>

              <div className="documents-list">
                {documentsEditorialByLocale[page.locale].documents.map(
                  (document, index) => {
                    const isResume = index === 0;

                    return (
                      <TrackedLink
                        key={document.number}
                        className="document-row"
                        eventName="resume_download"
                        eventPayload={{
                          locale: page.locale,
                          document: isResume ? "resume" : "cover_letter",
                          placement: "resume-section",
                        }}
                        href={
                          isResume
                            ? page.resume.fileHref
                            : page.resume.coverLetterHref
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="document-row__number">
                          {document.number}
                        </span>
                        <span className="document-row__identity">
                          <strong>{document.title}</strong>
                          <small>{document.meta}</small>
                        </span>
                        <span className="document-row__action">
                          {document.action}
                          <span aria-hidden="true">↓</span>
                        </span>
                      </TrackedLink>
                    );
                  },
                )}
              </div>

              {linkedInMethod ? (
                <TrackedActionLink
                  className="documents-linkedin"
                  eventPayload={{
                    locale: page.locale,
                    placement: "resume-section",
                  }}
                  href={linkedInMethod.href}
                  methodId={linkedInMethod.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{documentsEditorialByLocale[page.locale].linkedIn}</span>
                  <span aria-hidden="true">↗</span>
                </TrackedActionLink>
              ) : null}
            </div>
          </section>

          <section id="contact" className="final-contact">
            <div className="final-contact__frame">
              <header className="final-contact__intro">
                <h2>{contactEditorial.title}</h2>
                <p>{contactEditorial.statement}</p>
              </header>

              {emailMethod ? (
                <TrackedActionLink
                  className="final-contact__email"
                  eventPayload={{
                    locale: page.locale,
                    placement: "contact-section",
                  }}
                  href={emailMethod.href}
                  methodId={emailMethod.id}
                >
                  <span>{emailMethod.value}</span>
                  <span aria-hidden="true">↗</span>
                </TrackedActionLink>
              ) : null}

              <div className="final-contact__methods">
                {footerMethods.map((method) => (
                  <TrackedActionLink
                    key={method.id}
                    className="final-contact__method"
                    eventPayload={{
                      locale: page.locale,
                      placement: "contact-section",
                    }}
                    href={method.href}
                    methodId={method.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="final-contact__method-copy">
                      <strong>{method.label}</strong>
                      <small>{method.value}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </TrackedActionLink>
                ))}
              </div>

              <p className="final-contact__signature" aria-hidden="true">
                Tirano
              </p>

              <footer className="final-contact__footer">
                <p>© 2026 Andres Tirano</p>
                <p>{contactEditorial.availability}</p>
                <a href="#top">
                  {contactEditorial.backToTop} <span aria-hidden="true">↑</span>
                </a>
              </footer>
            </div>
          </section>
        </div>
      </div>

      {selectedGalleryImage ? (
        <div
          className="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={selectedGalleryImage.label}
          onClick={() => setSelectedGalleryIndex(null)}
        >
          <button
            type="button"
            className="gallery-viewer__close"
            aria-label={galleryEditorial.viewerClose}
            onClick={() => setSelectedGalleryIndex(null)}
            autoFocus
          >
            <span aria-hidden="true">×</span>
          </button>

          <button
            type="button"
            className="gallery-viewer__control gallery-viewer__control--previous"
            aria-label={galleryEditorial.viewerPrevious}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedGalleryIndex((current) =>
                current === null
                  ? null
                  : (current - 1 + galleryEditorial.images.length) %
                    galleryEditorial.images.length,
              );
            }}
          >
            <span aria-hidden="true">←</span>
          </button>

          <figure
            className="gallery-viewer__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-viewer__image">
              <Image
                key={selectedGalleryImage.src}
                src={selectedGalleryImage.src}
                alt={selectedGalleryImage.alt}
                fill
                sizes="96vw"
                priority
              />
            </div>
            <figcaption>
              <span>
                {String((selectedGalleryIndex ?? 0) + 1).padStart(2, "0")}
              </span>
              <p>{selectedGalleryImage.label}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            className="gallery-viewer__control gallery-viewer__control--next"
            aria-label={galleryEditorial.viewerNext}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedGalleryIndex((current) =>
                current === null
                  ? null
                  : (current + 1) % galleryEditorial.images.length,
              );
            }}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
