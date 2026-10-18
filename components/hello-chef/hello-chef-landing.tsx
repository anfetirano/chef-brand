import Link from "next/link";
import styles from "./hello-chef.module.css";

export function HelloChefLanding() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop}>
        <section className={styles.welcome} role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-copy">
          <Link className={styles.closeLink} href="/" aria-label="Close welcome message">×</Link>
          <div className={styles.content}>
            <div className={styles.introMeta}>
              <span>@anfetirano</span>
              <span>Visiting Switzerland</span>
            </div>
            <h1 id="welcome-title">Hello, Chef.</h1>
            <div id="welcome-copy" className={styles.copy}>
              <p className={styles.opening}>
                Thank you for taking a moment to scan my card. I’m Andrés Felipe Tirano, a professional cook visiting Switzerland to discover its culinary culture and meet kitchens where discipline, creativity and respect for the product matter.
              </p>
              <p>
                I’m looking for a team where I can contribute my experience, keep developing and build a long-term professional future. I would require support with the Swiss work-authorisation process and am fully prepared to cooperate throughout it.
              </p>
              <p>
                If you feel my profile could be useful to your kitchen, I would be glad to introduce myself personally. You can explore my work or message me directly.
              </p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/">View my profile</Link>
              <a className={styles.secondaryAction} href="https://wa.me/34603919993" target="_blank" rel="noreferrer">Message me on WhatsApp</a>
            </div>
            <div className={styles.signature}>
              <strong>Andrés Tirano</strong>
              <span>Professional Chef</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
