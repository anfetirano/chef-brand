import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

export type FutureSupabaseClientConfig = {
  url: string;
  anonKey: string;
};

export function getFutureSupabaseClientConfig(): FutureSupabaseClientConfig | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const config = getSupabaseConfig();

  return {
    url: config.url,
    anonKey: config.anonKey,
  };
}
