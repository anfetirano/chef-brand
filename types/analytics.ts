export type AnalyticsEventName =
  | "page_view"
  | "resume_download"
  | "contact_click"
  | "email_click"
  | "whatsapp_click"
  | "linkedin_click"
  | "scroll_depth"
  | "return_visit";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export type AnalyticsAdapter = {
  track: (name: AnalyticsEventName, payload?: AnalyticsPayload) => void;
  page: (path: string) => void;
};
