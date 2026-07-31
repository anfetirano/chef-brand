"use client";

import { startTransition, useEffect, useState } from "react";
import { HomepageOutline } from "@/components/home/homepage-outline";
import { PageShell } from "@/components/layout/page-shell";
import type { HomepageContentByLocale, HomepageLocale } from "@/types/homepage";

type LocalizedHomepageProps = {
  pages: HomepageContentByLocale;
};

const languageOptions: Array<{
  locale: HomepageLocale;
  flag: string;
  label: string;
}> = [
  {
    locale: "en",
    flag: "🇨🇦",
    label: "English",
  },
  {
    locale: "es",
    flag: "🇪🇸",
    label: "Español",
  },
];

export function LocalizedHomepage({ pages }: LocalizedHomepageProps) {
  const [locale, setLocale] = useState<HomepageLocale>("es");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const page = pages[locale];
  const instagramMethod = page.contact.methods.find(
    (method) => method.id === "instagram",
  );
  const navigation =
    locale === "es"
      ? [
          { label: "Perfil", href: "#story" },
          { label: "Experiencia", href: "#experience" },
          { label: "Contacto", href: "#contact" },
        ]
      : [
          { label: "Profile", href: "#story" },
          { label: "Experience", href: "#experience" },
          { label: "Contact", href: "#contact" },
        ];

  return (
    <main className="flex-1">
      <PageShell>
        <header className="absolute inset-x-0 top-0 z-30">
          <div className="grid min-h-20 w-full grid-cols-[1fr_auto] items-stretch lg:grid-cols-[57.5fr_42.5fr]">
            <div className="flex items-center justify-between gap-8 px-6 md:px-10 lg:px-14">
              <a
                href={instagramMethod?.href ?? "https://www.instagram.com/anfetirano/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-[0.24em] text-foreground"
              >
                @anfetirano
              </a>
              <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="nav-link text-[0.8rem] font-medium uppercase tracking-[0.18em] text-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <span className="sr-only">{page.languageSwitcherLabel}</span>
            <div className="flex items-center justify-end px-6 md:px-10 lg:px-14">
              <div className="flex items-center border border-border">
                {languageOptions.map((option) => {
                  const isActive = option.locale === locale;

                  return (
                    <button
                      key={option.locale}
                      type="button"
                      onClick={() => {
                        if (option.locale === locale) {
                          return;
                        }

                        startTransition(() => {
                          setLocale(option.locale);
                        });
                      }}
                      className="inline-flex min-h-10 items-center gap-2 border-r border-border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] last:border-r-0"
                      style={{
                        backgroundColor: isActive ? "var(--accent)" : "transparent",
                        color: "var(--foreground)",
                      }}
                      aria-pressed={isActive}
                    >
                      <span aria-hidden="true">{option.locale.toUpperCase()}</span>
                      <span className="sr-only">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        <HomepageOutline page={page} />
      </PageShell>
    </main>
  );
}
