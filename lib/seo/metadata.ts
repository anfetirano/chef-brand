import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

const socialImage = {
  url: "/images/social/andres-tirano-share.jpg",
  width: 1200,
  height: 630,
  alt: "Andres Tirano, cocinero profesional, en una cocina durante el servicio",
};

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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.defaultTitle,
      description: siteConfig.description,
      images: [socialImage.url],
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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
