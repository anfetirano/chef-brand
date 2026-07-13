export type HomepageCta = {
  label: string;
  href: string;
};

export type HomepageFact = {
  label: string;
  value: string;
};

export type HomepageContactMethod = {
  label: string;
  value: string;
  href: string;
};

export type HomepageHero = {
  name: string;
  role: string;
  summary: string;
  location: string;
  availability: string;
  primaryCta: HomepageCta;
  secondaryCta: HomepageCta;
  facts: HomepageFact[];
  contactMethods: HomepageContactMethod[];
  portraitSrc?: string;
};

export type HomepageValueItem = {
  title: string;
  description: string;
};

export type HomepageExperienceItem = {
  venue: string;
  role: string;
  period?: string;
  location: string;
  summary: string;
};

export type HomepageEducationItem = {
  title: string;
  institution: string;
  period?: string;
  description: string;
};

export type HomepageLanguageItem = {
  name: string;
  level: string;
};

export type HomepageGalleryItem = {
  title: string;
  description: string;
};

export type HomepageResume = {
  description: string;
  fileHref: string;
  fileLabel: string;
};

export type HomepageContact = {
  description: string;
  methods: HomepageContactMethod[];
};

export type HomepageContent = {
  hero: HomepageHero;
  promiseIntro: string;
  valueItems: HomepageValueItem[];
  story: string[];
  experience: HomepageExperienceItem[];
  education: HomepageEducationItem[];
  languages: HomepageLanguageItem[];
  gallery: HomepageGalleryItem[];
  resume: HomepageResume;
  contact: HomepageContact;
};
