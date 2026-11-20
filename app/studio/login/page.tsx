import type { Route } from "next";
import { notFound, redirect } from "next/navigation";
import { signIn } from "@/app/studio/actions";
import { createClient } from "@/lib/supabase/server";
import styles from "./studio-login.module.css";

type StudioLoginPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function StudioLoginPage({ searchParams }: StudioLoginPageProps) {
  if (process.env.STUDIO_ENABLED !== "true") notFound();

  const [supabase, query] = await Promise.all([createClient(), searchParams]);
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    const { data: profile } = await supabase
      .from("studio_profiles")
      .select("role")
      .eq("user_id", data.claims.sub)
      .maybeSingle();

    if (profile?.role === "admin") redirect("/studio" as Route);
  }

  return (
    <main className={styles.shell}>
      <header className={styles.brand}>
        <strong>image-brand</strong>
        <span>Creative Studio</span>
      </header>

      <section className={styles.panel} aria-labelledby="studio-login-title">
        <div className={styles.intro}>
          <h1 id="studio-login-title">Acceso a Studio</h1>
          <p>Inicia sesión con tu cuenta de administración.</p>
        </div>

        <form action={signIn} className={styles.form}>
          <label>
            Correo electrónico
            <input name="email" type="email" autoComplete="email" required autoFocus />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              minLength={8}
              required
            />
          </label>
          {typeof query.error === "string" ? (
            <p className={styles.error} role="alert">
              {query.error === "unauthorized"
                ? "Esta cuenta no tiene acceso administrativo."
                : "El correo o la contraseña no son correctos."}
            </p>
          ) : null}
          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}
