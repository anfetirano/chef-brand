"use client";

import Image from "next/image";
import { useState } from "react";

type PassLampSceneProps = {
  locale: "en" | "es";
  linkedInHref: string;
};

export function PassLampScene({
  locale,
  linkedInHref,
}: PassLampSceneProps) {
  const [isOn, setIsOn] = useState(false);

  const handleLampClick = () => {
    setIsOn((currentState) => !currentState);
  };

  const buttonText =
    locale === "es"
      ? isOn
        ? "APAGAR"
        : "ENCENDER"
      : isOn
        ? "TURN OFF"
        : "TURN ON";
  const accessibleLabel =
    locale === "es"
      ? isOn
        ? "Apagar lámpara"
        : "Encender lámpara y mostrar platos"
      : isOn
        ? "Turn off lamp"
        : "Turn on lamp and show dishes";
  const linkedInLabel =
    locale === "es"
      ? "Abrir el perfil de Andrés Tirano en LinkedIn"
      : "Open Andres Tirano's LinkedIn profile";

  return (
    <div
      className={`pass-scene ${isOn ? "pass-scene--on" : ""}`}
      aria-live="polite"
    >
      <div className="pass-scene__table-viewport">
        <div className="pass-scene__table-canvas">
          <Image
            src="/images/pass-scene/mise-en-place-table.png"
            alt=""
            width={1149}
            height={1369}
            sizes="(min-width: 1024px) 42vw, 120vw"
            className="pass-scene__table pass-scene__table--off"
          />
          <Image
            src="/images/pass-scene/mise-en-place-table-with-plate-v2.png"
            alt=""
            width={1149}
            height={1369}
            sizes="(min-width: 1024px) 42vw, 120vw"
            className="pass-scene__table pass-scene__table--on"
          />
          {isOn ? (
            <a
              href={linkedInHref}
              target="_blank"
              rel="noreferrer"
              className="pass-scene__linkedin-link"
              aria-label={linkedInLabel}
            >
              <Image
                src="/images/pass-scene/linkedin-relief.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 10vw, 28vw"
                className="pass-scene__linkedin-image"
              />
            </a>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="pass-scene__lamp-button"
        onClick={handleLampClick}
        aria-label={accessibleLabel}
        aria-pressed={isOn}
      >
        <span className="pass-scene__lamp" aria-hidden="true">
          <Image
            src="/images/pass-scene/lamp-off.png"
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 14vw, 120px"
            className="pass-scene__lamp-image pass-scene__lamp-image--off"
          />
          <Image
            src="/images/pass-scene/lamp-on.png"
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 14vw, 120px"
            className="pass-scene__lamp-image pass-scene__lamp-image--on"
          />
        </span>
        <span className="pass-scene__label">{buttonText}</span>
      </button>
    </div>
  );
}
