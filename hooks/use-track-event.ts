"use client";

import { useCallback } from "react";
import { trackEvent } from "@/services/observability/analytics-service";
import type { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";

export function useTrackEvent() {
  return useCallback(
    (name: AnalyticsEventName, payload?: AnalyticsPayload) => {
      trackEvent(name, payload);
    },
    [],
  );
}
