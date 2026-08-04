"use client";

import Image from "next/image";
import { useState } from "react";

type PassLampSceneProps = {
  locale: "en" | "es";
};

type PlateImage = {
  src: string;
  alt: {
    en: string;
    es: string;
  };
};

// Add plated-dish assets here as they become available. The interaction already
// advances through the collection and loops back to the first image.
const plateImages: readonly PlateImage[] = [];

export function PassLampScene({ locale }: PassLampSceneProps) {
  const [isOn, setIsOn] = useState(false);
  const [plateIndex, setPlateIndex] = useState(0);
  const activePlate = plateImages[plateIndex];

  const handleLampClick = () => {
    if (!isOn) {
      setIsOn(true);
      setPlateIndex(0);
      return;
    }

    setIsOn(false);
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

  return (
    <div
      className={`pass-scene ${isOn ? "pass-scene--on" : ""}`}
      aria-live="polite"
    >
      <div className="pass-scene__table-viewport" aria-hidden="true">
        <Image
          src="/images/pass-scene/mise-en-place-table.png"
          alt=""
          width={1149}
          height={1369}
          sizes="(min-width: 1024px) 42vw, 0px"
          className="pass-scene__table"
        />
      </div>

      {isOn && activePlate ? (
        <div
          key={`${activePlate.src}-${plateIndex}`}
          className="pass-scene__plate"
        >
          <Image
            src={activePlate.src}
            alt={activePlate.alt[locale]}
            fill
            sizes="(min-width: 1024px) 15vw, 0px"
            className="object-contain"
          />
        </div>
      ) : null}

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
