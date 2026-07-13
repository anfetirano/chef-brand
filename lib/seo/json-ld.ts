type PersonJsonLdInput = {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
};

type WebsiteJsonLdInput = {
  name: string;
  description: string;
  url: string;
};

export function buildPersonJsonLd({
  name,
  jobTitle,
  description,
  url,
}: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
  };
}

export function buildWebSiteJsonLd({
  name,
  description,
  url,
}: WebsiteJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
  };
}
