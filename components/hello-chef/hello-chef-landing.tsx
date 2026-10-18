import Image from "next/image";
import Link from "next/link";
import styles from "./hello-chef.module.css";

export function HelloChefLanding() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop}>
        <section className={styles.welcome} role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-copy">
          <Link className={styles.closeLink} href="/" aria-label="Close welcome message">×</Link>
          <div className={styles.lamp} aria-hidden="true">
            <Image src="/images/pass-scene/lamp-on.png" alt="" fill priority sizes="150px" />
          </div>
          <div className={styles.content}>
            <p className={styles.role}>Professional Chef</p>
            <h1 id="welcome-title">Hello, Chef.</h1>
            <div id="welcome-copy" className={styles.copy}>
              <p>
                My name is Andrés Felipe Tirano. I am a cook travelling through Switzerland to discover its culinary culture and meet kitchens whose approach connects with the kind of work I want to pursue.
              </p>
              <p>
                I am currently looking for an establishment willing to support the work-authorisation process required for me to build my professional future here. I would be grateful for the opportunity to contribute, learn and become part of the right team.
              </p>
            </div>
            <Link className={styles.primaryAction} href="/">View Andrés’ profile</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
