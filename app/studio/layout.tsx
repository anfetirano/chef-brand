import type { Metadata } from "next";
import "@livekit/components-styles";

export const metadata: Metadata = {
  title: "Creative Room | image-brand Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
