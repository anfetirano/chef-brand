"use client";

import dynamic from "next/dynamic";

const CreativeRoom = dynamic(
  () => import("./creative-room").then((module) => module.CreativeRoom),
  {
    ssr: false,
    loading: () => (
      <main
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "#041d16",
          color: "#eee6d5",
        }}
      >
        Preparando Creative Room…
      </main>
    ),
  },
);

export function StudioRoomLoader(props: {
  roomId: string;
  invitation: string;
}) {
  return <CreativeRoom {...props} />;
}
