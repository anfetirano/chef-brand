import { existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { homepageContentByLocale } from "@/content/homepage";
import type { HomepageContent, HomepageContentByLocale } from "@/types/homepage";

export const getHomepageContent = cache((): HomepageContentByLocale => {
  const portraitPath = join(
    process.cwd(),
    "public",
    "images",
    "portrait",
    "andres-tirano.jpg",
  );

  const portraitSrc = existsSync(portraitPath)
    ? "/images/portrait/andres-tirano.jpg"
    : undefined;

  const attachPortrait = (content: HomepageContent): HomepageContent => ({
    ...content,
    hero: {
      ...content.hero,
      ...(portraitSrc ? { portraitSrc } : {}),
    },
  });

  return {
    en: attachPortrait(homepageContentByLocale.en),
    es: attachPortrait(homepageContentByLocale.es),
  };
});
