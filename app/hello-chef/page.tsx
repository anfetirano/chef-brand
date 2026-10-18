import type { Metadata } from "next";
import { HelloChefLanding } from "@/components/hello-chef/hello-chef-landing";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hello Chef",
  description: "Meet Andrés Tirano, professional chef, and explore his experience, CV and contact details.",
  path: "/hello-chef",
});

export default function HelloChefPage() {
  return <HelloChefLanding />;
}
