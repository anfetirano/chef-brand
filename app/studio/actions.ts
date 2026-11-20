"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  if (process.env.STUDIO_ENABLED !== "true") {
    throw new Error("Studio is not enabled.");
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/studio/login?error=invalid" as Route);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) redirect("/studio/login?error=invalid" as Route);

  const { data: profile } = await supabase
    .from("studio_profiles")
    .select("role")
    .eq("user_id", (await supabase.auth.getClaims()).data?.claims?.sub ?? "")
    .maybeSingle();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/studio/login?error=unauthorized" as Route);
  }

  redirect("/studio" as Route);
}

export async function signOut() {
  if (process.env.STUDIO_ENABLED !== "true") return;

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/studio/login" as Route);
}
