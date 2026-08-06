"use client";

import { useRef, useState } from "react";

const serviceMoments = [
  {
    src: "/videos/andres-kitchen-banner.mp4",
    focus: "center 48%",
  },
  {
    src: "/videos/andres-kitchen-service-02.mp4",
    focus: "center center",
  },
  {
    src: "/videos/andres-kitchen-service-03.mp4",
    focus: "center 8%",
  },
] as const;

export function CinematicVideoSequence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);
  const thirdVideoRef = useRef<HTMLVideoElement>(null);

  const showNextMoment = (endedIndex: number) => {
    if (endedIndex !== activeIndex) {
      return;
    }

    const nextIndex = (activeIndex + 1) % serviceMoments.length;
    const nextVideo = [
      firstVideoRef.current,
      secondVideoRef.current,
      thirdVideoRef.current,
    ][nextIndex];

    if (nextVideo) {
      nextVideo.currentTime = 0;
      void nextVideo.play().catch(() => {
        // Browsers may delay autoplay until the video is visible.
      });
    }

    setActiveIndex(nextIndex);
  };

  const resetHiddenMoment = (
    videoIndex: number,
    video: HTMLVideoElement,
  ) => {
    if (videoIndex === activeIndex) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="cinematic-sequence">
      {serviceMoments.map((moment, index) => (
        <video
          key={moment.src}
          ref={
            index === 0
              ? firstVideoRef
              : index === 1
                ? secondVideoRef
                : thirdVideoRef
          }
          className={`cinematic-sequence__video cinematic-sequence__video--${index + 1}${
            index === activeIndex ? " is-active" : ""
          }`}
          src={moment.src}
          style={{ objectPosition: moment.focus }}
          autoPlay={index === 0}
          muted
          playsInline
          preload={index === 0 ? "auto" : "metadata"}
          onEnded={() => showNextMoment(index)}
          onTransitionEnd={(event) =>
            resetHiddenMoment(index, event.currentTarget)
          }
        />
      ))}
    </div>
  );
}
