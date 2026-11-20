"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig();

  if (!url || !publishableKey) {
    throw new Error("Supabase browser configuration is missing.");
  }

  return createBrowserClient(url, publishableKey);
}
