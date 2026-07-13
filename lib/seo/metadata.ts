import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function getSiteUrl() {
  return new URL(siteConfig.url);
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: getSiteUrl(),
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.defaultTitle,
      template: `%s | ${siteConfig.person.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
      title: siteConfig.defaultTitle,
      description: siteConfig.description,
      url: siteConfig.url,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
    },
  };
}
