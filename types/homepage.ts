export type HomepageLocale = "en" | "es";

export type HomepageCta = {
  label: string;
  href: string;
};

export type HomepageFact = {
  label: string;
  value: string;
};

export type HomepageContactMethodId =
  | "email"
  | "phone"
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "website";

export type HomepageContactMethod = {
  id: HomepageContactMethodId;
  label: string;
  value: string;
  href: string;
};

export type HomepageHero = {
  profileLabel: string;
  name: string;
  role: string;
  summaryLabel: string;
  summary: string;
  locationLabel: string;
  location?: string;
  availabilityLabel: string;
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

export type HomepageSection = {
  title: string;
  description?: string;
};

export type HomepageResume = {
  title: string;
  description: string;
  note: string;
  fileHref: string;
  fileLabel: string;
  linkedInLabel: string;
};

export type HomepageContact = {
  title: string;
  description: string;
  methods: HomepageContactMethod[];
};

export type HomepageContent = {
  locale: HomepageLocale;
  languageSwitcherLabel: string;
  hero: HomepageHero;
  promiseIntro: string;
  strengthsTitle: string;
  valueItems: HomepageValueItem[];
  experienceSection: HomepageSection;
  storySection: HomepageSection;
  educationTitle: string;
  languagesTitle: string;
  gallerySection: HomepageSection;
  story: string[];
  experience: HomepageExperienceItem[];
  education: HomepageEducationItem[];
  languages: HomepageLanguageItem[];
  gallery: HomepageGalleryItem[];
  resume: HomepageResume;
  contact: HomepageContact;
};

export type HomepageContentByLocale = Record<HomepageLocale, HomepageContent>;
