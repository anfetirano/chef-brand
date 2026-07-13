import type { Metadata } from "next";
import { HomepageOutline } from "@/components/home/homepage-outline";
import { StructuredData } from "@/components/seo/structured-data";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo/json-ld";
import { getHomepageContent } from "@/services/homepage/get-homepage-content";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Chef",
  description:
    "Professional cook Andres Tirano: experience in Spanish restaurants, brunch production, and high-volume hotel service, available for international relocation.",
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
      <HomepageOutline page={homepage} />
    </>
  );
}
