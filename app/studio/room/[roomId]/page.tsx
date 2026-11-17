import { notFound } from "next/navigation";
import { StudioRoomLoader } from "@/components/studio/studio-room-loader";
import { isValidStudioRoomName } from "@/lib/studio/invitations";

type StudioRoomPageProps = {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ invite?: string | string[] }>;
};

export default async function StudioRoomPage({
  params,
  searchParams,
}: StudioRoomPageProps) {
  if (process.env.STUDIO_ENABLED !== "true") notFound();

  const [{ roomId }, query] = await Promise.all([params, searchParams]);
  const invitation = typeof query.invite === "string" ? query.invite : "";

  if (!isValidStudioRoomName(roomId) || !invitation) notFound();

  return <StudioRoomLoader roomId={roomId} invitation={invitation} />;
}
