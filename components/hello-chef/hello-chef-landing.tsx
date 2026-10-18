"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TrackedActionLink, TrackedLink } from "@/components/analytics/tracked-link";
import styles from "./hello-chef.module.css";

const cvHref = "/documents/andres-tirano-cv.pdf?v=20260917-international-final-v2";
const whatsappHref = "https://wa.me/34603919993";

export function HelloChefLanding() {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isWelcomeOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsWelcomeOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWelcomeOpen]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.handle} href="https://www.instagram.com/anfetirano/" target="_blank" rel="noreferrer">
          @anfetirano
        </a>
        <Link className={styles.homeLink} href="/">chef.tirano.co</Link>
      </header>

      <section className={styles.hero} aria-labelledby="hello-chef-title">
        <div className={styles.introduction}>
          <p className={styles.role}>Professional Chef</p>
          <h1 id="hello-chef-title">Hello, Chef.<br />I’m Andrés Tirano.</h1>
          <p className={styles.lead}>
            I am travelling through Switzerland to learn about its kitchens, meet the people behind them and find the right place to continue growing as a cook.
          </p>
          <div className={styles.actions}>
            <TrackedLink className={styles.primaryAction ?? ""} eventName="resume_download" eventPayload={{ source: "hello-chef" }} href={cvHref} target="_blank" rel="noreferrer">
              Download CV
            </TrackedLink>
            <Link className={styles.secondaryAction} href="/#story">View full profile</Link>
          </div>
        </div>

        <div className={styles.portrait}>
          <Image
            src="/images/portrait/andres-official-final.png"
            alt="Andrés Tirano working in a professional kitchen"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </div>
      </section>

      <section className={styles.details} aria-label="Professional summary and contact">
        <div>
          <h2>What I bring to a kitchen</h2>
          <p>
            Experience in professional kitchens across Spain, including A Tafona, LUME and Balneario de Panticosa. I am comfortable taking responsibility for my section, adapting to demanding services and learning new working methods.
          </p>
        </div>
        <div>
          <h2>Current situation</h2>
          <p>
            I am a Colombian citizen legally authorised to work in Spain. To work in Switzerland, I would need an employer willing to support the appropriate authorisation process.
          </p>
        </div>
        <div className={styles.contactBlock}>
          <h2>Let’s talk</h2>
          <TrackedActionLink className={styles.contactLink ?? ""} methodId="whatsapp" eventPayload={{ source: "hello-chef" }} href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp · +34 603 91 99 93
          </TrackedActionLink>
          <a className={styles.contactLink} href="mailto:andres@tirano.co">andres@tirano.co</a>
        </div>
      </section>

      {isWelcomeOpen ? (
        <div className={styles.modalBackdrop} role="presentation">
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-copy">
            <button ref={closeButtonRef} className={styles.closeButton} type="button" onClick={() => setIsWelcomeOpen(false)} aria-label="Close welcome message">×</button>
            <div className={styles.lamp} aria-hidden="true">
              <Image src="/images/pass-scene/lamp-on.png" alt="" fill sizes="150px" />
            </div>
            <div className={styles.modalContent}>
              <p className={styles.modalRole}>Professional Chef</p>
              <h2 id="welcome-title">Hello, Chef.</h2>
              <p id="welcome-copy">
                My name is Andrés Felipe Tirano. I am a cook travelling through Switzerland to discover its culinary culture and meet kitchens whose approach connects with the kind of work I want to pursue.
              </p>
              <p>
                I am currently looking for an establishment willing to support the work-authorisation process required for me to build my professional future here. I would be grateful for the opportunity to contribute, learn and become part of the right team.
              </p>
              <button className={styles.primaryAction} type="button" onClick={() => setIsWelcomeOpen(false)}>
                View Andrés’ profile
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
