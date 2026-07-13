import { existsSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { homepageContent } from "@/content/homepage";

export const getHomepageContent = cache(() => {
  const portraitPath = join(
    process.cwd(),
    "public",
    "images",
    "portrait",
    "andres-tirano.jpg",
  );

  return {
    ...homepageContent,
    hero: {
      ...homepageContent.hero,
      ...(existsSync(portraitPath)
        ? {
            portraitSrc: "/images/portrait/andres-tirano.jpg",
          }
        : {}),
    },
  };
});
