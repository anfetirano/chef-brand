import type {
  AnalyticsAdapter,
  AnalyticsEventName,
  AnalyticsPayload,
} from "@/types/analytics";

class NoopAnalyticsAdapter implements AnalyticsAdapter {
  track(name: AnalyticsEventName, payload?: AnalyticsPayload) {
    void name;
    void payload;
  }

  page(path: string) {
    void path;
  }
}

let analyticsAdapter: AnalyticsAdapter = new NoopAnalyticsAdapter();

export function setAnalyticsAdapter(adapter: AnalyticsAdapter) {
  analyticsAdapter = adapter;
}

export function trackEvent(
  name: AnalyticsEventName,
  payload?: AnalyticsPayload,
) {
  analyticsAdapter.track(name, payload);
}

export function trackPageView(path: string) {
  analyticsAdapter.page(path);
}
