"use client";

import type { ReactNode } from "react";
import { useTrackEvent } from "@/hooks/use-track-event";
import type { AnalyticsEventName, AnalyticsPayload } from "@/types/analytics";

type TrackedLinkProps = {
  children: ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
  href: string;
  rel?: string | undefined;
  target?: string | undefined;
};

export function TrackedLink({
  children,
  className,
  eventName,
  eventPayload,
  href,
  rel,
  target,
}: TrackedLinkProps) {
  const track = useTrackEvent();

  function handleClick() {
    track(eventName, {
      href,
      ...eventPayload,
    });
  }

  return (
    <a
      className={className}
      href={href}
      onClick={handleClick}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}

type TrackedActionLinkProps = {
  children: ReactNode;
  className?: string;
  eventPayload?: AnalyticsPayload;
  href: string;
  methodId: string;
  rel?: string | undefined;
  target?: string | undefined;
};

const analyticsEventByMethod: Partial<Record<string, AnalyticsEventName>> = {
  email: "email_click",
  linkedin: "linkedin_click",
  whatsapp: "whatsapp_click",
};

export function TrackedActionLink({
  children,
  className,
  eventPayload,
  href,
  methodId,
  rel,
  target,
}: TrackedActionLinkProps) {
  const track = useTrackEvent();

  function handleClick() {
    track("contact_click", {
      href,
      method: methodId,
      ...eventPayload,
    });

    const specificEvent = analyticsEventByMethod[methodId];

    if (specificEvent) {
      track(specificEvent, {
        href,
        method: methodId,
        ...eventPayload,
      });
    }
  }

  return (
    <a
      className={className}
      href={href}
      onClick={handleClick}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}
