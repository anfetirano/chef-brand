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
  const [locale, setLocale] = useState<HomepageLocale>("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const page = pages[locale];

  return (
    <main className="flex-1">
      <PageShell>
        <div className="border-b border-border bg-[var(--surface)] px-6 py-3 md:px-10">
          <div className="flex items-center justify-center gap-3">
            <span className="sr-only">{page.languageSwitcherLabel}</span>
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
                  className="inline-flex min-h-11 items-center gap-3 border px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: isActive ? "var(--surface-strong)" : "var(--surface)",
                    borderColor: isActive ? "rgba(170,109,59,0.38)" : "var(--border)",
                    color: "var(--foreground)",
                  }}
                  aria-pressed={isActive}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {option.flag}
                  </span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <HomepageOutline page={page} />
      </PageShell>
    </main>
  );
}
