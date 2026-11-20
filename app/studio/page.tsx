import type { Route } from "next";
import { notFound, redirect } from "next/navigation";
import { signOut } from "@/app/studio/actions";
import { createClient } from "@/lib/supabase/server";
import styles from "./studio.module.css";

export default async function StudioPage() {
  if (process.env.STUDIO_ENABLED !== "true") notFound();

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) redirect("/studio/login" as Route);

  const { data: profile } = await supabase
    .from("studio_profiles")
    .select("display_name, role")
    .eq("user_id", data.claims.sub)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/studio/login?error=unauthorized" as Route);
  }

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <strong>image-brand</strong>
          <span>Creative Studio</span>
        </div>
        <form action={signOut}>
          <button type="submit">Cerrar sesión</button>
        </form>
      </header>
      <section className={styles.content}>
        <h1>Studio</h1>
        <p>Sesión activa para {profile.display_name}.</p>
      </section>
    </main>
  );
}
