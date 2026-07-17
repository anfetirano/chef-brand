import type { Metadata } from "next";
import { LocalizedHomepage } from "@/components/home/localized-homepage";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { getHomepageContent } from "@/services/homepage/get-homepage-content";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Cook",
  description:
    "Professional cook Andres Tirano: experience in Spanish restaurants, brunch production, and high-volume hotel service, open to professional kitchen opportunities and relocation.",
  path: "/",
});

export default async function Home() {
  const homepage = getHomepageContent();

  return (
    <>
      <StructuredData
        data={[
          buildWebSiteJsonLd({
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
          }),
          buildPersonJsonLd({
            name: siteConfig.person.name,
            jobTitle: siteConfig.person.jobTitle,
            description: siteConfig.description,
            url: siteConfig.url,
          }),
        ]}
      />
      <LocalizedHomepage pages={homepage} />
    </>
  );
}
